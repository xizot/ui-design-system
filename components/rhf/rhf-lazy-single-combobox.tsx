'use client';

import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { LazySingleCombobox } from '../ui/lazy-single-combobox';
import type { ComboboxBaseOption } from '../ui/single-combobox';
import type { RHFControlProps } from './types';

type RHFLazySingleComboboxProps<
  T extends FieldValues = FieldValues,
  TRaw = unknown,
  TOption extends ComboboxBaseOption = ComboboxBaseOption,
> = RHFControlProps<T> &
  Omit<React.ComponentProps<typeof LazySingleCombobox<TRaw, TOption>>, 'value' | 'onChange'> & {
    callback?: (newValue: string | number | undefined, option: TOption | undefined) => void;
  };

function RHFLazySingleCombobox<
  T extends FieldValues = FieldValues,
  TRaw = unknown,
  TOption extends ComboboxBaseOption = ComboboxBaseOption,
>({ control, name, callback, ...props }: RHFLazySingleComboboxProps<T, TRaw, TOption>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const handleValueChange = (value: string | number | undefined, option: TOption | undefined) => {
    field.onChange(value);
    callback?.(value, option);
  };

  return (
    <LazySingleCombobox<TRaw, TOption>
      {...props}
      value={field.value}
      onChange={handleValueChange}
      error={error?.message}
    />
  );
}

export { RHFLazySingleCombobox };
export type { RHFLazySingleComboboxProps };
