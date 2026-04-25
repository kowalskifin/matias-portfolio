import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matias Korpisalo — Senior Product Manager",
  description:
    "Portfolio of Matias Korpisalo, Senior PM with 6+ years in B2B SaaS, fintech, and insurance. Open to European relocation.",
  openGraph: {
    title: "Matias Korpisalo — Senior PM",
    description:
      "Portfolio of Matias Korpisalo, Senior PM with 6+ years in B2B SaaS, fintech, and insurance.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
