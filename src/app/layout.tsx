import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import ClientLayout from "./provider/ClientLayout";

const helveticaNowDisplay = localFont({
  src: [
    {
      path: "../assets/fonts/helvetica-now-display/HelveticaNowDisplay-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../assets/fonts/helvetica-now-display/HelveticaNowDisplay-BlackIta.woff2",
      weight: "900",
      style: "italic",
    },
    {
      path: "../assets/fonts/helvetica-now-display/HelveticaNowDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/helvetica-now-display/HelveticaNowDisplay-BoldIta.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../assets/fonts/helvetica-now-display/HelveticaNowDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/helvetica-now-display/HelveticaNowDisplay-MedIta.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../assets/fonts/helvetica-now-display/HelveticaNowDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/helvetica-now-display/HelveticaNowDisplay-RegIta.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/helvetica-now-display/HelveticaNowDisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/helvetica-now-display/HelveticaNowDisplay-LightIta.woff2",
      weight: "300",
      style: "italic",
    },
  ],
  variable: "--font-helvetica-now-display",
});

const violetSans = localFont({
  src: "../assets/fonts/violet-sans/VioletSans-Regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-violet-sans",
});

const recoleta = localFont({
  src: "../assets/fonts/recoleta/Recoleta-RegularDEMO.otf",
  weight: "400",
  style: "normal",
  variable: "--font-recoleta",
});

export const metadata: Metadata = {
  title: "Spacestars",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${helveticaNowDisplay.variable} ${violetSans.variable} ${recoleta.variable} antialiased relative bg-[#f6f6f6]`}
      >
        <ClientLayout>
          {children}
          <Navbar />
        </ClientLayout>
      </body>
    </html>
  );
}
