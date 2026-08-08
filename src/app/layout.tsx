import type { Metadata } from "next";
import { Baloo_2, Comic_Neue } from "next/font/google";
import "./globals.css";

const baloo2 = Baloo_2({
  variable: "--font-baloo",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const comicNeue = Comic_Neue({
  variable: "--font-comic-neue",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SSC Helper",
  description: "SSC Helper App",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${baloo2.variable} ${comicNeue.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background font-body text-foreground">
        {children}
      </body>
    </html>
  );
}
