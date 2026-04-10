'use client';

import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { Switch } from '../ui/switch';
import type { RHFBeforeChange, RHFControlProps } from './types';

type RHFSwitchProps<T extends FieldValues = FieldValues> = RHFControlProps<T> &
  Omit<
    React.ComponentProps<typeof Switch>,
    'name' | 'checked' | 'defaultChecked' | 'onCheckedChange'
  > & {
    callback?: (newValue: boolean) => void;
    onBeforeChange?: RHFBeforeChange<T>;
  };

function RHFSwitch<T extends FieldValues = FieldValues>({
  control,
  name,
  callback,
  onBeforeChange,
  ...props
}: RHFSwitchProps<T>) {
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
    <Switch
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

export { RHFSwitch };
