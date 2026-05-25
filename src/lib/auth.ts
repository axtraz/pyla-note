import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    user: {
        deleteUser: {
            enabled: true,
        },
        changeEmail: {
            enabled: true,
            updateEmailWithoutVerification: true,
        },
    },
    emailAndPassword: {
        enabled: true,
    },
    rateLimit: {
        enabled: true,
        window: 60,
        max: 100,
    },
});
