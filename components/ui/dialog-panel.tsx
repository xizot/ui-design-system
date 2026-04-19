'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Button } from './button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import { ScrollArea } from './scroll-area';

const panelVariants = cva('max-h-[calc(100vh-2rem)] flex flex-col gap-0 overflow-hidden p-0', {
  variants: {
    size: {
      sm: 'sm:max-w-sm',
      md: 'sm:max-w-md',
      lg: 'sm:max-w-3xl',
      xl: 'sm:max-w-4xl',
      fill: 'sm:!max-w-[calc(100vw-160px)]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const headerVariants = cva('shrink-0', {
  variants: {
    size: {
      sm: 'p-4',
      md: 'px-5 py-4',
      lg: 'px-6 py-5',
      xl: 'px-6 py-5',
      fill: 'px-6 py-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const bodyVariants = cva('', {
  variants: {
    size: {
      sm: 'p-4',
      md: 'px-5 py-4',
      lg: 'px-6 py-5',
      xl: 'px-6 py-5',
      fill: 'px-6 py-5',
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
      fill: 'px-6 py-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type DialogPanelProps = {
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

function DialogPanel({
  size,
  title,
  description,
  children,
  footer,
  showFooter = true,
  confirmText = 'Áp dụng',
  cancelText = 'Hủy',
  onConfirm,
  className,
}: DialogPanelProps) {
  const hasHeader = title || description;
  const buttonSize = size === 'sm' ? 'sm' : 'default';

  return (
    <DialogContent className={panelVariants({ size, className })}>
      {hasHeader && (
        <div className={headerVariants({ size, className: 'pb-0' })}>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription className="mt-1.5">{description}</DialogDescription>}
        </div>
      )}

      <ScrollArea className="min-h-0 flex-1 overflow-y-auto">
        <div className={bodyVariants({ size })}>{children}</div>
      </ScrollArea>

      {showFooter && (
        <div className={footerVariants({ size, className: 'pt-0' })}>
          {footer ?? (
            <>
              <DialogClose
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
    </DialogContent>
  );
}
const DialogPanelRoot = Dialog;
const DialogPanelTrigger = DialogTrigger;
const DialogPanelClose = DialogClose;

export { DialogPanel, DialogPanelClose, DialogPanelRoot, DialogPanelTrigger };
export type { DialogPanelProps };
