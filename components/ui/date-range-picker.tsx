'use client';

import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
  type Locale,
} from 'date-fns';
import { CalendarIcon, XCircleIcon } from 'lucide-react';
import * as React from 'react';
import type { DateRange, DayPickerRangeProps } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormErrorMessage } from '@/components/ui/form-error-message';
import { FormLabel } from '@/components/ui/form-label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { FORM_SIZE_STYLES, type FormSize } from '@/constants/form-sizes';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export type DateRangePreset = {
  label: string;
  range: DateRange;
};

export type DateRangePickerProps = Omit<
  DayPickerRangeProps,
  'selected' | 'onSelect' | 'mode' | 'required'
> & {
  id?: string;
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: { from?: string; to?: string };
  dateFormat?: string;
  presets?: DateRangePreset[];
  showPresets?: boolean;
  label?: string | React.ReactNode;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  disabledPast?: boolean;
  disabledFuture?: boolean;
  onDisabled?: (date: Date) => boolean;
  size?: FormSize;
  className?: ComponentProps<'div'>['className'];
  labelClassName?: ComponentProps<'label'>['className'];
  errorClassName?: ComponentProps<'p'>['className'];
  triggerClassName?: ComponentProps<typeof Button>['className'];
  popoverClassName?: ComponentProps<typeof PopoverContent>['className'];
  locale?: string | Locale;
  cancelText?: string;
  applyText?: string;
  showClearIcon?: boolean;
};

const getDefaultPresets = (): DateRangePreset[] => {
  const today = new Date();
  return [
    {
      label: 'Hôm nay',
      range: {
        from: startOfDay(today),
        to: endOfDay(today),
      },
    },
    {
      label: 'Tuần trước',
      range: {
        from: startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 }),
        to: endOfWeek(subWeeks(today, 1), { weekStartsOn: 1 }),
      },
    },
    {
      label: 'Tháng trước',
      range: {
        from: startOfMonth(subMonths(today, 1)),
        to: endOfMonth(subMonths(today, 1)),
      },
    },
    {
      label: '3 tháng trước',
      range: {
        from: startOfMonth(subMonths(today, 3)),
        to: endOfMonth(subMonths(today, 3)),
      },
    },
  ];
};

function DateRangePicker({
  id,
  value,
  onChange,
  placeholder = { from: 'From date', to: 'To date' },
  dateFormat = 'dd/MM/yyyy',
  presets,
  showPresets,
  label,
  error,
  required,
  disabled = false,
  disabledPast = false,
  disabledFuture = false,
  onDisabled,
  size = 'md',
  className,
  labelClassName,
  errorClassName,
  triggerClassName,
  popoverClassName,
  locale,
  cancelText,
  applyText,
  showClearIcon = true,
  ...calendarProps
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [tempRange, setTempRange] = React.useState<DateRange | undefined>(value);
  const [currentMonth, setCurrentMonth] = React.useState<Date>(() => {
    // Use end date (to) if available, otherwise use start date (from)
    return value?.to || value?.from || new Date();
  });

  // Store initial values when opening popover
  const initialRangeRef = React.useRef<DateRange | undefined>(value);
  const initialMonthRef = React.useRef<Date>(value?.to || value?.from || new Date());

  React.useEffect(() => {
    if (open) {
      // Store initial values when opening
      initialRangeRef.current = value;
      initialMonthRef.current = value?.to || value?.from || new Date();

      // Update tempRange and currentMonth to match value when opening
      setTempRange(value);
      if (value?.to) {
        // Show month of end date if available
        setCurrentMonth(value.to);
      } else if (value?.from) {
        // Show month of start date if no end date
        setCurrentMonth(value.from);
      } else {
        setCurrentMonth(new Date());
      }
    }
  }, [open, value]);

  React.useEffect(() => {
    setTempRange(value);
    if (value?.to) {
      setCurrentMonth(value.to);
    } else if (value?.from) {
      setCurrentMonth(value.from);
    }
  }, [value]);

  const handleCheckDisabled = React.useCallback(
    (date: Date) => {
      if (disabled) return true;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const compareDate = new Date(date);
      compareDate.setHours(0, 0, 0, 0);

      if (disabledPast && compareDate < today) {
        return true;
      }

      if (disabledFuture && compareDate > today) {
        return true;
      }

      return onDisabled ? onDisabled(date) : false;
    },
    [disabled, disabledPast, disabledFuture, onDisabled],
  );

  const defaultPresets = React.useMemo(() => getDefaultPresets(), []);
  const displayPresets = presets ?? defaultPresets;
  const shouldShowPresets = showPresets !== undefined ? showPresets : displayPresets.length > 0;

  const handleApply = () => {
    onChange?.(tempRange);
    setOpen(false);
  };

  const handleCancel = () => {
    // Reset to initial values when popover was opened
    setTempRange(initialRangeRef.current);
    setCurrentMonth(initialMonthRef.current);
    setOpen(false);
  };

  const handlePresetClick = (preset: DateRangePreset) => {
    setTempRange(preset.range);
    // Update currentMonth to navigate calendar to the preset range
    // Prefer end date (to) if available, otherwise use start date (from)
    if (preset.range.to) {
      setCurrentMonth(preset.range.to);
    } else if (preset.range.from) {
      setCurrentMonth(preset.range.from);
    }
  };

  const displayValue = React.useMemo(() => {
    if (!value?.from) return placeholder.from || 'Pick a date';
    // Only use locale if it's a Locale object (not string)
    const formatOptions = locale && typeof locale !== 'string' ? { locale } : undefined;
    if (value.from && value.to) {
      return `${format(value.from, dateFormat, formatOptions)} - ${format(value.to, dateFormat, formatOptions)}`;
    }
    return format(value.from, dateFormat, formatOptions);
  }, [value, dateFormat, placeholder, locale]);

  const calendarPropsWithMode = React.useMemo(
    () =>
      ({
        ...calendarProps,
        mode: 'range' as const,
        selected: tempRange,
        onSelect: setTempRange,
        defaultMonth: currentMonth,
        month: currentMonth,
        onMonthChange: setCurrentMonth,
        disabled: handleCheckDisabled,
        captionLayout: 'dropdown' as const,
        startMonth: new Date(1890, 0, 1),
        endMonth: new Date(new Date().getFullYear() + 50, 11, 31),
        locale: locale,
      }) as React.ComponentProps<typeof Calendar>,
    [calendarProps, tempRange, currentMonth, handleCheckDisabled, locale],
  );

  return (
    <div className={cn('w-full', className)}>
      {label ? (
        <FormLabel label={label} htmlFor={id} required={required} className={labelClassName} />
      ) : null}
      <div>
        {' '}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className={'w-full'}>
            <div
              className={cn(
                'group w-full gap-x-3 inline-flex items-center justify-between rounded-md border border-border bg-background shadow-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                FORM_SIZE_STYLES[size].height,
                FORM_SIZE_STYLES[size].padding,
                FORM_SIZE_STYLES[size].text,
                !value?.from && 'text-muted-foreground',
                error && 'border-destructive',
                triggerClassName,
              )}
            >
              <span>{displayValue}</span>

              {/* Clear icon replaces Calendar icon on hover */}
              <div
                className={cn(
                  'relative z-10 ml-auto flex shrink-0 items-center gap-0.5 self-center',
                  FORM_SIZE_STYLES[size].svgIcon,
                )}
              >
                {value?.from && !disabled ? (
                  showClearIcon ? (
                    <div className={cn('relative shrink-0', FORM_SIZE_STYLES[size].icon)}>
                      <span
                        className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={() => {
                          onChange?.(undefined);
                        }}
                      >
                        <XCircleIcon className="text-muted-foreground" />
                        <span className="sr-only">Clear</span>
                      </span>
                      <span className="absolute inset-0 flex items-center justify-center transition-opacity group-hover:opacity-0">
                        <CalendarIcon className={cn('opacity-50', FORM_SIZE_STYLES[size].icon)} />
                      </span>
                    </div>
                  ) : (
                    <CalendarIcon className={cn('opacity-50', FORM_SIZE_STYLES[size].icon)} />
                  )
                ) : (
                  <CalendarIcon className={cn('opacity-50', FORM_SIZE_STYLES[size].icon)} />
                )}
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            className={cn('flex w-auto flex-col gap-2 p-0 pb-2', popoverClassName)}
            align="start"
          >
            <div className="flex flex-col gap-2 pb-2">
              <div className="flex">
                {shouldShowPresets && (
                  <div className="border-r p-2 w-fit">
                    <div className="space-y-1">
                      {displayPresets.map((preset, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="block text-left font-normal"
                          onClick={() => handlePresetClick(preset)}
                        >
                          {preset.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex-1">
                  <Calendar initialFocus {...calendarPropsWithMode} />
                </div>
              </div>
              <Separator />
              <div className="flex justify-end gap-2 px-2">
                <Button variant="secondary" onClick={handleCancel}>
                  {cancelText || 'Cancel'}
                </Button>
                <Button onClick={handleApply}>{applyText || 'Apply'}</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {error ? <FormErrorMessage error={error} errorClassName={errorClassName} /> : null}
    </div>
  );
}

export { DateRangePicker };
