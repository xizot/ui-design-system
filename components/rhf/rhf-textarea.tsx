'use client';

import {
  useController,
  UseFormRegister,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';

type RHFTextareaProps<T extends FieldValues = FieldValues> = Omit<
  React.ComponentProps<typeof Textarea>,
  'name' | 'value' | 'onChange'
> & {
  control: Control<T>;
  name: Path<T>;
  callback?: (newValue: string) => void;
  register: UseFormRegister<T>;
  showMaxLength?: boolean;
};

function RHFTextarea<T extends FieldValues = FieldValues>({
  control,
  name,
  showMaxLength = true,
  maxLength = 512,
  rows = 5,
  // TODO: next update will remove controlled
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register,
  callback,
  ...props
}: RHFTextareaProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    field.onChange(e.target.value);
    callback?.(e.target.value);
  };

  return (
    <div className="relative">
      <Textarea
        {...props}
        {...field}
        onChange={handleChange}
        error={error?.message}
        id={props.id || String(name)}
        className={cn('w-full', props.className)}
        maxLength={maxLength}
        rows={rows}
      />
      {showMaxLength ? <TextAreaBadge control={control} name={name} maxLength={maxLength} /> : null}
    </div>
  );
}

type TextAreaBadgeProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  maxLength: number;
};

function TextAreaBadge<T extends FieldValues>({ control, name, maxLength }: TextAreaBadgeProps<T>) {
  const { field } = useController({ control, name });

  return (
    <Badge variant="secondary" className="absolute right-3 bottom-2 rounded-sm text-[10px]">
      {(field.value as string | undefined)?.length || 0}/{maxLength}
    </Badge>
  );
}

export { RHFTextarea };
