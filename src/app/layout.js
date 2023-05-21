import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI poster",
  description: "Generate your AI poster",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" class="h-full bg-white">
      <body className={`h-full ${inter.className}`}>{children}</body>
    </html>
  );
}
