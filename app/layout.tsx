import type { Metadata } from "next";
import "./globals.css";
import { Urbanist } from "next/font/google";
import { cn } from "@/lib/utils";
import { CustomCursor } from "@/components/CustomCursor";
import { ClientOnly } from "@/components/ClientOnly";
import { MobileCTABar } from "@/components/MobileCTABar";

const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-urbanist", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ajumiai.com"),
  title: "Ajumi AI — Digital Marketing Agency",
  description:
    "Ajumi AI is a full-service digital marketing studio blending SEO, paid media, social and content — engineered for measurable growth, sculpted for taste.",
  icons: {
    icon: "/images/ajumi-logo.png",
    shortcut: "/images/ajumi-logo.png",
    apple: "/images/ajumi-logo.png",
  },
  openGraph: {
    title: "Ajumi AI — Digital Marketing Agency",
    description:
      "Premium digital marketing studio helping ambitious brands compound growth online.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "font-sans", urbanist.variable)} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#050505] text-white antialiased pb-[4.5rem] md:pb-0" suppressHydrationWarning>
        <ClientOnly>
          <CustomCursor />
        </ClientOnly>
        {children}
        <MobileCTABar />
      </body>
    </html>
  );
}
