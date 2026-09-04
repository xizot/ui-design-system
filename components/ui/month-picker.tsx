'use client';

import { ScrollArea } from './scroll-area';
import { cn } from '../../lib/utils';
import type { FormSize } from '../../constants/form-sizes';
import { startOfMonth, type Locale } from 'date-fns';
import * as React from 'react';

export type MonthPickerProps = {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  locale?: string | Locale;
  monthNames?: string[];
  disabled?: (date: Date) => boolean;
  className?: string;
  size?: FormSize;
};

const monthPickerSizeStyles: Record<
  FormSize,
  { header: string; item: string; monthColumn: string }
> = {
  xxs: { header: 'px-3 py-2 text-sm', item: 'px-1.5 py-1 text-xs', monthColumn: 'w-24' },
  xs: { header: 'px-3 py-2 text-sm', item: 'px-1.5 py-1 text-xs', monthColumn: 'w-28' },
  sm: { header: 'px-3 py-2 text-base', item: 'px-2 py-1 text-sm', monthColumn: 'w-28' },
  md: { header: 'px-4 py-3 text-lg', item: 'px-2 py-1.5 text-sm', monthColumn: 'w-32' },
  lg: { header: 'px-4 py-3 text-lg', item: 'px-2.5 py-2 text-base', monthColumn: 'w-36' },
  xl: { header: 'px-5 py-4 text-xl', item: 'px-3 py-2 text-base', monthColumn: 'w-40' },
  xxl: { header: 'px-5 py-4 text-xl', item: 'px-3 py-2.5 text-lg', monthColumn: 'w-44' },
};

function MonthPicker({
  value,
  onChange,
  locale,
  monthNames,
  disabled,
  className,
  size = 'md',
}: MonthPickerProps) {
  const [selectedYear, setSelectedYear] = React.useState<number>(() => {
    return value ? value.getFullYear() : new Date().getFullYear();
  });
  const [selectedMonth, setSelectedMonth] = React.useState<number>(() => {
    return value ? value.getMonth() : new Date().getMonth();
  });
  const monthContainerRef = React.useRef<HTMLDivElement>(null);
  const yearContainerRef = React.useRef<HTMLDivElement>(null);

  // Sync with value prop when it changes (only if different from current state)
  React.useEffect(() => {
    if (value) {
      const year = value.getFullYear();
      const month = value.getMonth();
      // Only update if different to avoid unnecessary re-renders
      if (selectedYear !== year || selectedMonth !== month) {
        setSelectedYear(year);
        setSelectedMonth(month);
      }
    } else {
      // Reset to current month/year if value is undefined
      const now = new Date();
      const nowYear = now.getFullYear();
      const nowMonth = now.getMonth();
      if (selectedYear !== nowYear || selectedMonth !== nowMonth) {
        setSelectedYear(nowYear);
        setSelectedMonth(nowMonth);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Scroll to selected month on mount and when selectedMonth changes
  React.useEffect(() => {
    if (!monthContainerRef.current) return;

    const timer = setTimeout(() => {
      const monthElement = monthContainerRef.current?.querySelector(
        `[data-month="${selectedMonth}"]`,
      ) as HTMLElement;
      if (monthElement && monthContainerRef.current) {
        const viewport = monthContainerRef.current.closest(
          '[data-slot="scroll-area-viewport"]',
        ) as HTMLElement;
        if (viewport) {
          const elementTop = monthElement.offsetTop;
          viewport.scrollTo({ top: elementTop, behavior: 'smooth' });
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedMonth]);

  // Scroll to selected year on mount and when selectedYear changes
  React.useEffect(() => {
    if (!yearContainerRef.current) return;

    const timer = setTimeout(() => {
      const yearElement = yearContainerRef.current?.querySelector(
        `[data-year="${selectedYear}"]`,
      ) as HTMLElement;
      if (yearElement && yearContainerRef.current) {
        const viewport = yearContainerRef.current.closest(
          '[data-slot="scroll-area-viewport"]',
        ) as HTMLElement;
        if (viewport) {
          const elementTop = yearElement.offsetTop;
          viewport.scrollTo({ top: elementTop, behavior: 'smooth' });
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedYear]);

  const handleMonthSelect = React.useCallback(
    (monthIndex: number) => {
      setSelectedMonth(monthIndex);
      const newDate = new Date(selectedYear, monthIndex, 1);
      onChange(startOfMonth(newDate));
    },
    [selectedYear, onChange],
  );

  const handleYearSelect = React.useCallback(
    (year: number) => {
      setSelectedYear(year);
      const newDate = new Date(year, selectedMonth, 1);
      onChange(startOfMonth(newDate));
    },
    [selectedMonth, onChange],
  );

  // Generate month names based on locale or provided monthNames
  const months = React.useMemo(() => {
    if (monthNames && monthNames.length === 12) {
      return monthNames;
    }
    // Use Intl API to get month names based on locale
    const localeString = typeof locale === 'string' ? locale : locale?.code || 'en-US';
    const formatter = new Intl.DateTimeFormat(localeString, { month: 'long' });
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(2024, i, 1);
      return formatter.format(date);
    });
  }, [locale, monthNames]);

  const years = React.useMemo(
    () => Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 50 + i),
    [],
  );

  const displayValue = React.useMemo(() => {
    if (value) {
      return `${months[selectedMonth]} ${selectedYear}`;
    }
    return `${months[new Date().getMonth()]} ${new Date().getFullYear()}`;
  }, [value, months, selectedMonth, selectedYear]);
  const sizeStyles = monthPickerSizeStyles[size];

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className="shrink-0 text-center">
        <div className={cn('font-medium', sizeStyles.header)}>{displayValue}</div>
      </div>
      <div className="flex min-h-0 flex-1 gap-0.5">
        <ScrollArea
          className={cn(
            'overflow-hidden [&>[data-slot=scroll-area-viewport]]:rounded-l-md',
            sizeStyles.monthColumn,
          )}
        >
          <div ref={monthContainerRef} className="px-2">
            {months.map((month, index) => {
              const isSelected = selectedMonth === index;
              const isDisabled = disabled ? disabled(new Date(selectedYear, index, 1)) : false;
              return (
                <div
                  key={index}
                  data-month={index}
                  onClick={() => !isDisabled && handleMonthSelect(index)}
                  className={cn(
                    'cursor-pointer rounded-md text-center transition-colors',
                    sizeStyles.item,
                    isSelected ? 'bg-secondary text-secondary-foreground' : 'hover:bg-accent',
                    isDisabled && 'cursor-not-allowed opacity-50',
                  )}
                >
                  {month}
                </div>
              );
            })}
          </div>
        </ScrollArea>
        <ScrollArea className="flex-1 overflow-hidden [&>[data-slot=scroll-area-viewport]]:rounded-r-md">
          <div ref={yearContainerRef} className="px-2">
            {years.map((year) => {
              const isSelected = selectedYear === year;
              return (
                <div
                  key={year}
                  data-year={year}
                  onClick={() => handleYearSelect(year)}
                  className={cn(
                    'cursor-pointer rounded-md text-center transition-colors',
                    sizeStyles.item,
                    isSelected ? 'bg-secondary text-secondary-foreground' : 'hover:bg-accent',
                  )}
                >
                  {year}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export { MonthPicker };
