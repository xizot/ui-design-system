'use client';

import { UseFormRegister, type FieldValues } from 'react-hook-form';

import { cn } from '../../lib/utils';
import { Input } from '../ui/input';
import { RHFErrorMessage } from './rhf-error-message';
import { RHFControlProps } from './types';

const ERROR_CLASSES = [
  `has-[.input-error]:[&_input]:border-destructive`,
  `has-[.input-error]:[&_input]:ring-3`,
  `has-[.input-error]:[&_input]:ring-destructive/20`,
  `dark:has-[.input-error]:[&_input]:border-destructive/50`,
  `dark:has-[.input-error]:[&_input]:ring-destructive/40`,
].join(' ');

type RHFInputProps<T extends FieldValues = FieldValues> = RHFControlProps<T> &
  Omit<React.ComponentProps<typeof Input>, 'name' | 'value' | 'onChange'> & {
    register: UseFormRegister<T>;
  };

function RHFInput<T extends FieldValues = FieldValues>({
  control,
  name,
  register,
  ...props
}: RHFInputProps<T>) {
  return (
    <div className={cn('w-full', ERROR_CLASSES)}>
      <Input {...props} {...register(name)} id={props.id || String(name)} />
      <RHFErrorMessage control={control} name={name} />
    </div>
  );
}

export { RHFInput };
