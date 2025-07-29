import "dotenv/config";
import nodemailer from "nodemailer";
import type { NextRequest, NextResponse } from "next/server";
import { VolunteerFormSchema } from "@/lib/types";

async function GET(req: NextRequest) {
  return Response.json("Just a test");
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const dateString = formData.get("startDate");

  const date = typeof dateString === "string" && new Date(dateString);
  const formattedDate = date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const emailText = `
  Name: ${formData.get("name")}
  Age: ${formData.get("age")}
  Email: ${formData.get("email")}
  Number: ${formData.get("number")}
  Occuptaion Or School: ${formData.get("occupation")}
  Days Available: ${formData.get("availability")}
  Prefered Start Date: ${formattedDate}
  Skills: ${formData.get("skills")}
  Prefered Sectors: ${formData.get("sectors")}
  Can Attend Meetings: ${formData.get("attendance")}
  Would Like A Certificate: ${formData.get("certificate")}
  `;

  const emailHtml = `
  <h2 style="color: black; text-decoration: underline; font-family: Arial, sans-serif;">
  Applicant Data
  </h2>

  <div style="font-size: 15px; font-family: Arial, sans-serif;">
  <b>Name:</b> ${formData.get("name")}<br/>
  <b>Age:</b> ${formData.get("age")}<br/>
  <b>Email:</b> ${formData.get("email")}<br/>
  <b>Number:</b> ${formData.get("number")}<br/>
  <b>Occuptaion Or School:</b> ${formData.get("occupation")}<br/>
  <b>Days Available:</b> ${formData.get("availability")}<br/>
  <b>Prefered Start Date:</b> ${formattedDate}<br/>
  <b>Skills:</b> ${formData.get("skills")}<br/>
  <b>Prefered Sectors:</b> ${formData.get("sectors")}<br/>
  <b>Can Attend Meetings:</b> ${formData.get("attendance")}<br/>
  <b>Would Like A Certificate:</b> ${formData.get("certificate")}<br/>
  <div>
  <p>&nbsp;</p>
  <b>Note:</b> Resume is attached below
  `;

  const file = formData.get("resume");
  const name = formData.get("name");

  if (!file || !(file instanceof File)) {
    return new Response("No file uploaded", { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  console.log(emailText);
  console.log(file);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_SERVER_USERNAME,
      pass: process.env.SMTP_SERVER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_SERVER_USERNAME,
    to: process.env.SMTP_SERVER_USERNAME,
    subject: `VOLUNTEER APPLICATION - ${
      typeof name === "string" && name.toUpperCase()
    }`,
    text: emailText,
    html: emailHtml,
    attachments: [
      {
        filename: file.name,
        content: buffer,
        contentType: file.type,
      },
    ],
  };

  try {
    const isVerified = await transporter.verify();
  } catch (error) {
    console.error(
      "Something Went Wrong",
      process.env.SMTP_SERVER_USERNAME,
      process.env.SMTP_SERVER_PASSWORD,
      error
    );
    return Response.json(
      {
        message: "Failed to verify email data",
      },
      {
        status: 500,
      }
    );
  }

  try {
    await transporter.sendMail(mailOptions);
    return Response.json({ message: "✅ Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json(
      { message: "❌ Failed to send email." },
      { status: 500 }
    );
  }
}
