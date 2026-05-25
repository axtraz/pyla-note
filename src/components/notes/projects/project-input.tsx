"use client";

import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface ProjectInputProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
    label: string;
    placeholder?: string;
    description?: string;
}

export function ProjectInput<TFieldValues extends FieldValues>({
    control,
    name,
    label,
    placeholder,
}: ProjectInputProps<TFieldValues>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-semibold text-gray-400">{label}</FieldLabel>
                    <Input {...field} placeholder={placeholder} aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    );
}
