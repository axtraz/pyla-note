"use client";

import { ArrowUpRight, Clock, FolderOpen, Loader2, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getProjects, deleteProject } from "@/app/actions/projects";
import { CreateProjectDialog } from "@/components/notes/projects/create-project-dialog";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

type ProjectRecord = {
    id: string;
    title: string;
    icon: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
};

function formatDate(date?: string | Date) {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function ProjectsPage() {
    const router = useRouter();
    const [projects, setProjects] = useState<ProjectRecord[]>([]);
    const [search, setSearch] = useState("");
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        getProjects().then(data => setProjects(data));
    }, []);

    const filtered = projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

    async function handleDelete(projectId: string) {
        setDeletingId(projectId);
        try {
            await deleteProject(projectId);
            setProjects(prev => prev.filter(p => p.id !== projectId));
            router.push("/notes/projects");
            toast.success("Project deleted.");
        } catch {
            toast.error("Error deleting project.");
        } finally {
            setDeletingId(null);
            setConfirmDeleteId(null);
        }
    }

    useEffect(() => {
        if (!isPending && !session?.user) {
            router.push("/login");
        }
    }, [isPending, session, router]);

    if (isPending || !session?.user) return null;

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white">
            <div className="mx-auto max-w-5xl px-6 py-16">
                <div className="mb-12 flex items-end justify-between">
                    <div>
                        <p className="mb-3 text-xs tracking-[0.25em] text-white/20 uppercase">Workspace</p>
                        <h1 className="text-[2.5rem] leading-none font-semibold tracking-tight text-white">
                            My projects
                        </h1>
                    </div>
                    <CreateProjectDialog>
                        <Button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90">
                            <Plus size={14} strokeWidth={2.5} />
                            New
                        </Button>
                    </CreateProjectDialog>
                </div>
                <div className="mb-10 flex gap-8 border-b border-white/[0.06] pb-10">
                    <div>
                        <p className="text-2xl font-semibold text-white tabular-nums">{projects.length}</p>
                        <p className="mt-0.5 text-xs text-white/30">Projects</p>
                    </div>
                </div>
                <div className="mb-8">
                    <div className="relative max-w-xs">
                        <Search size={13} className="absolute top-1/2 left-3 -translate-y-1/2 text-white/25" />
                        <Input
                            placeholder="Search…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="h-8 rounded-lg border-white/[0.08] bg-white/[0.04] pl-8 text-sm text-white/80 placeholder:text-white/25 focus-visible:border-white/20 focus-visible:ring-white/10"
                        />
                    </div>
                </div>
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-40 text-center">
                        <FolderOpen size={36} className="mb-4 text-white/10" />
                        <p className="text-sm text-white/25">{search ? "No projects found." : "No projects yet."}</p>
                        {!search && (
                            <CreateProjectDialog>
                                <button className="mt-4 text-xs text-white/30 underline underline-offset-2 transition-colors hover:text-white/50">
                                    Create your first project
                                </button>
                            </CreateProjectDialog>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map(project => {
                            const isHovered = hoveredId === project.id;
                            const isDeleting = deletingId === project.id;
                            return (
                                <div
                                    key={project.id}
                                    className="group relative flex cursor-pointer flex-col justify-between rounded-xl border p-5 transition-all duration-200"
                                    style={{
                                        background: isHovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
                                        borderColor: isHovered ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)",
                                        minHeight: 160,
                                        opacity: isDeleting ? 0.4 : 1,
                                    }}
                                    onMouseEnter={() => setHoveredId(project.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    onClick={() => router.push(`/notes/projects/${project.id}`)}
                                >
                                    <div className="flex items-start justify-between">
                                        <span className="text-xl leading-none">{project.icon}</span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button
                                                    className="-mr-1 rounded-md border-0 !bg-transparent p-1 text-white/40 opacity-0 shadow-none transition-opacity outline-none group-hover:opacity-100 hover:!bg-white/10 hover:text-white/70"
                                                    onClick={e => e.stopPropagation()}
                                                >
                                                    <MoreHorizontal size={14} />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="min-w-36 border-white/10 bg-[#1a1a1a] text-sm text-white/70"
                                            >
                                                <DropdownMenuItem
                                                    className="cursor-pointer gap-2 text-rose-400 hover:bg-white/5 focus:bg-white/5 focus:text-rose-400"
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        setConfirmDeleteId(project.id);
                                                    }}
                                                >
                                                    <Trash2 size={13} /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="mt-3 flex-1">
                                        <h3 className="text-sm leading-snug font-medium text-white/85 transition-colors group-hover:text-white">
                                            {project.title}
                                        </h3>
                                    </div>

                                    <div className="mt-5 flex items-center justify-between">
                                        <span className="flex items-center gap-1 text-[11px] text-white/25">
                                            <Clock size={10} />
                                            {formatDate(project.updatedAt)}
                                        </span>
                                        <ArrowUpRight
                                            size={13}
                                            className="text-white/0 transition-all duration-200 group-hover:text-white/30"
                                            style={{ transform: isHovered ? "translate(1px,-1px)" : "translate(0,0)" }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {filtered.length > 0 && (
                    <p className="mt-8 text-center text-[11px] text-white/15">
                        {filtered.length} project{filtered.length !== 1 ? "s" : ""}
                    </p>
                )}
            </div>
            <Dialog open={!!confirmDeleteId} onOpenChange={() => setConfirmDeleteId(null)}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Delete project?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. All associated notes will be permanently deleted.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setConfirmDeleteId(null)} className="mr-auto">
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            disabled={!!deletingId}
                            onClick={() => confirmDeleteId && handleDelete(confirmDeleteId)}
                        >
                            {deletingId ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
