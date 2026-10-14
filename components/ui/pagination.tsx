import * as React from 'react';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react';
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
      className={cn('flex max-w-full min-w-0 flex-wrap items-center gap-1', className)}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" className={cn('shrink-0', className)} {...props} />;
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
      className={cn(
        text
          ? 'gap-0 px-0 @xs/pagination:w-auto @xs/pagination:min-w-8 @xs/pagination:gap-1 @xs/pagination:px-2'
          : 'gap-0 px-0',
        className,
      )}
      {...props}
    >
      <ChevronLeftIcon />
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
      className={cn(
        text
          ? 'gap-0 px-0 @xs/pagination:w-auto @xs/pagination:min-w-8 @xs/pagination:gap-1 @xs/pagination:px-2'
          : 'gap-0 px-0',
        className,
      )}
      {...props}
    >
      {text && <span className="hidden @xs/pagination:block">{text}</span>}
      <ChevronRightIcon />
    </PaginationLink>
  );
}

type PaginationEllipsisProps =
  | (React.ComponentProps<'span'> & { direction?: undefined })
  | (React.ComponentProps<'button'> & { direction: 'previous' | 'next' });

function PaginationEllipsis({ className, ...props }: PaginationEllipsisProps) {
  if (props.direction) {
    const { direction, ...buttonProps } = props;
    const Icon = direction === 'previous' ? ChevronsLeftIcon : ChevronsRightIcon;
    return (
      <PaginationLink
        aria-label={direction === 'previous' ? 'Go back 2 pages' : 'Go forward 2 pages'}
        {...buttonProps}
        data-slot="pagination-ellipsis"
        className={cn('group/pagination-jump', className)}
      >
        <MoreHorizontalIcon className="group-hover/pagination-jump:hidden group-focus-visible/pagination-jump:hidden" />
        <Icon className="hidden group-hover/pagination-jump:block group-focus-visible/pagination-jump:block" />
      </PaginationLink>
    );
  }
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
