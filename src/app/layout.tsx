import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const myFont = localFont({
  src: "../../public/font/AvenirNextLTPro-Regular.otf",
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
      <body className={`${myFont.className}   antialiased`}>{children}</body>
    </html>
  );
}
