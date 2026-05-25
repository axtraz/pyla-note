"use client";

import { ChevronsUpDown, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

export function SidebarDropdownUser() {
    const router = useRouter();
    const { state } = useSidebar();
    const { data: session } = authClient.useSession();

    const isCollapsed = state === "collapsed";
    const userInitial = session?.user.name?.[0].toUpperCase() ?? "U";

    async function handleLogout() {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/");
                    },
                },
            });
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <Avatar className="h-8 w-8 rounded-full ring-2 ring-blue-400/20">
                        <AvatarImage src={session?.user.image ?? ""} alt={session?.user.name ?? ""} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-300 to-blue-500 text-lg font-semibold text-zinc-900">
                            {userInitial}
                        </AvatarFallback>
                    </Avatar>

                    {!isCollapsed && (
                        <>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{session?.user.name}</span>
                                <span className="text-muted-foreground truncate text-xs">{session?.user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </>
                    )}
                </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem onClick={handleLogout}>
                        <span className="text-red-300">Logout</span>
                        <DropdownMenuShortcut>
                            <LogOut className="text-red-300" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href="/settings">
                        <DropdownMenuItem>
                            Settings
                            <DropdownMenuShortcut>
                                <Settings />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
