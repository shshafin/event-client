import "@/styles/globals.css";
import { Viewport } from "next";
import clsx from "clsx";

import { fontSans } from "@/config/font";
import { Providers } from "@/lib/provider";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <Providers>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
            {children}
          </GoogleOAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
