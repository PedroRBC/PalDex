import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";
import { SearchProvider } from "@/contexts/SearchContext";
import { TypeProvider } from "@/contexts/TypeContext";
import BodyBackground from "@/components/BodyBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "PalDex - Palworld Encyclopedia",
    template: "PalDex - %s",
  },
  description: "A comprehensive encyclopedia of all Pals in Palworld",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <TypeProvider>
          <SearchProvider>
            <BodyBackground />
            <Header />
            <div className="container mx-auto px-4 py-8">
              {children}
            </div>
          </SearchProvider>
          </TypeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
