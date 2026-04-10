'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

export type RHFTimePickerProps<T extends FieldValues = FieldValues> = Omit<
  ComponentProps<typeof Input>,
  'label' | 'error' | 'required' | 'type'
> & {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  wrapperClassName?: ComponentProps<'div'>['className'];
  required?: boolean;
};

function RHFTimePicker<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder = 'HH:mm',
  className,
  wrapperClassName,
  required = false,
  ...rest
}: RHFTimePickerProps<T>) {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    control,
    name,
  });

  return (
    <div className={cn('w-full', wrapperClassName)}>
      <Input
        {...rest}
        {...field}
        type="time"
        label={label}
        error={fieldError?.message}
        required={required}
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
}

export { RHFTimePicker };
