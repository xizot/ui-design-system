'use client';

import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import { cva } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import { FormErrorMessage } from './form-error-message';
import { FormLabel } from './form-label';
import { Label } from './label';

type FormSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const switchVariants = cva('', {
  variants: {
    size: {
      xxs: 'h-3 w-5',
      xs: 'h-3.5 w-6',
      sm: 'h-4 w-7',
      md: 'h-5 w-9',
      lg: 'h-6 w-11',
      xl: 'h-7 w-12',
      xxl: 'h-8 w-14',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const switchThumbVariants = cva('', {
  variants: {
    size: {
      xxs: 'size-2 data-checked:translate-x-2',
      xs: 'size-3 data-checked:translate-x-2.5',
      sm: 'size-3.5 data-checked:translate-x-3',
      md: 'size-4 data-checked:translate-x-4',
      lg: 'size-5 data-checked:translate-x-5',
      xl: 'size-6 data-checked:translate-x-5',
      xxl: 'size-7 data-checked:translate-x-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type SwitchProps = SwitchPrimitive.Root.Props & {
  size?: FormSize;
  label?: string | React.ReactNode;
  required?: boolean;
  labelClassName?: React.ComponentProps<typeof Label>['className'];
  errorClassName?: React.ComponentProps<'p'>['className'];
  error?: string;
};

function Switch({
  className,
  label,
  required,
  labelClassName,
  error,
  errorClassName,
  size = 'md',
  ...props
}: SwitchProps) {
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

        <SwitchPrimitive.Root
          data-slot="switch"
          data-size={size}
          className={cn(
            'peer group/switch focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 relative inline-flex shrink-0 items-center rounded-full border border-transparent p-0.5 transition-all outline-none after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 aria-invalid:ring-3 data-disabled:cursor-not-allowed data-disabled:opacity-50',
            switchVariants({ size }),
            className,
          )}
          {...props}
        >
          <SwitchPrimitive.Thumb
            data-slot="switch-thumb"
            className={cn(
              'bg-background dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground pointer-events-none block rounded-full ring-0 transition-transform data-unchecked:translate-x-0',
              switchThumbVariants({ size }),
            )}
          />
        </SwitchPrimitive.Root>
      </div>
      {error ? <FormErrorMessage error={error} errorClassName={errorClassName} /> : null}
    </div>
  );
}

export { Switch };
