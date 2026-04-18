'use client';

import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';

import { FORM_SIZE_STYLES, type FormSize } from '../../constants/form-sizes';
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
  size?: FormSize;
  label?: string | React.ReactNode;
  labelClassName?: React.ComponentProps<typeof Label>['className'];
  containerClassName?: React.ComponentProps<'div'>['className'];
};

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
        'group/radio-group-item peer relative flex aspect-square shrink-0 rounded-full border border-input outline-none after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary',
        FORM_SIZE_STYLES[size].icon,
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={cn('flex items-center justify-center', FORM_SIZE_STYLES[size].icon)}
      >
        <span
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground',
            FORM_SIZE_STYLES[size].radioDot,
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
