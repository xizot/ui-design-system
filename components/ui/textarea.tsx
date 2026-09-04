import * as React from 'react';

import {
  FORM_CONTROL_RING_STYLES,
  FORM_SIZE_STYLES,
  type FormSize,
} from '../../constants/form-sizes';
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
          'border-input placeholder:text-muted-foreground dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50',
          FORM_CONTROL_RING_STYLES.focusVisible,
          FORM_CONTROL_RING_STYLES.invalid,
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
