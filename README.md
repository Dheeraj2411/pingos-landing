This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment variables

This project uses a public environment variable `NEXT_PUBLIC_WHATSAPP_NUMBER` to enable WhatsApp links/QR. If this variable is not set, WhatsApp UI (button/QR/footer link) will be hidden and no phone number will be exposed in the app.

Add a local `.env.local` file at the project root (do not commit it) with the number in international format (digits only, no plus sign or punctuation):

```bash
# Example (.env.local)
NEXT_PUBLIC_WHATSAPP_NUMBER=918076377512
```

On Windows PowerShell you can set it for the current session like this before running the dev server:

```powershell
$env:NEXT_PUBLIC_WHATSAPP_NUMBER="918076377512"
npm run dev
```

In production, set `NEXT_PUBLIC_WHATSAPP_NUMBER` in your hosting platform's environment settings (e.g., Vercel Environment Variables).

### Backend / Email / Security

The inquiry form can send emails from the server. Add the following to `.env.local` (or your platform's env settings) to enable SMTP email delivery and optional reCAPTCHA verification:

```bash
# SMTP (required for sending inquiry emails)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-username@example.com
SMTP_PASS=your-smtp-password

# Where inbound inquiries will be sent (defaults to SMTP_USER if not set)
INQUIRY_EMAIL=sales@your-company.com

# Optional: public product URL used by CTAs
NEXT_PUBLIC_PRODUCT_URL=https://app.pingos.me

# Optional: Enable Google reCAPTCHA v2/v3 verification on the server
# When set, clients must submit `recaptchaToken` with the inquiry POST body.
RECAPTCHA_SECRET=your-recaptcha-secret
```

Notes:

- If SMTP variables are not provided, the API will log inquiries to the server console instead of sending email (useful for local development).
- If you enable `RECAPTCHA_SECRET`, be sure to implement the client-side site widget and include the `recaptchaToken` in the request body.

### Optional: CRM webhook

You can configure an outbound webhook so inquiry payloads are POSTed to your CRM or automation tool. The API will send JSON with the inquiry fields and `receivedAt` timestamp. Add these variables to enable it:

```bash
# Optional: webhook endpoint to receive inquiry payloads
WEBHOOK_URL=https://hooks.your-crm.example/inbound

# Optional: secret used to HMAC-SHA256 sign the JSON payload. The signature
# will be sent in the `x-pingos-signature` header as `v1=<hex>`.
WEBHOOK_SECRET=your-webhook-secret
```

Notes:

- The webhook is optional; errors when sending the webhook are logged and do not prevent the API from returning success to the web client.
- For production, validate the `x-pingos-signature` on the receiver side to ensure authenticity.
