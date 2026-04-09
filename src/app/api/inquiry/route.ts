import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, phone, plan, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Build the email content
    const emailSubject = `New PingOS Inquiry from ${name}`;
    
    // Plain text fallback
    const emailTextContent = `
New Inquiry Received
====================
Name:    ${name}
Email:   ${email}
Company: ${company || "N/A"}
Phone:   ${phone || "N/A"}
Plan:    ${plan || "Not specified"}

Message:
${message}

---
Sent from PingOS Landing Page
    `.trim();

    // Beautiful HTML template
    const emailHtmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 40px 0; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .header { background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%); padding: 35px 20px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px; }
        .header p { margin: 10px 0 0 0; font-size: 15px; color: #e0e7ff; opacity: 0.9; }
        .content { padding: 40px 30px; color: #3f3f46; }
        .section-title { font-size: 12px; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin-bottom: 16px; letter-spacing: 1px; }
        .info-table { border-collapse: collapse; width: 100%; margin-bottom: 35px; border: 1px solid #f1f5f9; border-radius: 8px; overflow: hidden; }
        .info-table tr:not(:last-child) { border-bottom: 1px solid #f1f5f9; }
        .info-table th { padding: 14px 16px; background: #f8fafc; text-align: left; font-weight: 600; font-size: 14px; color: #64748b; width: 120px; }
        .info-table td { padding: 14px 16px; font-size: 15px; color: #0f172a; font-weight: 500; }
        .message-box { background: #f8fafc; border-left: 4px solid #4f46e5; padding: 24px; border-radius: 0 8px 8px 0; margin-bottom: 30px; white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #334155; }
        .footer { padding: 24px; text-align: center; font-size: 13px; color: #94a3b8; border-top: 1px solid #f1f5f9; background: #fafafa; }
        .badge { background: #e0e7ff; color: #4338ca; padding: 4px 10px; border-radius: 100px; font-size: 13px; font-weight: 600; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Lead Inquiry</h1>
          <p>You have a new prospect from the landing page</p>
        </div>
        <div class="content">
          <div class="section-title">Contact Information</div>
          <table class="info-table">
            <tr><th>Name</th><td>${name}</td></tr>
            <tr><th>Email</th><td><a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></td></tr>
            <tr><th>Company</th><td>${company || "—"}</td></tr>
            <tr><th>Phone</th><td>${phone || "—"}</td></tr>
            <tr><th>Plan</th><td><span class="badge">${plan || "Not specified"}</span></td></tr>
          </table>
          
          <div class="section-title">Message Details</div>
          <div class="message-box">${message}</div>
        </div>
        <div class="footer">
          This inquiry was sent automatically from your PingOS website.
        </div>
      </div>
    </body>
    </html>
    `;

    // --- Option 1: Use nodemailer ---
    // Make sure to add these variables to your .env.local file
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"PingOS Website" <${process.env.SMTP_USER}>`,
      to: process.env.INQUIRY_EMAIL || process.env.SMTP_USER || "sales@pingos.io",
      replyTo: email,
      subject: emailSubject,
      text: emailTextContent,
      html: emailHtmlContent,
    });

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
      { status: 200 }
    );
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry. Please try again." },
      { status: 500 }
    );
  }
}
