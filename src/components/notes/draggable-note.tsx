"use client";

import { X, Edit2 } from "lucide-react";
import { motion } from "motion/react";
import { useState, useRef, useEffect, useCallback } from "react";
import { type Control, Controller, type Path } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { updateNote } from "@/app/actions/notes";
import type { Notes, Note } from "@/schemas/notes";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export function DraggableNote({
    note,
    control,
    name,
    onRemove,
}: {
    note: Note;
    control: Control<Notes>;
    name: Path<Notes>;
    onRemove: () => void;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const debouncedUpdate = useCallback((id: string, text: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            updateNote(id, { content: text });
        }, 1000);
    }, []);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, onChange: (val: string) => void) => {
        const newValue = e.target.value;

        onChange(newValue);
        debouncedUpdate(note.id, newValue);
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [isEditing]);

    return (
        <motion.div
            drag={!isEditing}
            dragMomentum={false}
            dragConstraints={{
                top: 0,
                left: 0,
                right: typeof window !== "undefined" ? window.innerWidth - 160 : 0,
                bottom: typeof window !== "undefined" ? window.innerHeight - 100 : 0,
            }}
            style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                x: note.x,
                y: note.y,
            }}
            onDragEnd={(_, info) => {
                const newX = Math.round(note.x + info.offset.x);
                const newY = Math.round(note.y + info.offset.y);
                updateNote(note.id, { x: newX, y: newY });
            }}
            className="group pointer-events-auto absolute w-max max-w-[calc(100vw-40px)] min-w-[140px] cursor-grab touch-none select-none active:cursor-grabbing"
        >
            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange, ref: hookFormRef } }) => (
                    <div className="hover:bg-accent/20 flex w-full items-center justify-between gap-1.5 rounded-md pl-3 shadow-sm transition-colors duration-200">
                        <div className="min-w-0 flex-1">
                            {isEditing ? (
                                <Textarea
                                    id={note.id}
                                    ref={el => {
                                        textareaRef.current = el;
                                        hookFormRef(el);
                                    }}
                                    value={String(value)}
                                    variant="ghost"
                                    onChange={e => handleTextareaChange(e, onChange)}
                                    onBlur={() => {
                                        setIsEditing(false);
                                        updateNote(note.id, { content: String(value) });
                                    }}
                                    onKeyDown={e => {
                                        if (e.key === "Escape") setIsEditing(false);
                                    }}
                                    onKeyDownCapture={e => e.stopPropagation()}
                                    onClick={e => e.stopPropagation()}
                                    placeholder="Type your markdown here..."
                                    className="min-h-[40px] w-full cursor-text resize-none overflow-hidden p-1 font-mono text-sm break-words whitespace-pre-wrap select-text focus-visible:ring-0"
                                    autoFocus
                                />
                            ) : (
                                <div
                                    onDoubleClick={e => {
                                        e.stopPropagation();
                                        setIsEditing(true);
                                    }}
                                    className="prose prose-sm dark:prose-invert pointer-events-none w-full max-w-none p-1 text-left break-words whitespace-pre-wrap [&_*]:!my-0"
                                >
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {String(value) || "*Empty note*"}
                                    </ReactMarkdown>
                                </div>
                            )}
                        </div>
                        <div className="flex shrink-0 items-center gap-1 pl-1">
                            {!isEditing && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    type="button"
                                    onClick={e => {
                                        e.stopPropagation();
                                        setIsEditing(true);
                                    }}
                                    className="text-muted-foreground hover:bg-accent size-6 rounded-md opacity-100 transition-opacity group-hover:opacity-100 sm:opacity-0"
                                >
                                    <Edit2 className="size-3" />
                                </Button>
                            )}

                            <Button
                                variant="ghost"
                                size="icon"
                                type="button"
                                onClick={e => {
                                    e.stopPropagation();
                                    onRemove();
                                }}
                                className="hover:bg-destructive hover:text-destructive-foreground size-6 rounded-md text-red-300 opacity-100 transition-opacity group-hover:opacity-100 sm:opacity-0"
                            >
                                <X className="size-3" />
                            </Button>
                        </div>
                    </div>
                )}
            />
        </motion.div>
    );
}
