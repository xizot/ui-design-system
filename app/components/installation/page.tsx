import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { TypographyH1, TypographyLead, TypographySmall } from '@/components/ui/typography';

interface InstallationSection {
  id: string;
  title: string;
  paragraphs: string[];
  code?: string;
}

const sections: InstallationSection[] = [
  {
    id: 'install',
    title: '1. Cài bằng CLI',
    paragraphs: ['Chạy tại thư mục gốc của project React 19 dùng Tailwind CSS v4.', 'CLI nhận diện pnpm, Yarn, Bun hoặc npm từ lockfile. Khi có file trùng, bạn chọn ghi đè, bỏ qua hoặc xem từng file; dependency còn thiếu được cài sau khi bạn đồng ý.'],
    code: 'npx github:xizot/ui-design-system init',
  },
  {
    id: 'structure',
    title: '2. Source và hướng dẫn agent',
    paragraphs: ['CLI copy component, hook và utility vào design-system/. Skills và React rules được copy vào .agents/; AGENTS.md được bổ sung hoặc cập nhật trong vùng đánh dấu của installer.'],
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
    paragraphs: ['CLI hỏi đường dẫn để copy globals.css, mặc định app/globals.css. Nếu file đã tồn tại, bạn chọn ghi đè hoặc bỏ qua.', 'Đảm bảo stylesheet được import vào ứng dụng và xử lý qua Tailwind CSS v4. Nếu bỏ qua, tự tích hợp theme và base styles vào CSS hiện có.'],
  },
  {
    id: 'imports',
    title: '4. Import component',
    paragraphs: ['Ví dụ dùng alias @ trỏ tới thư mục gốc project. Điều chỉnh prefix theo cấu hình alias thực tế của bạn.'],
    code: `import { Button } from '@/design-system/components/ui/button';
import { RHFInput } from '@/design-system/components/rhf';
import { cn } from '@/design-system/lib/utils';`,
  },
  {
    id: 'updates',
    title: '5. Cập nhật và đọc source',
    paragraphs: ['Chạy lại lệnh cài và kiểm tra các file trùng trước khi ghi đè chỉnh sửa local. Agent đọc skills trong .agents/skills và component trong design-system/.'],
    code: 'python3 .agents/skills/xizot-design-system/scripts/ui-source.py --root . discover "input"',
  },
];

export default function InstallationGuidePage() {
  return (
    <div className="min-w-0 space-y-6">
      <header className="space-y-3">
        <TypographySmall className="text-muted-foreground">Bắt đầu</TypographySmall>
        <TypographyH1>Installation</TypographyH1>
        <TypographyLead className="max-w-3xl">Cài source vào project để quản lý và chỉnh sửa component trong design-system/.</TypographyLead>
      </header>
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_220px]">
        <div className="min-w-0 space-y-6">
          {sections.map((section) => (
            <Card key={section.id} id={section.id} className="scroll-mt-24">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.paragraphs[0]}</CardDescription>
              </CardHeader>
              <CardContent className="min-w-0 gap-4">
                {section.paragraphs.slice(1).map((paragraph) => <p key={paragraph} className="text-muted-foreground text-sm leading-6">{paragraph}</p>)}
                {section.code && <CodeBlock code={section.code} id={`${section.id}-code`} className="min-w-0 [&_button]:opacity-100" />}
              </CardContent>
            </Card>
          ))}
        </div>
        <aside className="hidden xl:block">
          <nav aria-label="Mục lục cài đặt" className="sticky top-24 space-y-3 text-sm">
            <TypographySmall>Trên trang này</TypographySmall>
            {sections.map((section) => <a key={section.id} href={`#${section.id}`} className="text-muted-foreground hover:text-foreground focus-visible:ring-ring block rounded-sm focus-visible:ring-2 focus-visible:outline-none">{section.title}</a>)}
          </nav>
        </aside>
      </div>
    </div>
  );
}
