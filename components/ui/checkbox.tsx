'use client';

import { DEFAULT_CHECKBOX_SIZE, FORM_SIZE_STYLES, type FormSize } from '@/constants/form-sizes';
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
  wrapperClassName?: React.ComponentProps<'div'>['className'];
  error?: string;
  size?: FormSize;
};
function Checkbox({
  className,
  label,
  required,
  labelClassName,
  error,
  errorClassName,
  wrapperClassName,
  size = DEFAULT_CHECKBOX_SIZE,
  ...props
}: CheckboxProps) {
  return (
    <div className={cn('w-fit', wrapperClassName)}>
      <div className="flex items-center space-x-2">
        <CheckboxPrimitive.Root
          data-slot="checkbox"
          className={cn(
            'rounded-xs peer relative flex shrink-0 items-center justify-center border border-input shadow-xs transition-shadow outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary',
            FORM_SIZE_STYLES[size].icon,
            { 'rounded-[3px]': size === 'md' || size === 'lg' || size === 'xl' },

            className,
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className={cn('grid place-content-center text-current transition-none')}
          >
            <CheckIcon className={FORM_SIZE_STYLES[size].icon} />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label ? (
          <FormLabel
            label={label}
            htmlFor={props.id}
            required={required}
            className={cn('mb-0 flex-1', labelClassName)}
          />
        ) : null}
      </div>
      {error ? <FormErrorMessage error={error} errorClassName={errorClassName} /> : null}
    </div>
  );
}

export { Checkbox };
