import { cn } from '../../lib/utils';

type FormErrorMessageProps = {
  error: string | React.ReactNode;
  errorClassName?: React.ComponentProps<'p'>['className'];
};

export function FormErrorMessage({ error, errorClassName }: FormErrorMessageProps) {
  return <p className={cn('mt-1 text-sm text-destructive', errorClassName)}>{error}</p>;
}
