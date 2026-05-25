import { defineConfig } from "oxfmt";

// https://oxc.rs/docs/guide/usage/formatter/config.html
export default defineConfig({
    printWidth: 120,
    arrowParens: "avoid",
    tabWidth: 4,
    sortTailwindcss: true,
    sortImports: {
        newlinesBetween: false,
    },
    ignorePatterns: ["node_modules", ".next", "package-lock.json"],
});
