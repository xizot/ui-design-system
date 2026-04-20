'use client';

import { useFormState, type Control, type FieldValues, type Path } from 'react-hook-form';

import { cn, get, hasValue } from '../../lib/utils';

type RHFErrorMessageProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  showErrorWithTooltip?: boolean;
  className?: string;
};

function RHFErrorMessage<T extends FieldValues = FieldValues>({
  name,
  control,
  className,
}: RHFErrorMessageProps<T>) {
  const formState = useFormState({
    control,
    name,
  });
  const error = get<string>(formState.errors, `${name}.message`);

  if (!hasValue(error)) {
    return null;
  }

  return <p className={cn('text-xs text-destructive input-error mt-1.5', className)}>{error}</p>;
}

export { RHFErrorMessage };
