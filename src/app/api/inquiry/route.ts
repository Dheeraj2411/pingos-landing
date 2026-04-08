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
    const emailBody = `
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
      text: emailBody,
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
