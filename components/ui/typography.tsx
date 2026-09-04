import * as React from 'react';

import { cn } from '../../lib/utils';

function TypographyH1({ className, ...props }: React.ComponentProps<'h1'>) {
  return <h1 className={cn('text-4xl font-semibold tracking-tight', className)} {...props} />;
}

function TypographyH2({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)} {...props} />
  );
}

function TypographyH3({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)} {...props} />
  );
}

function TypographyH4({ className, ...props }: React.ComponentProps<'h4'>) {
  return (
    <h4 className={cn('scroll-m-20 text-lg font-semibold tracking-tight', className)} {...props} />
  );
}

function TypographyLead({ className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn('text-muted-foreground text-base leading-7', className)} {...props} />;
}

function TypographyP({ className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn('text-foreground text-sm leading-7', className)} {...props} />;
}

function TypographyMuted({ className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

function TypographySmall({ className, ...props }: React.ComponentProps<'small'>) {
  return (
    <small className={cn('text-muted-foreground text-xs font-medium', className)} {...props} />
  );
}

function TypographyCode({ className, ...props }: React.ComponentProps<'code'>) {
  return (
    <code
      className={cn(
        'border-border/70 bg-muted rounded-md border px-1.5 py-0.5 font-mono text-sm',
        className,
      )}
      {...props}
    />
  );
}

export {
  TypographyCode,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyLead,
  TypographyMuted,
  TypographyP,
  TypographySmall,
};
