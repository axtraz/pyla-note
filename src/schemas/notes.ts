import z from "zod";

export const noteSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    x: z.number().int(),
    y: z.number().int(),
    userId: z.string(),
    projectId: z.string(),
});

export type Note = z.infer<typeof noteSchema>;

export const notesSchema = z.object({
    notes: z.array(noteSchema),
});

export type Notes = z.infer<typeof notesSchema>;
