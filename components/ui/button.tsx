import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { FORM_SIZE_STYLES } from '@/constants/form-sizes';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        outline:
          'border-border bg-background shadow-xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: `${FORM_SIZE_STYLES.md.height} ${FORM_SIZE_STYLES.md.padding} ${FORM_SIZE_STYLES.md.text} gap-1.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 ${FORM_SIZE_STYLES.md.svgIcon}`,
        xxs: `${FORM_SIZE_STYLES.xxs.height} ${FORM_SIZE_STYLES.xxs.padding} ${FORM_SIZE_STYLES.xxs.text} gap-1 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 ${FORM_SIZE_STYLES.xxs.svgIcon}`,
        xs: `${FORM_SIZE_STYLES.xs.height} ${FORM_SIZE_STYLES.xs.padding} ${FORM_SIZE_STYLES.xs.text} gap-1 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 ${FORM_SIZE_STYLES.xs.svgIcon}`,
        sm: `${FORM_SIZE_STYLES.sm.height} ${FORM_SIZE_STYLES.sm.padding} ${FORM_SIZE_STYLES.sm.text} gap-1 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 ${FORM_SIZE_STYLES.sm.svgIcon}`,
        md: `${FORM_SIZE_STYLES.md.height} ${FORM_SIZE_STYLES.md.padding} ${FORM_SIZE_STYLES.md.text} gap-1.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 ${FORM_SIZE_STYLES.md.svgIcon}`,
        lg: `${FORM_SIZE_STYLES.lg.height} ${FORM_SIZE_STYLES.lg.padding} ${FORM_SIZE_STYLES.lg.text} gap-1.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 ${FORM_SIZE_STYLES.lg.svgIcon}`,
        xl: `${FORM_SIZE_STYLES.xl.height} ${FORM_SIZE_STYLES.xl.padding} ${FORM_SIZE_STYLES.xl.text} gap-1.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 ${FORM_SIZE_STYLES.xl.svgIcon}`,
        xxl: `${FORM_SIZE_STYLES.xxl.height} ${FORM_SIZE_STYLES.xxl.padding} ${FORM_SIZE_STYLES.xxl.text} gap-1.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 ${FORM_SIZE_STYLES.xxl.svgIcon}`,
        icon: FORM_SIZE_STYLES.md.iconButton,
        'icon-xxs': `${FORM_SIZE_STYLES.xxs.iconButton} ${FORM_SIZE_STYLES.xxs.svgIcon}`,
        'icon-xs': `${FORM_SIZE_STYLES.xs.iconButton} ${FORM_SIZE_STYLES.xs.svgIcon}`,
        'icon-sm': `${FORM_SIZE_STYLES.sm.iconButton} ${FORM_SIZE_STYLES.sm.svgIcon}`,
        'icon-md': `${FORM_SIZE_STYLES.md.iconButton} ${FORM_SIZE_STYLES.md.svgIcon}`,
        'icon-lg': `${FORM_SIZE_STYLES.lg.iconButton} ${FORM_SIZE_STYLES.lg.svgIcon}`,
        'icon-xl': `${FORM_SIZE_STYLES.xl.iconButton} ${FORM_SIZE_STYLES.xl.svgIcon}`,
        'icon-xxl': `${FORM_SIZE_STYLES.xxl.iconButton} ${FORM_SIZE_STYLES.xxl.svgIcon}`,
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
