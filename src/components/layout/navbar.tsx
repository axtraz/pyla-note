"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownUser } from "@/components/ui/dropdown-user";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/notes/projects" },
    { label: "Settings", href: "/settings" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const { data: session } = authClient.useSession();

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-transparent">
            <div className="mx-auto grid h-16 max-w-7xl grid-cols-3 items-center px-6">
                <div className="flex justify-start">
                    <Link href="/" className="shrink-0 text-[15px] font-semibold tracking-tight text-white">
                        PylaNote
                    </Link>
                </div>

                <div className="flex justify-center">
                    <ul className="hidden items-center gap-2 md:flex">
                        {navLinks.map(link => {
                            const isActive = pathname === link.href;
                            return (
                                <li key={link.label}>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        asChild
                                        className={cn(
                                            "rounded-full text-sm font-normal transition-colors h-8 px-4",
                                            isActive
                                                ? "text-white font-semibold bg-white/5"
                                                : "text-gray-400 hover:text-white hover:bg-white/5",
                                        )}
                                    >
                                        <Link href={link.href}>{link.label}</Link>
                                    </Button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="flex items-center justify-end">
                    <div className="hidden md:block">
                        {session?.user ? (
                            <DropdownUser />
                        ) : (
                            <Button
                                asChild
                                className="h-9 rounded-full bg-blue-600 px-6 text-sm font-medium text-white hover:bg-blue-500"
                            >
                                <Link href="/login">Login</Link>
                            </Button>
                        )}
                    </div>

                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:bg-white/5 hover:text-white md:hidden"
                                aria-label="Toggle menu"
                            >
                                {open ? <X size={20} /> : <Menu size={20} />}
                            </Button>
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="flex w-64 flex-col border-l border-white/5 bg-[#0a0f1e] p-1 text-white"
                        >
                            <SheetHeader className="text-left">
                                <SheetTitle className="text-white">PylaNote</SheetTitle>
                                <SheetDescription className="sr-only">Navigation Menu</SheetDescription>
                            </SheetHeader>

                            <div className="mt-8 flex flex-1 flex-col gap-2">
                                {navLinks.map(link => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Button
                                            key={link.label}
                                            variant="ghost"
                                            asChild
                                            onClick={() => setOpen(false)}
                                            className={cn(
                                                "justify-start rounded-lg text-sm font-normal h-10",
                                                isActive
                                                    ? "text-white font-semibold bg-white/5"
                                                    : "text-gray-400 hover:text-white hover:bg-white/5",
                                            )}
                                        >
                                            <Link href={link.href}>{link.label}</Link>
                                        </Button>
                                    );
                                })}
                            </div>

                            <SheetFooter className="mt-auto flex flex-col items-stretch gap-4 border-t border-white/5 pt-6">
                                {session ? (
                                    <div className="flex flex-col gap-1">
                                        <span className="truncate text-sm font-medium text-white">
                                            {session.user.name}
                                        </span>
                                        <span className="truncate text-xs text-gray-500">{session.user.email}</span>
                                    </div>
                                ) : (
                                    <Button
                                        asChild
                                        onClick={() => setOpen(false)}
                                        className="w-full rounded-full bg-blue-600 text-sm font-medium text-white hover:bg-blue-500"
                                    >
                                        <Link href="/login">Login</Link>
                                    </Button>
                                )}

                                <SheetClose asChild>
                                    <Button variant="destructive">Close</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
