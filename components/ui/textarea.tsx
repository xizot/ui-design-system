import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../lib/utils';
import { FormErrorMessage } from './form-error-message';
import { FormLabel } from './form-label';
import { Label } from './label';

type TextareaProps = React.ComponentProps<'textarea'> & {
  label?: string | React.ReactNode;
  required?: boolean;
  labelClassName?: React.ComponentProps<typeof Label>['className'];
  errorClassName?: React.ComponentProps<'p'>['className'];
  error?: string;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
};
const textareaVariants = cva('', {
  variants: {
    size: {
      xxs: 'px-2 py-1 text-xs',
      xs: 'px-2.5 py-1.5 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-3.5 py-2 text-sm',
      lg: 'px-4 py-2.5 text-base',
      xl: 'px-5 py-3 text-base',
      xxl: 'px-6 py-3.5 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const textareaRingStyles = {
  focusVisible: 'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
  invalid:
    'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
} as const;

function Textarea({
  className,
  label,
  required,
  labelClassName,
  error,
  errorClassName,
  size = 'md',
  ...props
}: TextareaProps) {
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
      <textarea
        data-slot="textarea"
        className={cn(
          'border-input placeholder:text-muted-foreground dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50',
          textareaRingStyles.focusVisible,
          textareaRingStyles.invalid,
          textareaVariants({ size }),
          className,
        )}
        {...props}
      />

      {error ? <FormErrorMessage error={error} errorClassName={errorClassName} /> : null}
    </div>
  );
}

export { Textarea };
