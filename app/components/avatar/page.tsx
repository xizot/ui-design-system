'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { GuideCode as CodeBlock } from '../_components/guide-code';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

import { getGuide } from '../guide-data';
import { GuidePage, GuideSection, GuideSectionHeader, GuideSectionTitle, GuideSectionDescription, GuideSectionContent } from '../_components/guide-page';

const guide = getGuide('avatar');

const props = [{ name: 'className', type: 'string', defaultValue: '--' }];

const usageSamples = [
  {
    id: 'default',
    label: 'Default',
    preview: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    code: `import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/design-system/components/ui/avatar";

export function Example() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}`,
  },
  {
    id: 'fallback',
    label: 'Fallback Only',
    preview: (
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    ),
    code: `import {
  Avatar,
  AvatarFallback,
} from "@/design-system/components/ui/avatar";

export function Example() {
  return (
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  );
}`,
  },
  {
    id: 'sizes',
    label: 'Sizes',
    preview: (
      <div className="flex items-center gap-4">
        <Avatar className="size-8">
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="size-10">
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="size-12">
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    ),
    code: `import {
  Avatar,
  AvatarFallback,
} from "@/design-system/components/ui/avatar";

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="size-8">
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="size-10">
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}`,
  },
];

export default function AvatarGuidePage() {
  useEffect(() => {
    document.title = `${guide.name} - UI Design System`;
  }, []);
  return (
    <GuidePage category={guide.group} title={<>{guide.name}</>} description={<>An image element with a fallback for representing a user or entity.</>} toc={[{"id":"import","label":"Import"},{"id":"props","label":"Props"},{"id":"usages","label":"Usages"}]}>
      
        

        
          <GuideSection id="import" >
            <GuideSectionHeader>
              <GuideSectionTitle>Import</GuideSectionTitle>
              <GuideSectionDescription>
                Import the avatar components from the design system.
              </GuideSectionDescription>
            </GuideSectionHeader>
            <GuideSectionContent>
              <CodeBlock
                code={`import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </GuideSectionContent>
          </GuideSection>

          <GuideSection id="props" >
            <GuideSectionHeader>
              <GuideSectionTitle>Props</GuideSectionTitle>
              <GuideSectionDescription>Avatar component props.</GuideSectionDescription>
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
              <GuideSectionDescription>Common avatar patterns and configurations.</GuideSectionDescription>
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
