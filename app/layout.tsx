import type {
  Metadata,
  Viewport,
} from "next";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { Toaster } from "react-hot-toast";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

const siteConfig = {
  name: "Universal Admin",

  description:
    "Modern universal admin platform for managing websites, analytics, content, deployments, media and infrastructure.",

  url: "https://admin.swaleh.app",

  ogImage: "/og-image.png",

  creator: "Developer Swaleh",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    siteConfig.url
  ),

  title: {
    default: siteConfig.name,

    template: `%s | ${siteConfig.name}`,
  },

  description:
    siteConfig.description,

  keywords: [
    "Admin Dashboard",
    "Universal CMS",
    "Website Management",
    "Vercel Style Dashboard",
    "Supabase Admin",
    "Modern Dashboard",
    "Next.js Admin",
    "TypeScript Dashboard",
  ],

  authors: [
    {
      name: siteConfig.creator,
    },
  ],

  creator: siteConfig.creator,

  publisher: siteConfig.creator,

  category: "technology",

  applicationName:
    siteConfig.name,

  referrer:
    "origin-when-cross-origin",

  robots: {
    index: true,

    follow: true,

    nocache: false,

    googleBot: {
      index: true,

      follow: true,

      noimageindex: false,

      "max-video-preview": -1,

      "max-image-preview":
        "large",

      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: siteConfig.url,
  },

  openGraph: {
    type: "website",

    locale: "en_US",

    url: siteConfig.url,

    siteName: siteConfig.name,

    title: siteConfig.name,

    description:
      siteConfig.description,

    images: [
      {
        url: siteConfig.ogImage,

        width: 1200,

        height: 630,

        alt: siteConfig.name,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: siteConfig.name,

    description:
      siteConfig.description,

    creator: "@developerswaleh",

    images: [
      siteConfig.ogImage,
    ],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
    ],

    shortcut: [
      {
        url: "/favicon.ico",
      },
    ],

    apple: [
      {
        url:
          "/apple-touch-icon.png",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",

  initialScale: 1,

  maximumScale: 1,

  themeColor: "#0a0a0a",

  colorScheme: "dark",
};

const jsonLd = {
  "@context":
    "https://schema.org",

  "@type": "WebSite",

  name: siteConfig.name,

  url: siteConfig.url,

  description:
    siteConfig.description,

  applicationCategory:
    "BusinessApplication",

  operatingSystem: "Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(jsonLd),
          }}
        />

        {children}

        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={12}
          containerStyle={{
            top: 24,
            right: 24,
          }}
          toastOptions={{
            duration: 4000,

            style: {
              background: "#111111",

              color: "#fafafa",

              border:
                "1px solid #1f1f1f",

              borderRadius: "16px",

              padding: "14px 16px",

              fontSize: "14px",

              boxShadow:
                "0 10px 30px rgba(0,0,0,0.45)",
            },

            success: {
              iconTheme: {
                primary: "#22c55e",

                secondary:
                  "#ffffff",
              },
            },

            error: {
              iconTheme: {
                primary: "#ef4444",

                secondary:
                  "#ffffff",
              },
            },
          }}
        />

        <Analytics />

        <SpeedInsights />
      </body>
    </html>
  );
}
