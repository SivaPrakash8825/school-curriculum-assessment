import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const myFont = localFont({
  src: "../../public/fonts/Avenir Next LT W02 Regular.woff",
});

export const metadata: Metadata = {
  title: "School Curriculum Assessment",
  description:
    "A web application for managing and assessing school curriculum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={myFont.className}>{children}</body>
    </html>
  );
}
