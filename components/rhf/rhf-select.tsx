"use client";

import type { FieldValues } from "react-hook-form";
import { useController } from "react-hook-form";

import { cn } from "../../lib/utils";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { RHFControlProps } from "./types";

type RHFSelectProps<T extends FieldValues = FieldValues> = RHFControlProps<T> &
  Omit<
    React.ComponentProps<typeof Select>,
    "name" | "value" | "defaultValue" | "onValueChange"
  > & {
    placeholder?: string;
    triggerClassName?: string;
    contentClassName?: string;
    callback?: (newValue: string) => void;
    children: React.ReactNode;
  };

function RHFSelect<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  description,
  required,
  wrapperClassName,
  labelClassName,
  descriptionClassName,
  errorClassName,
  placeholder,
  triggerClassName,
  contentClassName,
  callback,
  children,
  ...props
}: RHFSelectProps<T>) {
  const { field, fieldState: { error } } = useController({
    control,
    name,
  });
  const id = props.id || String(name);

  const handleValueChange = (newValue: unknown) => {
    field.onChange(newValue);
    callback?.(String(newValue));
  };

  return (
    <div className={cn("w-full space-y-1.5", wrapperClassName)}>
      {label ? (
        <Label htmlFor={id} className={labelClassName}>
          {label}
          {required ? <span className="ml-1 text-destructive">*</span> : null}
        </Label>
      ) : null}
      {description ? (
        <p className={cn("text-sm text-muted-foreground", descriptionClassName)}>
          {description}
        </p>
      ) : null}
      <Select
        {...props}
        value={field.value ?? ""}
        onValueChange={handleValueChange}
        name={field.name}
      >
        <SelectTrigger id={id} className={triggerClassName} aria-invalid={!!error}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={contentClassName}>{children}</SelectContent>
      </Select>
      {error ? (
        <p className={cn("text-sm text-destructive", errorClassName)}>{String(error.message ?? "")}</p>
      ) : null}
    </div>
  );
}

export { RHFSelect };
