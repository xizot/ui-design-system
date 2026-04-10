'use client';

import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { cn } from '../../lib/utils';
import { Combobox, ComboboxContent, ComboboxInput, ComboboxList } from '../ui/combobox';
import { Label } from '../ui/label';
import type { RHFControlProps } from './types';

type RHFComboboxProps<T extends FieldValues = FieldValues> = RHFControlProps<T> &
  Omit<
    React.ComponentProps<typeof Combobox>,
    'name' | 'value' | 'defaultValue' | 'onValueChange'
  > & {
    placeholder?: string;
    inputClassName?: string;
    contentClassName?: string;
    listClassName?: string;
    callback?: (newValue: string) => void;
    children: React.ReactNode;
  };

function RHFCombobox<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  description,
  required,
  wrapperClassName,
  labelClassName,
  descriptionClassName,
  errorClassName,
  placeholder,
  inputClassName,
  contentClassName,
  listClassName,
  callback,
  children,
  ...props
}: RHFComboboxProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });
  const id = props.id || String(name);

  const handleValueChange = (newValue: unknown) => {
    field.onChange(newValue);
    callback?.(String(newValue));
  };

  return (
    <div className={cn('w-full space-y-1.5', wrapperClassName)}>
      {label ? (
        <Label htmlFor={id} className={labelClassName}>
          {label}
          {required ? <span className="ml-1 text-destructive">*</span> : null}
        </Label>
      ) : null}
      {description ? (
        <p className={cn('text-sm text-muted-foreground', descriptionClassName)}>{description}</p>
      ) : null}
      <Combobox
        {...props}
        value={field.value ?? ''}
        onValueChange={handleValueChange}
        name={field.name}
      >
        <ComboboxInput
          id={id}
          className={inputClassName}
          placeholder={placeholder}
          aria-invalid={!!error}
        />
        <ComboboxContent className={contentClassName}>
          <ComboboxList className={listClassName}>{children}</ComboboxList>
        </ComboboxContent>
      </Combobox>
      {error ? (
        <p className={cn('text-sm text-destructive', errorClassName)}>
          {String(error.message ?? '')}
        </p>
      ) : null}
    </div>
  );
}

export { RHFCombobox };
