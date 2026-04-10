'use client';

import type { FieldValues } from 'react-hook-form';

import { Input } from '../ui/input';
import type { RHFRegisterProps } from './types';

type RHFInputProps<T extends FieldValues = FieldValues> = RHFRegisterProps<T> &
  Omit<React.ComponentProps<typeof Input>, 'name'> & {
    callback?: (newValue: string) => void;
  };

function RHFInput<T extends FieldValues = FieldValues>({
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
  ...props
}: RHFInputProps<T>) {
  return <Input {...props} {...register(name)} id={props.id || String(name)} />;
}

export { RHFInput };
