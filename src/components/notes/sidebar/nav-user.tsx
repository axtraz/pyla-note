"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SidebarDropdownUser } from "@/components/notes/sidebar/dropdown-user";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

export function NavUser() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        }
    }, [isPending, session, router]);

    if (isPending || !session?.user) return null;

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarDropdownUser />
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
