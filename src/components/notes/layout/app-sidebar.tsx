"use client";

import type * as React from "react";
import PylaNoteLogo from "@/../public/images/pyla-note-logo.png";
import { NavBrand } from "@/components/notes/sidebar/nav-brand";
import { NavProjects } from "@/components/notes/sidebar/nav-projects";
import { NavUser } from "@/components/notes/sidebar/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

interface DbProject {
    id: string;
    title: string;
    icon: string | null;
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    projects: DbProject[];
}

export function AppSidebar({ projects, ...props }: AppSidebarProps) {
    const formattedProjects = projects.map(project => ({
        id: project.id,
        name: project.title,
        url: `/notes/projects/${project.id}`,
        icon: project.icon || "📁",
    }));

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <NavBrand name="Pyla Note" logo={PylaNoteLogo} />
            </SidebarHeader>
            <SidebarContent>
                <NavProjects projects={formattedProjects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
