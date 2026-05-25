import "dotenv/config";
import z from "zod";

export const envSchema = z.object({
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(32, "The secret must be at least 32 characters long"),
    BETTER_AUTH_URL: z.url(),
});

try {
    envSchema.parse(process.env);
} catch (error) {
    console.error("Invalid environment variables", error);
    process.exit(1);
}
