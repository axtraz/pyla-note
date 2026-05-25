import { getProjects } from "@/app/actions/projects";
import { AppSidebar } from "@/components/notes/layout/app-sidebar";
import { NotesBottomNavbar } from "@/components/notes/layout/bottom-navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function NotesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const projects = await getProjects();

    return (
        <SidebarProvider>
            <AppSidebar projects={projects} />
            <SidebarInset>
                {children}
                <NotesBottomNavbar />
            </SidebarInset>
        </SidebarProvider>
    );
}
