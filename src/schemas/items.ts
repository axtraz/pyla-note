import { z } from "zod";

export const itemsSchema = z.object({
    items: z.array(
        z.object({
            value: z.string().min(1, "This field cannot be empty"),
        }),
    ),
});

export type Items = z.infer<typeof itemsSchema>;
