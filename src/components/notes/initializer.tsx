"use client";

import { useEffect, useRef } from "react";
import type { Note } from "@/schemas/notes";
import { useNotes } from "@/stores/notes";

export function NotesInitializer({ notes }: { notes: Note[] }) {
    const initialized = useRef(false);
    const setNotes = useNotes(state => state.setNotes);

    if (!initialized.current) {
        queueMicrotask(() => {
            setNotes(notes);
        });
        initialized.current = true;
    }

    useEffect(() => {
        setNotes(notes);
    }, [notes, setNotes]);

    return null;
}
