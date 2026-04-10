'use client';

import { DateRangePicker, type DateRangePickerProps } from '@/components/ui/date-range-picker';
import type { ComponentProps } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

export type RHFDateRangePickerProps<T extends FieldValues = FieldValues> = Omit<
  DateRangePickerProps,
  'value' | 'onChange' | 'label' | 'error' | 'required'
> & {
  control: Control<T>;
  name: Path<T>;
  label?: string | React.ReactNode;
  required?: boolean;
  error?: string;
  className?: ComponentProps<'div'>['className'];
  callback?: (value: { from?: Date; to?: Date } | undefined) => void;
};

export function RHFDateRangePicker<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  required,
  error,
  className,
  callback,
  ...dateRangePickerProps
}: RHFDateRangePickerProps<T>) {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    control,
    name,
  });

  const displayError = error || fieldError?.message;

  const handleChange = (range: { from?: Date; to?: Date } | undefined) => {
    field.onChange(range);
    callback?.(range);
  };

  return (
    <DateRangePicker
      {...dateRangePickerProps}
      value={field.value}
      onChange={handleChange}
      label={label}
      error={displayError}
      required={required}
      className={className}
    />
  );
}
