'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from './sheet';
import { Button } from './button';
import { ScrollArea } from './scroll-area';

const panelVariants = cva('flex h-full flex-col gap-0', {
  variants: {
    size: {
      sm: 'data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm',
      md: 'data-[side=left]:sm:max-w-md data-[side=right]:sm:max-w-md',
      lg: 'data-[side=left]:sm:max-w-lg data-[side=right]:sm:max-w-lg',
      xl: 'data-[side=left]:sm:max-w-xl data-[side=right]:sm:max-w-xl',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

const headerVariants = cva('shrink-0', {
  variants: {
    size: {
      sm: 'p-4',
      md: 'px-5 py-4',
      lg: 'px-6 py-5',
      xl: 'px-6 py-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const bodyVariants = cva('min-h-0 flex-1 overflow-y-auto', {
  variants: {
    size: {
      sm: 'p-4',
      md: 'px-5 py-4',
      lg: 'px-6 py-5',
      xl: 'px-6 py-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const footerVariants = cva('flex gap-3 justify-end', {
  variants: {
    size: {
      sm: 'p-4',
      md: 'px-5 py-4',
      lg: 'px-6 py-5',
      xl: 'px-6 py-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type SheetPanelProps = {
  side?: 'top' | 'bottom' | 'left' | 'right';
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showFooter?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  className?: string;
} & VariantProps<typeof panelVariants>;

function SheetPanel({
  side,
  size = 'md',
  title,
  description,
  children,
  footer,
  showFooter = true,
  confirmText = 'Áp dụng',
  cancelText = 'Hủy',
  onConfirm,
  className,
}: SheetPanelProps) {
  const hasHeader = title || description;
  const buttonSize = size === 'sm' ? 'sm' : 'default';

  return (
    <SheetContent side={side} className={panelVariants({ size, className })}>
      {hasHeader && (
        <div className={headerVariants({ size, className: 'pb-0' })}>
          {title && <SheetTitle>{title}</SheetTitle>}
          {description && <SheetDescription className="mt-1.5">{description}</SheetDescription>}
        </div>
      )}

      <ScrollArea className={bodyVariants({ size })}>{children}</ScrollArea>

      {showFooter && (
        <div className={footerVariants({ size, className: 'pt-0' })}>
          {footer ?? (
            <>
              <SheetClose
                render={
                  <Button variant="secondary" size={buttonSize} className="min-w-25">
                    {cancelText}
                  </Button>
                }
              />
              <Button size={buttonSize} className="min-w-25" onClick={onConfirm}>
                {confirmText}
              </Button>
            </>
          )}
        </div>
      )}
    </SheetContent>
  );
}

const SheetPanelRoot = Sheet;
const SheetPanelTrigger = SheetTrigger;
const SheetPanelClose = SheetClose;

export { SheetPanel, SheetPanelRoot, SheetPanelTrigger, SheetPanelClose };
export type { SheetPanelProps };
