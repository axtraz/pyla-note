import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
    "flex field-sizing-content min-h-16 w-full rounded-md border px-3 py-2 text-base transition-[color,box-shadow] outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:ring-destructive/40",
    {
        variants: {
            variant: {
                default:
                    "border-input bg-transparent shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30",
                ghost: "border-transparent bg-transparent shadow-none focus-visible:border-transparent focus-visible:ring-0",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

function Textarea({
    className,
    variant,
    ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
    return <textarea data-slot="textarea" className={cn(textareaVariants({ variant }), className)} {...props} />;
}

export { Textarea };
