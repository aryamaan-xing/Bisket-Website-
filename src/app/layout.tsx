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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bisket-labs-website.vercel.app";

const title = "Bisket Labs — Electronics, engineered from biomass";
const description =
  "Bio-based PCB substrates from agricultural biomass — built for real electronics manufacturing. Partner with Bisket Labs.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · Bisket Labs",
  },
  description,
  applicationName: "Bisket Labs",
  keywords: [
    "bio-based PCB substrate",
    "sustainable PCB laminate",
    "agricultural biomass electronics",
    "FR-4 alternative",
    "Bisket Labs",
  ],
  icons: {
    icon: [
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/icon.png"],
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Bisket Labs",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Bisket Labs — Electronics, engineered from biomass",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
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
