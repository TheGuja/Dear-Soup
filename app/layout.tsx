import type { Metadata } from "next";
import '@/app/ui/global.css'
import { cedarville_cursive } from "./ui/fonts";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Dear Soup",
  description: "For Soup",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="w-full h-full">
      <body className={`w-full h-full ${cedarville_cursive.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
