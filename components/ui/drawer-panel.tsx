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
import { cn } from '../../lib/utils';

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

type DrawerPanelContentProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  showFooter?: boolean;
  confirmText?: string;
  cancelText?: string;
  showCloseButton?: boolean;
  className?: string;
  onConfirm?: () => void;
} & VariantProps<typeof panelVariants>;

const DrawerPanelSizeContext =
  React.createContext<VariantProps<typeof panelVariants>['size']>(undefined);

function DrawerPanelFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const size = React.useContext(DrawerPanelSizeContext);

  return (
    <div
      data-slot="drawer-panel-footer"
      className={footerVariants({ size, className: cn('pt-0', className) })}
      {...props}
    />
  );
}

function DrawerPanelContent({
  size = 'md',
  title,
  description,
  children,
  showFooter = true,
  confirmText = 'Áp dụng',
  cancelText = 'Hủy',
  showCloseButton = true,
  className,
  onConfirm,
}: DrawerPanelContentProps) {
  const hasHeader = title || description;
  const buttonSize = size === 'sm' ? 'sm' : 'default';
  const panelChildren = React.Children.toArray(children);
  const footer = panelChildren.find(
    (child) => React.isValidElement(child) && child.type === DrawerPanelFooter,
  );
  const body = panelChildren.filter(
    (child) => !React.isValidElement(child) || child.type !== DrawerPanelFooter,
  );

  return (
    <DrawerPanelSizeContext.Provider value={size}>
      <DrawerContent className={panelVariants({ size, className })}>
        {hasHeader && (
          <div className={headerVariants({ size, className: 'pb-0' })}>
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {description && (
              <DrawerDescription className="mt-1.5">
                {description}
              </DrawerDescription>
            )}
          </div>
        )}

        <ScrollArea className="min-h-0 flex-1 overflow-y-auto">
          <div className={bodyVariants({ size })}>{body}</div>
        </ScrollArea>

        {showFooter &&
          (footer ?? (
            <DrawerPanelFooter>
              <DrawerClose asChild>
                <Button
                  variant="secondary"
                  size={buttonSize}
                  className="min-w-25"
                >
                  {cancelText}
                </Button>
              </DrawerClose>
              <Button
                size={buttonSize}
                className="min-w-25"
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
            </DrawerPanelFooter>
          ))}

        {showCloseButton && (
          <DrawerClose data-slot="drawer-close" asChild>
            <Button
              className="absolute top-4 right-4 h-fit w-fit p-0"
              variant="ghost"
              size="icon"
            >
              <XIcon className="size-5" />
              <span className="sr-only">Close</span>
            </Button>
          </DrawerClose>
        )}
      </DrawerContent>
    </DrawerPanelSizeContext.Provider>
  );
}

const DrawerPanel = Drawer;
const DrawerPanelTrigger = DrawerTrigger;
const DrawerPanelClose = DrawerClose;

export {
  DrawerPanel,
  DrawerPanelClose,
  DrawerPanelContent,
  DrawerPanelFooter,
  DrawerPanelTrigger,
};
export type { DrawerPanelContentProps };
