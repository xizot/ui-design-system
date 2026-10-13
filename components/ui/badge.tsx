'use client';

import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import { XIcon } from 'lucide-react';
import { isValidElement, type ComponentProps, type Key, type ReactNode } from 'react';

import { cn } from '../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

const badgeVariants = cva(
  'group/badge inline-flex w-fit max-w-full shrink-0 items-center justify-center gap-1 whitespace-nowrap border font-medium leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        'pill-color': 'rounded-full',
        'pill-outline': 'rounded-full bg-transparent',
        'badge-color': 'rounded-sm',
        'badge-modern': 'rounded-sm bg-transparent',
        default: 'border-transparent bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20',
        outline: 'border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
        ghost:
          'border-transparent hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50',
        link: 'border-transparent text-primary underline-offset-4 hover:underline',
      },
      size: {
        xxs: 'h-4 px-1 text-[10px] [&_svg]:size-2.5',
        xs: 'h-4.5 px-1.5 text-xs [&_svg]:size-3',
        sm: 'h-5 px-1.5 text-xs [&_svg]:size-3',
        md: 'h-6 px-2 text-sm [&_svg]:size-3',
        lg: 'h-7 gap-1.5 px-2.5 text-sm [&_svg]:size-3.5',
        xl: 'h-8 gap-1.5 px-3 text-base [&_svg]:size-4',
        xxl: 'h-9 gap-2 px-3.5 text-base [&_svg]:size-4',
      },
      shape: {
        default: '',
        'icon-only': 'aspect-square px-0',
      },
    },
    defaultVariants: {
      variant: 'badge-modern',
      size: 'md',
      shape: 'default',
    },
  },
);

const badgeColorClasses = {
  neutral: {
    fill: 'border-border bg-muted text-foreground',
    outline: 'border-border text-foreground',
  },
  brand: {
    fill: 'border-primary/30 bg-primary/10 text-primary dark:border-primary/40 dark:bg-primary/15',
    outline: 'border-primary/50 text-primary',
  },
  error: {
    fill: 'border-destructive/30 bg-destructive/10 text-destructive dark:bg-destructive/20',
    outline: 'border-destructive/50 text-destructive',
  },
  warning: {
    fill: 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300',
    outline: 'border-amber-600/50 text-amber-800 dark:border-amber-400/50 dark:text-amber-300',
  },
  success: {
    fill: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300',
    outline:
      'border-emerald-600/50 text-emerald-800 dark:border-emerald-400/50 dark:text-emerald-300',
  },
  info: {
    fill: 'border-sky-500/30 bg-sky-500/10 text-sky-800 dark:bg-sky-400/15 dark:text-sky-300',
    outline: 'border-sky-600/50 text-sky-800 dark:border-sky-400/50 dark:text-sky-300',
  },
  purple: {
    fill: 'border-violet-500/30 bg-violet-500/10 text-violet-800 dark:bg-violet-400/15 dark:text-violet-300',
    outline: 'border-violet-600/50 text-violet-800 dark:border-violet-400/50 dark:text-violet-300',
  },
} as const;

type BadgeColor = keyof typeof badgeColorClasses;
type BadgeSize = NonNullable<VariantProps<typeof badgeVariants>['size']>;
type BadgeProps = useRender.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { color?: BadgeColor };

function Badge({
  className,
  variant = 'badge-modern',
  color = 'neutral',
  size = 'md',
  shape = 'default',
  render,
  ...props
}: BadgeProps) {
  const colorStyle = badgeColorClasses[color];
  const semanticColor =
    variant === 'pill-color' || variant === 'badge-color'
      ? colorStyle.fill
      : variant === 'pill-outline' || variant === 'badge-modern'
        ? colorStyle.outline
        : undefined;

  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ variant, size, shape }), semanticColor, className),
      },
      props,
    ),
    render,
    state: {
      slot: 'badge',
      variant,
      color,
      size,
      shape,
    },
  });
}

type BadgeAvatarProps = Omit<ComponentProps<typeof Avatar>, 'children'> & {
  src?: string;
  name: string;
};
type BadgeDismissProps = ComponentProps<'button'> & { label?: string };

function BadgeIcon({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="badge-icon"
      aria-hidden="true"
      className={cn('inline-flex shrink-0 items-center justify-center', className)}
      {...props}
    />
  );
}

function BadgeDot({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="badge-dot"
      aria-hidden="true"
      className={cn('inline-flex size-2 shrink-0 items-center justify-center', className)}
      {...props}
    >
      <span className="size-1.5 rounded-full bg-current" />
    </span>
  );
}

function BadgeAvatar({ className, src, name, ...props }: BadgeAvatarProps) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
  return (
    <Avatar data-slot="badge-avatar" className={cn('size-4', className)} {...props}>
      {src ? <AvatarImage src={src} alt={name} /> : null}
      <AvatarFallback className="text-[9px]">{initials}</AvatarFallback>
    </Avatar>
  );
}

function BadgeDismiss({
  className,
  label = 'Remove',
  type = 'button',
  ...props
}: BadgeDismissProps) {
  return (
    <button
      data-slot="badge-dismiss"
      type={type}
      aria-label={label}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-current disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <XIcon aria-hidden="true" />
    </button>
  );
}

type BadgeGroupItem = {
  id?: Key;
  label: ReactNode;
  className?: string;
};

type BadgeGroupProps = Omit<ComponentProps<'div'>, 'children'> & {
  items: Array<BadgeGroupItem | ReactNode>;
  limitTags?: number;
  badgeSize?: BadgeSize;
  badgeClassName?: string;
  overflowSize?: BadgeSize;
  overflowClassName?: string;
  getOverflowLabel?: (count: number) => ReactNode;
};

function BadgeGroup({
  items,
  limitTags,
  badgeSize = 'sm',
  badgeClassName,
  overflowSize = badgeSize,
  overflowClassName,
  getOverflowLabel = (count) => `+${count}`,
  className,
  ...props
}: BadgeGroupProps) {
  const normalizedItems = items.map(normalizeBadgeGroupItem);
  const visibleItems =
    limitTags === undefined || limitTags < 0
      ? normalizedItems
      : normalizedItems.slice(0, limitTags);
  const hiddenItems = normalizedItems.slice(visibleItems.length);
  const hiddenCount = Math.max(0, items.length - visibleItems.length);

  return (
    <div className={cn('flex min-w-0 flex-wrap items-center gap-1.5', className)} {...props}>
      {visibleItems.map((item, index) => (
        <Badge
          key={item.id ?? index}
          variant="badge-modern"
          size={badgeSize}
          className={cn(badgeClassName, item.className)}
        >
          {item.label}
        </Badge>
      ))}
      {hiddenCount > 0 ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={
                <Badge
                  variant="pill-color"
                  color="brand"
                  size={overflowSize}
                  className={cn('cursor-default', badgeClassName, overflowClassName)}
                >
                  {getOverflowLabel(hiddenCount)}
                </Badge>
              }
            />
            <TooltipContent className="max-w-sm p-2">
              <div className="flex max-h-60 max-w-sm flex-wrap gap-1 overflow-y-auto">
                {hiddenItems.map((item, index) => (
                  <Badge
                    key={item.id ?? `hidden-${index}`}
                    variant="badge-modern"
                    size={badgeSize}
                    className={cn(badgeClassName, item.className)}
                  >
                    {item.label}
                  </Badge>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : null}
    </div>
  );
}

function normalizeBadgeGroupItem(item: BadgeGroupItem | ReactNode): BadgeGroupItem {
  if (typeof item === 'object' && item !== null && !isValidElement(item) && 'label' in item) {
    return item as BadgeGroupItem;
  }

  return { label: item };
}

export { Badge, BadgeAvatar, BadgeDismiss, BadgeDot, BadgeGroup, BadgeIcon, badgeVariants };
export type {
  BadgeAvatarProps,
  BadgeColor,
  BadgeDismissProps,
  BadgeGroupItem,
  BadgeGroupProps,
  BadgeProps,
  BadgeSize,
};
