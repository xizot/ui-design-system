'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormErrorMessage } from '@/components/ui/form-error-message';
import { FormLabel } from '@/components/ui/form-label';
import { MonthPicker } from '@/components/ui/month-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { TimePicker, type TimeValue } from '@/components/ui/time-picker';
import { FORM_SIZE_STYLES, type FormSize } from '@/constants/form-sizes';
import { cn } from '@/lib/utils';
import { format, setHours, setMinutes, setSeconds, startOfMonth, type Locale } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import * as React from 'react';
import type { DayPickerSingleProps } from 'react-day-picker';

export type DatePickerProps = Omit<
  DayPickerSingleProps,
  'selected' | 'onSelect' | 'mode' | 'required'
> & {
  id?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
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
};

function DatePicker({
  id,
  value,
  onChange,
  placeholder = 'Pick a date',
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
  locale,
  cancelText,
  applyText,
  monthNames,
  ...calendarProps
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [tempDate, setTempDate] = React.useState<Date | undefined>(value);
  const [currentMonth, setCurrentMonth] = React.useState<Date>(() => value || new Date());
  const [selectedTime, setSelectedTime] = React.useState<TimeValue>(() => {
    if (value) {
      return {
        hour: value.getHours().toString().padStart(2, '0'),
        minute: value.getMinutes().toString().padStart(2, '0'),
        second: value.getSeconds().toString().padStart(2, '0'),
      };
    }
    return { hour: '00', minute: '00', second: '00' };
  });

  // Store initial values when opening popover
  const initialDateRef = React.useRef<Date | undefined>(value);
  const initialMonthRef = React.useRef<Date>(value || new Date());
  const getInitialTime = (): TimeValue => {
    if (value) {
      return {
        hour: value.getHours().toString().padStart(2, '0'),
        minute: value.getMinutes().toString().padStart(2, '0'),
        second: value.getSeconds().toString().padStart(2, '0'),
      };
    }
    return { hour: '00', minute: '00', second: '00' };
  };
  const initialTimeRef = React.useRef<TimeValue>(getInitialTime());

  React.useEffect(() => {
    if (open) {
      // Store initial values when opening
      initialDateRef.current = value;
      initialMonthRef.current = value || new Date();
      initialTimeRef.current = value
        ? {
            hour: value.getHours().toString().padStart(2, '0'),
            minute: value.getMinutes().toString().padStart(2, '0'),
            second: value.getSeconds().toString().padStart(2, '0'),
          }
        : { hour: '00', minute: '00', second: '00' };

      // Update currentMonth and tempDate to match value when opening
      if (timeOnly) {
        // For time only, don't set tempDate or currentMonth
        if (value) {
          setSelectedTime({
            hour: value.getHours().toString().padStart(2, '0'),
            minute: value.getMinutes().toString().padStart(2, '0'),
            second: value.getSeconds().toString().padStart(2, '0'),
          });
        } else {
          setSelectedTime({ hour: '00', minute: '00', second: '00' });
        }
      } else if (mode === 'month') {
        // For month picker, set tempDate
        if (value) {
          setTempDate(startOfMonth(value));
        } else {
          setTempDate(startOfMonth(new Date()));
        }
      } else {
        setTempDate(value);
        if (value) {
          setCurrentMonth(value);
          if (showTime) {
            setSelectedTime({
              hour: value.getHours().toString().padStart(2, '0'),
              minute: value.getMinutes().toString().padStart(2, '0'),
              second: value.getSeconds().toString().padStart(2, '0'),
            });
          }
        } else {
          setCurrentMonth(new Date());
          if (showTime) {
            setSelectedTime({ hour: '00', minute: '00', second: '00' });
          }
        }
      }
    }
  }, [open, value, showTime, timeOnly, mode]);

  // Only sync when popover is closed to avoid conflicts with open effect
  React.useEffect(() => {
    if (!open && !timeOnly) {
      setTempDate(value);
      if (value) {
        setCurrentMonth(value);
        if (showTime) {
          setSelectedTime({
            hour: value.getHours().toString().padStart(2, '0'),
            minute: value.getMinutes().toString().padStart(2, '0'),
            second: value.getSeconds().toString().padStart(2, '0'),
          });
        }
      }
    } else if (!open && timeOnly && value) {
      // For time only, only update time when closed
      setSelectedTime({
        hour: value.getHours().toString().padStart(2, '0'),
        minute: value.getMinutes().toString().padStart(2, '0'),
        second: value.getSeconds().toString().padStart(2, '0'),
      });
    }
  }, [value, showTime, timeOnly, open]);

  const handleApply = () => {
    if (timeOnly) {
      // For time only, use current date or today's date with selected time
      const baseDate = value || new Date();
      const finalDate = setSeconds(
        setMinutes(
          setHours(baseDate, parseInt(selectedTime.hour, 10)),
          parseInt(selectedTime.minute, 10),
        ),
        parseInt(selectedTime.second, 10),
      );
      onChange?.(finalDate);
    } else if (mode === 'month') {
      // For month picker, use start of month
      if (tempDate) {
        onChange?.(startOfMonth(tempDate));
      } else {
        onChange?.(undefined);
      }
    } else if (tempDate) {
      let finalDate = tempDate;
      if (showTime) {
        finalDate = setHours(finalDate, parseInt(selectedTime.hour, 10));
        finalDate = setMinutes(finalDate, parseInt(selectedTime.minute, 10));
        finalDate = setSeconds(finalDate, parseInt(selectedTime.second, 10));
      }
      onChange?.(finalDate);
    } else {
      onChange?.(undefined);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    // Reset to initial values when popover was opened
    setTempDate(initialDateRef.current);
    setCurrentMonth(initialMonthRef.current);
    if (showTime) {
      setSelectedTime(initialTimeRef.current);
    }
    setOpen(false);
  };

  const displayValue = React.useMemo(() => {
    if (!value) return placeholder;
    // Only use locale if it's a Locale object (not string)
    const formatOptions = locale && typeof locale !== 'string' ? { locale } : undefined;
    if (timeOnly) {
      // Time only format
      const hasTimeFormat = /[Hhms]/.test(dateFormat);
      if (hasTimeFormat) {
        return format(value, dateFormat, formatOptions);
      }
      return format(value, 'HH:mm:ss', formatOptions);
    }
    if (mode === 'month') {
      // Month picker format - use locale-aware format
      if (locale) {
        const localeString = typeof locale === 'string' ? locale : locale?.code || 'en-US';
        const formatter = new Intl.DateTimeFormat(localeString, {
          month: '2-digit',
          year: 'numeric',
        });
        return formatter.format(value);
      }
      return format(value, 'MM/yyyy', formatOptions);
    }
    if (showTime) {
      // Check if dateFormat already includes time format
      const hasTimeFormat = /[Hhms]/.test(dateFormat);
      if (hasTimeFormat) {
        return format(value, dateFormat, formatOptions);
      }
      return format(value, `${dateFormat} HH:mm:ss`, formatOptions);
    }
    return format(value, dateFormat, formatOptions);
  }, [value, dateFormat, showTime, timeOnly, mode, placeholder, locale]);

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
        locale: locale,
      }) as React.ComponentProps<typeof Calendar>,
    [calendarProps, tempDate, currentMonth, handleCheckDisabled, locale],
  );

  return (
    <div className={cn('w-full', className)}>
      {label ? (
        <FormLabel label={label} htmlFor={id} required={required} className={labelClassName} />
      ) : null}
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>
            <div
              className={cn(
                'group w-full inline-flex items-center justify-between rounded-md border border-border bg-background shadow-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                FORM_SIZE_STYLES[size].height,
                FORM_SIZE_STYLES[size].padding,
                FORM_SIZE_STYLES[size].text,
                !value && 'text-muted-foreground',
                error && 'border-destructive',
                triggerClassName,
              )}
            >
              <span>{displayValue}</span>
              <CalendarIcon className={cn('opacity-50', FORM_SIZE_STYLES[size].icon)} />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className={cn('flex w-auto flex-col gap-2 p-0', popoverClassName)}
            align="start"
          >
            <div className="flex flex-col gap-2 pb-2">
              {timeOnly ? (
                <div className="flex h-[350px]">
                  <TimePicker
                    value={selectedTime}
                    onChange={setSelectedTime}
                    className="min-h-0 h-full shrink-0 w-full"
                  />
                </div>
              ) : mode === 'month' ? (
                <div className="flex h-[350px]">
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
                <div className={cn('flex h-[350px]', showTime && 'overflow-hidden')}>
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
              <div className="flex justify-end gap-2 px-2 shrink-0">
                <Button variant="secondary" size="sm" onClick={handleCancel}>
                  {cancelText || 'Cancel'}
                </Button>
                <Button size="sm" onClick={handleApply}>
                  {applyText || 'Apply'}
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
