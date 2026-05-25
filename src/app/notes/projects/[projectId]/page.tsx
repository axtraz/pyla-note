import { getNotes } from "@/app/actions/notes";
import { getProjectById } from "@/app/actions/projects";
import { NotesInitializer } from "@/components/notes/initializer";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function ProjectsPage({ params }: { params: Promise<{ projectId: string }> }) {
    const { projectId } = await params;
    const [project, dbNotes] = await Promise.all([getProjectById(projectId), getNotes(projectId)]);

    const initialNotes = dbNotes.map(note => ({
        id: note.id,
        title: note.title,
        content: note.content,
        x: note.x,
        y: note.y,
        userId: note.userId,
        projectId: note.projectId ?? projectId,
    }));

    return (
        <div className="flex min-h-screen w-full flex-col">
            <NotesInitializer notes={initialNotes} />

            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/notes/projects">Projects</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{project.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
        </div>
    );
}
