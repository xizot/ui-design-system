'use client';

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';

import { CheckIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { FormErrorMessage } from './form-error-message';
import { FormLabel } from './form-label';
import { Label } from './label';

type CheckboxProps = CheckboxPrimitive.Root.Props & {
  label?: string | React.ReactNode;
  required?: boolean;
  labelClassName?: React.ComponentProps<typeof Label>['className'];
  errorClassName?: React.ComponentProps<'p'>['className'];
  error?: string;
};
function Checkbox({
  className,
  label,
  required,
  labelClassName,
  error,
  errorClassName,
  ...props
}: CheckboxProps) {
  return (
    <div className="w-fit">
      <div className="flex items-center space-x-2">
        {label ? (
          <FormLabel
            label={label}
            htmlFor={props.id}
            required={required}
            className={cn('mb-0', labelClassName)}
          />
        ) : null}
        <CheckboxPrimitive.Root
          data-slot="checkbox"
          className={cn(
            'peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input shadow-xs transition-shadow outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary',
            className,
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
          >
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
      </div>
      {error ? <FormErrorMessage error={error} errorClassName={errorClassName} /> : null}
    </div>
  );
}

export { Checkbox };
