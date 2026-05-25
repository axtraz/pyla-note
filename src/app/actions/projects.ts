"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Project } from "@/schemas/project";

export async function createProject(data: Project) {
    const result = await auth.api.getSession({
        headers: await headers(),
    });

    if (!result) {
        throw new Error("You must be logged in to create a project.");
    }

    const newProject = await prisma.project.create({
        data: {
            title: data.name,
            icon: data.icon || undefined,
            userId: result.user.id,
        },
    });

    revalidatePath("/notes");

    return newProject;
}

export async function getProjects() {
    const result = await auth.api.getSession({
        headers: await headers(),
    });

    if (!result) {
        throw new Error("Unauthorized");
    }

    const projects = await prisma.project.findMany({
        where: {
            userId: result.user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return projects;
}

export async function getProjectById(projectId: string) {
    const result = await auth.api.getSession({
        headers: await headers(),
    });

    if (!result) {
        throw new Error("Unauthorized");
    }

    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            userId: result.user.id,
        },
    });

    if (!project) {
        throw new Error("Project not found or not authorized.");
    }

    return project;
}

export async function deleteProject(projectId: string) {
    const result = await auth.api.getSession({
        headers: await headers(),
    });

    if (!result) {
        throw new Error("You must be logged in to delete a project.");
    }

    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            userId: result.user.id,
        },
    });

    if (!project) {
        throw new Error("Project not found or not authorized.");
    }

    await prisma.project.delete({
        where: {
            id: projectId,
        },
    });

    revalidatePath("/notes");

    return null;
}
