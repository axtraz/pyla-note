import Navbar from "@/components/layout/navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
        </div>
    );
}
