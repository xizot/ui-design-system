import { Input as InputPrimitive } from '@base-ui/react/input';
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

type InputProps = Omit<React.ComponentProps<'input'>, 'size'> & {
  label?: string | React.ReactNode;
  required?: boolean;
  labelClassName?: React.ComponentProps<typeof Label>['className'];
  errorClassName?: React.ComponentProps<'p'>['className'];
  error?: string;
  size?: FormSize;
};

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
          FORM_CONTROL_RING_STYLES.focusVisible,
          FORM_CONTROL_RING_STYLES.invalid,
          FORM_SIZE_STYLES[size].height,
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

export { Input };
