import dotenv from "dotenv";
dotenv.config();

import { redisSub } from "./lib/redis.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.GMAIL_HOST,
  port: parseInt(process.env.GMAIL_PORT || "587", 10),
  secure: process.env.GMAIL_SECURE === "true",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

redisSub.subscribe("email_channel", (err) => {
  if (err) console.error("Redis subscribe failed:", err);
  else console.log("Subscribed to email_channel");
});

redisSub.on("message", async (_channel, message) => {
  try {
    const { to, subject, html, text } = JSON.parse(message);

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      html, // will be undefined if type is "text"
      text, // will be undefined if type is "html"
    });

    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
});
