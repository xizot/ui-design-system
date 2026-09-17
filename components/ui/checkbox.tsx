'use client';

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { cva } from 'class-variance-authority';
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
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
};
const checkboxVariants = cva('', {
  variants: {
    size: {
      xxs: 'size-3.5',
      xs: 'size-4',
      sm: 'size-5',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-7',
      xxl: 'size-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
function Checkbox({
  className,
  label,
  required,
  labelClassName,
  error,
  errorClassName,
  wrapperClassName,
  size = 'md',
  ...props
}: CheckboxProps) {
  return (
    <div className={cn('w-fit', wrapperClassName)}>
      <div className="flex items-center space-x-2">
        <CheckboxPrimitive.Root
          data-slot="checkbox"
          className={cn(
            'peer border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary relative flex shrink-0 items-center justify-center rounded-xs border shadow-xs transition-shadow outline-none group-has-disabled/field:opacity-50 after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3',
            checkboxVariants({ size }),
            { 'rounded-[3px]': size === 'md' || size === 'lg' || size === 'xl' },

            className,
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className={cn('grid place-content-center text-current transition-none')}
          >
            <CheckIcon className={checkboxVariants({ size })} />
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
