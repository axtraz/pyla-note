import z from "zod";
import { envSchema } from "@/env";

declare global {
    namespace NodeJS {
        export interface ProcessEnv extends Readonly<z.infer<typeof envSchema>> {}
    }
}
