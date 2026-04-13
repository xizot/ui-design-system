'use client';

import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { LazyMultipleCombobox } from '../ui/lazy-multiple-combobox';
import type { ComboboxBaseOption } from '../ui/single-combobox';
import type { RHFControlProps } from './types';

type RHFLazyMultipleComboboxProps<
  T extends FieldValues = FieldValues,
  TRaw = unknown,
  TOption extends ComboboxBaseOption = ComboboxBaseOption,
> = RHFControlProps<T> &
  Omit<React.ComponentProps<typeof LazyMultipleCombobox<TRaw, TOption>>, 'value' | 'onChange'> & {
    callback?: (newValues: (string | number)[], options: TOption[]) => void;
  };

function RHFLazyMultipleCombobox<
  T extends FieldValues = FieldValues,
  TRaw = unknown,
  TOption extends ComboboxBaseOption = ComboboxBaseOption,
>({ control, name, callback, ...props }: RHFLazyMultipleComboboxProps<T, TRaw, TOption>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const handleValueChange = (values: (string | number)[], options: TOption[]) => {
    field.onChange(values);
    callback?.(values, options);
  };

  return (
    <LazyMultipleCombobox<TRaw, TOption>
      {...props}
      value={field.value}
      onChange={handleValueChange}
      error={error?.message}
    />
  );
}

export { RHFLazyMultipleCombobox };
export type { RHFLazyMultipleComboboxProps };
