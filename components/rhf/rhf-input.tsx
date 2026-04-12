'use client';

import { useController, UseFormRegister, type FieldValues } from 'react-hook-form';

import { Input } from '../ui/input';
import { RHFControlProps } from './types';

type RHFInputProps<T extends FieldValues = FieldValues> = RHFControlProps<T> &
  Omit<React.ComponentProps<typeof Input>, 'name' | 'value' | 'onChange'> & {
    register: UseFormRegister<T>;
    callback?: (newValue: string) => void;
  };

function RHFInput<T extends FieldValues = FieldValues>({
  control,
  name,
  // TODO: next update will remove controlled
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register,
  callback,
  ...props
}: RHFInputProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.value);
    callback?.(e.target.value);
  };

  return (
    <Input
      {...props}
      {...field}
      value={field.value ?? ''}
      onChange={handleChange}
      error={error?.message}
      id={props.id || String(name)}
    />
  );
}

export { RHFInput };
