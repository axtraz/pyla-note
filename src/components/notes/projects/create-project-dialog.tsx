"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Rocket } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createProject } from "@/app/actions/projects";
import { ProjectInput } from "@/components/notes/projects/project-input";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { type Project, projectSchema } from "@/schemas/project";
import { IconPickerDialog } from "./project-icon-picker";

export function CreateProjectDialog({ children }: { children?: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const form = useForm<Project>({
        resolver: zodResolver(projectSchema),
        defaultValues: { name: "", icon: "" },
    });

    const onSubmit = async (data: Project) => {
        setIsPending(true);
        try {
            await createProject(data);
            setOpen(false);
            form.reset();
            toast.success("Project created successfully");
        } catch (error) {
            toast.error("Error creating project");
            console.error("Error creating project:", error);
        } finally {
            setIsPending(false);
        }
    };

    const trigger = children ? (
        <DialogTrigger asChild>{children}</DialogTrigger>
    ) : (
        <SidebarMenuItem>
            <DialogTrigger asChild>
                <SidebarMenuButton className="text-sidebar-foreground/70">
                    <Plus />
                    <span>Create a project</span>
                </SidebarMenuButton>
            </DialogTrigger>
        </SidebarMenuItem>
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {trigger}

            <DialogContent>
                <DialogHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 shadow-sm shadow-amber-500/5">
                        <Rocket size={24} className="text-amber-500" />
                    </div>

                    <DialogTitle className="text-xl">New Project</DialogTitle>
                    <DialogDescription>Launch a new workspace to organize your notes.</DialogDescription>
                </DialogHeader>

                <form id="project-form" onSubmit={form.handleSubmit(onSubmit)} className="py-4">
                    <FieldGroup className="space-y-5">
                        <ProjectInput control={form.control} name="name" label="Project Name" placeholder="Pyla Note" />

                        <Controller
                            control={form.control}
                            name="icon"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className="text-sm font-medium">
                                        Icon
                                    </FieldLabel>
                                    <IconPickerDialog
                                        currentIcon={field.value || "Folder"}
                                        onIconSelect={field.onChange}
                                        projectName={form.watch("name") || "My project"}
                                    />
                                    <FieldDescription>This icon will be displayed in your sidebar.</FieldDescription>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setOpen(false)}
                        disabled={isPending}
                        className="mr-auto"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="project-form"
                        disabled={isPending}
                        className="min-w-[120px] bg-amber-600 text-white hover:bg-amber-700"
                    >
                        {isPending ? "Creating..." : "Create project"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
