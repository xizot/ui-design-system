'use client';

import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from '@/components/ui/bubble';

import { GuideCode as CodeBlock } from '../_components/guide-code';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect } from 'react';

import { getGuide } from '../guide-data';
import { GuidePage, GuideSection, GuideSectionHeader, GuideSectionTitle, GuideSectionDescription, GuideSectionContent } from '../_components/guide-page';

const guide = getGuide('bubble');

const code = `import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/design-system/components/ui/bubble";

export function Example() {
  return (
    <BubbleGroup>
      <Bubble variant="muted">
        <BubbleContent>Tin nhắn hỗ trợ nhiều biến thể.</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Phản hồi từ người dùng.</BubbleContent>
        <BubbleReactions>👍</BubbleReactions>
      </Bubble>
    </BubbleGroup>
  );
}`;

export default function BubbleGuidePage() {
  useEffect(() => {
    document.title = `${guide.name} - UI Design System`;
  }, []);

  return (
    <GuidePage category={guide.group} title={<>{guide.name}</>} description={<>Hiển thị nội dung hội thoại trong dạng bong bóng tin nhắn.</>} toc={[{"id":"import","label":"Import"},{"id":"usage","label":"Usage"}]}>
      
        

        
          <GuideSection id="import" >
            <GuideSectionHeader>
              <GuideSectionTitle>Import</GuideSectionTitle>
              <GuideSectionDescription>Import bubble component từ design system.</GuideSectionDescription>
            </GuideSectionHeader>
            <GuideSectionContent>
              <CodeBlock code={`import { Bubble } from "${guide.importPath}"`} id="import" />
            </GuideSectionContent>
          </GuideSection>

          <GuideSection id="usage" >
            <GuideSectionHeader>
              <GuideSectionTitle>Usage</GuideSectionTitle>
              <GuideSectionDescription>Cấu hình bubble phổ biến.</GuideSectionDescription>
            </GuideSectionHeader>
            <GuideSectionContent>
              <Tabs defaultValue="preview" className="gap-6">
                <div className="guide-example-tabs"><TabsList variant="line">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList></div>
                <TabsContent value="preview">
                  <div className="guide-preview">
                    <BubbleGroup>
                      <Bubble variant="muted">
                        <BubbleContent>Tin nhắn hỗ trợ nhiều biến thể.</BubbleContent>
                      </Bubble>
                      <Bubble align="end">
                        <BubbleContent>Phản hồi từ người dùng.</BubbleContent>
                        <BubbleReactions>👍</BubbleReactions>
                      </Bubble>
                    </BubbleGroup>
                  </div>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={code} id="usage-code" />
                </TabsContent>
              </Tabs>
            </GuideSectionContent>
          </GuideSection>
        
      
    </GuidePage>
  );
}
