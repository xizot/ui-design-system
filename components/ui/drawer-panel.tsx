'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { XIcon } from 'lucide-react';
import * as React from 'react';
import { Button } from './button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';
import { ScrollArea } from './scroll-area';

const panelVariants = cva('flex h-full flex-col gap-0', {
  variants: {
    size: {
      sm: 'data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=right]:sm:max-w-sm data-[vaul-drawer-direction=bottom]:max-h-[40vh] data-[vaul-drawer-direction=top]:max-h-[40vh]',
      md: 'data-[vaul-drawer-direction=left]:sm:max-w-md data-[vaul-drawer-direction=right]:sm:max-w-md data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]',
      lg: 'data-[vaul-drawer-direction=left]:sm:max-w-lg data-[vaul-drawer-direction=right]:sm:max-w-lg data-[vaul-drawer-direction=bottom]:max-h-[60vh] data-[vaul-drawer-direction=top]:max-h-[60vh]',
      xl: 'data-[vaul-drawer-direction=left]:sm:max-w-xl data-[vaul-drawer-direction=right]:sm:max-w-xl data-[vaul-drawer-direction=bottom]:max-h-[70vh] data-[vaul-drawer-direction=top]:max-h-[70vh]',
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

const bodyVariants = cva('', {
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

type DrawerPanelProps = {
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

function DrawerPanel({
  size = 'md',
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
}: DrawerPanelProps) {
  const hasHeader = title || description;
  const buttonSize = size === 'sm' ? 'sm' : 'default';

  return (
    <DrawerContent className={panelVariants({ size, className })}>
      {hasHeader && (
        <div className={headerVariants({ size, className: 'pb-0' })}>
          {title && <DrawerTitle>{title}</DrawerTitle>}
          {description && <DrawerDescription className="mt-1.5">{description}</DrawerDescription>}
        </div>
      )}

      <ScrollArea className="min-h-0 flex-1 overflow-y-auto">
        <div className={bodyVariants({ size })}>{children}</div>
      </ScrollArea>

      {showFooter && (
        <div className={footerVariants({ size, className: 'pt-0' })}>
          {footer ?? (
            <>
              <DrawerClose asChild>
                <Button variant="secondary" size={buttonSize} className="min-w-25">
                  {cancelText}
                </Button>
              </DrawerClose>
              <Button size={buttonSize} className="min-w-25" onClick={onConfirm}>
                {confirmText}
              </Button>
            </>
          )}
        </div>
      )}

      {showCloseButton && (
        <DrawerClose data-slot="drawer-close" asChild>
          <Button className="absolute top-4 right-4 p-0 h-fit w-fit" variant="ghost" size="icon">
            <XIcon className="size-5" />
            <span className="sr-only">Close</span>
          </Button>
        </DrawerClose>
      )}
    </DrawerContent>
  );
}

const DrawerPanelRoot = Drawer;
const DrawerPanelTrigger = DrawerTrigger;
const DrawerPanelClose = DrawerClose;

export { DrawerPanel, DrawerPanelClose, DrawerPanelRoot, DrawerPanelTrigger };
export type { DrawerPanelProps };
