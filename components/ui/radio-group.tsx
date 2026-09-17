'use client';

import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import { cva } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import { FormErrorMessage } from './form-error-message';
import { FormLabel } from './form-label';
import { Label } from './label';

type RadioGroupProps = RadioGroupPrimitive.Props & {
  label?: string | React.ReactNode;
  required?: boolean;
  labelClassName?: React.ComponentProps<typeof Label>['className'];
  errorClassName?: React.ComponentProps<'p'>['className'];
  wrapperClassName?: React.ComponentProps<'div'>['className'];
  error?: string;
};

type RadioGroupItemProps = RadioPrimitive.Root.Props & {
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  label?: string | React.ReactNode;
  labelClassName?: React.ComponentProps<typeof Label>['className'];
  containerClassName?: React.ComponentProps<'div'>['className'];
};
const radioItemVariants = cva('', {
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

const radioIndicatorVariants = cva('', {
  variants: {
    size: {
      xxs: 'size-1.5',
      xs: 'size-2',
      sm: 'size-2.5',
      md: 'size-2.5',
      lg: 'size-3',
      xl: 'size-3.5',
      xxl: 'size-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

function RadioGroup({
  className,
  label,
  required,
  labelClassName,
  errorClassName,
  wrapperClassName,
  error,
  ...props
}: RadioGroupProps) {
  return (
    <div className={cn('w-fit', wrapperClassName)}>
      {label ? (
        <FormLabel
          label={label}
          htmlFor={props.id}
          required={required}
          className={labelClassName}
        />
      ) : null}
      <RadioGroupPrimitive
        data-slot="radio-group"
        aria-invalid={!!error}
        className={cn('grid w-full gap-3', className)}
        {...props}
      />
      {error ? <FormErrorMessage error={error} errorClassName={errorClassName} /> : null}
    </div>
  );
}

function RadioGroupItem({
  className,
  size = 'md',
  label,
  labelClassName,
  containerClassName,
  ...props
}: RadioGroupItemProps) {
  const radio = (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        'group/radio-group-item peer border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary relative flex aspect-square shrink-0 rounded-full border outline-none after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3',
        radioItemVariants({ size }),
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={cn('flex items-center justify-center', radioItemVariants({ size }))}
      >
        <span
          className={cn(
            'bg-primary-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full',
            radioIndicatorVariants({ size }),
          )}
        />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );

  if (!label) {
    return radio;
  }

  return (
    <div className={cn('flex items-center gap-2', containerClassName)}>
      {radio}
      <Label htmlFor={props.id} className={labelClassName}>
        {label}
      </Label>
    </div>
  );
}

export { RadioGroup, RadioGroupItem };
export type { RadioGroupItemProps, RadioGroupProps };
