import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { render, pretty } from "@react-email/render";
import validator from "validator";

import { EmailTemplate } from "@/components/template/Email";

export async function POST(request: Request) {
  const body = await request.json();
  const { senderName, senderEmail, reasonToContact, senderMsg } = body;

  if (
    !senderName ||
    !senderEmail ||
    !reasonToContact ||
    !senderMsg
  ) {
    return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
  }

  if (!validator.isEmail(senderEmail)) {
    return NextResponse.json(
      { error: "Email format is not valid" },
      { status: 400 }
    );
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #8b5cf6;">New Contact Message from Portfolio</h2>
      <p><strong>Name:</strong> ${senderName}</p>
      <p><strong>Email:</strong> ${senderEmail}</p>
      <p><strong>Reason:</strong> ${reasonToContact}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${senderMsg}</p>
    </div>
  `;

  // Notification to Portfolio Owner (Naresh)
  const ownerMessage = {
    from: `"Portfolio Contact Form" <${process.env.email_from}>`,
    to: "nareshkmt112006@gmail.com",
    subject: `New Message: ${reasonToContact} from ${senderName}`,
    html: htmlContent,
  };

  // Confirmation to the Sender
  const senderMessage = {
    from: `"Naresh Kumawat Portfolio" <${process.env.email_from}>`,
    to: senderEmail,
    subject: "Message Received! 🚀 - Naresh Kumawat",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Hi ${senderName},</h2>
        <p>Thanks for reaching out! I've received your message regarding <strong>${reasonToContact}</strong>.</p>
        <p>I'll review it and get back to you as soon as possible.</p>
        <br />
        <p>Best regards,</p>
        <p><strong>Naresh Kumawat</strong></p>
      </div>
    `,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email_from,
      pass: process.env.email_password,
    },
  });

  try {
    // Send both emails
    await transporter.sendMail(ownerMessage);
    await transporter.sendMail(senderMessage);

    return NextResponse.json(
      {
        message: `Your message has been sent successfully.`,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(`Error sending email:`, err);
    return NextResponse.json(
      { error: "Failed to send email. Please check server configuration." },
      { status: 500 }
    );
  }
}

