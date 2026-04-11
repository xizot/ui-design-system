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

const drawerPanelSpacing: Record<
  NonNullable<DrawerPanelProps['size']>,
  { inline: number; block: number }
> = {
  sm: { inline: 16, block: 16 },
  md: { inline: 20, block: 16 },
  lg: { inline: 24, block: 20 },
  xl: { inline: 24, block: 20 },
  auto: { inline: 16, block: 16 },
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
  const spacing = drawerPanelSpacing[size];

  return (
    <DrawerContent className={cn(drawerSizeClassName[size], className)} {...props}>
      <div data-slot="drawer-panel" className="flex h-full min-w-0 flex-col gap-0">
        {hasHeader && (
          <div
            data-slot="drawer-panel-header"
            className={cn(
              'flex flex-col gap-1.5 text-left group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center',
              headerClassName,
            )}
            style={{ paddingInline: spacing.inline, paddingBlock: spacing.block }}
          >
            {title !== undefined && <DrawerTitle>{title}</DrawerTitle>}
            {description !== undefined && <DrawerDescription>{description}</DrawerDescription>}
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
            data-slot="drawer-panel-body"
            className={cn('h-full min-w-0 overflow-y-auto p-1', bodyClassName)}
          >
            {children}
          </div>
        </div>
        {footer !== undefined && (
          <div
            data-slot="drawer-panel-footer"
            className={cn('mt-auto flex flex-col gap-2', footerClassName)}
            style={{ paddingInline: spacing.inline, paddingBlock: spacing.block }}
          >
            {footer}
          </div>
        )}
      </div>
    </DrawerContent>
  );
}

export { DrawerPanel, DrawerPanelClose, DrawerPanelRoot, DrawerPanelTrigger };
