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

const dialogPanelSpacingClassName: Record<
  NonNullable<DialogPanelProps['size']>,
  { px: string; py: string }
> = {
  sm: { px: 'px-4', py: 'py-4' },
  md: { px: 'px-5', py: 'py-4' },
  lg: { px: 'px-6', py: 'py-5' },
  xl: { px: 'px-6', py: 'py-5' },
  auto: { px: 'px-4', py: 'py-4' },
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
  const spacing = dialogPanelSpacingClassName[size];

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
            className={cn('flex flex-col gap-2', spacing.px, spacing.py, headerClassName)}
          >
            {title !== undefined && <DialogTitle>{title}</DialogTitle>}
            {description !== undefined && <DialogDescription>{description}</DialogDescription>}
          </div>
        )}
        <div className={cn('min-h-0 flex-1', spacing.px, !hasHeader && spacing.py)}>
          <div
            data-slot="dialog-panel-body"
            className={cn('h-full overflow-y-auto', bodyClassName)}
          >
            {children}
          </div>
        </div>
        {footer !== undefined && (
          <div
            data-slot="dialog-panel-footer"
            className={cn(
              'mt-auto flex flex-col gap-2 sm:flex-row sm:justify-end',
              spacing.px,
              spacing.py,
              footerClassName,
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </DialogContent>
  );
}

export { DialogPanel, DialogPanelClose, DialogPanelRoot, DialogPanelTrigger };
