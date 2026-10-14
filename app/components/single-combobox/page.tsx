'use client';

import { GuideCode as CodeBlock } from '../_components/guide-code';
import {
  GuidePage,
  GuideSection,
  GuideSectionContent,
  GuideSectionDescription,
  GuideSectionHeader,
  GuideSectionTitle,
} from '../_components/guide-page';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { getGuide } from '../guide-data';
import { SingleCombobox } from '@/components/ui/single-combobox';
import {
  SingleComboboxInlineLabelDemo,
  SingleComboboxSelectedCodeOnlyDemo,
  SingleComboboxWithCodeDemo,
} from './single-combobox-demo';

const guide = getGuide('single-combobox');

const departments = [
  { id: 1, code: 'IT', name: 'Công nghệ thông tin' },
  { id: 2, code: 'HR', name: 'Nhân sự' },
  { id: 3, code: 'FIN', name: 'Tài chính' },
  { id: 4, code: 'MKT', name: 'Marketing' },
  { id: 5, code: 'OPS', name: 'Vận hành' },
];

const singleComboboxProps = [
  { name: 'options', type: 'ComboboxBaseOption[]', defaultValue: '--' },
  { name: 'value', type: 'string | number', defaultValue: '--' },
  { name: 'onChange', type: '(value, option) => void', defaultValue: '--' },
  { name: 'placeholder', type: 'string', defaultValue: "'Chọn...'" },
  { name: 'label', type: 'string | ReactNode', defaultValue: '--' },
  { name: 'inlineLabel', type: 'string | ReactNode', defaultValue: '--' },
  { name: 'required', type: 'boolean', defaultValue: 'false' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false' },
  { name: 'error', type: 'string', defaultValue: '--' },
  { name: 'showMenuCode', type: 'boolean', defaultValue: 'true' },
  { name: 'showSelectedCode', type: 'boolean', defaultValue: 'false' },
  { name: 'selectedCodeOnly', type: 'boolean', defaultValue: 'false' },
  { name: 'searchPlaceholder', type: 'string', defaultValue: "'Tìm kiếm...'" },
  {
    name: 'emptyMessage',
    type: 'string',
    defaultValue: "'Không tìm thấy kết quả'",
  },
  {
    name: 'size',
    type: `'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'`,
    defaultValue: `'md'`,
  },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const singleUsageSamples = [
  {
    id: 'inline-label',
    label: 'Inline label',
    preview: <SingleComboboxInlineLabelDemo />,
    code: `<SingleCombobox
  inlineLabel="Phòng ban"
  options={departments}
  value={value}
  onChange={(v) => setValue(v)}
  placeholder="Chọn phòng ban..."
/>`,
  },
  {
    id: 'with-code',
    label: 'Hiện mã',
    preview: <SingleComboboxWithCodeDemo />,
    code: `<SingleCombobox
  label="Phòng ban"
  options={departments}
  value={value}
  onChange={(v) => setValue(v)}
  placeholder="Chọn phòng ban..."
  showMenuCode    {/* hiện "IT - Công nghệ thông tin" trong dropdown */}
  showSelectedCode {/* hiện "IT - Công nghệ thông tin" sau khi chọn */}
/>`,
  },
  {
    id: 'selected-code-only',
    label: 'Chỉ hiện mã',
    preview: <SingleComboboxSelectedCodeOnlyDemo />,
    code: `<SingleCombobox
  label="Phòng ban"
  options={departments}
  value={value}
  onChange={(v) => setValue(v)}
  placeholder="Chọn phòng ban..."
  showMenuCode       {/* dropdown vẫn hiện "IT - Công nghệ thông tin" */}
  selectedCodeOnly   {/* selected chỉ hiện "IT" */}
/>`,
  },
  {
    id: 'error',
    label: 'Error',
    preview: (
      <div className="w-full max-w-sm p-4">
        <SingleCombobox
          label="Phòng ban"
          required
          options={departments}
          placeholder="Chọn phòng ban..."
          error="Vui lòng chọn phòng ban"
        />
      </div>
    ),
    code: `<SingleCombobox
  label="Phòng ban"
  required
  options={departments}
  value={value}
  onChange={(v) => setValue(v)}
  placeholder="Chọn phòng ban..."
  error="Vui lòng chọn phòng ban"
/>`,
  },
];

export default function SingleComboboxGuidePage() {
  useEffect(() => {
    document.title = `${guide.name} - UI Design System`;
  }, []);

  return (
    <GuidePage
      category={guide.group}
      title={guide.name}
      description="Chọn một giá trị, tìm theo mã hoặc tên và hiển thị label, lỗi theo size của form."
      toc={[
        { id: 'sizes', label: 'Sizes' },
        { id: 'single-import', label: 'Import' },
        { id: 'single-type', label: 'ComboboxBaseOption' },
        { id: 'single-props', label: 'Props' },
        { id: 'single-usages', label: 'Usages' },
      ]}
    >
      <GuideSection id="sizes">
        <GuideSectionHeader>
          <GuideSectionTitle>Sizes</GuideSectionTitle>
          <GuideSectionDescription>
            Size của trigger và ô tìm kiếm trong dropdown.
          </GuideSectionDescription>
        </GuideSectionHeader>
        <GuideSectionContent>
          <div className="grid max-w-sm gap-4">
            <SingleCombobox
              label="XXS"
              size="xxs"
              options={departments}
              placeholder="Chọn phòng ban..."
            />
            <SingleCombobox
              label="XS"
              size="xs"
              options={departments}
              placeholder="Chọn phòng ban..."
            />
            <SingleCombobox
              label="SM"
              size="sm"
              options={departments}
              placeholder="Chọn phòng ban..."
            />
            <SingleCombobox
              label="MD"
              size="md"
              options={departments}
              placeholder="Chọn phòng ban..."
            />
            <SingleCombobox
              label="LG"
              size="lg"
              options={departments}
              placeholder="Chọn phòng ban..."
            />
            <SingleCombobox
              label="XL"
              size="xl"
              options={departments}
              placeholder="Chọn phòng ban..."
            />
            <SingleCombobox
              label="XXL"
              size="xxl"
              options={departments}
              placeholder="Chọn phòng ban..."
            />
          </div>
        </GuideSectionContent>
      </GuideSection>

      <GuideSection id="single-import">
        <GuideSectionHeader>
          <GuideSectionTitle>Import</GuideSectionTitle>
        </GuideSectionHeader>
        <GuideSectionContent>
          <CodeBlock
            code={`import { SingleCombobox } from "@/design-system/components/ui/single-combobox";
import type { ComboboxBaseOption } from "@/design-system/components/ui/single-combobox";`}
            id="single-import"
          />
        </GuideSectionContent>
      </GuideSection>

      <GuideSection id="single-type">
        <GuideSectionHeader>
          <GuideSectionTitle>ComboboxBaseOption</GuideSectionTitle>
          <GuideSectionDescription>
            Kiểu dữ liệu option bắt buộc. Mọi danh sách truyền vào đều phải có đủ 3 trường này.
          </GuideSectionDescription>
        </GuideSectionHeader>
        <GuideSectionContent>
          <CodeBlock
            code={`type ComboboxBaseOption = {
  id: string | number;
  code: string;
  name: string;
};`}
            id="single-type"
          />
        </GuideSectionContent>
      </GuideSection>

      <GuideSection id="single-props">
        <GuideSectionHeader>
          <GuideSectionTitle>Props</GuideSectionTitle>
          <GuideSectionDescription>
            Component là generic — TypeScript tự infer kiểu option từ mảng options được truyền vào.
          </GuideSectionDescription>
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
                {singleComboboxProps.map((prop, index) => (
                  <tr
                    key={prop.name}
                    className={cn(
                      index !== singleComboboxProps.length - 1 && 'border-border/70 border-b',
                    )}
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

      <GuideSection id="single-usages">
        <GuideSectionHeader>
          <GuideSectionTitle>Usages</GuideSectionTitle>
        </GuideSectionHeader>
        <GuideSectionContent>
          <Tabs defaultValue={singleUsageSamples[0]?.id} className="gap-6">
            <div className="guide-example-tabs">
              <TabsList variant="line">
                {singleUsageSamples.map((sample) => (
                  <TabsTrigger key={sample.id} value={sample.id}>
                    {sample.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {singleUsageSamples.map((sample) => (
              <TabsContent key={sample.id} value={sample.id} className="space-y-5">
                <div className="guide-preview">
                  <div className="guide-preview-content">{sample.preview}</div>
                </div>
                <CodeBlock code={sample.code} id={`single-${sample.id}`} />
              </TabsContent>
            ))}
          </Tabs>
        </GuideSectionContent>
      </GuideSection>
    </GuidePage>
  );
}
