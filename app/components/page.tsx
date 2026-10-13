import { ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import {
  GuidePage,
  GuideSection,
  GuideSectionDescription,
  GuideSectionHeader,
  GuideSectionTitle,
} from './_components/guide-page';
import { guideGroups, guides } from './guide-data';

export const metadata: Metadata = {
  title: 'Components - UI Design System',
  description: 'Tìm component, đọc API, thử ví dụ và copy code cho ứng dụng.',
};

export default function ComponentsIndexPage() {
  return (
    <GuidePage
      title="Components"
      category="Documentation"
      description="Các thành phần để xây dựng giao diện với Xizot. Chọn một component để xem API, thử ví dụ và lấy code sử dụng."
      toc={guideGroups.map((group) => ({ id: group.id, label: group.label }))}
    >
      {guideGroups.map((group) => {
        const entries = guides.filter((guide) => guide.group === group.id);
        return (
          <GuideSection id={group.id} key={group.id}>
            <GuideSectionHeader>
              <GuideSectionTitle>
                {group.label}{' '}
                <span className="text-muted-foreground ml-2 text-sm font-normal tabular-nums">
                  {entries.length}
                </span>
              </GuideSectionTitle>
              <GuideSectionDescription>{group.description}</GuideSectionDescription>
            </GuideSectionHeader>
            <div className="grid gap-2 sm:grid-cols-2 2xl:grid-cols-3">
              {entries.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/components/${guide.slug}`}
                  className="group border-border hover:bg-accent/50 focus-visible:ring-ring flex min-h-14 items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                  {guide.name}
                  <ArrowUpRight
                    className="text-muted-foreground group-hover:text-foreground size-4 shrink-0"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </GuideSection>
        );
      })}
    </GuidePage>
  );
}
