import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
});

const DESCRIPTION =
    "Save, organize, and access your favorite links from anywhere. Your personal link wallet, synced across all your devices.";

export const metadata: Metadata = {
    title: {
        default: "Wlinks",
        template: "%s | Wlinks",
    },
    description: DESCRIPTION,
    keywords: [
        "links",
        "bookmarks",
        "link manager",
        "link wallet",
        "save links",
        "organize links",
        "bookmark manager",
    ],
    openGraph: {
        type: "website",
        siteName: "Wlinks",
        title: "Wlinks — Your internet, organized",
        description: DESCRIPTION,
        images: [
            {
                url: "/wlinks-feature.png",
                width: 1024,
                height: 500,
                alt: "Wlinks — Your link wallet. Save and access your favorite links.",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Wlinks — Your internet, organized",
        description: DESCRIPTION,
        images: ["/wlinks-feature.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
        </html>
    );
}
