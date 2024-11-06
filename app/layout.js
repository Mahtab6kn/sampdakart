import { Inter } from "next/font/google";
import { Aclonica } from "next/font/google";

import "./globals.css";

import { Toaster } from "sonner";

import AuthProvider from "@/provider/AuthProvider";
import ReduxProvider from "@/provider/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });
const aclonica = Aclonica({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-aclonica",
});

export const metadata = {
  title: "e-commerce",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <ReduxProvider>
          <body className={`${inter.className} ${aclonica.variable}`}>
            <Toaster position="bottom-right" richColors />
            {children}
          </body>
        </ReduxProvider>
      </AuthProvider>
    </html>
  );
}
