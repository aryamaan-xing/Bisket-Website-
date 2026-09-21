import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const styles = {
  primary:
    "bg-lime text-ink hover:bg-lime-deep shadow-[0_0_0_1px_color-mix(in_srgb,var(--ink)_8%,transparent)]",
  secondary:
    "bg-transparent text-beige border border-beige/40 hover:border-lime hover:text-lime",
  ghost:
    "bg-transparent text-forest border border-forest/20 hover:border-purple hover:text-purple",
};

export function ButtonLink({ href, children, variant = "primary", className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-6 py-3 text-sm font-semibold tracking-wide transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
