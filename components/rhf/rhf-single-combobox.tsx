'use client';

import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

import type { ComboboxBaseOption } from '../ui/single-combobox';
import { SingleCombobox } from '../ui/single-combobox';
import type { RHFControlProps } from './types';

type RHFSingleComboboxProps<
  T extends FieldValues = FieldValues,
  TOption extends ComboboxBaseOption = ComboboxBaseOption,
> = RHFControlProps<T> &
  Omit<React.ComponentProps<typeof SingleCombobox<TOption>>, 'value' | 'onChange'> & {
    callback?: (newValue: string | number | undefined, option: TOption | undefined) => void;
  };

function RHFSingleCombobox<
  T extends FieldValues = FieldValues,
  TOption extends ComboboxBaseOption = ComboboxBaseOption,
>({ control, name, callback, ...props }: RHFSingleComboboxProps<T, TOption>) {
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
    <SingleCombobox
      {...props}
      value={field.value}
      onChange={handleValueChange}
      error={error?.message}
    />
  );
}

export { RHFSingleCombobox };
export type { RHFSingleComboboxProps };
