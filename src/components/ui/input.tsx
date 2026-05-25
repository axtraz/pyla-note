import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
    "h-8 w-full min-w-0 rounded-lg px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 md:text-sm",
    {
        variants: {
            variant: {
                default: [
                    "border border-input bg-transparent shadow-sm",
                    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                    "dark:bg-input/30",
                ],
                ghost: [
                    "border-none bg-transparent shadow-none",
                    "focus-visible:ring-0 focus-visible:bg-accent/50",
                    "dark:bg-transparent",
                ],
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

function Input({
    className,
    variant,
    type,
    ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
    return <input type={type} data-slot="input" className={cn(inputVariants({ variant, className }))} {...props} />;
}

export { Input };
