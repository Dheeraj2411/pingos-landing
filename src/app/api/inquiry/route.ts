import { NextRequest, NextResponse } from "next/server";
import {
  validateInquiryPayload,
  generateSubmissionFingerprint,
  checkAndRecordDuplicate,
  checkEmailRateLimit,
} from "@/lib/validation";

// Lightweight in-memory rate limiter (per-process). Not suitable as the only
// protection in multi-instance production environments, but useful as a basic layer.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max requests per window per IP
const MAX_PAYLOAD_SIZE_BYTES = 32 * 1024; // 32 KB

type RateLimitEntry = { count: number; firstRequestTs: number };

declare global {
  // Attach a namespaced rate limit map onto the global object for dev/hot-reload
  // environments.
  var __PINGOS_RATE_LIMIT: Map<string, RateLimitEntry> | undefined;
  var __PINGOS_REDIS: unknown;
}

const ipRateLimit: Map<string, RateLimitEntry> =
  global.__PINGOS_RATE_LIMIT || new Map();
global.__PINGOS_RATE_LIMIT = ipRateLimit;

export async function POST(req: NextRequest) {
  try {
    // 1. Guard against oversized payload attacks (DoS prevention)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Payload too large. Maximum request size is 32KB." },
        { status: 413 }
      );
    }

    const rawBody = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    if (!rawBody || typeof rawBody !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload format." },
        { status: 400 }
      );
    }

    // 2. Validate and sanitize inputs with anti-bot honeypot and speed trap checks
    const validation = validateInquiryPayload(rawBody);

    // If honeypot caught a bot, silently return 200 with dropped flag to not alert the bot
    if (validation.isSpamHoneypot) {
      return NextResponse.json(
        { success: true, message: "Inquiry submitted successfully!", dropped: true },
        { status: 200 }
      );
    }

    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error || "Invalid submission details." },
        { status: 400 }
      );
    }

    const { name, email, company, phone, plan, message } = validation.data;

    // 3. Resolve client IP safely
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const now = Date.now();

    // 4. Rate Limiting Layer 1: Dual Email-based throttling
    if (!checkEmailRateLimit(email)) {
      return NextResponse.json(
        { error: "Too many submissions for this email address. Please try again later." },
        { status: 429 }
      );
    }

    // 5. Rate Limiting Layer 2: IP-based throttling (Redis or in-memory)
    const REDIS_URL = process.env.REDIS_URL;
    if (REDIS_URL) {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      let redis = global.__PINGOS_REDIS as any;
      if (!redis) {
        try {
          const IORedisModule = eval("require")("ioredis");
          const IORedis = (IORedisModule as any).default || IORedisModule;
          redis = new (IORedis as any)(REDIS_URL);
          global.__PINGOS_REDIS = redis;
        } catch (err) {
          console.error(
            "Failed to initialize Redis client for rate limiting:",
            err,
          );
        }
      }

      if (redis) {
        try {
          const windowSeconds = Math.ceil(RATE_LIMIT_WINDOW_MS / 1000);
          const key = `pingos:rl:${ip}`;
          const count = await redis.incr(key);
          if (count === 1) {
            await redis.expire(key, windowSeconds);
          }

          if (count > RATE_LIMIT_MAX) {
            return NextResponse.json(
              { error: "Too many requests. Please try again later." },
              { status: 429 }
            );
          }
        } catch (err) {
          console.error(
            "Redis rate-limit check failed, falling back to in-memory:",
            err,
          );
        }
      }
      /* eslint-enable @typescript-eslint/no-explicit-any */
    }

    // Fallback in-memory IP limiter
    const entry = ipRateLimit.get(ip) || { count: 0, firstRequestTs: now };
    if (now - entry.firstRequestTs > RATE_LIMIT_WINDOW_MS) {
      entry.count = 0;
      entry.firstRequestTs = now;
    }
    entry.count += 1;
    ipRateLimit.set(ip, entry);

    if (entry.count > RATE_LIMIT_MAX) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // 6. Idempotency & Duplicate Submission Prevention Layer
    const fingerprint = generateSubmissionFingerprint({ name, email, message, company });
    const isDuplicate = checkAndRecordDuplicate(fingerprint);
    if (isDuplicate) {
      return NextResponse.json(
        {
          success: true,
          message: "Inquiry already received! Our team is already reviewing your request.",
          duplicate: true,
        },
        { status: 200 }
      );
    }

    // 7. Optional reCAPTCHA verification
    const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
    if (RECAPTCHA_SECRET) {
      const recaptchaToken = (rawBody as { recaptchaToken?: string }).recaptchaToken;
      if (!recaptchaToken) {
        return NextResponse.json(
          { error: "reCAPTCHA token required." },
          { status: 400 }
        );
      }

      try {
        const params = new URLSearchParams();
        params.append("secret", RECAPTCHA_SECRET);
        params.append("response", recaptchaToken);
        params.append("remoteip", ip);

        const verifyRes = await fetch(
          "https://www.google.com/recaptcha/api/siteverify",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString(),
          },
        );

        const verifyJson = await verifyRes.json();
        if (!verifyJson.success) {
          return NextResponse.json(
            { error: "reCAPTCHA verification failed." },
            { status: 400 }
          );
        }
      } catch (err) {
        console.error("reCAPTCHA verification error:", err);
        return NextResponse.json(
          { error: "reCAPTCHA verification error." },
          { status: 500 }
        );
      }
    }

    // 8. Attempt to normalize phone number to E.164
    let normalizedPhone: string | null = null;
    if (phone) {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      try {
        const lib = eval("require")("libphonenumber-js");
        const parseFn =
          (lib as any).parsePhoneNumberFromString ||
          (lib as any).parsePhoneNumber;
        const parsed = parseFn(phone as unknown as string) as any;
        if (
          parsed &&
          (typeof parsed.isValid === "function"
            ? parsed.isValid()
            : parsed.isValid)
        ) {
          normalizedPhone = parsed.number; // E.164
        }
      } catch {
        // Fallback to raw phone
      }
      /* eslint-enable @typescript-eslint/no-explicit-any */
    }

    // 9. Build Email content with safe HTML escaping
    const emailSubject = `New PingOS Inquiry from ${name}`;

    const escapeHtml = (str: string) =>
      String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

    const escName = escapeHtml(name);
    const escEmail = escapeHtml(email);
    const escCompany = company ? escapeHtml(company) : "—";
    const escPhone = phone ? escapeHtml(phone) : "—";
    const escPlan = plan ? escapeHtml(plan) : "Not specified";
    const escMessage = escapeHtml(message);

    const emailTextContent =
      `New Inquiry Received\n====================\nName:    ${name}\nEmail:   ${email}\nCompany: ${company || "N/A"}\nPhone:   ${phone || "N/A"}\nPlan:    ${plan || "Not specified"}\n\nMessage:\n${message}\n\n---\nSent from PingOS Landing Page`.trim();

    const emailHtmlContent = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 40px 0; } .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); } .header { background: linear-gradient(135deg, #128c7e 0%, #075e54 100%); padding: 35px 20px; text-align: center; color: #ffffff; } .header h1 { margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px; } .header p { margin: 10px 0 0 0; font-size: 15px; color: #e0e7ff; opacity: 0.9; } .content { padding: 40px 30px; color: #3f3f46; } .section-title { font-size: 12px; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin-bottom: 16px; letter-spacing: 1px; } .info-table { border-collapse: collapse; width: 100%; margin-bottom: 35px; border: 1px solid #f1f5f9; border-radius: 8px; overflow: hidden; } .info-table tr:not(:last-child) { border-bottom: 1px solid #f1f5f9; } .info-table th { padding: 14px 16px; background: #f8fafc; text-align: left; font-weight: 600; font-size: 14px; color: #64748b; width: 120px; } .info-table td { padding: 14px 16px; font-size: 15px; color: #0f172a; font-weight: 500; } .message-box { background: #f8fafc; border-left: 4px solid #128c7e; padding: 24px; border-radius: 0 8px 8px 0; margin-bottom: 30px; white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #334155; } .footer { padding: 24px; text-align: center; font-size: 13px; color: #94a3b8; border-top: 1px solid #f1f5f9; background: #fafafa; } .badge { background: #d9fdd3; color: #075e54; padding: 4px 10px; border-radius: 100px; font-size: 13px; font-weight: 600; display: inline-block; }</style></head><body><div class="container"><div class="header"><h1>New Lead Inquiry</h1><p>You have a new prospect from the landing page</p></div><div class="content"><div class="section-title">Contact Information</div><table class="info-table"><tr><th>Name</th><td>${escName}</td></tr><tr><th>Email</th><td><a href="mailto:${escEmail}" style="color: #128c7e; text-decoration: none;">${escEmail}</a></td></tr><tr><th>Company</th><td>${escCompany}</td></tr><tr><th>Phone</th><td>${escPhone}</td></tr><tr><th>Plan</th><td><span class="badge">${escPlan}</span></td></tr></table><div class="section-title">Message Details</div><div class="message-box">${escMessage}</div></div><div class="footer">This inquiry was sent automatically from your PingOS website.</div></div></body></html>`;

    // 10. Sending email
    const INQUIRY_EMAIL =
      process.env.INQUIRY_EMAIL || process.env.SMTP_USER || "sales@pingos.io";

    if (
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_HOST
    ) {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"PingOS Website" <${process.env.SMTP_USER}>`,
        to: INQUIRY_EMAIL,
        replyTo: email,
        subject: emailSubject,
        text: emailTextContent,
        html: emailHtmlContent,
      });
    } else {
      console.warn(
        "SMTP not configured — logging inquiry instead of sending email.",
      );
      console.info({
        emailSubject,
        emailTextContent,
        emailHtmlContent,
        to: INQUIRY_EMAIL,
      });
    }

    // 11. Optional CRM Webhook
    const WEBHOOK_URL = process.env.WEBHOOK_URL;
    if (WEBHOOK_URL) {
      const payload = {
        name,
        email,
        company: company || null,
        phone: normalizedPhone ?? phone ?? null,
        plan: plan || null,
        message: message || null,
        receivedAt: new Date().toISOString(),
        ip,
      };

      const bodyStr = JSON.stringify(payload);
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (process.env.WEBHOOK_SECRET) {
        try {
          const { createHmac } = await import("crypto");
          const sig = createHmac("sha256", process.env.WEBHOOK_SECRET)
            .update(bodyStr)
            .digest("hex");
          headers["x-pingos-signature"] = `v1=${sig}`;
        } catch (err) {
          console.error("Failed to create webhook signature:", err);
        }
      }

      try {
        const resp = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers,
          body: bodyStr,
        });
        if (!resp.ok) {
          console.warn("Webhook responded with non-OK status", resp.status);
        }
      } catch (err) {
        console.error("Failed to send webhook to", WEBHOOK_URL, err);
      }
    }

    return NextResponse.json(
      { success: true, message: "Inquiry submitted successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry. Please try again." },
      { status: 500 },
    );
  }
}
