import { create } from "zustand";
import { createNote, updateNote as updateNoteAction, deleteNote } from "@/app/actions/notes";
import type { Note } from "@/schemas/notes";

interface NotesStore {
    notes: Note[];
    setNotes: (notes: NotesStore["notes"]) => void;
    addNote: (projectId: string) => void;
    removeNote: (id: string) => void;
    updateNote: (id: string, updates: { content?: string; x?: number; y?: number }) => Promise<void>;
}

export const useNotes = create<NotesStore>((set, get) => ({
    notes: [],
    setNotes: notes => set({ notes }),
    addNote: async (projectId: string) => {
        const newNote: Note = {
            id: crypto.randomUUID(),
            title: "Note",
            content: "TEXT",
            x: typeof window !== "undefined" ? Math.round(window.innerWidth / 2 - 60) : 100,
            y: typeof window !== "undefined" ? Math.round(window.innerHeight / 2 - 12) : 100,
            userId: "",
            projectId: projectId,
        };

        set(s => ({ notes: [...s.notes, newNote] }));

        try {
            await createNote(newNote);
        } catch (error) {
            console.error("Failed to save new note on server:", error);
            set(s => ({ notes: s.notes.filter(n => n.id !== newNote.id) }));
        }
    },
    removeNote: async id => {
        const previousNotes = get().notes;

        set(s => ({ notes: s.notes.filter(n => n.id !== id) }));

        try {
            await deleteNote(id);
        } catch (error) {
            console.error("Failed to delete note on server, reverting...", error);
            set({ notes: previousNotes });
        }
    },
    updateNote: async (id, updates) => {
        const previousNotes = get().notes;
        set(s => ({
            notes: s.notes.map(n => (n.id === id ? { ...n, ...updates } : n)),
        }));

        try {
            await updateNoteAction(id, updates);
        } catch (error) {
            console.error("Failed to update note on server, reverting...", error);
            set({ notes: previousNotes });
        }
    },
}));
