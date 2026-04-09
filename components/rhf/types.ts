'use client';

import type * as React from 'react';
import type { Control, FieldPathValue, FieldValues, Path, UseFormRegister } from 'react-hook-form';

type RHFControlProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  required?: boolean;
  wrapperClassName?: React.ComponentProps<'div'>['className'];
  labelClassName?: React.ComponentProps<'div'>['className'];
  descriptionClassName?: React.ComponentProps<'div'>['className'];
  errorClassName?: React.ComponentProps<'p'>['className'];
};

type RHFRegisterProps<T extends FieldValues = FieldValues> = RHFControlProps<T> & {
  register: UseFormRegister<T>;
};

type RHFBeforeChange<T extends FieldValues = FieldValues> = (
  newValue: boolean,
  currentValue: FieldPathValue<T, Path<T>>,
  onNextAction: () => void,
) => void;

export type { RHFBeforeChange, RHFControlProps, RHFRegisterProps };
