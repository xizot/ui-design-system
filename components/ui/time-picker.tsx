'use client';

import * as React from 'react';
import { cva } from 'class-variance-authority';
import { ClockIcon, XCircleIcon } from 'lucide-react';

import { cn } from '../../lib/utils';
import {
  formControlSurface,
  formControlTriggerFocus,
  formControlTriggerInvalidFocus,
} from '../../lib/form-control-styles';
import { FormErrorMessage } from './form-error-message';
import { FormLabel } from './form-label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { ScrollArea } from './scroll-area';

export type TimeValue = {
  hour: string;
  minute: string;
  second: string;
};

type FormSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const timeTriggerVariants = cva('', {
  variants: {
    size: {
      xxs: 'h-7 px-2 text-xs',
      xs: 'h-8 px-2.5 text-xs',
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-11 px-4 text-base',
      xl: 'h-12 px-5 text-base',
      xxl: 'h-14 px-6 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const timeIconVariants = cva('', {
  variants: {
    size: {
      xxs: 'size-3.5',
      xs: 'size-4',
      sm: 'size-5',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-6',
      xxl: 'size-7',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const timeSvgIconVariants = cva('', {
  variants: {
    size: {
      xxs: "[&_svg:not([class*='size-'])]:size-3.5",
      xs: "[&_svg:not([class*='size-'])]:size-4",
      sm: "[&_svg:not([class*='size-'])]:size-5",
      md: "[&_svg:not([class*='size-'])]:size-5",
      lg: "[&_svg:not([class*='size-'])]:size-6",
      xl: "[&_svg:not([class*='size-'])]:size-6",
      xxl: "[&_svg:not([class*='size-'])]:size-7",
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
const formControlRingStyles = {
  focusWithin: 'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
  open: 'border-ring ring-3 ring-ring/50',
  invalidWithin:
    'border-destructive focus-within:ring-3 focus-within:ring-destructive/20 dark:border-destructive/50 dark:focus-within:ring-destructive/40',
  invalidOpen:
    'border-destructive ring-3 ring-destructive/20 dark:border-destructive/50 dark:ring-destructive/40',
} as const;

export type TimePickerPanelProps = {
  value: TimeValue;
  onChange: (value: TimeValue) => void;
  showSeconds?: boolean;
  className?: string;
  size?: FormSize;
  showHeader?: boolean;
};

const timePickerHeaderVariants = cva('', {
  variants: {
    size: {
      xxs: 'px-3 py-2 text-xs',
      xs: 'px-3 py-2 text-xs',
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-sm',
      lg: 'px-4 py-3 text-base',
      xl: 'px-5 py-4 text-base',
      xxl: 'px-5 py-4 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const timePickerItemVariants = cva('', {
  variants: {
    size: {
      xxs: 'text-xs',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-base',
      xxl: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const timePickerColumnVariants = cva('', {
  variants: {
    size: {
      xxs: 'w-11',
      xs: 'w-12',
      sm: 'w-12',
      md: 'w-13',
      lg: 'w-14',
      xl: 'w-15',
      xxl: 'w-16',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const timePickerRowHeightVariants = cva('', {
  variants: {
    size: {
      xxs: '[--time-row-height:24px]',
      xs: '[--time-row-height:28px]',
      sm: '[--time-row-height:28px]',
      md: '[--time-row-height:32px]',
      lg: '[--time-row-height:36px]',
      xl: '[--time-row-height:40px]',
      xxl: '[--time-row-height:44px]',
    },
  },
  defaultVariants: { size: 'md' },
});

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
  return (
    <div className={cn('flex h-full flex-col border-l', className)}>
      {showHeader ? (
        <div className="shrink-0 text-center">
          <div className={cn('font-medium', timePickerHeaderVariants({ size }))}>
            {displayValue}
          </div>
        </div>
      ) : null}

      <div
        className={cn(
          'relative flex min-h-0 flex-1 gap-0.5 px-2',
          timePickerRowHeightVariants({ size }),
        )}
      >
        <div className="bg-muted/50 pointer-events-none absolute inset-x-3 top-1/2 z-0 h-(--time-row-height) -translate-y-1/2 rounded-md" />
        <ScrollArea
          className={cn(
            '[container-type:size] relative z-10 flex-1 overflow-hidden [&>[data-slot=scroll-area-viewport]]:rounded-l-md',
            timePickerColumnVariants({ size }),
          )}
        >
          <div ref={hourContainerRef} className="py-[calc(50cqh_-_var(--time-row-height)/2)] pr-4 pl-1">
            {hours.map((hour) => (
              <div
                key={hour}
                data-hour={hour}
                onClick={() => handleHourClick(hour)}
                className={cn(
                  'flex h-(--time-row-height) cursor-pointer items-center justify-center rounded-md text-center transition-colors',
                  timePickerItemVariants({ size }),
                  currentHour === hour ? 'bg-primary text-primary-foreground' : 'hover:bg-accent',
                )}
              >
                {hour.toString().padStart(2, '0')}
              </div>
            ))}
          </div>
        </ScrollArea>

        <ScrollArea
          className={cn(
            '[container-type:size] relative z-10 flex-1 [&>[data-slot=scroll-area-viewport]]:overflow-hidden',
            timePickerColumnVariants({ size }),
          )}
        >
          <div
            ref={minuteContainerRef}
            className="py-[calc(50cqh_-_var(--time-row-height)/2)] pr-4 pl-1"
          >
            {minutes.map((minute) => (
              <div
                key={minute}
                data-minute={minute}
                onClick={() => handleMinuteClick(minute)}
                className={cn(
                  'flex h-(--time-row-height) cursor-pointer items-center justify-center rounded-md text-center transition-colors',
                  timePickerItemVariants({ size }),
                  currentMinute === minute
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent',
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
              '[container-type:size] relative z-10 flex-1 overflow-hidden [&>[data-slot=scroll-area-viewport]]:rounded-r-md',
              timePickerColumnVariants({ size }),
            )}
          >
            <div
              ref={secondContainerRef}
              className="py-[calc(50cqh_-_var(--time-row-height)/2)] pr-4 pl-1"
            >
              {seconds.map((second) => (
                <div
                  key={second}
                  data-second={second}
                  onClick={() => handleSecondClick(second)}
                  className={cn(
                    'flex h-(--time-row-height) cursor-pointer items-center justify-center rounded-md text-center transition-colors',
                    timePickerItemVariants({ size }),
                    currentSecond === second
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent',
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
        <PopoverTrigger className="group/form-trigger w-full" disabled={disabled}>
          <div
            className={cn(
              'group relative inline-flex w-full items-center justify-between gap-x-3 rounded-md border shadow-xs transition-[color,box-shadow]',
              formControlSurface,
              error ? formControlTriggerInvalidFocus : formControlTriggerFocus,
              formControlRingStyles.focusWithin,
              open && (error ? formControlRingStyles.invalidOpen : formControlRingStyles.open),
              disabled && 'pointer-events-none cursor-not-allowed opacity-50',
              error && formControlRingStyles.invalidWithin,
              timeTriggerVariants({ size }),
              !value && 'text-muted-foreground',
              triggerClassName,
            )}
          >
            <span className="block min-w-0 flex-1 truncate text-left">{displayValue}</span>
            <div
              className={cn(
                'relative z-10 ml-auto flex shrink-0 items-center gap-2 self-center',
                timeSvgIconVariants({ size }),
              )}
            >
              {value && !disabled && showClearIcon ? (
                <>
                  <span
                    className={cn(
                      'text-muted-foreground hover:text-foreground flex shrink-0 items-center justify-center opacity-0 transition-opacity group-hover:opacity-100',
                      timeIconVariants({ size }),
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
                  <ClockIcon className={cn('text-muted-foreground', timeIconVariants({ size }))} />
                </>
              ) : (
                <ClockIcon
                  className={cn('text-muted-foreground shrink-0', timeIconVariants({ size }))}
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
