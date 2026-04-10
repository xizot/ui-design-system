'use client';

import {
  useController,
  UseFormRegister,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { Input } from '../ui/input';

type RHFInputProps<T extends FieldValues = FieldValues> = Omit<
  React.ComponentProps<typeof Input>,
  'name' | 'value' | 'onChange'
> & {
  control: Control<T>;
  name: Path<T>;
  register: UseFormRegister<T>;
  callback?: (newValue: string) => void;
};

function RHFInput<T extends FieldValues = FieldValues>({
  control,
  name,
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
      onChange={handleChange}
      error={error?.message}
      id={props.id || String(name)}
    />
  );
}

export { RHFInput };
