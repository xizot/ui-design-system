'use client';

import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import { isValidElement, type ComponentProps, type Key, type ReactNode } from 'react';

import { cn } from '../../lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

const badgeGroupSizeClasses = {
  sm: '',
  md: 'h-6 px-2.5 py-1',
  lg: 'h-7 px-3 py-1 text-sm',
} as const;

const badgeGroupDefaultClassName = 'border-border bg-background text-foreground';
const badgeGroupOverflowClassName =
  'border-primary/30 bg-primary/10 text-primary dark:border-primary/50 dark:bg-primary/20 dark:text-primary';

type BadgeGroupSize = keyof typeof badgeGroupSizeClasses;

const badgeVariants = cva(
  'group/badge rounded-sm inline-flex min-w-10 h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        secondary: 'bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80',
        destructive:
          'bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20',
        outline: 'border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
        ghost: 'hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-5',
        md: 'h-6',
        lg: 'h-8 rounded-md text-md',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Badge({
  className,
  variant = 'default',
  size = 'md',
  render,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ variant, size }), className),
      },
      props,
    ),
    render,
    state: {
      slot: 'badge',
      variant,
      size,
    },
  });
}

type BadgeGroupItem = {
  id?: Key;
  label: ReactNode;
  className?: string;
};

type BadgeGroupProps = Omit<ComponentProps<'div'>, 'children'> & {
  items: Array<BadgeGroupItem | ReactNode>;
  limitTags?: number;
  badgeSize?: BadgeGroupSize;
  badgeClassName?: string;
  overflowSize?: BadgeGroupSize;
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
          variant="outline"
          className={cn(
            badgeGroupDefaultClassName,
            badgeGroupSizeClasses[badgeSize],
            badgeClassName,
            item.className,
          )}
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
                  variant="outline"
                  className={cn(
                    'cursor-default',
                    badgeGroupOverflowClassName,
                    badgeGroupSizeClasses[overflowSize],
                    badgeClassName,
                    overflowClassName,
                  )}
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
                    variant="outline"
                    className={cn(
                      badgeGroupDefaultClassName,
                      badgeGroupSizeClasses[badgeSize],
                      badgeClassName,
                      item.className,
                    )}
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

export { Badge, BadgeGroup, badgeVariants };
export type { BadgeGroupItem, BadgeGroupSize };
