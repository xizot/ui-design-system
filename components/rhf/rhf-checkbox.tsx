'use client';

import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { Checkbox } from '../ui/checkbox';
import type { RHFBeforeChange, RHFControlProps } from './types';

type RHFCheckboxProps<T extends FieldValues = FieldValues> = RHFControlProps<T> &
  Omit<
    React.ComponentProps<typeof Checkbox>,
    'name' | 'checked' | 'defaultChecked' | 'onCheckedChange'
  > & {
    callback?: (newValue: boolean) => void;
    onBeforeChange?: RHFBeforeChange<T>;
  };

function RHFCheckbox<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  description,
  required,
  wrapperClassName,
  labelClassName,
  descriptionClassName,
  errorClassName,
  callback,
  onBeforeChange,
  ...props
}: RHFCheckboxProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });
  const id = props.id || String(name);

  const handleCheckedChange = (newValue: unknown) => {
    const resolvedValue = Boolean(newValue);
    const performChange = () => {
      field.onChange(resolvedValue);
      callback?.(resolvedValue);
    };

    if (onBeforeChange) {
      onBeforeChange(resolvedValue, field.value, performChange);
      return;
    }

    performChange();
  };

  return (
    <Checkbox
      {...props}
      id={id}
      checked={Boolean(field.value)}
      onCheckedChange={handleCheckedChange}
      onBlur={field.onBlur}
      name={field.name}
      error={error?.message}
    />
  );
}

export { RHFCheckbox };
