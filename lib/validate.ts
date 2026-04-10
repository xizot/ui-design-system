export const FORM_MESSAGES = {
  REQUIRED: 'Thông tin bắt buộc',
  POSITIVE: 'Giá trị phải là số dương',
  GREATER_THAN_ZERO: 'Giá trị phải lớn hơn 0',
  MAX_VALUE: (maxValue: number | string) => `Giá trị phải nhỏ hơn ${maxValue}`,
  MIN_VALUE: (minValue: number | string) => `Giá trị phải lớn hơn ${minValue}`,
};

import { hasValue } from '@/lib/utils';
import z from 'zod';

// ================================ zString ================================

export function zString(options: {
  nullable: true;
  optional?: false;
  max?: number;
  min?: number;
  requiredMessage?: string;
  tooBigMessage?: string;
  tooSmallMessage?: string;
}): z.ZodNullable<z.ZodString>;

export function zString(options: {
  nullable?: false;
  optional: true;
  max?: number;
  min?: number;
  requiredMessage?: string;
  tooBigMessage?: string;
  tooSmallMessage?: string;
}): z.ZodOptional<z.ZodString>;

export function zString(options?: {
  nullable?: false;
  optional?: false;
  max?: number;
  min?: number;
  requiredMessage?: string;
  tooBigMessage?: string;
  tooSmallMessage?: string;
}): z.ZodString;

export function zString(options: {
  nullable: true;
  optional: true;
  max?: number;
  min?: number;
  requiredMessage?: string;
  tooBigMessage?: string;
  tooSmallMessage?: string;
}): z.ZodNullable<z.ZodString> | z.ZodOptional<z.ZodString>;

export function zString(options?: {
  min?: number;
  max?: number;
  nullable?: boolean;
  optional?: boolean;
  requiredMessage?: string;
  tooBigMessage?: string;
  tooSmallMessage?: string;
}) {
  const {
    requiredMessage = FORM_MESSAGES.REQUIRED,
    min,
    max,
    tooSmallMessage,
    tooBigMessage,
    nullable = false,
    optional = false,
  } = options || {};

  let schema = z.string({ message: requiredMessage });

  if (!optional && !nullable) {
    schema = schema.nonempty(requiredMessage);
  }

  if (min !== undefined) {
    schema = schema.min(min, tooSmallMessage || FORM_MESSAGES.MIN_VALUE(min));
  }

  if (max !== undefined) {
    schema = schema.max(max, tooBigMessage || FORM_MESSAGES.MAX_VALUE(max));
  }

  if (nullable && optional) {
    return schema.nullable().optional();
  } else if (nullable) {
    return schema.nullable();
  } else if (optional) {
    return schema.optional();
  }

  return schema;
}

// ================================ zNumber ================================
export function zNumber(options: {
  nullable: true;
  optional?: false;
  min?: number;
  max?: number;
  requiredMessage?: string;
  tooBigMessage?: string;
  tooSmallMessage?: string;
}): z.ZodNullable<z.ZodNumber>;

export function zNumber(options: {
  nullable?: false;
  optional: true;
  min?: number;
  max?: number;
  requiredMessage?: string;
  tooBigMessage?: string;
  tooSmallMessage?: string;
}): z.ZodOptional<z.ZodNumber>;

export function zNumber(options?: {
  nullable?: false;
  optional?: false;
  min?: number;
  max?: number;
  requiredMessage?: string;
  tooBigMessage?: string;
  tooSmallMessage?: string;
}): z.ZodNumber;

export function zNumber(options: {
  nullable: true;
  optional: true;
  max?: number;
  min?: number;
  requiredMessage?: string;
  tooBigMessage?: string;
  tooSmallMessage?: string;
}): z.ZodNullable<z.ZodOptional<z.ZodNumber>>;

export function zNumber(options?: {
  min?: number;
  max?: number;
  nullable?: boolean;
  optional?: boolean;
  int?: boolean;
  positive?: boolean;

  requiredMessage?: string;
  tooBigMessage?: string;
  tooSmallMessage?: string;
}):
  | z.ZodNumber
  | z.ZodOptional<z.ZodNumber>
  | z.ZodNullable<z.ZodNumber>
  | z.ZodNullable<z.ZodOptional<z.ZodNumber>>
  | z.ZodOptional<z.ZodNullable<z.ZodNumber>> {
  const {
    requiredMessage = FORM_MESSAGES.REQUIRED,
    min,
    max,
    tooSmallMessage,
    tooBigMessage,
    nullable = false,
    optional = false,
    int = false,
    positive = false,
  } = options || {};

  let schema = z.coerce.number();

  if (int) {
    schema = schema.int(FORM_MESSAGES.POSITIVE);
  }

  if (positive) {
    schema = schema.positive(FORM_MESSAGES.POSITIVE);
  }

  if (!optional && !nullable) {
    schema = schema.refine((val) => val !== undefined, requiredMessage);
  }

  if (min !== undefined) {
    schema = schema.min(min, tooSmallMessage ?? FORM_MESSAGES.MIN_VALUE(min));
  }

  if (max !== undefined) {
    schema = schema.max(max, tooBigMessage ?? FORM_MESSAGES.MAX_VALUE(max));
  }

  let innerSchema: z.ZodTypeAny = schema;
  if (nullable && optional) {
    innerSchema = schema.nullable().optional();
  } else if (nullable) {
    innerSchema = schema.nullable();
  } else if (optional) {
    innerSchema = schema.optional();
  }

  return z.preprocess(
    (val) => (!hasValue(val) || (typeof val === 'number' && isNaN(val)) ? undefined : val),
    innerSchema,
  ) as unknown as z.ZodNumber;
}

// ================================ zArray ================================
export const zStringArrayFilter = z
  .preprocess((val) => (hasValue(val) ? String(val).split(',') : null), z.array(z.string()))
  .optional()
  .nullable();
