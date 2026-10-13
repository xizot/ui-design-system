import * as React from 'react';

import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './button';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('@container/pagination flex w-full min-w-0', className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex min-w-0 max-w-full flex-wrap items-center gap-1', className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item shrink-0" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'button'>;

function PaginationLink({ className, isActive, ...props }: PaginationLinkProps) {
  return (
    <Button
      variant="ghost"
      type="button"
      className={cn(
        'h-7 w-7 @xs/pagination:h-8 @xs/pagination:w-8',
        className,
        isActive &&
          'bg-primary/10! dark:bg-primary/25! text-primary! dark:border-primary border border-transparent dark:border',
      )}
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  text = 'Previous',
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn('w-auto min-w-7 gap-1 px-1.5 @xs/pagination:min-w-8 @xs/pagination:px-2', className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      {text && <span className="hidden @xs/pagination:block">{text}</span>}
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  text = 'Next',
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn('w-auto min-w-7 gap-1 px-1.5 @xs/pagination:min-w-8 @xs/pagination:px-2', className)}
      {...props}
    >
      {text && <span className="hidden @xs/pagination:block">{text}</span>}
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-7 items-center justify-center @xs/pagination:size-9 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
