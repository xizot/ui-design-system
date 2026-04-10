'use client';

import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { RadioGroup } from '../ui/radio-group';
import type { RHFControlProps } from './types';

type RHFRadioGroupProps<T extends FieldValues = FieldValues> = RHFControlProps<T> &
  Omit<React.ComponentProps<typeof RadioGroup>, 'name' | 'value' | 'defaultValue' | 'onValueChange'> & {
    callback?: (newValue: string) => void;
  };

function RHFRadioGroup<T extends FieldValues = FieldValues>({
  control,
  name,
  callback,
  ...props
}: RHFRadioGroupProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const handleValueChange = (newValue: string) => {
    field.onChange(newValue);
    callback?.(newValue);
  };

  return (
    <RadioGroup
      {...props}
      name={field.name}
      value={field.value}
      onValueChange={handleValueChange}
      onBlur={field.onBlur}
      error={error?.message}
      id={props.id || String(name)}
    />
  );
}

export { RHFRadioGroup };
export type { RHFRadioGroupProps };
