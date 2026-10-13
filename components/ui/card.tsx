import { cn } from '../../lib/utils';
import * as React from 'react';

type CardSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'default';
type CardProps = React.ComponentProps<'div'> & { size?: CardSize };

const cardSizeClasses: Record<CardSize, string> = {
  xxs: '[--card-spacing:--spacing(2)] [--card-content-gap:--spacing(1)] text-xs',
  xs: '[--card-spacing:--spacing(3)] [--card-content-gap:--spacing(2)] text-xs',
  sm: '[--card-spacing:--spacing(4)] [--card-content-gap:--spacing(3)] text-sm',
  md: '[--card-spacing:--spacing(6)] [--card-content-gap:--spacing(3)] text-sm',
  lg: '[--card-spacing:--spacing(7)] [--card-content-gap:--spacing(4)] text-base',
  xl: '[--card-spacing:--spacing(8)] [--card-content-gap:--spacing(5)] text-base',
  xxl: '[--card-spacing:--spacing(10)] [--card-content-gap:--spacing(6)] text-lg',
  default: '[--card-spacing:--spacing(6)] [--card-content-gap:--spacing(3)] text-sm',
};

function Card({ className, size = 'default', ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        'group/card bg-card text-card-foreground ring-foreground/10 flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl py-(--card-spacing) shadow-xs ring-1 has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
        cardSizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        'font-heading text-base leading-normal font-medium group-data-[size=lg]/card:text-lg group-data-[size=sm]/card:text-sm group-data-[size=xl]/card:text-xl group-data-[size=xs]/card:text-xs group-data-[size=xxl]/card:text-2xl group-data-[size=xxs]/card:text-xs',
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        'text-muted-foreground text-sm group-data-[size=lg]/card:text-base group-data-[size=xl]/card:text-base group-data-[size=xs]/card:text-xs group-data-[size=xxl]/card:text-lg group-data-[size=xxs]/card:text-xs',
        className,
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('flex flex-col gap-(--card-content-gap) px-(--card-spacing)', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'flex items-center rounded-b-xl px-(--card-spacing) [.border-t]:pt-(--card-spacing)',
        className,
      )}
      {...props}
    />
  );
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
