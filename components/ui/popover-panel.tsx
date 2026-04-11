'use client';

import * as React from 'react';

import { cn } from '../../lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from './popover';

const PopoverPanelRoot = Popover;
const PopoverPanelTrigger = PopoverTrigger;

type PopoverPanelProps = React.ComponentProps<typeof PopoverContent> & {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'auto';
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
};

const popoverPanelSizeClassName: Record<NonNullable<PopoverPanelProps['size']>, string> = {
  sm: 'w-72',
  md: 'w-80',
  lg: 'w-96',
  xl: 'w-[28rem]',
  auto: '',
};

const popoverPanelSpacingClassName: Record<
  NonNullable<PopoverPanelProps['size']>,
  { px: string; py: string }
> = {
  sm: { px: 'px-4', py: 'py-4' },
  md: { px: 'px-5', py: 'py-5' },
  lg: { px: 'px-6', py: 'py-6' },
  xl: { px: 'px-6', py: 'py-6' },
  auto: { px: 'px-4', py: 'py-4' },
};

function PopoverPanel({
  size = 'md',
  title,
  description,
  footer,
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
  children,
  ...props
}: PopoverPanelProps) {
  const hasHeader = title !== undefined || description !== undefined;
  const spacing = popoverPanelSpacingClassName[size];

  return (
    <PopoverContent className={cn('p-0', popoverPanelSizeClassName[size], className)} {...props}>
      <div data-slot="popover-panel" className="flex min-w-0 flex-col gap-0">
        {hasHeader && (
          <div
            data-slot="popover-panel-header"
            className={cn('flex flex-col gap-1.5', spacing.px, spacing.py, headerClassName)}
          >
            {title !== undefined && <PopoverTitle>{title}</PopoverTitle>}
            {description !== undefined && <PopoverDescription>{description}</PopoverDescription>}
          </div>
        )}
        <div
          data-slot="popover-panel-body"
          className={cn('min-w-0', spacing.px, !hasHeader && spacing.py, bodyClassName)}
        >
          {children}
        </div>
        {footer !== undefined && (
          <div
            data-slot="popover-panel-footer"
            className={cn('mt-auto flex flex-col gap-2', spacing.px, spacing.py, footerClassName)}
          >
            {footer}
          </div>
        )}
      </div>
    </PopoverContent>
  );
}

export { PopoverPanel, PopoverPanelRoot, PopoverPanelTrigger };
