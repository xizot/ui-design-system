'use client';

import * as React from 'react';

import { cn } from '../../lib/utils';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';

const DrawerPanelRoot = Drawer;
const DrawerPanelTrigger = DrawerTrigger;
const DrawerPanelClose = DrawerClose;

type DrawerPanelProps = React.ComponentProps<typeof DrawerContent> & {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'auto';
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
};

const drawerSizeClassName: Record<NonNullable<DrawerPanelProps['size']>, string> = {
  sm: 'data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=right]:sm:max-w-sm',
  md: 'data-[vaul-drawer-direction=left]:sm:max-w-md data-[vaul-drawer-direction=right]:sm:max-w-md',
  lg: 'data-[vaul-drawer-direction=left]:sm:max-w-lg data-[vaul-drawer-direction=right]:sm:max-w-lg',
  xl: 'data-[vaul-drawer-direction=left]:sm:max-w-xl data-[vaul-drawer-direction=right]:sm:max-w-xl',
  auto: '',
};

const drawerPanelSpacingClassName: Record<
  NonNullable<DrawerPanelProps['size']>,
  { px: string; py: string }
> = {
  sm: { px: 'px-4', py: 'py-4' },
  md: { px: 'px-5', py: 'py-4' },
  lg: { px: 'px-6', py: 'py-5' },
  xl: { px: 'px-6', py: 'py-5' },
  auto: { px: 'px-4', py: 'py-4' },
};

function DrawerPanel({
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
}: DrawerPanelProps) {
  const hasHeader = title !== undefined || description !== undefined;
  const spacing = drawerPanelSpacingClassName[size];

  return (
    <DrawerContent className={cn(drawerSizeClassName[size], className)} {...props}>
      <div data-slot="drawer-panel" className="flex min-w-0 h-full flex-col gap-0">
        {hasHeader && (
          <div
            data-slot="drawer-panel-header"
            className={cn(
              'flex flex-col gap-1.5 text-left group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center',
              spacing.px,
              spacing.py,
              headerClassName,
            )}
          >
            {title !== undefined && <DrawerTitle>{title}</DrawerTitle>}
            {description !== undefined && <DrawerDescription>{description}</DrawerDescription>}
          </div>
        )}
        <div className={cn('flex-1 min-h-0')}>
          <div
            data-slot="drawer-panel-body"
            className={cn('min-w-0 h-full overflow-auto', spacing.px, bodyClassName)}
          >
            {children}
          </div>
        </div>
        {footer !== undefined && (
          <div
            data-slot="drawer-panel-footer"
            className={cn('mt-auto flex flex-col gap-2', spacing.px, spacing.py, footerClassName)}
          >
            {footer}
          </div>
        )}
      </div>
    </DrawerContent>
  );
}

export { DrawerPanel, DrawerPanelClose, DrawerPanelRoot, DrawerPanelTrigger };
