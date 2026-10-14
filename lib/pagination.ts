/** Zero-based page indexes, with gaps collapsed into ellipses. */
export function getPaginationRange(
  pageIndex: number,
  pageCount: number,
  siblingCount = 1,
  compact = false,
): (number | 'ellipsis')[] {
  if (pageCount <= 0) return [];
  if (pageCount <= (compact ? 3 : siblingCount * 2 + 5)) {
    return Array.from({ length: pageCount }, (_, index) => index);
  }
  const start = Math.max(1, pageIndex - siblingCount);
  const end = Math.min(pageCount - 2, pageIndex + siblingCount);
  const pages: (number | 'ellipsis')[] = [0];
  if (!compact && start === 2) pages.push(1);
  else if (start > 1) pages.push('ellipsis');
  for (let page = start; page <= end; page++) pages.push(page);
  if (!compact && end === pageCount - 3) pages.push(pageCount - 2);
  else if (end < pageCount - 2) pages.push('ellipsis');
  pages.push(pageCount - 1);
  return pages;
}
