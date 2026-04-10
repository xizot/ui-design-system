import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Default text size class for form components and labels
 * Uses CSS variable --default-text-size which can be configured in CSS
 */

/**
 * Form component size variants
 * All form components should use these sizes for consistency
 */
export const formSizeVariants = cva('', {
  variants: {
    size: {
      xxs: 'h-6 text-xs',
      xs: 'h-8 text-xs',
      sm: 'h-9 text-sm',
      md: 'h-10 text-base',
      lg: 'h-11 text-base',
      xl: 'h-12 text-base',
      xxl: 'h-14 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type FormSize = VariantProps<typeof formSizeVariants>['size'];

/**
 * Size mapping for form components
 * - xxs: 24px height (h-6)
 * - xs: 32px height (h-8)
 * - sm: 36px height (h-9)
 * - md: 40px height (h-10) - default
 * - lg: 44px height (h-11)
 * - xl: 48px height (h-12)
 * - xxl: 56px height (h-14)
 */
export const FORM_SIZES = {
  xxs: {
    height: 'h-7',
    text: 'text-xs',
    padding: 'px-2 py-1',
    icon: 'size-3.5',
    iconButton: 'size-7',
  },
  xs: {
    height: 'h-8',
    text: 'text-xs',
    padding: 'px-2.5 py-1.5',
    icon: 'size-4',
    iconButton: 'size-8',
  },
  sm: {
    height: 'h-9',
    text: 'text-sm',
    padding: 'px-3 py-1.5',
    icon: 'size-5',
    iconButton: 'size-9',
  },
  md: {
    height: 'h-10',
    text: 'text-sm',
    padding: 'px-4 py-2',
    icon: 'size-5',
    iconButton: 'size-10',
  },
  lg: {
    height: 'h-11',
    text: 'text-base',
    padding: 'px-4 py-2.5',
    icon: 'size-6',
    iconButton: 'size-11',
  },
  xl: {
    height: 'h-12',
    text: 'text-base',
    padding: 'px-5 py-3',
    icon: 'size-6',
    iconButton: 'size-12',
  },
  xxl: {
    height: 'h-14',
    text: 'text-lg',
    padding: 'px-6 py-3.5',
    icon: 'size-7',
    iconButton: 'size-14',
  },
} as const;
