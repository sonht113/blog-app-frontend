import type { Metadata } from "next";

import { Poppins } from "next/font/google";

import Footer from "@components/footer";
import Header from "@components/header";
import Providers from "@providers";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "My Blog",
  description: "A modern blog application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased bg-gray-50`}>
        <Providers>
          <div className="w-3/4 mx-auto">
            <Header />
            <div className="mt-[70px]">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
