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
import { cn } from '../../lib/utils';

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

type SheetPanelContentProps = {
  side?: 'top' | 'bottom' | 'left' | 'right';
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  showFooter?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  className?: string;
} & VariantProps<typeof panelVariants>;

const SheetPanelSizeContext =
  React.createContext<VariantProps<typeof panelVariants>['size']>(undefined);

function SheetPanelFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const size = React.useContext(SheetPanelSizeContext);

  return (
    <div
      data-slot="sheet-panel-footer"
      className={footerVariants({ size, className: cn('pt-0', className) })}
      {...props}
    />
  );
}

function SheetPanelContent({
  side,
  size = 'md',
  title,
  description,
  children,
  showFooter = true,
  confirmText = 'Áp dụng',
  cancelText = 'Hủy',
  onConfirm,
  className,
}: SheetPanelContentProps) {
  const hasHeader = title || description;
  const buttonSize = size === 'sm' ? 'sm' : 'default';
  const panelChildren = React.Children.toArray(children);
  const footer = panelChildren.find(
    (child) => React.isValidElement(child) && child.type === SheetPanelFooter,
  );
  const body = panelChildren.filter(
    (child) => !React.isValidElement(child) || child.type !== SheetPanelFooter,
  );

  return (
    <SheetPanelSizeContext.Provider value={size}>
      <SheetContent side={side} className={panelVariants({ size, className })}>
        {hasHeader && (
          <div className={headerVariants({ size, className: 'pb-0' })}>
            {title && <SheetTitle>{title}</SheetTitle>}
            {description && (
              <SheetDescription className="mt-1.5">
                {description}
              </SheetDescription>
            )}
          </div>
        )}

        <ScrollArea className="min-h-0 flex-1 overflow-y-auto">
          <div className={bodyVariants({ size })}>{body}</div>
        </ScrollArea>

        {showFooter &&
          (footer ?? (
            <SheetPanelFooter>
              <SheetClose
                render={
                  <Button
                    variant="secondary"
                    size={buttonSize}
                    className="min-w-25"
                  >
                    {cancelText}
                  </Button>
                }
              />
              <Button
                size={buttonSize}
                className="min-w-25"
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
            </SheetPanelFooter>
          ))}
      </SheetContent>
    </SheetPanelSizeContext.Provider>
  );
}

const SheetPanel = Sheet;
const SheetPanelTrigger = SheetTrigger;
const SheetPanelClose = SheetClose;

export {
  SheetPanel,
  SheetPanelClose,
  SheetPanelContent,
  SheetPanelFooter,
  SheetPanelTrigger,
};
export type { SheetPanelContentProps };
