import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { GuideToc, type GuideTocItem } from './guide-toc';

type GuidePageProps = {
  title: ReactNode;
  description: ReactNode;
  category?: ReactNode;
  toc?: GuideTocItem[];
  children: ReactNode;
};

export function GuidePage({
  title,
  description,
  category = 'UI components',
  toc = [],
  children,
}: GuidePageProps) {
  return (
    <div className={cn('guide-page', toc.length > 0 && 'guide-page-with-toc')}>
      <article className="min-w-0">
        <header className="guide-header">
          <p className="text-muted-foreground text-xs font-medium">
            {category === 'ui'
              ? 'UI components'
              : category === 'rhf'
                ? 'React Hook Form'
                : category === 'guide'
                  ? 'Bắt đầu'
                  : category}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
          <div className="text-muted-foreground mt-4 max-w-3xl text-base leading-7">
            {description}
          </div>
        </header>
        <div className="guide-sections">{children}</div>
      </article>
      {toc.length > 0 ? <GuideToc items={toc} /> : null}
    </div>
  );
}

type GuideSectionProps = ComponentProps<'section'>;

export function GuideSection({ className, ...props }: GuideSectionProps) {
  return <section className={cn('guide-section', className)} {...props} />;
}

type GuideSectionHeaderProps = ComponentProps<'div'>;

export function GuideSectionHeader({ className, ...props }: GuideSectionHeaderProps) {
  return <div className={cn('mb-5 space-y-2', className)} {...props} />;
}

type GuideSectionTitleProps = ComponentProps<'h2'>;

export function GuideSectionTitle({ className, ...props }: GuideSectionTitleProps) {
  return <h2 className={cn('text-xl font-semibold tracking-tight', className)} {...props} />;
}

type GuideSectionDescriptionProps = ComponentProps<'div'>;

export function GuideSectionDescription({ className, ...props }: GuideSectionDescriptionProps) {
  return (
    <div
      className={cn('text-muted-foreground max-w-3xl text-sm leading-6', className)}
      {...props}
    />
  );
}

type GuideSectionContentProps = ComponentProps<'div'>;

export function GuideSectionContent({ className, ...props }: GuideSectionContentProps) {
  return <div className={cn('min-w-0 space-y-4', className)} {...props} />;
}
