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

const sheetPanelSpacing: Record<
  NonNullable<SheetPanelProps['size']>,
  { inline: number; block: number }
> = {
  sm: { inline: 16, block: 16 },
  md: { inline: 20, block: 16 },
  lg: { inline: 24, block: 20 },
  xl: { inline: 24, block: 20 },
  auto: { inline: 16, block: 16 },
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
  const spacing = sheetPanelSpacing[size];

  return (
    <SheetContent className={cn(sheetSizeClassName[size], className)} {...props}>
      <div data-slot="sheet-panel" className="flex h-full min-w-0 flex-col gap-0">
        {hasHeader && (
          <div
            data-slot="sheet-panel-header"
            className={cn('flex flex-col gap-1.5', headerClassName)}
            style={{ paddingInline: spacing.inline, paddingBlock: spacing.block }}
          >
            {title !== undefined && <SheetTitle>{title}</SheetTitle>}
            {description !== undefined && <SheetDescription>{description}</SheetDescription>}
          </div>
        )}
        <div
          className={cn('min-h-0 flex-1')}
          style={{
            paddingInline: `calc(${spacing.inline}px - 4px)`,
            paddingBlock: !hasHeader ? `calc(${spacing.block}px - 4px)` : 0,
          }}
        >
          <div
            data-slot="sheet-panel-body"
            className={cn('h-full overflow-y-auto p-1', bodyClassName)}
          >
            {children}
          </div>
        </div>
        {footer !== undefined && (
          <div
            data-slot="sheet-panel-footer"
            className={cn('mt-auto flex flex-col gap-2', footerClassName)}
            style={{ paddingInline: spacing.inline, paddingBlock: spacing.block }}
          >
            {footer}
          </div>
        )}
      </div>
    </SheetContent>
  );
}

export { SheetPanel, SheetPanelClose, SheetPanelRoot, SheetPanelTrigger };
