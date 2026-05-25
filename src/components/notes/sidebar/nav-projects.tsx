"use client";

import * as LucideIcons from "lucide-react";
import { Folder, type LucideIcon, MoreHorizontal, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteProject } from "@/app/actions/projects";
import { CreateProjectDialog } from "@/components/notes/projects/create-project-dialog";
import { Collapsible } from "@/components/ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

export function NavProjects({
    projects,
}: {
    projects: {
        id: string;
        name: string;
        url: string;
        icon: string;
        isActive?: boolean;
    }[];
}) {
    const router = useRouter();
    const { isMobile } = useSidebar();

    const handleDelete = async (projectId: string) => {
        try {
            await deleteProject(projectId);
            router.push("/notes/projects");
            toast.success("Project deleted successfully");
        } catch (error) {
            toast.error("Error deleting project");
            console.error(error);
        }
    };
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
                {projects.map(item => {
                    const IconsRecord = LucideIcons as unknown as Record<string, LucideIcon>;
                    const IconComponent = IconsRecord[item.icon];

                    return (
                        <Collapsible key={item.id} asChild defaultOpen={item.isActive} className="group/collapsible">
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip={item.name}>
                                    <a href={item.url}>
                                        {IconComponent ? <IconComponent /> : <Folder />}
                                        <span>{item.name}</span>
                                    </a>
                                </SidebarMenuButton>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuAction showOnHover>
                                            <MoreHorizontal />
                                            <span className="sr-only">More</span>
                                        </SidebarMenuAction>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-48 rounded-lg"
                                        side={isMobile ? "bottom" : "right"}
                                        align={isMobile ? "end" : "start"}
                                    >
                                        <DropdownMenuItem onClick={async () => await handleDelete(item.id)}>
                                            <Trash2 className="text-red-300" />

                                            <span className="text-red-300">Delete Project</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        </Collapsible>
                    );
                })}
                <CreateProjectDialog />
            </SidebarMenu>
        </SidebarGroup>
    );
}
