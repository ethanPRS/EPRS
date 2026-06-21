"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "All fields are required." };
  }

  try {
    const data = await resend.emails.send({
      from: "EPRS Website <onboarding@resend.dev>", // Replace with your verified domain later (e.g., contact@eprs.com)
      to: process.env.CONTACT_EMAIL || "ethan@example.com", // This will be the email where you receive messages
      subject: `EPRS — Website Contact from ${name}`,
      replyTo: email,
      text: `EPRS — New message from your website\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (data.error) {
      return { error: data.error.message };
    }

    return { success: true };
  } catch (error) {
    return { error: "Something went wrong. Please try again later." };
  }
}
