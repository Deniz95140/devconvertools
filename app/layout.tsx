import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://devconvertools.com"),
  title: {
    default: "DevConverTools",
    template: "%s | DevConverTools"
  },
  description: "Fast and minimal converters for developers.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    title: "DevConverTools",
    description: "Fast and minimal converters for developers.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const analyticsToken = process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN;

  return (
    <html lang="en">
      <head>
        {analyticsToken ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token":"${analyticsToken}"}`}
          />
        ) : null}
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
