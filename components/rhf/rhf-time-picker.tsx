'use client';

import type { ComponentProps } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { TimePicker, type TimeValue } from '../ui/time-picker';

export type RHFTimePickerProps<T extends FieldValues = FieldValues> = Omit<
  ComponentProps<typeof TimePicker>,
  'value' | 'onChange' | 'error'
> & {
  control: Control<T>;
  name: Path<T>;
  callback?: (value: string | undefined) => void;
};

function RHFTimePicker<T extends FieldValues = FieldValues>({
  control,
  name,
  showSeconds = true,
  callback,
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
  const timeValue: TimeValue | undefined = field.value
    ? {
        hour: field.value.split(':')[0] || '00',
        minute: field.value.split(':')[1] || '00',
        second: field.value.split(':')[2] || '00',
      }
    : undefined;

  const handleChange = (newValue: TimeValue | undefined) => {
    if (!newValue) {
      field.onChange(undefined);
      callback?.(undefined);
      return;
    }

    const timeString = showSeconds
      ? `${newValue.hour}:${newValue.minute}:${newValue.second}`
      : `${newValue.hour}:${newValue.minute}`;
    field.onChange(timeString);
    callback?.(timeString);
  };

  return (
    <TimePicker
      {...rest}
      value={timeValue}
      onChange={handleChange}
      showSeconds={showSeconds}
      error={fieldError?.message}
    />
  );
}

export { RHFTimePicker };
