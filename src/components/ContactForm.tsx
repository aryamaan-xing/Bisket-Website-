"use client";

import { FormEvent, useState } from "react";

const roles = [
  "Investor",
  "OEM",
  "PCB manufacturer",
  "Research / ecosystem",
  "Other",
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-forest/15 bg-surface px-8 py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-deep">
          Sent
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-forest">Thank you.</h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-forest/70">
          We&apos;ll follow up soon and share the right next materials privately.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-forest/15 bg-surface px-6 py-8 md:px-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Organisation" name="organisation" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
      </div>

      <label className="mt-5 block">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-forest/60">
          I am
        </span>
        <select
          name="role"
          required
          defaultValue=""
          className="mt-2 w-full border border-forest/15 bg-beige px-3 py-3 text-sm text-forest outline-none focus:border-purple"
        >
          <option value="" disabled>
            Select…
          </option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-5 block">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-forest/60">
          Message
        </span>
        <textarea
          name="message"
          required
          rows={4}
          className="mt-2 w-full resize-y border border-forest/15 bg-beige px-3 py-3 text-sm text-forest outline-none focus:border-purple"
          placeholder="How would you like to work with Bisket?"
        />
      </label>

      {status === "error" ? (
        <p className="mt-4 text-sm text-purple">
          Something went wrong. Email us directly at bisket.innovation@gmail.com.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex items-center justify-center bg-lime px-6 py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-lime-deep disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Start a conversation"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-forest/60">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border border-forest/15 bg-beige px-3 py-3 text-sm text-forest outline-none focus:border-purple"
      />
    </label>
  );
}
