"use client";

import { useController, type FieldValues } from "react-hook-form";

import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { RHFErrorMessage } from "./rhf-error-message";
import type { RHFRegisterProps } from "./types";

const ERROR_CLASSES = [
  "has-[.input-error]:[&_textarea]:pr-8",
  "has-[.input-error]:[&_textarea]:border-destructive",
  "has-[.input-error]:[&_textarea]:focus-visible:border-transparent",
  "has-[.input-error]:[&_textarea]:focus-visible:ring-2",
  "has-[.input-error]:[&_textarea]:focus-visible:ring-destructive",
].join(" ");

type RHFTextareaProps<T extends FieldValues = FieldValues> = RHFRegisterProps<T> &
  Omit<React.ComponentProps<typeof Textarea>, "name"> & {
    callback?: (newValue: string) => void;
    showMaxLength?: boolean;
  };

function RHFTextarea<T extends FieldValues = FieldValues>({
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
  showMaxLength = true,
  maxLength = 512,
  rows = 5,
  ...props
}: RHFTextareaProps<T>) {
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
          <Textarea
            {...props}
            {...registered}
            id={props.id || String(name)}
            className={cn("w-full", props.className)}
            maxLength={maxLength}
            rows={rows}
          />
          {showMaxLength ? (
            <TextAreaBadge control={control} name={name} maxLength={maxLength} />
          ) : null}
        </div>
        <RHFErrorMessage name={name} control={control} className={errorClassName} />
      </div>
    </div>
  );
}

type TextAreaBadgeProps<T extends FieldValues> = {
  control: RHFRegisterProps<T>["control"];
  name: RHFRegisterProps<T>["name"];
  maxLength: number;
};

function TextAreaBadge<T extends FieldValues>({
  control,
  name,
  maxLength,
}: TextAreaBadgeProps<T>) {
  const { field } = useController({ control, name });

  return (
    <Badge variant="secondary" className="absolute right-3 bottom-2 rounded-sm text-[10px]">
      {(field.value as string | undefined)?.length || 0}/{maxLength}
    </Badge>
  );
}

export { RHFTextarea };
