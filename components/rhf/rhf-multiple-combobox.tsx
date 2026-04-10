'use client';

import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { MultipleCombobox } from '../ui/multiple-combobox';
import type { ComboboxBaseOption } from '../ui/single-combobox';
import type { RHFControlProps } from './types';

type RHFMultipleComboboxProps<
  T extends FieldValues = FieldValues,
  TOption extends ComboboxBaseOption = ComboboxBaseOption,
> = RHFControlProps<T> &
  Omit<React.ComponentProps<typeof MultipleCombobox<TOption>>, 'value' | 'onChange'> & {
    callback?: (values: (string | number)[], options: TOption[]) => void;
  };

function RHFMultipleCombobox<
  T extends FieldValues = FieldValues,
  TOption extends ComboboxBaseOption = ComboboxBaseOption,
>({ control, name, callback, ...props }: RHFMultipleComboboxProps<T, TOption>) {
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
    <MultipleCombobox
      {...props}
      value={field.value}
      onChange={handleValueChange}
      error={error?.message}
    />
  );
}

export { RHFMultipleCombobox };
export type { RHFMultipleComboboxProps };
