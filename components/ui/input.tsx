import { Input as InputPrimitive } from '@base-ui/react/input';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../lib/utils';
import { FormErrorMessage } from './form-error-message';
import { FormLabel } from './form-label';
import { Label } from './label';

type InputProps = Omit<React.ComponentProps<'input'>, 'size'> & {
  label?: string | React.ReactNode;
  required?: boolean;
  labelClassName?: React.ComponentProps<typeof Label>['className'];
  errorClassName?: React.ComponentProps<'p'>['className'];
  error?: string;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
};

const inputVariants = cva('', {
  variants: {
    size: {
      xxs: 'h-7 px-2 text-xs',
      xs: 'h-8 px-2.5 text-xs',
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-3.5 text-sm',
      lg: 'h-11 px-4 text-base',
      xl: 'h-12 px-5 text-base',
      xxl: 'h-14 px-6 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const inputRingStyles = {
  focusVisible: 'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
  invalid:
    'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
} as const;

function Input({
  className,
  type,
  label,
  required,
  labelClassName,
  error,
  errorClassName,
  size = 'md',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label ? (
        <FormLabel
          label={label}
          htmlFor={props.id}
          required={required}
          className={labelClassName}
        />
      ) : null}
      <InputPrimitive
        type={type}
        data-slot="input"
        aria-invalid={!!error}
        className={cn(
          'border-input file:text-foreground placeholder:text-muted-foreground dark:bg-input/30 w-full min-w-0 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          inputRingStyles.focusVisible,
          inputRingStyles.invalid,
          inputVariants({ size }),
          className,
        )}
        {...props}
      />

      {error ? <FormErrorMessage error={error} errorClassName={errorClassName} /> : null}
    </div>
  );
}

export { Input };
