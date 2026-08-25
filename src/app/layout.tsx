import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jateng Solo Founder Coffee — Coffee shops for people building things",
  description: "Temukan coffee shop terbaik buat kerja, ngoding, meeting, dan membangun bisnis di Barlingmascakeb, Jawa Tengah.",
  keywords: ["coffee shop", "purwokerto", "banyumas", "solo founder", "work", "wifi"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Cloudflare Web Analytics */}
        <script
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "db14af6a91f244aa82a9c2d78c69d585"}'
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
