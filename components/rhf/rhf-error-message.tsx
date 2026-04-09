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

  return (
    <p
      className={cn(
        'hidden text-xs text-destructive',
        hasValue(error) && 'input-error mt-1.5 block',
        className,
      )}
    >
      {error}
    </p>
  );
}

export { RHFErrorMessage };
