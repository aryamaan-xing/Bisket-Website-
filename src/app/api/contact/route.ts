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
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const { name, organisation, email, role, message } = body;
  if (!name || !organisation || !email || !role || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const payload = {
    name,
    organisation,
    email,
    phone: body.phone ?? "",
    role,
    message,
    at: new Date().toISOString(),
  };

  console.info("[bisket-contact]", payload);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[bisket-contact] RESEND_API_KEY is not configured");
    return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 503 });
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "bisket.innovation@gmail.com";
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Bisket Labs <onboarding@resend.dev>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Bisket enquiry — ${role}: ${name}`,
        text: [
          `Name: ${name}`,
          `Organisation: ${organisation}`,
          `Email: ${email}`,
          `Phone: ${body.phone || "—"}`,
          `Role: ${role}`,
          "",
          message,
        ].join("\n"),
      }),
    });

    const data = (await res.json().catch(() => ({}))) as {
      id?: string;
      message?: string;
      name?: string;
    };

    if (!res.ok) {
      console.error("[bisket-contact] resend error", res.status, data);
      return NextResponse.json(
        { ok: false, error: "email_failed", detail: data.message ?? data.name },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, id: data.id });
  } catch (err) {
    console.error("[bisket-contact] resend failed", err);
    return NextResponse.json({ ok: false, error: "email_failed" }, { status: 502 });
  }
}
