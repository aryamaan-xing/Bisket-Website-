import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bisketlabs.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bisket Labs — Electronics, engineered from biomass",
    template: "%s · Bisket Labs",
  },
  description:
    "Bio-based PCB substrates from agricultural biomass — built for real electronics manufacturing. Partner with Bisket Labs.",
  keywords: [
    "bio-based PCB substrate",
    "sustainable PCB laminate",
    "agricultural biomass electronics",
    "FR-4 alternative",
    "Bisket Labs",
  ],
  openGraph: {
    title: "Bisket Labs — Electronics, engineered from biomass",
    description:
      "Bio-based PCB substrates from agricultural biomass — built for real electronics manufacturing.",
    type: "website",
    images: [{ url: "/images/hero-biomass-pcb.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bisket Labs — Electronics, engineered from biomass",
    description:
      "Bio-based PCB substrates from agricultural biomass — built for real electronics manufacturing.",
    images: ["/images/hero-biomass-pcb.png"],
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${raleway.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-beige text-forest">
        <a
          href="#main"
          className="absolute left-4 top-4 z-[100] -translate-y-[200%] rounded-sm bg-lime px-4 py-2 text-sm font-semibold text-ink transition focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
