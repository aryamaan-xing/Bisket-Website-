"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/technology", label: "Our technology" },
  { href: "/team", label: "Our team" },
  { href: "/contact", label: "Contact us" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-beige/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link href="/" className="relative z-10 shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="Bisket Labs"
            width={160}
            height={53}
            className="h-9 w-auto md:h-10"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  active
                    ? "text-forest"
                    : "text-forest/65 hover:text-forest"
                }`}
              >
                {link.label}
                {active ? (
                  <span className="mt-1 block h-0.5 w-full bg-lime" />
                ) : (
                  <span className="mt-1 block h-0.5 w-full bg-transparent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden flex-col items-end text-right text-[11px] leading-tight text-forest/70 lg:flex">
          <a href="mailto:bisket.innovation@gmail.com" className="hover:text-purple">
            bisket.innovation@gmail.com
          </a>
          <a href="tel:+918884888454" className="hover:text-purple">
            +91 88848 88454
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-10 flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-0.5 w-full bg-forest transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`h-0.5 w-full bg-forest transition ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-full bg-forest transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {open ? (
        <div className="border-t border-forest/10 bg-beige px-5 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-lg font-medium ${
                  pathname === link.href ? "text-forest" : "text-forest/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-1 text-sm text-forest/70">
            <a href="mailto:bisket.innovation@gmail.com">bisket.innovation@gmail.com</a>
            <a href="tel:+918884888454">+91 88848 88454</a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
