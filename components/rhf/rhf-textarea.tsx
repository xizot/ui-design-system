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
import { RHFErrorMessage } from './rhf-error-message';

const ERROR_CLASSES = [
  `has-[.input-error]:[&_textarea]:border-destructive`,
  `has-[.input-error]:[&_textarea]:border-destructive`,
  `has-[.input-error]:[&_textarea]:ring-3`,
  `has-[.input-error]:[&_textarea]:ring-destructive/20`,
  `dark:has-[.input-error]:[&_textarea]:border-destructive/50`,
  `dark:has-[.input-error]:[&_textarea]:ring-destructive/40`,
].join(' ');

type RHFTextareaProps<T extends FieldValues = FieldValues> = Omit<
  React.ComponentProps<typeof Textarea>,
  'name' | 'value' | 'onChange'
> & {
  control: Control<T>;
  name: Path<T>;
  register: UseFormRegister<T>;
  showMaxLength?: boolean;
};

function RHFTextarea<T extends FieldValues = FieldValues>({
  control,
  name,
  showMaxLength = true,
  maxLength = 512,
  rows = 5,
  register,
  ...props
}: RHFTextareaProps<T>) {
  return (
    <div className={cn(ERROR_CLASSES)}>
      <div className="relative">
        <Textarea
          {...props}
          {...register(name)}
          id={props.id || String(name)}
          className={cn('w-full', props.className)}
          maxLength={maxLength}
          rows={rows}
        />

        {showMaxLength ? (
          <TextAreaBadge control={control} name={name} maxLength={maxLength} />
        ) : null}
      </div>
      <RHFErrorMessage control={control} name={name} />
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
