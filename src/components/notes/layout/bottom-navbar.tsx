"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { NotebookPen, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { type Note, notesSchema } from "@/schemas/notes";
import { useNotes } from "@/stores/notes";
import { DraggableNote } from "../draggable-note";

export function NotesBottomNavbar() {
    const { notes, setNotes, addNote, removeNote } = useNotes();
    const { projectId } = useParams();

    const { control, watch, reset } = useForm({
        resolver: zodResolver(notesSchema),
        defaultValues: { notes },
    });

    const { fields, remove } = useFieldArray({
        control,
        name: "notes",
        keyName: "key",
    });

    useEffect(() => {
        reset({ notes });
    }, [notes.length, reset]);

    useEffect(() => {
        const subscription = watch(values => {
            if (values.notes) {
                const updated = values.notes as Note[];
                const isSame =
                    JSON.stringify(updated.map(n => n?.content)) === JSON.stringify(notes.map(n => n?.content));
                if (!isSame) {
                    setNotes(notes.map((n, i) => ({ ...n, content: updated[i]?.content || n.content })));
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, setNotes, notes]);

    function handleRemove(index: number, id: string) {
        remove(index);
        removeNote(id);
    }

    function handleAddNote() {
        if (projectId) {
            addNote(projectId as string);
        } else {
            console.warn("Cannot add note: No project ID found in the current path.");
        }
    }

    return (
        <>
            <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
                <AnimatePresence>
                    {fields.map((field, index) => {
                        const currentNote = notes.find(n => n.id === field.id);
                        if (!currentNote) return null;

                        return (
                            <DraggableNote
                                key={field.key}
                                note={currentNote}
                                control={control}
                                name={`notes.${index}.content`}
                                onRemove={() => handleRemove(index, currentNote.id)}
                            />
                        );
                    })}
                </AnimatePresence>
            </div>

            <nav className="bg-sidebar fixed right-0 bottom-0 left-0 border-t border-white/5">
                <div className="flex h-6 w-full items-center justify-end">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="relative size-6 shrink-0 rounded-none text-gray-400 hover:bg-white/5 hover:text-white"
                    >
                        {notes.length > 0 && (
                            <span className="absolute top-0 right-0 flex size-3 items-center justify-center rounded-full bg-white/20 text-[8px] leading-none">
                                {notes.length}
                            </span>
                        )}
                        <NotebookPen />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        disabled={!projectId}
                        onClick={handleAddNote}
                        className="size-6 shrink-0 rounded-none text-gray-400 hover:bg-white/5 hover:text-white"
                    >
                        <Plus />
                    </Button>
                </div>
            </nav>
        </>
    );
}
