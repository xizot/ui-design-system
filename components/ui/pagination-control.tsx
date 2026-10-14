'use client';

import type * as React from 'react';
import { getPaginationRange } from '../../lib/pagination';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

export type PaginationControlProps = Omit<
  React.ComponentProps<typeof Pagination>,
  'children' | 'onChange'
> & {
  totalCount: number;
  pageSize: number;
  /** Controlled, zero-based index; displayed page numbers start at one. */
  pageIndex: number;
  onPageChange: (pageIndex: number) => void;
  siblingCount?: number;
  disabled?: boolean;
  previousText?: string;
  nextText?: string;
};

function PaginationControl({
  totalCount,
  pageSize,
  pageIndex,
  onPageChange,
  siblingCount = 1,
  disabled = false,
  previousText = 'Previous',
  nextText = 'Next',
  ...props
}: PaginationControlProps) {
  if (
    !Number.isSafeInteger(totalCount) ||
    totalCount < 0 ||
    !Number.isSafeInteger(pageSize) ||
    pageSize < 1 ||
    !Number.isSafeInteger(pageIndex) ||
    pageIndex < 0 ||
    !Number.isSafeInteger(siblingCount) ||
    siblingCount < 0
  ) {
    throw new RangeError(
      'PaginationControl requires non-negative integer counts/indexes and a positive integer pageSize.',
    );
  }
  const pageCount = Math.ceil(totalCount / pageSize);
  if (pageCount === 0) return null;
  // Totals can shrink after filtering. Render a valid page without changing parent state.
  const currentPage = Math.min(pageIndex, pageCount - 1);
  const ranges = [
    {
      key: 'compact',
      className: '@md/pagination:hidden',
      pages: getPaginationRange(currentPage, pageCount, 0, true),
    },
    {
      key: 'full',
      className: 'hidden @md/pagination:flex',
      pages: getPaginationRange(currentPage, pageCount, siblingCount),
    },
  ];

  return (
    <Pagination {...props}>
      {ranges.map(({ key, className, pages }) => (
        <PaginationContent key={key} className={className}>
          <PaginationItem>
            <PaginationPrevious
              text={previousText}
              aria-label={previousText || 'Go to previous page'}
              disabled={disabled || currentPage === 0}
              onClick={() => onPageChange(currentPage - 1)}
            />
          </PaginationItem>
          {pages.map((page, index) => (
            <PaginationItem key={page === 'ellipsis' ? `ellipsis-${index}` : page}>
              {page === 'ellipsis' ? (
                <PaginationEllipsis
                  direction={pages.indexOf(currentPage) > index ? 'previous' : 'next'}
                  disabled={disabled}
                  onClick={() =>
                    onPageChange(
                      Math.max(
                        0,
                        Math.min(
                          pageCount - 1,
                          currentPage + (pages.indexOf(currentPage) > index ? -2 : 2),
                        ),
                      ),
                    )
                  }
                />
              ) : (
                <PaginationLink
                  isActive={page === currentPage}
                  aria-label={`Page ${page + 1}`}
                  disabled={disabled}
                  onClick={() => {
                    if (page !== pageIndex) onPageChange(page);
                  }}
                >
                  {page + 1}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              text={nextText}
              aria-label={nextText || 'Go to next page'}
              disabled={disabled || currentPage === pageCount - 1}
              onClick={() => onPageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      ))}
    </Pagination>
  );
}

export { PaginationControl };
