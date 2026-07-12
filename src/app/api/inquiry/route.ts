import { NextRequest, NextResponse } from "next/server";

// Lightweight in-memory rate limiter (per-process). Not suitable as the only
// protection in multi-instance production environments, but useful as a basic layer.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max requests per window per IP

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
    const body = (await req.json()) as Record<string, unknown>;

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const company = typeof body.company === "string" ? body.company.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const plan =
      typeof body.plan === "string"
        ? body.plan.trim().toLowerCase()
        : "not-specified";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    // Basic validators
    const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
    const allowedPlans = new Set([
      "not-specified",
      "starter",
      "pro",
      "enterprise",
    ]);

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters." },
        { status: 400 },
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 },
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters." },
        { status: 400 },
      );
    }

    if (company && company.length > 200) {
      return NextResponse.json(
        { error: "Company name is too long." },
        { status: 400 },
      );
    }

    // Phone validation will be attempted with libphonenumber-js (if available)
    // later; for now only perform a lightweight length check here.
    if (phone && phone.length > 25) {
      return NextResponse.json(
        { error: "Phone number appears invalid." },
        { status: 400 },
      );
    }

    const planValue = allowedPlans.has(plan) ? plan : "not-specified";

    // --- Rate limiting by IP ---
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const now = Date.now();

    // Server-side rate limit: prefer Redis when `REDIS_URL` is configured so
    // the limit works across multiple server instances. Fall back to the
    // in-process map for local development.
    const REDIS_URL = process.env.REDIS_URL;
    if (REDIS_URL) {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      let redis = global.__PINGOS_REDIS as any;
      if (!redis) {
        try {
          // Use runtime `require` via eval to avoid static resolution by TS when
          // the package isn't installed in development environments.
          const IORedisModule = eval("require")("ioredis");
          const IORedis = (IORedisModule as any).default || IORedisModule;
          // dynamic runtime constructor
          redis = new (IORedis as any)(REDIS_URL);
          // Cache on global to survive hot reloads
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
              { status: 429 },
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

    // Fallback in-memory per-process limiter (best-effort)
    const entry = ipRateLimit.get(ip) || { count: 0, firstRequestTs: now };

    if (now - entry.firstRequestTs > RATE_LIMIT_WINDOW_MS) {
      // reset window
      entry.count = 0;
      entry.firstRequestTs = now;
    }

    entry.count += 1;
    ipRateLimit.set(ip, entry);

    if (entry.count > RATE_LIMIT_MAX) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    // --- Optional reCAPTCHA verification ---
    // If RECAPTCHA_SECRET is set in the environment, require and verify a
    // `recaptchaToken` field in the request body. This is optional so existing
    // clients keep working when the secret is not configured.
    const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
    if (RECAPTCHA_SECRET) {
      const recaptchaToken = (body as { recaptchaToken?: string })
        .recaptchaToken;
      if (!recaptchaToken) {
        return NextResponse.json(
          { error: "reCAPTCHA token required." },
          { status: 400 },
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
            { status: 400 },
          );
        }
      } catch (err) {
        console.error("reCAPTCHA verification error:", err);
        return NextResponse.json(
          { error: "reCAPTCHA verification error." },
          { status: 500 },
        );
      }
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    // Attempt to normalize phone number to E.164 when possible
    let normalizedPhone: string | null = null;
    if (phone) {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      try {
        // Use runtime require to avoid TS resolution errors when the package
        // isn't installed.
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
        // Ignore: fallback to raw phone value
      }
      /* eslint-enable @typescript-eslint/no-explicit-any */
    }

    // Build the email content
    const emailSubject = `New PingOS Inquiry from ${name}`;

    // Basic HTML-escape to prevent accidental injection in email HTML
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
    const escPlan = planValue ? escapeHtml(planValue) : "Not specified";
    const escMessage = escapeHtml(message);

    // Plain text fallback
    const emailTextContent =
      `New Inquiry Received\n====================\nName:    ${name}\nEmail:   ${email}\nCompany: ${company || "N/A"}\nPhone:   ${phone || "N/A"}\nPlan:    ${planValue || "Not specified"}\n\nMessage:\n${message}\n\n---\nSent from PingOS Landing Page`.trim();

    // Beautiful HTML template (values are escaped above)
    const emailHtmlContent = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 40px 0; } .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); } .header { background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%); padding: 35px 20px; text-align: center; color: #ffffff; } .header h1 { margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px; } .header p { margin: 10px 0 0 0; font-size: 15px; color: #e0e7ff; opacity: 0.9; } .content { padding: 40px 30px; color: #3f3f46; } .section-title { font-size: 12px; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin-bottom: 16px; letter-spacing: 1px; } .info-table { border-collapse: collapse; width: 100%; margin-bottom: 35px; border: 1px solid #f1f5f9; border-radius: 8px; overflow: hidden; } .info-table tr:not(:last-child) { border-bottom: 1px solid #f1f5f9; } .info-table th { padding: 14px 16px; background: #f8fafc; text-align: left; font-weight: 600; font-size: 14px; color: #64748b; width: 120px; } .info-table td { padding: 14px 16px; font-size: 15px; color: #0f172a; font-weight: 500; } .message-box { background: #f8fafc; border-left: 4px solid #4f46e5; padding: 24px; border-radius: 0 8px 8px 0; margin-bottom: 30px; white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #334155; } .footer { padding: 24px; text-align: center; font-size: 13px; color: #94a3b8; border-top: 1px solid #f1f5f9; background: #fafafa; } .badge { background: #e0e7ff; color: #4338ca; padding: 4px 10px; border-radius: 100px; font-size: 13px; font-weight: 600; display: inline-block; }</style></head><body><div class="container"><div class="header"><h1>New Lead Inquiry</h1><p>You have a new prospect from the landing page</p></div><div class="content"><div class="section-title">Contact Information</div><table class="info-table"><tr><th>Name</th><td>${escName}</td></tr><tr><th>Email</th><td><a href="mailto:${escEmail}" style="color: #4f46e5; text-decoration: none;">${escEmail}</a></td></tr><tr><th>Company</th><td>${escCompany}</td></tr><tr><th>Phone</th><td>${escPhone}</td></tr><tr><th>Plan</th><td><span class="badge">${escPlan}</span></td></tr></table><div class="section-title">Message Details</div><div class="message-box">${escMessage}</div></div><div class="footer">This inquiry was sent automatically from your PingOS website.</div></div></body></html>`;

    // --- Sending email (safe, production-friendly) ---
    // If SMTP env vars are provided, use nodemailer. Otherwise log to console (dev fallback).
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
      // Development fallback: log the email content so nothing breaks when SMTP isn't configured
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

    // --- Optional: send inquiry to external webhook (CRM) ---
    const WEBHOOK_URL = process.env.WEBHOOK_URL;
    if (WEBHOOK_URL) {
      const payload = {
        name,
        email,
        company: company || null,
        phone: normalizedPhone ?? phone ?? null,
        plan: planValue || null,
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

    // --- Option 2: Log to console (default for dev) ---
    // console.log("=== NEW INQUIRY ===");
    // console.log(emailBody);
    // console.log("===================");

    // --- Option 3: Send to an external email API like Resend, SendGrid, etc. ---
    // const res = await fetch("https://api.resend.com/emails", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     from: "PingOS <onboarding@pingos.io>",
    //     to: [process.env.INQUIRY_EMAIL || "sales@pingos.io"],
    //     reply_to: email,
    //     subject: emailSubject,
    //     text: emailBody,
    //   }),
    // });

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
