'use client';

import { Switch as SwitchPrimitive } from '@base-ui/react/switch';

import { DEFAULT_SWITCH_SIZE, type FormSize } from '../../constants/form-sizes';
import { cn } from '../../lib/utils';
import { FormErrorMessage } from './form-error-message';
import { FormLabel } from './form-label';
import { Label } from './label';

const switchSizeStyles: Record<FormSize, { root: string; thumb: string; checked: string }> = {
  xxs: { root: 'h-3 w-5', thumb: 'size-2', checked: 'data-checked:translate-x-2' },
  xs: { root: 'h-3.5 w-6', thumb: 'size-3', checked: 'data-checked:translate-x-2.5' },
  sm: { root: 'h-4 w-7', thumb: 'size-3.5', checked: 'data-checked:translate-x-3' },
  md: { root: 'h-5 w-9', thumb: 'size-4', checked: 'data-checked:translate-x-4' },
  lg: { root: 'h-6 w-11', thumb: 'size-5', checked: 'data-checked:translate-x-5' },
  xl: { root: 'h-7 w-12', thumb: 'size-6', checked: 'data-checked:translate-x-5' },
  xxl: { root: 'h-8 w-14', thumb: 'size-7', checked: 'data-checked:translate-x-6' },
};

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
  size = DEFAULT_SWITCH_SIZE,
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
            'peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent p-0.5 transition-all outline-none after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50',
            switchSizeStyles[size].root,
            className,
          )}
          {...props}
        >
          <SwitchPrimitive.Thumb
            data-slot="switch-thumb"
            className={cn(
              'pointer-events-none block rounded-full bg-background ring-0 transition-transform data-unchecked:translate-x-0 dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground',
              switchSizeStyles[size].thumb,
              switchSizeStyles[size].checked,
            )}
          />
        </SwitchPrimitive.Root>
      </div>
      {error ? <FormErrorMessage error={error} errorClassName={errorClassName} /> : null}
    </div>
  );
}

export { Switch };
