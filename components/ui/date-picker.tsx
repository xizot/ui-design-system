'use client';

import {
  format,
  isValid,
  setHours,
  setMinutes,
  setSeconds,
  startOfMonth,
  type Locale,
} from 'date-fns';
import { vi as viLocale } from 'date-fns/locale';
import { CalendarIcon, XCircleIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import * as React from 'react';
import type { DayPickerSingleProps } from 'react-day-picker';
import { FORM_SIZE_STYLES, type FormSize } from '../../constants/form-sizes';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { Calendar } from './calendar';
import { FormErrorMessage } from './form-error-message';
import { FormLabel } from './form-label';
import { MonthPicker } from './month-picker';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Separator } from './separator';
import { TimePicker, type TimeValue } from './time-picker';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Coerce Date | string | undefined → Date | undefined. */
function toDate(value: Date | string | undefined): Date | undefined {
  if (value === undefined || value === null) return undefined;
  if (value instanceof Date) return isValid(value) ? value : undefined;
  const parsed = new Date(value);
  return isValid(parsed) ? parsed : undefined;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type DatePickerProps = Omit<
  DayPickerSingleProps,
  'selected' | 'onSelect' | 'mode' | 'required'
> & {
  id?: string;
  value?: Date | string;
  onChange?: (date: string | undefined) => void;
  placeholder?: string;
  dateFormat?: string;
  showTime?: boolean;
  timeOnly?: boolean;
  mode?: 'single' | 'month';
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
  monthNames?: string[];
  showClearIcon?: boolean;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function DatePicker({
  id,
  value,
  onChange,
  placeholder = 'Chọn ngày',
  dateFormat = 'dd/MM/yyyy',
  showTime = false,
  timeOnly = false,
  mode = 'single',
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
  locale = viLocale,
  cancelText = 'Hủy',
  applyText = 'Áp dụng',
  monthNames,
  showClearIcon = true,
  ...calendarProps
}: DatePickerProps) {
  // Single source of truth — always a Date internally
  const resolvedValue = React.useMemo(() => toDate(value), [value]);

  const [open, setOpen] = React.useState(false);
  const [tempDate, setTempDate] = React.useState<Date | undefined>(resolvedValue);
  const [currentMonth, setCurrentMonth] = React.useState<Date>(() => resolvedValue ?? new Date());
  const [selectedTime, setSelectedTime] = React.useState<TimeValue>(() => {
    if (resolvedValue) {
      return {
        hour: resolvedValue.getHours().toString().padStart(2, '0'),
        minute: resolvedValue.getMinutes().toString().padStart(2, '0'),
        second: resolvedValue.getSeconds().toString().padStart(2, '0'),
      };
    }
    return { hour: '00', minute: '00', second: '00' };
  });

  const initialDateRef = React.useRef<Date | undefined>(resolvedValue);
  const initialMonthRef = React.useRef<Date>(resolvedValue ?? new Date());
  const initialTimeRef = React.useRef<TimeValue>({ hour: '00', minute: '00', second: '00' });

  React.useEffect(() => {
    if (open) {
      initialDateRef.current = resolvedValue;
      initialMonthRef.current = resolvedValue ?? new Date();
      initialTimeRef.current = resolvedValue
        ? {
            hour: resolvedValue.getHours().toString().padStart(2, '0'),
            minute: resolvedValue.getMinutes().toString().padStart(2, '0'),
            second: resolvedValue.getSeconds().toString().padStart(2, '0'),
          }
        : { hour: '00', minute: '00', second: '00' };

      if (timeOnly) {
        setSelectedTime(
          resolvedValue
            ? {
                hour: resolvedValue.getHours().toString().padStart(2, '0'),
                minute: resolvedValue.getMinutes().toString().padStart(2, '0'),
                second: resolvedValue.getSeconds().toString().padStart(2, '0'),
              }
            : { hour: '00', minute: '00', second: '00' },
        );
      } else if (mode === 'month') {
        setTempDate(resolvedValue ? startOfMonth(resolvedValue) : startOfMonth(new Date()));
      } else {
        setTempDate(resolvedValue);
        setCurrentMonth(resolvedValue ?? new Date());
        if (showTime) {
          setSelectedTime(
            resolvedValue
              ? {
                  hour: resolvedValue.getHours().toString().padStart(2, '0'),
                  minute: resolvedValue.getMinutes().toString().padStart(2, '0'),
                  second: resolvedValue.getSeconds().toString().padStart(2, '0'),
                }
              : { hour: '00', minute: '00', second: '00' },
          );
        }
      }
    }
  }, [open, resolvedValue, showTime, timeOnly, mode]);

  React.useEffect(() => {
    if (!open && !timeOnly) {
      setTempDate(resolvedValue);
      if (resolvedValue) {
        setCurrentMonth(resolvedValue);
        if (showTime) {
          setSelectedTime({
            hour: resolvedValue.getHours().toString().padStart(2, '0'),
            minute: resolvedValue.getMinutes().toString().padStart(2, '0'),
            second: resolvedValue.getSeconds().toString().padStart(2, '0'),
          });
        }
      }
    } else if (!open && timeOnly && resolvedValue) {
      setSelectedTime({
        hour: resolvedValue.getHours().toString().padStart(2, '0'),
        minute: resolvedValue.getMinutes().toString().padStart(2, '0'),
        second: resolvedValue.getSeconds().toString().padStart(2, '0'),
      });
    }
  }, [resolvedValue, showTime, timeOnly, open]);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleApply = () => {
    if (timeOnly) {
      const baseDate = resolvedValue ?? new Date();
      const finalDate = setSeconds(
        setMinutes(
          setHours(baseDate, parseInt(selectedTime.hour, 10)),
          parseInt(selectedTime.minute, 10),
        ),
        parseInt(selectedTime.second, 10),
      );
      onChange?.(finalDate?.toISOString());
    } else if (mode === 'month') {
      onChange?.(tempDate ? startOfMonth(tempDate).toISOString() : undefined);
    } else if (tempDate) {
      let finalDate = tempDate;
      if (showTime) {
        finalDate = setHours(finalDate, parseInt(selectedTime.hour, 10));
        finalDate = setMinutes(finalDate, parseInt(selectedTime.minute, 10));
        finalDate = setSeconds(finalDate, parseInt(selectedTime.second, 10));
      }
      onChange?.(finalDate.toISOString());
    } else {
      onChange?.(undefined);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setTempDate(initialDateRef.current);
    setCurrentMonth(initialMonthRef.current);
    if (showTime) setSelectedTime(initialTimeRef.current);
    setOpen(false);
  };

  // ---------------------------------------------------------------------------
  // Display label
  // ---------------------------------------------------------------------------

  const displayValue = React.useMemo(() => {
    if (!resolvedValue) return placeholder;
    const formatOptions = locale && typeof locale !== 'string' ? { locale } : undefined;
    if (timeOnly) {
      const hasTimeFormat = /[Hhms]/.test(dateFormat);
      return format(resolvedValue, hasTimeFormat ? dateFormat : 'HH:mm:ss', formatOptions);
    }
    if (mode === 'month') {
      if (locale) {
        const localeString = typeof locale === 'string' ? locale : (locale?.code ?? 'en-US');
        return new Intl.DateTimeFormat(localeString, { month: '2-digit', year: 'numeric' }).format(
          resolvedValue,
        );
      }
      return format(resolvedValue, 'MM/yyyy', formatOptions);
    }
    if (showTime) {
      const hasTimeFormat = /[Hhms]/.test(dateFormat);
      return format(
        resolvedValue,
        hasTimeFormat ? dateFormat : `${dateFormat} HH:mm:ss`,
        formatOptions,
      );
    }
    return format(resolvedValue, dateFormat, formatOptions);
  }, [resolvedValue, dateFormat, showTime, timeOnly, mode, placeholder, locale]);

  // ---------------------------------------------------------------------------
  // Disabled check
  // ---------------------------------------------------------------------------

  const handleCheckDisabled = React.useCallback(
    (date: Date) => {
      if (disabled) return true;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const compareDate = new Date(date);
      compareDate.setHours(0, 0, 0, 0);
      if (disabledPast && compareDate < today) return true;
      if (disabledFuture && compareDate > today) return true;
      return onDisabled ? onDisabled(date) : false;
    },
    [disabled, disabledPast, disabledFuture, onDisabled],
  );

  const calendarPropsWithMode = React.useMemo(
    () =>
      ({
        ...calendarProps,
        mode: 'single' as const,
        selected: tempDate,
        onSelect: setTempDate,
        defaultMonth: currentMonth,
        month: currentMonth,
        onMonthChange: setCurrentMonth,
        captionLayout: 'dropdown' as const,
        disabled: handleCheckDisabled,
        startMonth: new Date(1890, 0, 1),
        endMonth: new Date(new Date().getFullYear() + 50, 11, 31),
        locale,
      }) as React.ComponentProps<typeof Calendar>,
    [calendarProps, tempDate, currentMonth, handleCheckDisabled, locale],
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className={cn('w-full', className)}>
      {label ? (
        <FormLabel label={label} htmlFor={id} required={required} className={labelClassName} />
      ) : null}
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="w-full">
            <div
              className={cn(
                'group w-full gap-x-3 inline-flex items-center justify-between rounded-md border border-border bg-background shadow-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                FORM_SIZE_STYLES[size].height,
                FORM_SIZE_STYLES[size].padding,
                FORM_SIZE_STYLES[size].text,
                !resolvedValue && 'text-muted-foreground',
                error && 'border-destructive',
                triggerClassName,
              )}
            >
              <span>{displayValue}</span>

              <div
                className={cn(
                  'relative z-10 ml-auto flex shrink-0 items-center gap-0.5 self-center',
                  FORM_SIZE_STYLES[size].svgIcon,
                )}
              >
                {resolvedValue && !disabled ? (
                  showClearIcon ? (
                    <div className={cn('relative shrink-0', FORM_SIZE_STYLES[size].icon)}>
                      <span
                        className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={() => onChange?.(undefined)}
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
            className={cn('flex w-auto flex-col gap-2 p-0', popoverClassName)}
            align="start"
          >
            <div className="flex flex-col gap-2 pb-2">
              {timeOnly ? (
                <div className="flex max-h-[350px]">
                  <TimePicker
                    value={selectedTime}
                    onChange={setSelectedTime}
                    className="min-h-0 h-full shrink-0 w-full"
                  />
                </div>
              ) : mode === 'month' ? (
                <div className="flex max-h-[350px]">
                  <MonthPicker
                    value={tempDate}
                    onChange={setTempDate}
                    locale={locale}
                    monthNames={monthNames}
                    disabled={handleCheckDisabled}
                    className="min-h-0 h-full shrink-0 w-full"
                  />
                </div>
              ) : (
                <div className={cn('flex max-h-[350px]', showTime && 'overflow-hidden')}>
                  <Calendar initialFocus {...calendarPropsWithMode} />
                  {showTime && (
                    <TimePicker
                      value={selectedTime}
                      onChange={setSelectedTime}
                      className="min-h-0 h-full shrink-0"
                    />
                  )}
                </div>
              )}
              <Separator className="shrink-0" />
              <div className="flex items-center gap-2 px-2 shrink-0">
                <Button className="flex-1" variant="secondary" size="sm" onClick={handleCancel}>
                  {cancelText}
                </Button>
                <Button className="flex-1" size="sm" onClick={handleApply}>
                  {applyText}
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {error ? <FormErrorMessage error={error} errorClassName={errorClassName} /> : null}
    </div>
  );
}

export { DatePicker };
