'use client';

import * as React from 'react';
import { ClockIcon, XCircleIcon } from 'lucide-react';

import {
  FORM_CONTROL_RING_STYLES,
  FORM_SIZE_STYLES,
  type FormSize,
} from '../../constants/form-sizes';
import { cn } from '../../lib/utils';
import { FormErrorMessage } from './form-error-message';
import { FormLabel } from './form-label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { ScrollArea } from './scroll-area';

export type TimeValue = {
  hour: string;
  minute: string;
  second: string;
};

export type TimePickerPanelProps = {
  value: TimeValue;
  onChange: (value: TimeValue) => void;
  showSeconds?: boolean;
  className?: string;
  size?: FormSize;
  showHeader?: boolean;
};

const timePickerSizeStyles: Record<FormSize, { header: string; item: string; column: string }> = {
  xxs: { header: 'px-3 py-2 text-sm', item: 'px-1.5 py-1 text-xs', column: 'w-12' },
  xs: { header: 'px-3 py-2 text-sm', item: 'px-1.5 py-1 text-xs', column: 'w-14' },
  sm: { header: 'px-3 py-2 text-base', item: 'px-2 py-1 text-sm', column: 'w-14' },
  md: { header: 'px-4 py-3 text-lg', item: 'px-2 py-1.5 text-sm', column: 'w-16' },
  lg: { header: 'px-4 py-3 text-lg', item: 'px-2.5 py-2 text-base', column: 'w-20' },
  xl: { header: 'px-5 py-4 text-xl', item: 'px-3 py-2 text-base', column: 'w-20' },
  xxl: { header: 'px-5 py-4 text-xl', item: 'px-3 py-2.5 text-lg', column: 'w-24' },
};

function TimePickerPanel({
  value,
  onChange,
  showSeconds = true,
  className,
  size = 'md',
  showHeader = true,
}: TimePickerPanelProps) {
  const hourContainerRef = React.useRef<HTMLDivElement>(null);
  const minuteContainerRef = React.useRef<HTMLDivElement>(null);
  const secondContainerRef = React.useRef<HTMLDivElement>(null);

  const currentHour = parseInt(value.hour, 10) || 0;
  const currentMinute = parseInt(value.minute, 10) || 0;
  const currentSecond = parseInt(value.second, 10) || 0;

  // Generate arrays for hours, minutes, seconds
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const seconds = Array.from({ length: 60 }, (_, i) => i);

  // Scroll to selected value on mount and when value changes
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (hourContainerRef.current) {
        const hourElement = hourContainerRef.current.querySelector(
          `[data-hour="${currentHour}"]`,
        ) as HTMLElement;
        if (hourElement) {
          const viewport = hourContainerRef.current.closest(
            '[data-slot="scroll-area-viewport"]',
          ) as HTMLElement;
          if (viewport) {
            const top =
              hourElement.offsetTop - viewport.clientHeight / 2 + hourElement.offsetHeight / 2;
            viewport.scrollTo({ top, behavior: 'smooth' });
          }
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [currentHour]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (minuteContainerRef.current) {
        const minuteElement = minuteContainerRef.current.querySelector(
          `[data-minute="${currentMinute}"]`,
        ) as HTMLElement;
        if (minuteElement) {
          const viewport = minuteContainerRef.current.closest(
            '[data-slot="scroll-area-viewport"]',
          ) as HTMLElement;
          if (viewport) {
            const top =
              minuteElement.offsetTop - viewport.clientHeight / 2 + minuteElement.offsetHeight / 2;
            viewport.scrollTo({ top, behavior: 'smooth' });
          }
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [currentMinute]);

  React.useEffect(() => {
    if (!showSeconds) return;
    const timer = setTimeout(() => {
      if (secondContainerRef.current) {
        const secondElement = secondContainerRef.current.querySelector(
          `[data-second="${currentSecond}"]`,
        ) as HTMLElement;
        if (secondElement) {
          const viewport = secondContainerRef.current.closest(
            '[data-slot="scroll-area-viewport"]',
          ) as HTMLElement;
          if (viewport) {
            const top =
              secondElement.offsetTop - viewport.clientHeight / 2 + secondElement.offsetHeight / 2;
            viewport.scrollTo({ top, behavior: 'smooth' });
          }
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [currentSecond, showSeconds]);

  const handleHourClick = (hour: number) => {
    onChange({
      ...value,
      hour: hour.toString().padStart(2, '0'),
    });
  };

  const handleMinuteClick = (minute: number) => {
    onChange({
      ...value,
      minute: minute.toString().padStart(2, '0'),
    });
  };

  const handleSecondClick = (second: number) => {
    onChange({
      ...value,
      second: second.toString().padStart(2, '0'),
    });
  };

  const displayValue = `${value.hour}:${value.minute}${showSeconds ? `:${value.second}` : ''}`;
  const sizeStyles = timePickerSizeStyles[size];

  return (
    <div className={cn('flex flex-col h-full border-l', className)}>
      {showHeader ? (
        <div className="text-center shrink-0">
          <div className={cn('font-medium', sizeStyles.header)}>{displayValue}</div>
        </div>
      ) : null}

      <div className="relative flex flex-1 min-h-0 gap-0.5">
        <div className="pointer-events-none absolute inset-x-2 top-1/2 z-0 h-8 -translate-y-1/2 rounded-md bg-muted/50" />
        <ScrollArea
          className={cn(
            'relative z-10 flex-1 [&>[data-slot=scroll-area-viewport]]:rounded-l-md overflow-hidden',
            sizeStyles.column,
          )}
        >
          <div ref={hourContainerRef} className="px-2 py-[calc(50%_-_1rem)]">
            {hours.map((hour) => (
              <div
                key={hour}
                data-hour={hour}
                onClick={() => handleHourClick(hour)}
                className={cn(
                  'cursor-pointer rounded-md text-left transition-colors',
                  sizeStyles.item,
                  currentHour === hour ? 'bg-secondary' : 'hover:bg-accent',
                )}
              >
                {hour.toString().padStart(2, '0')}
              </div>
            ))}
          </div>
        </ScrollArea>

        <ScrollArea
          className={cn(
            'relative z-10 flex-1 [&>[data-slot=scroll-area-viewport]]:overflow-hidden',
            sizeStyles.column,
          )}
        >
          <div ref={minuteContainerRef} className="px-2 py-[calc(50%_-_1rem)]">
            {minutes.map((minute) => (
              <div
                key={minute}
                data-minute={minute}
                onClick={() => handleMinuteClick(minute)}
                className={cn(
                  'cursor-pointer rounded-md text-left transition-colors',
                  sizeStyles.item,
                  currentMinute === minute ? 'bg-secondary' : 'hover:bg-accent',
                )}
              >
                {minute.toString().padStart(2, '0')}
              </div>
            ))}
          </div>
        </ScrollArea>

        {showSeconds && (
          <ScrollArea
            className={cn(
              'relative z-10 flex-1 [&>[data-slot=scroll-area-viewport]]:rounded-r-md overflow-hidden',
              sizeStyles.column,
            )}
          >
            <div ref={secondContainerRef} className="px-2 py-[calc(50%_-_1rem)]">
              {seconds.map((second) => (
                <div
                  key={second}
                  data-second={second}
                  onClick={() => handleSecondClick(second)}
                  className={cn(
                    'cursor-pointer rounded-md text-left transition-colors',
                    sizeStyles.item,
                    currentSecond === second ? 'bg-secondary' : 'hover:bg-accent',
                  )}
                >
                  {second.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}

export type TimePickerProps = Omit<TimePickerPanelProps, 'value' | 'onChange'> & {
  value?: TimeValue;
  onChange: (value: TimeValue | undefined) => void;
  id?: string;
  label?: string | React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  triggerClassName?: React.ComponentProps<'div'>['className'];
  popoverClassName?: React.ComponentProps<typeof PopoverContent>['className'];
  labelClassName?: React.ComponentProps<'label'>['className'];
  errorClassName?: React.ComponentProps<'p'>['className'];
  panelClassName?: string;
  showClearIcon?: boolean;
};

function TimePicker({
  id,
  label,
  required,
  disabled,
  error,
  placeholder = 'Chọn thời gian',
  value,
  onChange,
  showSeconds = true,
  className,
  triggerClassName,
  popoverClassName,
  labelClassName,
  errorClassName,
  panelClassName,
  showClearIcon = true,
  size = 'md',
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const resolvedValue = value ?? { hour: '00', minute: '00', second: '00' };
  const displayValue = value
    ? `${value.hour}:${value.minute}${showSeconds ? `:${value.second}` : ''}`
    : placeholder;

  return (
    <div className={cn('w-full', className)}>
      {label ? (
        <FormLabel label={label} htmlFor={id} required={required} className={labelClassName} />
      ) : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-full" disabled={disabled}>
          <div
            className={cn(
              'group relative inline-flex w-full items-center justify-between gap-x-3 rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow] dark:bg-input/30',
              FORM_CONTROL_RING_STYLES.focusWithin,
              open &&
                (error ? FORM_CONTROL_RING_STYLES.invalidOpen : FORM_CONTROL_RING_STYLES.open),
              disabled && 'pointer-events-none cursor-not-allowed opacity-50',
              error && FORM_CONTROL_RING_STYLES.invalidWithin,
              FORM_SIZE_STYLES[size].height,
              FORM_SIZE_STYLES[size].paddingX,
              FORM_SIZE_STYLES[size].text,
              !value && 'text-muted-foreground',
              triggerClassName,
            )}
          >
            <span className="block min-w-0 flex-1 truncate text-left">{displayValue}</span>
            <div
              className={cn(
                'relative z-10 ml-auto flex shrink-0 items-center gap-2 self-center',
                FORM_SIZE_STYLES[size].svgIcon,
              )}
            >
              {value && !disabled && showClearIcon ? (
                <>
                  <span
                    className={cn(
                      'flex shrink-0 items-center justify-center text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground',
                      FORM_SIZE_STYLES[size].icon,
                    )}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onChange(undefined);
                    }}
                  >
                    <XCircleIcon />
                    <span className="sr-only">Clear</span>
                  </span>
                  <ClockIcon className={cn('text-muted-foreground', FORM_SIZE_STYLES[size].icon)} />
                </>
              ) : (
                <ClockIcon
                  className={cn('shrink-0 text-muted-foreground', FORM_SIZE_STYLES[size].icon)}
                />
              )}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className={cn('w-auto p-0', popoverClassName)} align="end">
          <TimePickerPanel
            value={resolvedValue}
            onChange={onChange}
            showSeconds={showSeconds}
            showHeader={false}
            size={size}
            className={cn('h-[350px] border-l-0', panelClassName)}
          />
        </PopoverContent>
      </Popover>
      {error ? <FormErrorMessage error={error} errorClassName={errorClassName} /> : null}
    </div>
  );
}

export { TimePicker, TimePickerPanel };
