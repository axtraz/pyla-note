import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://pyla-note.vercel.app"),
    title: "Pyla Note",
    description: "Connect your notes. Build your knowledge.",
    keywords: [
        "note-taking app",
        "minimalist notes",
        "markdown editor",
        "clean editor",
        "web notepad",
        "developer notes",
        "fast notes",
        "distraction-free writing",
    ],
    twitter: {
        card: "summary_large_image",
    },
    openGraph: {
        title: "Pyla Note",
        description: "The best note-taking app.",
        url: "https://pyla-note.vercel.app",
        siteName: "Pyla Note",
        images: [
            {
                url: "/images/banner.png",
                alt: "Pyla Note Open Graph Image",
            },
        ],
        locale: "en-US",
        type: "website",
    },
};

export const viewport: Viewport = { themeColor: "#155dfc" };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(inter.className, "dark")}>
                {children}
                <Toaster richColors />
            </body>
        </html>
    );
}
