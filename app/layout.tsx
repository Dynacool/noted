import type { Metadata } from "next";
import "./globals.css";
import "./noted.css";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  title: "Noted | Learn, practice, improve",
  description:
    "Detailed course notes, original practice questions, and thoughtful rubric feedback for high school learners.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
