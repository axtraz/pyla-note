"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Note } from "@/schemas/notes";

export async function createNote(data: Note) {
    const result = await auth.api.getSession({
        headers: await headers(),
    });

    if (!result) {
        throw new Error("You must be logged in to create a note.");
    }

    try {
        const newNote = await prisma.note.create({
            data: {
                id: data.id,
                content: data.content,
                x: data.x,
                y: data.y,
                title: data.title || "Note",
                userId: result.user.id,
                projectId: data.projectId,
            },
        });

        revalidatePath("/notes", "layout");
        return newNote;
    } catch (error) {
        console.error("Error Prisma create:", error);
        throw error;
    }
}

export async function getNotes(projectId?: string) {
    const result = await auth.api.getSession({
        headers: await headers(),
    });

    if (!result) {
        throw new Error("You must be logged in to view notes.");
    }

    try {
        const notes = await prisma.note.findMany({
            where: {
                userId: result.user.id,
                ...(projectId ? { projectId } : {}),
            },
        });

        return notes;
    } catch (error) {
        console.error("Error while getting notes:", error);
        throw error;
    }
}

export async function updateNote(noteId: string, data: { content?: string; x?: number; y?: number }) {
    const result = await auth.api.getSession({
        headers: await headers(),
    });

    if (!result) {
        throw new Error("You must be logged in to update a note.");
    }

    try {
        const updatedNote = await prisma.note.update({
            where: {
                userId: result.user.id,
                id: noteId,
            },
            data: {
                ...(data.content !== undefined ? { content: data.content } : {}),
                ...(data.x !== undefined ? { x: data.x } : {}),
                ...(data.y !== undefined ? { y: data.y } : {}),
            },
        });

        revalidatePath("/notes", "layout");
        return updatedNote;
    } catch (error) {
        console.error("Error while updating note:", error);
        throw error;
    }
}

export async function deleteNote(noteId: string) {
    const result = await auth.api.getSession({
        headers: await headers(),
    });

    if (!result) {
        throw new Error("You must be logged in to update a note.");
    }

    const note = await prisma.note.findFirst({
        where: {
            userId: result.user.id,
            id: noteId,
        },
    });

    if (!note) {
        throw new Error("Note not found or you don't have permission to delete it.");
    }

    try {
        await prisma.note.delete({
            where: {
                id: noteId,
            },
        });

        revalidatePath("/notes", "layout");
    } catch (error) {
        console.error("Error while deleting note:", error);
        throw error;
    }
}
