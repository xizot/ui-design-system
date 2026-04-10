'use client';

import { TimePicker, type TimeValue } from '@/components/ui/time-picker';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

export type RHFTimePickerProps<T extends FieldValues = FieldValues> = Omit<
  ComponentProps<'div'>,
  'children'
> & {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  wrapperClassName?: ComponentProps<'div'>['className'];
  required?: boolean;
  showSeconds?: boolean;
  className?: string;
};

function RHFTimePicker<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  wrapperClassName,
  required = false,
  showSeconds = true,
  className,
  ...rest
}: RHFTimePickerProps<T>) {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    control,
    name,
  });

  // Convert string value to TimeValue format
  const timeValue: TimeValue = field.value
    ? {
        hour: field.value.split(':')[0] || '00',
        minute: field.value.split(':')[1] || '00',
        second: field.value.split(':')[2] || '00',
      }
    : {
        hour: '00',
        minute: '00',
        second: '00',
      };

  const handleChange = (newValue: TimeValue) => {
    const timeString = showSeconds
      ? `${newValue.hour}:${newValue.minute}:${newValue.second}`
      : `${newValue.hour}:${newValue.minute}`;
    field.onChange(timeString);
  };

  return (
    <div className={cn('w-full space-y-2', wrapperClassName)}>
      {label && (
        <label
          className={cn(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            required && "after:content-['*'] after:ml-0.5 after:text-destructive",
          )}
        >
          {label}
        </label>
      )}
      <div className={cn('h-80', className)} {...rest}>
        <TimePicker value={timeValue} onChange={handleChange} showSeconds={showSeconds} />
      </div>
      {fieldError?.message && <p className="text-sm text-destructive">{fieldError.message}</p>}
    </div>
  );
}

export { RHFTimePicker };
