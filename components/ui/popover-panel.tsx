'use client';

import { ScrollArea } from './scroll-area';
import { cva, type VariantProps } from 'class-variance-authority';
import { XIcon } from 'lucide-react';
import * as React from 'react';
import { Button } from './button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from './popover';

const panelVariants = cva('p-0 gap-0', {
  variants: {
    size: {
      sm: 'w-72',
      md: 'w-80',
      lg: 'w-96',
      xl: 'w-[28rem]',
      auto: '',
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
      auto: 'p-4',
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
      auto: 'p-4',
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
      auto: 'p-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type PopoverPanelProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showFooter?: boolean;
  confirmText?: string;
  cancelText?: string;
  showCloseButton?: boolean;
  className?: string;
  onConfirm?: () => void;
} & VariantProps<typeof panelVariants>;

function PopoverPanel({
  size,
  title,
  description,
  children,
  footer,
  showFooter = true,
  confirmText = 'Áp dụng',
  cancelText = 'Hủy',
  showCloseButton = true,
  className,
  onConfirm,
}: PopoverPanelProps) {
  const hasHeader = title || description;
  const buttonSize = size === 'sm' ? 'sm' : 'default';

  return (
    <PopoverContent className={panelVariants({ size, className })}>
      {hasHeader && (
        <div className={headerVariants({ size, className: 'pb-0' })}>
          {title && <PopoverTitle>{title}</PopoverTitle>}
          {description && <PopoverDescription className="mt-1.5">{description}</PopoverDescription>}
        </div>
      )}

      <ScrollArea className="min-h-0 flex-1 overflow-y-auto">
        <div className={bodyVariants({ size })}>{children}</div>
      </ScrollArea>
      
      {showFooter && (
        <div className={footerVariants({ size, className: 'pt-0' })}>
          {footer ?? (
            <>
              <PopoverClose
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

      {showCloseButton && (
        <PopoverClose
          data-slot="popover-close"
          render={
            <Button className="absolute top-4 right-4 p-0 h-fit w-fit" variant="ghost" size="icon">
              <XIcon className="size-5" />
              <span className="sr-only">Close</span>
            </Button>
          }
        />
      )}
    </PopoverContent>
  );
}

const PopoverPanelRoot = Popover;
const PopoverPanelTrigger = PopoverTrigger;
const PopoverPanelClose = PopoverClose;

export { PopoverPanel, PopoverPanelRoot, PopoverPanelTrigger, PopoverPanelClose };
export type { PopoverPanelProps };
