import { ComponentProps } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { NumberInput } from '../ui/number-input';

type RHFFormattedInputProps<T extends FieldValues = FieldValues> = Omit<
  ComponentProps<typeof NumberInput>,
  'value' | 'onChange'
> & {
  control: Control<T>;
  name: Path<T>;
  callback?: (value: string) => void;
};

export default function RHFNumberInput<T extends FieldValues = FieldValues>({
  control,
  name,
  callback,
  ...props
}: RHFFormattedInputProps<T>) {
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

  return <NumberInput {...props} {...field} onChange={handleChange} error={error?.message} />;
}
