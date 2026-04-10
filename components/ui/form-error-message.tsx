import { cn } from '../../lib/utils';

type FormErrorMessageProps = {
  error: string | React.ReactNode;
  errorClassName?: React.ComponentProps<'p'>['className'];
};

export function FormErrorMessage({ error, errorClassName }: FormErrorMessageProps) {
  return <p className={cn('text-sm text-destructive mt-1', errorClassName)}>{error}</p>;
}
