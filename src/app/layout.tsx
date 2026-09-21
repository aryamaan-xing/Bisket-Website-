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

export const metadata: Metadata = {
  title: {
    default: "Bisket Labs — Electronics, engineered from biomass",
    template: "%s · Bisket Labs",
  },
  description:
    "Bio-based PCB substrates from agricultural biomass — built for real electronics manufacturing. Partner with Bisket Labs.",
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
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
