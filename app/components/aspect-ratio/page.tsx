'use client';


import { GuideCode as CodeBlock } from '../_components/guide-code';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

import { getGuide } from '../guide-data';
import { GuidePage, GuideSection, GuideSectionHeader, GuideSectionTitle, GuideSectionDescription, GuideSectionContent } from '../_components/guide-page';

const guide = getGuide('aspect-ratio');

const props = [
  { name: 'ratio', type: 'number', defaultValue: '1' },
  { name: 'asChild', type: 'boolean', defaultValue: 'false' },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const usageSamples = [
  {
    id: '16-9',
    label: '16:9',
    preview: (
      <div className="w-full max-w-sm p-4">
        <div className="bg-muted relative w-full overflow-hidden rounded-lg">
          <div className="from-primary/20 to-primary/5 aspect-[16/9] w-full bg-gradient-to-br" />
        </div>
      </div>
    ),
    code: `import { AspectRatio } from "@/design-system/components/ui/aspect-ratio";

function Example() {
  return (
    <AspectRatio ratio={16 / 9} className="bg-muted">
      <img
        src="https://example.com/image.jpg"
        alt="Image"
        className="object-cover w-full h-full"
      />
    </AspectRatio>
  );
}`,
  },
  {
    id: '4-3',
    label: '4:3',
    preview: (
      <div className="w-full max-w-sm p-4">
        <div className="bg-muted relative w-full overflow-hidden rounded-lg">
          <div className="from-primary/20 to-primary/5 aspect-[4/3] w-full bg-gradient-to-br" />
        </div>
      </div>
    ),
    code: `import { AspectRatio } from "@/design-system/components/ui/aspect-ratio";

function Example() {
  return (
    <AspectRatio ratio={4 / 3} className="bg-muted">
      <img
        src="https://example.com/image.jpg"
        alt="Image"
        className="object-cover w-full h-full"
      />
    </AspectRatio>
  );
}`,
  },
  {
    id: '1-1',
    label: '1:1',
    preview: (
      <div className="w-full max-w-sm p-4">
        <div className="bg-muted relative w-full overflow-hidden rounded-lg">
          <div className="from-primary/20 to-primary/5 aspect-square w-full bg-gradient-to-br" />
        </div>
      </div>
    ),
    code: `import { AspectRatio } from "@/design-system/components/ui/aspect-ratio";

function Example() {
  return (
    <AspectRatio ratio={1 / 1} className="bg-muted">
      <img
        src="https://example.com/image.jpg"
        alt="Image"
        className="object-cover w-full h-full"
      />
    </AspectRatio>
  );
}`,
  },
];

export default function AspectRatioGuidePage() {
  useEffect(() => {
    document.title = `${guide.name} - UI Design System`;
  }, []);
  return (
    <GuidePage category={guide.group} title={<>{guide.name}</>} description={<>Displays content within a specific aspect ratio, useful for images, videos, and other
            media.</>} toc={[{"id":"import","label":"Import"},{"id":"props","label":"Props"},{"id":"usages","label":"Usages"}]}>
      
        

        
          <GuideSection id="import" >
            <GuideSectionHeader>
              <GuideSectionTitle>Import</GuideSectionTitle>
              <GuideSectionDescription>
                Import the Aspect Ratio component from the design system.
              </GuideSectionDescription>
            </GuideSectionHeader>
            <GuideSectionContent>
              <CodeBlock
                code={`import { AspectRatio } from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </GuideSectionContent>
          </GuideSection>

          <GuideSection id="props" >
            <GuideSectionHeader>
              <GuideSectionTitle>Props</GuideSectionTitle>
              <GuideSectionDescription>Aspect Ratio component props.</GuideSectionDescription>
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
              <GuideSectionDescription>Common Aspect Ratio patterns and configurations.</GuideSectionDescription>
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
