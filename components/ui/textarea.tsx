import * as React from 'react';

import { FORM_SIZE_STYLES, type FormSize } from '../../constants/form-sizes';
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
  size?: FormSize;
};

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
          'flex field-sizing-content bg-transparent dark:bg-input/30 min-h-16 w-full rounded-md border border-input shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
          FORM_SIZE_STYLES[size].padding,
          FORM_SIZE_STYLES[size].text,
          className,
        )}
        {...props}
      />

      {error ? <FormErrorMessage error={error} errorClassName={errorClassName} /> : null}
    </div>
  );
}

export { Textarea };
