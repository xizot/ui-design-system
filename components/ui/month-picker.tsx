'use client';

import { ScrollArea } from './scroll-area';
import { cn } from '../../lib/utils';
import { startOfMonth, type Locale } from 'date-fns';
import { cva } from 'class-variance-authority';
import * as React from 'react';

type FormSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type MonthPickerProps = {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  locale?: string | Locale;
  monthNames?: string[];
  disabled?: (date: Date) => boolean;
  className?: string;
  size?: FormSize;
};

const monthPickerHeaderVariants = cva('', {
  variants: {
    size: {
      xxs: 'px-3 py-2 text-sm',
      xs: 'px-3 py-2 text-sm',
      sm: 'px-3 py-2 text-base',
      md: 'px-4 py-3 text-lg',
      lg: 'px-4 py-3 text-lg',
      xl: 'px-5 py-4 text-xl',
      xxl: 'px-5 py-4 text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const monthPickerItemVariants = cva('', {
  variants: {
    size: {
      xxs: 'px-1.5 py-1 text-xs',
      xs: 'px-1.5 py-1 text-xs',
      sm: 'px-2 py-1 text-sm',
      md: 'px-2 py-1.5 text-sm',
      lg: 'px-2.5 py-2 text-base',
      xl: 'px-3 py-2 text-base',
      xxl: 'px-3 py-2.5 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const monthPickerColumnVariants = cva('', {
  variants: {
    size: {
      xxs: 'w-24',
      xs: 'w-28',
      sm: 'w-28',
      md: 'w-32',
      lg: 'w-36',
      xl: 'w-40',
      xxl: 'w-44',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

function MonthPicker({
  value,
  onChange,
  locale,
  monthNames,
  disabled,
  className,
  size = 'md',
}: MonthPickerProps) {
  const [initialDate] = React.useState(() => new Date());
  const selectedYear = value ? value.getFullYear() : initialDate.getFullYear();
  const selectedMonth = value ? value.getMonth() : initialDate.getMonth();
  const monthContainerRef = React.useRef<HTMLDivElement>(null);
  const yearContainerRef = React.useRef<HTMLDivElement>(null);

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
      const newDate = new Date(selectedYear, monthIndex, 1);
      onChange(startOfMonth(newDate));
    },
    [selectedYear, onChange],
  );

  const handleYearSelect = React.useCallback(
    (year: number) => {
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
    () => Array.from({ length: 100 }, (_, i) => initialDate.getFullYear() - 50 + i),
    [initialDate],
  );

  const displayValue = React.useMemo(() => {
    if (value) {
      return `${months[selectedMonth]} ${selectedYear}`;
    }
    return `${months[initialDate.getMonth()]} ${initialDate.getFullYear()}`;
  }, [value, months, selectedMonth, selectedYear, initialDate]);
  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className="shrink-0 text-center">
        <div className={cn('font-medium', monthPickerHeaderVariants({ size }))}>{displayValue}</div>
      </div>
      <div className="flex min-h-0 flex-1 gap-0.5">
        <ScrollArea
          className={cn(
            'overflow-hidden [&>[data-slot=scroll-area-viewport]]:rounded-l-md',
            monthPickerColumnVariants({ size }),
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
                    monthPickerItemVariants({ size }),
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
                    monthPickerItemVariants({ size }),
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
