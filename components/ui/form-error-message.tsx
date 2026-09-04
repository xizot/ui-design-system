import { cn } from '../../lib/utils';

type FormErrorMessageProps = {
  error: string | React.ReactNode;
  errorClassName?: React.ComponentProps<'p'>['className'];
};

export function FormErrorMessage({ error, errorClassName }: FormErrorMessageProps) {
  return <p className={cn('text-destructive mt-1 text-sm', errorClassName)}>{error}</p>;
}
