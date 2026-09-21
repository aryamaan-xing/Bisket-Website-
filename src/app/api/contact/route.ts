import { NextResponse } from "next/server";

type Body = {
  name?: string;
  organisation?: string;
  email?: string;
  phone?: string;
  role?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { name, organisation, email, role, message } = body;
  if (!name || !organisation || !email || !role || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  // Persist to server logs for now; wire Resend when RESEND_API_KEY is available.
  console.info("[bisket-contact]", {
    name,
    organisation,
    email,
    phone: body.phone ?? "",
    role,
    message,
    at: new Date().toISOString(),
  });

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "Bisket Labs <onboarding@resend.dev>",
          to: [process.env.CONTACT_TO_EMAIL ?? "bisket.innovation@gmail.com"],
          reply_to: email,
          subject: `Bisket enquiry — ${role}: ${name}`,
          text: [
            `Name: ${name}`,
            `Organisation: ${organisation}`,
            `Email: ${email}`,
            `Phone: ${body.phone ?? "—"}`,
            `Role: ${role}`,
            "",
            message,
          ].join("\n"),
        }),
      });
    } catch (err) {
      console.error("[bisket-contact] resend failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
