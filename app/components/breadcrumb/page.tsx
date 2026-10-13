'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { GuideCode as CodeBlock } from '../_components/guide-code';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

import { getGuide } from '../guide-data';
import { GuidePage, GuideSection, GuideSectionHeader, GuideSectionTitle, GuideSectionDescription, GuideSectionContent } from '../_components/guide-page';

const guide = getGuide('breadcrumb');

const props = [{ name: 'className', type: 'string', defaultValue: '--' }];

const usageSamples = [
  {
    id: 'default',
    label: 'Default',
    preview: (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    code: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/design-system/components/ui/breadcrumb";

export function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`,
  },
];

export default function BreadcrumbGuidePage() {
  useEffect(() => {
    document.title = `${guide.name} - UI Design System`;
  }, []);
  return (
    <GuidePage category={guide.group} title={<>{guide.name}</>} description={<>Displays the hierarchy of a page, showing the current location in the site structure.</>} toc={[{"id":"import","label":"Import"},{"id":"props","label":"Props"},{"id":"usages","label":"Usages"}]}>
      
        

        
          <GuideSection id="import" >
            <GuideSectionHeader>
              <GuideSectionTitle>Import</GuideSectionTitle>
              <GuideSectionDescription>
                Import the breadcrumb components from the design system.
              </GuideSectionDescription>
            </GuideSectionHeader>
            <GuideSectionContent>
              <CodeBlock
                code={`import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </GuideSectionContent>
          </GuideSection>

          <GuideSection id="props" >
            <GuideSectionHeader>
              <GuideSectionTitle>Props</GuideSectionTitle>
              <GuideSectionDescription>Breadcrumb component props.</GuideSectionDescription>
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
              <GuideSectionDescription>Common breadcrumb patterns and configurations.</GuideSectionDescription>
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
