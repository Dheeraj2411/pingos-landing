import crypto from "crypto";

// Common disposable/throwaway email domains used by automated spam bots
export const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "tempmail.com",
  "temp-mail.org",
  "10minutemail.com",
  "throwawaymail.com",
  "yopmail.com",
  "dispostable.com",
  "trashmail.com",
  "sharklasers.com",
  "grr.la",
  "nada.ltd",
  "getairmail.com",
  "mohmal.com",
  "mytemp.email",
]);

export interface SanitizedInquiry {
  name: string;
  email: string;
  company: string;
  phone: string;
  plan: string;
  message: string;
  formLoadedAt?: number;
  honeypotFilled?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  isSpamHoneypot: boolean;
  error?: string;
  data: SanitizedInquiry;
}

/**
 * Strips carriage returns, newlines, and control characters to prevent
 * SMTP header injection and log poisoning.
 */
export function sanitizeSingleLine(val: unknown, maxLength: number): string {
  if (typeof val !== "string") return "";
  return val
    .replace(/[\r\n\x00-\x1F\x7F]/g, "")
    .trim()
    .slice(0, maxLength);
}

/**
 * Normalizes multiline text, removing dangerous control characters and limiting length.
 */
export function sanitizeMultiline(val: unknown, maxLength: number): string {
  if (typeof val !== "string") return "";
  return val
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim()
    .slice(0, maxLength);
}

/**
 * Validates email format according to standard RFC 5322 specifications.
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  // Strict regex verifying user and domain parts, including a valid TLD
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
}

/**
 * Checks if the email domain belongs to a known temporary burner provider.
 */
export function isDisposableEmail(email: string): boolean {
  const parts = email.toLowerCase().split("@");
  if (parts.length !== 2) return false;
  return DISPOSABLE_EMAIL_DOMAINS.has(parts[1]);
}

/**
 * Generates a deterministic SHA-256 fingerprint of the core submission content.
 */
export function generateSubmissionFingerprint(data: {
  name: string;
  email: string;
  message: string;
  company?: string;
}): string {
  const normalized = [
    data.email.toLowerCase().trim(),
    data.name.toLowerCase().trim(),
    data.message.trim().slice(0, 100),
  ].join("|");

  return crypto.createHash("sha256").update(normalized).digest("hex");
}

// Global In-Memory deduplication cache (3-minute TTL)
declare global {
  var __PINGOS_DEDUP_CACHE: Map<string, number> | undefined;
  var __PINGOS_EMAIL_RATE_LIMIT: Map<string, { count: number; firstTs: number }> | undefined;
}

const dedupCache: Map<string, number> =
  global.__PINGOS_DEDUP_CACHE || new Map();
global.__PINGOS_DEDUP_CACHE = dedupCache;

const emailRateLimits: Map<string, { count: number; firstTs: number }> =
  global.__PINGOS_EMAIL_RATE_LIMIT || new Map();
global.__PINGOS_EMAIL_RATE_LIMIT = emailRateLimits;

const DEDUP_WINDOW_MS = 3 * 60 * 1000; // 3 minutes

export function checkAndRecordDuplicate(fingerprint: string): boolean {
  const now = Date.now();

  // Prune expired entries periodically to prevent memory accumulation
  if (dedupCache.size > 1000) {
    for (const [key, timestamp] of dedupCache.entries()) {
      if (now - timestamp > DEDUP_WINDOW_MS) {
        dedupCache.delete(key);
      }
    }
  }

  const existingTimestamp = dedupCache.get(fingerprint);
  if (existingTimestamp && now - existingTimestamp < DEDUP_WINDOW_MS) {
    return true; // Is duplicate!
  }

  dedupCache.set(fingerprint, now);
  return false;
}

const EMAIL_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const EMAIL_LIMIT_MAX = 3; // Max 3 submissions per email per 10 minutes

export function checkEmailRateLimit(email: string): boolean {
  const normalizedEmail = email.toLowerCase().trim();
  const now = Date.now();

  // Prune expired entries
  if (emailRateLimits.size > 1000) {
    for (const [key, entry] of emailRateLimits.entries()) {
      if (now - entry.firstTs > EMAIL_LIMIT_WINDOW_MS) {
        emailRateLimits.delete(key);
      }
    }
  }

  const entry = emailRateLimits.get(normalizedEmail) || {
    count: 0,
    firstTs: now,
  };

  if (now - entry.firstTs > EMAIL_LIMIT_WINDOW_MS) {
    entry.count = 0;
    entry.firstTs = now;
  }

  entry.count += 1;
  emailRateLimits.set(normalizedEmail, entry);

  return entry.count <= EMAIL_LIMIT_MAX;
}

/**
 * Validates and sanitizes inquiry payload with anti-bot, anti-spam, and length rules.
 */
export function validateInquiryPayload(raw: Record<string, unknown>): ValidationResult {
  // 1. Honeypot Check: If the hidden 'website' field contains any value, it was filled by a bot
  const honeypot = typeof raw.website === "string" ? raw.website.trim() : "";
  if (honeypot.length > 0) {
    return {
      isValid: false,
      isSpamHoneypot: true,
      data: {
        name: "",
        email: "",
        company: "",
        phone: "",
        plan: "not-specified",
        message: "",
        honeypotFilled: true,
      },
    };
  }

  // 2. Speed Trap Check: Human users take at least 1.5 seconds to read and fill the form
  if (typeof raw.formLoadedAt === "number") {
    const elapsed = Date.now() - raw.formLoadedAt;
    if (elapsed < 1500) {
      return {
        isValid: false,
        isSpamHoneypot: false,
        error: "Suspicious automated submission speed. Please wait a moment and try again.",
        data: {
          name: "",
          email: "",
          company: "",
          phone: "",
          plan: "not-specified",
          message: "",
        },
      };
    }
  }

  // 3. Sanitize inputs
  const name = sanitizeSingleLine(raw.name, 100);
  const email = sanitizeSingleLine(raw.email, 254).toLowerCase();
  const company = sanitizeSingleLine(raw.company, 150);
  const phone = sanitizeSingleLine(raw.phone, 30);
  const rawPlan = sanitizeSingleLine(raw.plan, 50).toLowerCase();
  const message = sanitizeMultiline(raw.message, 3000);

  const allowedPlans = new Set([
    "not-specified",
    "starter",
    "pro",
    "enterprise",
    "custom",
  ]);
  const plan = allowedPlans.has(rawPlan) ? rawPlan : "not-specified";

  // 4. Validate fields
  if (!name || name.length < 2) {
    return {
      isValid: false,
      isSpamHoneypot: false,
      error: "Name must be at least 2 characters.",
      data: { name, email, company, phone, plan, message },
    };
  }

  if (!email || !isValidEmail(email)) {
    return {
      isValid: false,
      isSpamHoneypot: false,
      error: "A valid email address is required.",
      data: { name, email, company, phone, plan, message },
    };
  }

  if (isDisposableEmail(email)) {
    return {
      isValid: false,
      isSpamHoneypot: false,
      error: "Disposable or temporary email addresses are not permitted.",
      data: { name, email, company, phone, plan, message },
    };
  }

  if (!message || message.length < 10) {
    return {
      isValid: false,
      isSpamHoneypot: false,
      error: "Message must be at least 10 characters.",
      data: { name, email, company, phone, plan, message },
    };
  }

  if (typeof raw.message === "string" && raw.message.trim().length > 3000) {
    return {
      isValid: false,
      isSpamHoneypot: false,
      error: "Message is too long (maximum 3,000 characters).",
      data: { name, email, company, phone, plan, message },
    };
  }

  return {
    isValid: true,
    isSpamHoneypot: false,
    data: {
      name,
      email,
      company,
      phone,
      plan,
      message,
    },
  };
}
