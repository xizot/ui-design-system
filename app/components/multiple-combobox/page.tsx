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
import { MultipleCombobox } from '@/components/ui/multiple-combobox';
import {
  MultipleComboboxAutoResizeDemo,
  MultipleComboboxBasicDemo,
  MultipleComboboxLimitTagsDemo,
  MultipleComboboxSelectedCodeOnlyDemo,
  MultipleComboboxWithCodeDemo,
} from './multiple-combobox-demo';

const guide = getGuide('multiple-combobox');

const departments = [
  { id: 1, code: 'IT', name: 'Công nghệ thông tin' },
  { id: 2, code: 'HR', name: 'Nhân sự' },
  { id: 3, code: 'FIN', name: 'Tài chính' },
  { id: 4, code: 'MKT', name: 'Marketing' },
  { id: 5, code: 'OPS', name: 'Vận hành' },
];

const multipleComboboxProps = [
  { name: 'options', type: 'ComboboxBaseOption[]', defaultValue: '--' },
  { name: 'value', type: '(string | number)[]', defaultValue: '--' },
  { name: 'onChange', type: '(values, options) => void', defaultValue: '--' },
  { name: 'placeholder', type: 'string', defaultValue: "'Chọn...'" },
  { name: 'label', type: 'string | ReactNode', defaultValue: '--' },
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
  { name: 'limitTags', type: 'number', defaultValue: '--' },
  { name: 'autoResize', type: 'boolean', defaultValue: 'false' },
  {
    name: 'size',
    type: `'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'`,
    defaultValue: `'md'`,
  },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const multipleUsageSamples = [
  {
    id: 'with-code',
    label: 'Hiện mã',
    preview: <MultipleComboboxWithCodeDemo />,
    code: `<MultipleCombobox
  label="Phòng ban"
  options={departments}
  value={values}
  onChange={(v) => setValues(v)}
  placeholder="Chọn phòng ban..."
  showMenuCode     {/* hiện "IT - Công nghệ thông tin" trong dropdown */}
  showSelectedCode {/* hiện "IT - Công nghệ thông tin" trong chip */}
/>`,
  },
  {
    id: 'selected-code-only',
    label: 'Chỉ hiện mã',
    preview: <MultipleComboboxSelectedCodeOnlyDemo />,
    code: `<MultipleCombobox
  label="Phòng ban"
  options={departments}
  value={values}
  onChange={(v) => setValues(v)}
  placeholder="Chọn phòng ban..."
  showMenuCode       {/* dropdown vẫn hiện "IT - Công nghệ thông tin" */}
  selectedCodeOnly   {/* chip chỉ hiện "IT" */}
/>`,
  },
  {
    id: 'auto-resize',
    label: 'Auto resize',
    preview: <MultipleComboboxAutoResizeDemo />,
    code: `<MultipleCombobox
  label="Phòng ban"
  options={departments}
  value={values}
  onChange={(v) => setValues(v)}
  placeholder="Chọn phòng ban..."
  autoResize  {/* trigger cao lên và chip tự wrap nhiều dòng */}
/>`,
  },
  {
    id: 'limit-tags',
    label: 'Giới hạn badge',
    preview: <MultipleComboboxLimitTagsDemo />,
    code: `<MultipleCombobox
  label="Phòng ban"
  options={departments}
  value={values}
  onChange={(v) => setValues(v)}
  placeholder="Chọn phòng ban..."
  limitTags={2}  {/* chọn > 2 items sẽ hiện "+N" */}
/>`,
  },
  {
    id: 'error',
    label: 'Error',
    preview: (
      <div className="w-full max-w-sm p-4">
        <MultipleCombobox
          label="Phòng ban"
          required
          options={departments}
          placeholder="Chọn phòng ban..."
          error="Vui lòng chọn ít nhất một phòng ban"
        />
      </div>
    ),
    code: `<MultipleCombobox
  label="Phòng ban"
  required
  options={departments}
  value={values}
  onChange={(v) => setValues(v)}
  placeholder="Chọn phòng ban..."
  error="Vui lòng chọn ít nhất một phòng ban"
/>`,
  },
];

export default function MultipleComboboxGuidePage() {
  useEffect(() => {
    document.title = `${guide.name} - UI Design System`;
  }, []);

  return (
    <GuidePage
      category={guide.group}
      title={guide.name}
      description="Chọn nhiều giá trị bằng chip, tìm theo mã hoặc tên và tự mở rộng chiều cao khi cần."
      toc={[
        { id: 'sizes', label: 'Sizes' },
        { id: 'multiple-import', label: 'Import' },
        { id: 'multiple-props', label: 'Props' },
        { id: 'multiple-usages', label: 'Usages' },
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
            <MultipleComboboxBasicDemo size="xxs" label="XXS" />
            <MultipleComboboxBasicDemo size="xs" label="XS" />
            <MultipleComboboxBasicDemo size="sm" label="SM" />
            <MultipleComboboxBasicDemo size="md" label="MD" />
            <MultipleComboboxBasicDemo size="lg" label="LG" />
            <MultipleComboboxBasicDemo size="xl" label="XL" />
            <MultipleComboboxBasicDemo size="xxl" label="XXL" />
          </div>
        </GuideSectionContent>
      </GuideSection>

      <GuideSection id="multiple-import">
        <GuideSectionHeader>
          <GuideSectionTitle>Import</GuideSectionTitle>
        </GuideSectionHeader>
        <GuideSectionContent>
          <CodeBlock
            code={`import { MultipleCombobox } from "@/design-system/components/ui/multiple-combobox";`}
            id="multiple-import"
          />
        </GuideSectionContent>
      </GuideSection>

      <GuideSection id="multiple-props">
        <GuideSectionHeader>
          <GuideSectionTitle>Props</GuideSectionTitle>
          <GuideSectionDescription>
            Props giống SingleCombobox, khác ở kiểu của value và onChange.
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
                {multipleComboboxProps.map((prop, index) => (
                  <tr
                    key={prop.name}
                    className={cn(
                      index !== multipleComboboxProps.length - 1 && 'border-border/70 border-b',
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

      <GuideSection id="multiple-usages">
        <GuideSectionHeader>
          <GuideSectionTitle>Usages</GuideSectionTitle>
        </GuideSectionHeader>
        <GuideSectionContent>
          <Tabs defaultValue={multipleUsageSamples[0]?.id} className="gap-6">
            <div className="guide-example-tabs">
              <TabsList variant="line">
                {multipleUsageSamples.map((sample) => (
                  <TabsTrigger key={sample.id} value={sample.id}>
                    {sample.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {multipleUsageSamples.map((sample) => (
              <TabsContent key={sample.id} value={sample.id} className="space-y-5">
                <div className="guide-preview">
                  <div className="guide-preview-content">{sample.preview}</div>
                </div>
                <CodeBlock code={sample.code} id={`multiple-${sample.id}`} />
              </TabsContent>
            ))}
          </Tabs>
        </GuideSectionContent>
      </GuideSection>
    </GuidePage>
  );
}
