"use client";

import type { FieldValues } from "react-hook-form";

import { cn } from "../../lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RHFErrorMessage } from "./rhf-error-message";
import type { RHFRegisterProps } from "./types";

const ERROR_CLASSES = [
  "has-[.input-error]:[&_input]:pr-8",
  "has-[.input-error]:[&_input]:border-destructive",
  "has-[.input-error]:[&_input]:focus-visible:border-transparent",
  "has-[.input-error]:[&_input]:focus-visible:ring-2",
  "has-[.input-error]:[&_input]:focus-visible:ring-destructive",
].join(" ");

type RHFInputProps<T extends FieldValues = FieldValues> = RHFRegisterProps<T> &
  Omit<React.ComponentProps<typeof Input>, "name"> & {
    callback?: (newValue: string) => void;
  };

function RHFInput<T extends FieldValues = FieldValues>({
  control,
  register,
  name,
  label,
  description,
  required,
  wrapperClassName,
  labelClassName,
  descriptionClassName,
  errorClassName,
  callback,
  ...props
}: RHFInputProps<T>) {
  const registered = register(name, {
    onChange: (event) => {
      callback?.(event.target.value);
    },
  });

  return (
    <div className={cn("w-full space-y-1.5", wrapperClassName)}>
      {label ? (
        <Label htmlFor={props.id || String(name)} className={cn("block leading-5", labelClassName)}>
          {label}
          {required ? <span className="ml-1 text-destructive">*</span> : null}
        </Label>
      ) : null}
      {description ? (
        <p className={cn("text-sm text-muted-foreground", descriptionClassName)}>
          {description}
        </p>
      ) : null}
      <div className={cn(ERROR_CLASSES)}>
        <div className="relative">
          <Input
            {...props}
            {...registered}
            id={props.id || String(name)}
            className={cn("w-full", props.className)}
          />
        </div>
        <RHFErrorMessage name={name} control={control} className={errorClassName} />
      </div>
    </div>
  );
}

export { RHFInput };
