'use client';

import * as React from 'react';

import { cn } from '../../lib/utils';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './dialog';

const DialogPanelRoot = Dialog;
const DialogPanelTrigger = DialogTrigger;
const DialogPanelClose = DialogClose;

type DialogPanelProps = React.ComponentProps<typeof DialogContent> & {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'auto';
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
};

const dialogPanelSizeClassName: Record<NonNullable<DialogPanelProps['size']>, string> = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  auto: '',
};

const dialogPanelSpacing: Record<
  NonNullable<DialogPanelProps['size']>,
  { inline: number; block: number }
> = {
  sm: { inline: 16, block: 16 },
  md: { inline: 20, block: 16 },
  lg: { inline: 24, block: 20 },
  xl: { inline: 24, block: 20 },
  auto: { inline: 16, block: 16 },
};

function DialogPanel({
  size = 'md',
  title,
  description,
  footer,
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
  children,
  ...props
}: DialogPanelProps) {
  const hasHeader = title !== undefined || description !== undefined;
  const spacing = dialogPanelSpacing[size];

  return (
    <DialogContent
      className={cn(
        'max-h-[calc(100vh-2rem)] h-auto gap-0 overflow-hidden p-0',
        dialogPanelSizeClassName[size],
        className,
      )}
      {...props}
    >
      <div
        data-slot="dialog-panel"
        className="flex max-h-[calc(100vh-2rem)] min-h-0 min-w-0 flex-col gap-0"
      >
        {hasHeader && (
          <div
            data-slot="dialog-panel-header"
            className={cn('flex flex-col gap-2', headerClassName)}
            style={{ paddingInline: spacing.inline, paddingBlock: spacing.block }}
          >
            {title !== undefined && <DialogTitle>{title}</DialogTitle>}
            {description !== undefined && <DialogDescription>{description}</DialogDescription>}
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
            data-slot="dialog-panel-body"
            className={cn('h-full overflow-y-auto p-1', bodyClassName)}
          >
            {children}
          </div>
        </div>
        {footer !== undefined && (
          <div
            data-slot="dialog-panel-footer"
            className={cn(
              'mt-auto flex flex-col gap-2 sm:flex-row sm:justify-end',
              footerClassName,
            )}
            style={{ paddingInline: spacing.inline, paddingBlock: spacing.block }}
          >
            {footer}
          </div>
        )}
      </div>
    </DialogContent>
  );
}

export { DialogPanel, DialogPanelClose, DialogPanelRoot, DialogPanelTrigger };
