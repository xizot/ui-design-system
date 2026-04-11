'use client';

import * as React from 'react';

import { cn } from '../../lib/utils';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from './sheet';

const SheetPanelRoot = Sheet;
const SheetPanelTrigger = SheetTrigger;
const SheetPanelClose = SheetClose;

type SheetPanelProps = React.ComponentProps<typeof SheetContent> & {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'auto';
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
};

const sheetSizeClassName: Record<NonNullable<SheetPanelProps['size']>, string> = {
  sm: 'data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm',
  md: 'data-[side=left]:sm:max-w-md data-[side=right]:sm:max-w-md',
  lg: 'data-[side=left]:sm:max-w-lg data-[side=right]:sm:max-w-lg',
  xl: 'data-[side=left]:sm:max-w-xl data-[side=right]:sm:max-w-xl',
  auto: '',
};

const sheetPanelSpacingClassName: Record<
  NonNullable<SheetPanelProps['size']>,
  { px: string; py: string }
> = {
  sm: { px: 'px-4', py: 'py-4' },
  md: { px: 'px-5', py: 'py-4' },
  lg: { px: 'px-6', py: 'py-5' },
  xl: { px: 'px-6', py: 'py-5' },
  auto: { px: 'px-4', py: 'py-4' },
};

function SheetPanel({
  size = 'sm',
  title,
  description,
  footer,
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
  children,
  ...props
}: SheetPanelProps) {
  const hasHeader = title !== undefined || description !== undefined;
  const spacing = sheetPanelSpacingClassName[size];

  return (
    <SheetContent className={cn(sheetSizeClassName[size], className)} {...props}>
      <div data-slot="sheet-panel" className="flex h-full min-w-0 flex-col gap-0">
        {hasHeader && (
          <div
            data-slot="sheet-panel-header"
            className={cn('flex flex-col gap-1.5', spacing.px, spacing.py, headerClassName)}
          >
            {title !== undefined && <SheetTitle>{title}</SheetTitle>}
            {description !== undefined && <SheetDescription>{description}</SheetDescription>}
          </div>
        )}
        <div
          data-slot="sheet-panel-body"
          className={cn(
            'min-h-0 flex-1 overflow-y-auto',
            spacing.px,
            !hasHeader && spacing.py,
            !footer && spacing.py,
            bodyClassName,
          )}
        >
          {children}
        </div>
        {footer !== undefined && (
          <div
            data-slot="sheet-panel-footer"
            className={cn('mt-auto flex flex-col gap-2', spacing.px, spacing.py, footerClassName)}
          >
            {footer}
          </div>
        )}
      </div>
    </SheetContent>
  );
}

export { SheetPanel, SheetPanelClose, SheetPanelRoot, SheetPanelTrigger };
