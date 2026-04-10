import React from 'react';
import { cn } from '../../lib/utils';
import { Label } from './label';

type FormLabelProps = {
  label: string | React.ReactNode;
  required?: boolean;
  htmlFor: React.ComponentProps<typeof Label>['htmlFor'];
  className?: React.ComponentProps<typeof Label>['className'];
};

export function FormLabel({ label, htmlFor, required, className }: FormLabelProps) {
  return (
    <Label htmlFor={htmlFor} className={cn('block mb-1', className)}>
      {label}
      {required ? <span className="ml-1 text-destructive">*</span> : null}
    </Label>
  );
}
