'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TypographyH1, TypographyLead, TypographySmall } from '@/components/ui/typography';

interface InstallationSection {
  id: string;
  title: string;
  paragraphs: string[];
  code?: string;
}

interface InstallationMode {
  value: 'source' | 'package';
  label: string;
  description: string;
  sections: InstallationSection[];
}

const modes: InstallationMode[] = [
  {
    value: 'source',
    label: 'Source',
    description:
      'Copy source vào design-system/ để quản lý và chỉnh sửa component trong project. Đây là mode mặc định.',
    sections: [
      {
        id: 'install',
        title: '1. Cài bằng CLI',
        paragraphs: [
          'Chạy tại thư mục gốc của project React 19 dùng Tailwind CSS v4. Bỏ --mode source vẫn chạy mode này.',
          'CLI nhận diện pnpm, Yarn, Bun hoặc npm từ lockfile. Khi có file trùng, bạn chọn ghi đè, bỏ qua hoặc xem từng file; dependency còn thiếu được cài sau khi bạn đồng ý.',
        ],
        code: 'npx github:xizot/ui-design-system init --mode source',
      },
      {
        id: 'structure',
        title: '2. Source và hướng dẫn agent',
        paragraphs: [
          'CLI copy component, hook và utility vào design-system/. Skills và React rules được copy vào .agents/; AGENTS.md được bổ sung hoặc cập nhật trong vùng đánh dấu của installer.',
        ],
        code: `design-system/
  components/
  constants/
  hooks/
  lib/
.agents/
  skills/
  rules/
AGENTS.md`,
      },
      {
        id: 'styles',
        title: '3. Cấu hình CSS',
        paragraphs: [
          'CLI hỏi đường dẫn để copy globals.css, mặc định app/globals.css. Nếu file đã tồn tại, bạn chọn ghi đè hoặc bỏ qua.',
          'Đảm bảo stylesheet được import vào ứng dụng và xử lý qua Tailwind CSS v4. Nếu bỏ qua, tự tích hợp theme và base styles vào CSS hiện có.',
        ],
      },
      {
        id: 'imports',
        title: '4. Import component',
        paragraphs: [
          'Ví dụ dùng alias @ trỏ tới thư mục gốc project. Điều chỉnh prefix theo cấu hình alias thực tế của bạn.',
        ],
        code: `import { Button } from '@/design-system/components/ui/button';
import { RHFInput } from '@/design-system/components/rhf';
import { cn } from '@/design-system/lib/utils';`,
      },
      {
        id: 'updates',
        title: '5. Cập nhật và đọc source',
        paragraphs: [
          'Chạy lại lệnh cài và kiểm tra các file trùng trước khi ghi đè chỉnh sửa local. Agent đọc skills trong .agents/skills và component trong design-system/.',
        ],
        code: 'python3 .agents/skills/xizot-design-system/scripts/ui-source.py --root . discover "input"',
      },
    ],
  },
  {
    value: 'package',
    label: 'Package',
    description:
      'Cài dependency vào node_modules và cập nhật theo version hoặc Git revision. Component được import trực tiếp từ ui-design-system.',
    sections: [
      {
        id: 'install',
        title: '1. Cài bằng CLI',
        paragraphs: [
          'Project cần package.json, Node.js 20.19+, React 19, React DOM 19, React Hook Form 7.72+ và Tailwind CSS v4. Dùng ESM và TypeScript moduleResolution bundler, node16 hoặc nodenext.',
          'CLI cài dependency bằng package manager theo lockfile. Lệnh GitHub cần revision đã có mode package. Có thể dùng --package để chỉ định Git revision hoặc file .tgz.',
        ],
        code: 'npx github:xizot/ui-design-system init --mode package',
      },
      {
        id: 'styles',
        title: '2. Kết nối CSS',
        paragraphs: [
          'CLI thêm import vào app/globals.css, src/app/globals.css, src/index.css hoặc src/globals.css theo thứ tự tìm thấy. Dùng --css để chọn đường dẫn khác.',
          'Nếu không tìm thấy, CLI tạo design-system.css; bạn cần import file này vào entry của ứng dụng. CSS hiện có được giữ lại. Stylesheet của package đã đăng ký nguồn class cho Tailwind v4.',
        ],
        code: `/* Trong global CSS được ứng dụng import */
@import 'ui-design-system/styles.css';`,
      },
      {
        id: 'imports',
        title: '3. Import component',
        paragraphs: [
          'Dùng đường dẫn public theo component, RHF, hook hoặc utility. Package cung cấp JavaScript ESM và TypeScript declarations; không có barrel export ở root.',
        ],
        code: `import { Button } from 'ui-design-system/components/ui/button';
import { RHFInput } from 'ui-design-system/components/rhf';
import { cn } from 'ui-design-system/lib/utils';`,
      },
      {
        id: 'agents',
        title: '4. Skills và hướng dẫn agent',
        paragraphs: [
          'CLI copy toàn bộ skills và React rules từ dependency đã cài vào .agents/skills và .agents/rules của project, đồng thời cập nhật vùng đánh dấu mode trong AGENTS.md. Source đi kèm package để đọc prop contract; không sửa trực tiếp node_modules.',
          'Script nhận diện mode từ vùng đánh dấu AGENTS.md. Nếu cùng tồn tại hai bản cài mà chưa có chỉ dẫn, dùng --mode source hoặc --mode package khi tìm component.',
        ],
        code: 'python3 .agents/skills/xizot-design-system/scripts/ui-source.py --root . discover "input"',
      },
      {
        id: 'updates',
        title: '5. Chọn revision hoặc cập nhật',
        paragraphs: [
          'Skills và rules do installer quản lý được cập nhật khi chạy lại setup; skills riêng và nội dung ngoài vùng đánh dấu AGENTS.md được giữ lại. Sau khi nâng dependency thủ công, chạy lại setup để đồng bộ skills. Chạy lại setup sẽ giữ dependency spec đã lưu và không nhân đôi CSS import hay vùng hướng dẫn agent. Muốn chuyển revision, truyền --package với commit/tag cụ thể; thay placeholder trong ví dụ.',
          'Chuyển mode không tự đổi import hoặc xóa design-system/ cũ. Cập nhật import trong ứng dụng và kiểm tra trước khi tự dọn bản cài không dùng.',
        ],
        code: `npx github:xizot/ui-design-system init --mode package \\
  --package 'github:xizot/ui-design-system#<commit-or-tag>' \\
  --css src/styles.css`,
      },
    ],
  },
];

export default function InstallationGuidePage() {
  return (
    <div className="min-w-0 space-y-6">
      <header className="space-y-3">
        <TypographySmall className="text-muted-foreground">Bắt đầu</TypographySmall>
        <TypographyH1>Installation</TypographyH1>
        <TypographyLead className="max-w-3xl">
          Chọn cách cài phù hợp: quản lý source trong project hoặc sử dụng package trong
          node_modules.
        </TypographyLead>
      </header>

      <Tabs defaultValue="source" className="min-w-0 gap-6">
        <TabsList aria-label="Chế độ cài đặt" className="grid w-full grid-cols-2 sm:w-80">
          {modes.map((mode) => (
            <TabsTrigger key={mode.value} value={mode.value}>
              {mode.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {modes.map((mode) => (
          <TabsContent key={mode.value} value={mode.value} className="min-w-0 space-y-6">
            <p className="text-muted-foreground max-w-3xl text-sm leading-6">{mode.description}</p>
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_220px]">
              <div className="min-w-0 space-y-6">
                {mode.sections.map((section) => (
                  <Card
                    key={section.id}
                    id={`${mode.value}-${section.id}`}
                    className="scroll-mt-24"
                  >
                    <CardHeader>
                      <CardTitle>{section.title}</CardTitle>
                      <CardDescription>{section.paragraphs[0]}</CardDescription>
                    </CardHeader>
                    <CardContent className="min-w-0 gap-4">
                      {section.paragraphs.slice(1).map((paragraph) => (
                        <p key={paragraph} className="text-muted-foreground text-sm leading-6">
                          {paragraph}
                        </p>
                      ))}
                      {section.code && (
                        <CodeBlock
                          code={section.code}
                          id={`${mode.value}-${section.id}-code`}
                          className="min-w-0 [&_button]:opacity-100"
                        />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              <aside className="hidden xl:block">
                <nav
                  aria-label={`Mục lục ${mode.label}`}
                  className="sticky top-24 space-y-3 text-sm"
                >
                  <TypographySmall>Trên trang này</TypographySmall>
                  {mode.sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${mode.value}-${section.id}`}
                      className="text-muted-foreground hover:text-foreground focus-visible:ring-ring block rounded-sm focus-visible:ring-2 focus-visible:outline-none"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </aside>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
