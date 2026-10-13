'use client';

import { Badge, BadgeAvatar, BadgeDismiss, BadgeDot, BadgeIcon } from '@/components/ui/badge';

import { GuideCode as CodeBlock } from '../_components/guide-code';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { getGuide } from '../guide-data';
import { GuidePage, GuideSection, GuideSectionHeader, GuideSectionTitle, GuideSectionDescription, GuideSectionContent } from '../_components/guide-page';

const guide = getGuide('badge');

const props = [
  {
    name: 'variant',
    type: "'pill-color' | 'pill-outline' | 'badge-color' | 'badge-modern'",
    defaultValue: "'badge-modern'",
  },
  {
    name: 'color',
    type: "'neutral' | 'brand' | 'error' | 'warning' | 'success' | 'info' | 'purple'",
    defaultValue: "'neutral'",
  },
  { name: 'size', type: "'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'", defaultValue: "'md'" },
  { name: 'shape', type: "'default' | 'icon-only'", defaultValue: "'default'" },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const colors = ['neutral', 'brand', 'error', 'warning', 'success', 'info', 'purple'] as const;
const sizes = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

const usageSamples = [
  {
    id: 'variants',
    label: 'Variants',
    preview: (
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="pill-color" color="brand">
          Pill color
        </Badge>
        <Badge variant="pill-outline" color="brand">
          Pill outline
        </Badge>
        <Badge variant="badge-color" color="brand">
          Badge color
        </Badge>
        <Badge variant="badge-modern" color="brand">
          Badge modern
        </Badge>
      </div>
    ),
    code: `<Badge variant="pill-color" color="brand">Pill color</Badge>
<Badge variant="pill-outline" color="brand">Pill outline</Badge>
<Badge variant="badge-color" color="brand">Badge color</Badge>
<Badge variant="badge-modern" color="brand">Badge modern</Badge>`,
  },
  {
    id: 'colors',
    label: 'Colors',
    preview: (
      <div className="flex flex-wrap items-center gap-2">
        {colors.map((color) => (
          <Badge key={color} variant="pill-color" color={color}>
            {color}
          </Badge>
        ))}
      </div>
    ),
    code: `<Badge variant="pill-color" color="success">Success</Badge>
<Badge variant="pill-outline" color="warning">Warning</Badge>
<Badge variant="badge-modern" color="error">Error</Badge>`,
  },
  {
    id: 'sizes',
    label: 'Sizes',
    preview: (
      <div className="flex flex-wrap items-center gap-2">
        {sizes.map((size) => (
          <Badge key={size} variant="badge-color" color="info" size={size}>
            {size.toUpperCase()}
          </Badge>
        ))}
      </div>
    ),
    code: `<Badge size="xxs">XXS</Badge>
<Badge size="xs">XS</Badge>
<Badge size="sm">SM</Badge>
<Badge size="md">MD</Badge>
<Badge size="lg">LG</Badge>
<Badge size="xl">XL</Badge>
<Badge size="xxl">XXL</Badge>`,
  },
  {
    id: 'content',
    label: 'Content',
    preview: <BadgeContentDemo />,
    code: `import { Badge, BadgeAvatar, BadgeDismiss, BadgeDot, BadgeIcon } from "@/design-system/components/ui/badge";

<Badge variant="pill-color" color="success"><BadgeDot />Active</Badge>
<Badge variant="badge-modern" color="brand"><BadgeIcon><CheckIcon /></BadgeIcon>Verified</Badge>
<Badge variant="pill-outline"><BadgeAvatar name="Nguyen Van An" />Nguyen Van An</Badge>
<Badge variant="badge-color" color="info">Filter<BadgeDismiss label="Remove filter" onClick={removeFilter} /></Badge>
<Badge variant="pill-color" color="success" shape="icon-only" aria-label="Active"><BadgeDot /></Badge>`,
  },
];

function BadgeContentDemo() {
  const [showFilter, setShowFilter] = useState(true);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="pill-color" color="success">
        <BadgeDot />
        Active
      </Badge>
      <Badge variant="badge-modern" color="brand">
        <BadgeIcon>
          <CheckIcon />
        </BadgeIcon>
        Verified
      </Badge>
      <Badge variant="pill-outline" color="neutral">
        <BadgeAvatar name="Nguyen Van An" />
        Nguyen Van An
      </Badge>
      {showFilter ? (
        <Badge variant="badge-color" color="info">
          Filter
          <BadgeDismiss label="Remove filter" onClick={() => setShowFilter(false)} />
        </Badge>
      ) : null}
      <Badge variant="pill-color" color="success" shape="icon-only" aria-label="Active">
        <BadgeDot />
      </Badge>
    </div>
  );
}

export default function BadgeGuidePage() {
  useEffect(() => {
    document.title = `${guide.name} - UI Design System`;
  }, []);
  return (
    <GuidePage category={guide.group} title={<>{guide.name}</>} description={<>Displays a badge or label component for categorizing and highlighting information.</>} toc={[{"id":"import","label":"Import"},{"id":"props","label":"Props"},{"id":"usages","label":"Usages"}]}>
      
        

        
          <GuideSection id="import" >
            <GuideSectionHeader>
              <GuideSectionTitle>Import</GuideSectionTitle>
              <GuideSectionDescription>Import the badge component from the design system.</GuideSectionDescription>
            </GuideSectionHeader>
            <GuideSectionContent>
              <CodeBlock
                code={`import { Badge, BadgeAvatar, BadgeDismiss, BadgeDot, BadgeIcon } from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </GuideSectionContent>
          </GuideSection>

          <GuideSection id="props" >
            <GuideSectionHeader>
              <GuideSectionTitle>Props</GuideSectionTitle>
              <GuideSectionDescription>Badge component props.</GuideSectionDescription>
            </GuideSectionHeader>
            <GuideSectionContent>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="guide-props-table">
                  <thead className="bg-muted/40 text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Prop</th>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Default</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.map((prop, index) => (
                      <tr
                        key={prop.name}
                        className={cn(index !== props.length - 1 && 'border-border/70 border-b')}
                      >
                        <td className="px-4 py-3 font-medium">{prop.name}</td>
                        <td className="text-muted-foreground px-4 py-3">{prop.type}</td>
                        <td className="text-muted-foreground px-4 py-3">{prop.defaultValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GuideSectionContent>
          </GuideSection>

          <GuideSection id="usages" >
            <GuideSectionHeader>
              <GuideSectionTitle>Usages</GuideSectionTitle>
              <GuideSectionDescription>Common badge patterns and configurations.</GuideSectionDescription>
            </GuideSectionHeader>
            <GuideSectionContent>
              <Tabs defaultValue={usageSamples[0]?.id} className="gap-6">
                <div className="guide-example-tabs"><TabsList variant="line">
                  {usageSamples.map((sample) => (
                    <TabsTrigger key={sample.id} value={sample.id}>
                      {sample.label}
                    </TabsTrigger>
                  ))}
                </TabsList></div>

                {usageSamples.map((sample) => (
                  <TabsContent key={sample.id} value={sample.id} className="space-y-5">
                    <div className="guide-preview">
                      <div className="guide-preview-content">
                        {sample.preview}
                      </div>
                    </div>

                    <CodeBlock code={sample.code} id={sample.id} />
                  </TabsContent>
                ))}
              </Tabs>
            </GuideSectionContent>
          </GuideSection>
        
      

      
    </GuidePage>
  );
}
