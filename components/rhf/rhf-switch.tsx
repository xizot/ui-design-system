"use client";

import type { FieldValues } from "react-hook-form";
import { useController } from "react-hook-form";

import { cn } from "../../lib/utils";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import type { RHFBeforeChange, RHFControlProps } from "./types";

type RHFSwitchProps<T extends FieldValues = FieldValues> = RHFControlProps<T> &
  Omit<
    React.ComponentProps<typeof Switch>,
    "name" | "checked" | "defaultChecked" | "onCheckedChange"
  > & {
    callback?: (newValue: boolean) => void;
    onBeforeChange?: RHFBeforeChange<T>;
  };

function RHFSwitch<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  description,
  required,
  wrapperClassName,
  labelClassName,
  descriptionClassName,
  errorClassName,
  callback,
  onBeforeChange,
  ...props
}: RHFSwitchProps<T>) {
  const { field, fieldState: { error } } = useController({
    control,
    name,
  });
  const id = props.id || String(name);

  const handleCheckedChange = (newValue: unknown) => {
    const resolvedValue = Boolean(newValue);
    const performChange = () => {
      field.onChange(resolvedValue);
      callback?.(resolvedValue);
    };

    if (onBeforeChange) {
      onBeforeChange(resolvedValue, field.value, performChange);
      return;
    }

    performChange();
  };

  return (
    <div className={cn("w-fit space-y-1.5", wrapperClassName)}>
      {description ? (
        <p className={cn("text-sm text-muted-foreground", descriptionClassName)}>
          {description}
        </p>
      ) : null}
      <div className="flex items-center gap-3">
        {label ? (
          <Label htmlFor={id} className={cn("flex-1 cursor-pointer select-none", labelClassName)}>
            {label}
            {required ? <span className="ml-1 text-destructive">*</span> : null}
          </Label>
        ) : null}
        <Switch
          {...props}
          id={id}
          checked={Boolean(field.value)}
          onCheckedChange={handleCheckedChange}
          onBlur={field.onBlur}
          name={field.name}
          aria-invalid={!!error}
        />
      </div>
      {error ? (
        <p className={cn("text-sm text-destructive", errorClassName)}>{String(error.message ?? "")}</p>
      ) : null}
    </div>
  );
}

export { RHFSwitch };
