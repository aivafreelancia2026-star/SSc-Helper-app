import type { Metadata } from "next";
import { Baloo_2, Comic_Neue } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/assets/brand/ssc-helper-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/brand/ssc-helper-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/assets/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${baloo2.variable} ${comicNeue.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background font-body text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
