import { Lora } from "next/font/google";
import SessionWrapper from "@/lib/SessionWrapper";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lora",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${lora.variable} bg-gradient-to-b from-amber-50 to-white`}
      >
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
