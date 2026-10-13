'use client';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

import { GuideCode as CodeBlock } from '../_components/guide-code';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

import { getGuide } from '../guide-data';
import { GuidePage, GuideSection, GuideSectionHeader, GuideSectionTitle, GuideSectionDescription, GuideSectionContent } from '../_components/guide-page';

const guide = getGuide('button-group');

const props = [
  { name: 'orientation', type: `"horizontal" | "vertical"`, defaultValue: `"horizontal"` },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'default',
    label: 'Default',
    preview: (
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </ButtonGroup>
    ),
    code: `import { ButtonGroup } from "@/design-system/components/ui/button-group";
import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <ButtonGroup>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </ButtonGroup>
  );
}`,
  },
  {
    id: 'sizes',
    label: 'Sizes',
    preview: (
      <div className="flex flex-col items-start gap-4">
        <ButtonGroup>
          <Button size="xs">XS</Button>
          <Button size="xs" variant="outline">
            XS
          </Button>
          <Button size="xs" variant="outline">
            XS
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button size="sm">Small</Button>
          <Button size="sm" variant="outline">
            Small
          </Button>
          <Button size="sm" variant="outline">
            Small
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button>Default</Button>
          <Button variant="outline">Default</Button>
          <Button variant="outline">Default</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button size="lg">Large</Button>
          <Button size="lg" variant="outline">
            Large
          </Button>
          <Button size="lg" variant="outline">
            Large
          </Button>
        </ButtonGroup>
      </div>
    ),
    code: `import { ButtonGroup } from "@/design-system/components/ui/button-group";
import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup>
        <Button size="xs">XS</Button>
        <Button size="xs" variant="outline">XS</Button>
        <Button size="xs" variant="outline">XS</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size="sm">Small</Button>
        <Button size="sm" variant="outline">Small</Button>
        <Button size="sm" variant="outline">Small</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button>Default</Button>
        <Button variant="outline">Default</Button>
        <Button variant="outline">Default</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size="lg">Large</Button>
        <Button size="lg" variant="outline">Large</Button>
        <Button size="lg" variant="outline">Large</Button>
      </ButtonGroup>
    </div>
  );
}`,
  },
  {
    id: 'outline',
    label: 'Outline',
    preview: (
      <ButtonGroup>
        <Button variant="outline">Button 1</Button>
        <Button variant="outline">Button 2</Button>
        <Button variant="outline">Button 3</Button>
      </ButtonGroup>
    ),
    code: `import { ButtonGroup } from "@/design-system/components/ui/button-group";
import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <ButtonGroup>
      <Button variant="outline">Button 1</Button>
      <Button variant="outline">Button 2</Button>
      <Button variant="outline">Button 3</Button>
    </ButtonGroup>
  );
}`,
  },
];

export default function ButtonGroupGuidePage() {
  useEffect(() => {
    document.title = `${guide.name} - UI Design System`;
  }, []);
  return (
    <GuidePage category={guide.group} title={<>{guide.name}</>} description={<>Groups related buttons together in a single container.</>} toc={[{"id":"import","label":"Import"},{"id":"props","label":"Props"},{"id":"usages","label":"Usages"}]}>
      
        

        
          <GuideSection id="import" >
            <GuideSectionHeader>
              <GuideSectionTitle>Import</GuideSectionTitle>
              <GuideSectionDescription>
                Import the button group components from the design system.
              </GuideSectionDescription>
            </GuideSectionHeader>
            <GuideSectionContent>
              <CodeBlock
                code={`import { ButtonGroup } from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </GuideSectionContent>
          </GuideSection>

          <GuideSection id="props" >
            <GuideSectionHeader>
              <GuideSectionTitle>Props</GuideSectionTitle>
              <GuideSectionDescription>ButtonGroup component props.</GuideSectionDescription>
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
              <GuideSectionDescription>Common button group patterns and configurations.</GuideSectionDescription>
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
