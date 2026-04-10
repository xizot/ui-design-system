'use client';

import { DatePicker, type DatePickerProps } from '@/components/ui/date-picker';
import type { ComponentProps } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

export type RHFDatePickerProps<T extends FieldValues = FieldValues> = Omit<
  DatePickerProps,
  'value' | 'onChange' | 'label' | 'error' | 'required'
> & {
  control: Control<T>;
  name: Path<T>;
  label?: string | React.ReactNode;
  required?: boolean;
  error?: string;
  className?: ComponentProps<'div'>['className'];
  callback?: (value: Date | undefined) => void;
};

export function RHFDatePicker<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  required,
  error,
  className,
  callback,
  ...datePickerProps
}: RHFDatePickerProps<T>) {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    control,
    name,
  });

  const displayError = error || fieldError?.message;

  const handleChange = (date: Date | undefined) => {
    field.onChange(date);
    callback?.(date);
  };

  return (
    <DatePicker
      {...datePickerProps}
      value={field.value}
      onChange={handleChange}
      label={label}
      error={displayError}
      required={required}
      className={className}
    />
  );
}
