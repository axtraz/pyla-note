import z from "zod";

export const projectSchema = z.object({
    name: z.string().min(3, "The title must have at least 3 characters"),
    icon: z.string(),
});

export type Project = z.infer<typeof projectSchema>;
