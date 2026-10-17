import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
});
const source = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Sony Anderson · Desenvolvedor Web & DevOps",
  description:
    "Portfólio de Sony Anderson: desenvolvedor web (Next.js, React, TypeScript) com experiência em suporte, infraestrutura e DevOps em Macapá, AP.",
  openGraph: {
    title: "Sony Anderson · Desenvolvedor Web & DevOps",
    description: "Next.js · React · TypeScript · PostgreSQL · Docker · Zabbix",
    images: ["/sony.jpg"],
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#06090c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} ${source.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
