import { defineConfig } from "oxlint";

// https://oxc.rs/docs/guide/usage/linter/config.html
export default defineConfig({
    options: { typeAware: true, typeCheck: true },
    plugins: ["eslint", "typescript", "unicorn", "oxc", "jsdoc", "node", "promise"],
    env: {
        builtin: true,
        browser: true,
        node: true,
    },
    categories: {
        correctness: "error",
        nursery: "warn",
        pedantic: "off",
        perf: "warn",
        restriction: "off",
        style: "off",
        suspicious: "warn",
    },
    ignorePatterns: ["node_modules", "dist", "package-lock.json"],
});
