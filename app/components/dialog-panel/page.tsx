'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { DialogPanel, DialogPanelRoot, DialogPanelTrigger } from '@/components/ui/dialog-panel';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const guide = {
  name: 'Dialog Panel',
  group: 'ui',
  importPath: '@/design-system/components/ui/dialog-panel',
} as const;

const props = [
  { name: 'size', type: `"sm" | "md" | "lg" | "xl" | "auto"`, defaultValue: `"md"` },
  { name: 'title', type: 'React.ReactNode', defaultValue: '--' },
  { name: 'description', type: 'React.ReactNode', defaultValue: '--' },
  { name: 'footer', type: 'React.ReactNode', defaultValue: '--' },
  { name: 'showCloseButton', type: 'boolean', defaultValue: 'true' },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'default',
    label: 'Default',
    preview: (
      <DialogPanelRoot>
        <DialogPanelTrigger render={<Button variant="outline">Mở dialog</Button>} />
        <DialogPanel
          title="Cập nhật hồ sơ"
          description="Dùng wrapper thống nhất cho dialog center."
          footer={
            <>
              <Button variant="outline">Hủy</Button>
              <Button>Lưu thay đổi</Button>
            </>
          }
        >
          <div className="grid gap-3">
            <Input label="Họ và tên" placeholder="Nguyễn Văn A" />
            <Input label="Email" placeholder="name@company.vn" />
          </div>
        </DialogPanel>
      </DialogPanelRoot>
    ),
    code: `import {
  DialogPanel,
  DialogPanelRoot,
  DialogPanelTrigger,
} from "@/design-system/components/ui/dialog-panel";
import { Button } from "@/design-system/components/ui/button";
import { Input } from "@/design-system/components/ui/input";

export function Example() {
  return (
    <DialogPanelRoot>
      <DialogPanelTrigger render={<Button variant="outline">Mở dialog</Button>} />
      <DialogPanel
        title="Cập nhật hồ sơ"
        description="Dùng wrapper thống nhất cho dialog center."
        footer={
          <>
            <Button variant="outline">Hủy</Button>
            <Button>Lưu thay đổi</Button>
          </>
        }
      >
        <div className="grid gap-3">
          <Input label="Họ và tên" placeholder="Nguyễn Văn A" />
          <Input label="Email" placeholder="name@company.vn" />
        </div>
      </DialogPanel>
    </DialogPanelRoot>
  );
}`,
  },
  {
    id: 'sizes',
    label: 'Sizes',
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        {(['sm', 'md', 'lg', 'xl', 'auto'] as const).map((size) => (
          <DialogPanelRoot key={size}>
            <DialogPanelTrigger render={<Button variant="outline">{size}</Button>} />
            <DialogPanel
              size={size}
              title={`Dialog ${size}`}
              footer={
                <>
                  <Button variant="outline">Hủy</Button>
                  <Button>Lưu</Button>
                </>
              }
            >
              <p className="text-sm text-muted-foreground">
                {size === 'auto'
                  ? 'Dùng khi muốn tự kiểm soát kích thước bằng className riêng.'
                  : `Preset kích thước ${size} cho dialog.`}
              </p>
              {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit, pariatur
              delectus repellendus excepturi illum sequi quis asperiores odit optio, voluptatibus
              cum itaque illo impedit similique deleniti, vitae repudiandae. Distinctio mollitia
              voluptatibus cumque tempora quod ab! Error in ex, unde facere officiis commodi. Nulla
              reiciendis quae aspernatur illo ratione nisi ullam explicabo quidem eius aut. Ea
              numquam quod odio sapiente harum voluptas rem architecto. Aliquid, quas ut. Adipisci
              beatae nihil excepturi minus magnam in ipsum nesciunt odio repellendus, numquam
              voluptatibus sequi neque dolores? Ratione quaerat, nihil fugiat vero eius, ea aliquid
              optio eveniet iusto provident maiores aut tenetur alias porro deleniti officia ab!
              Iure, ullam? Amet recusandae vero inventore quibusdam cumque pariatur voluptatem quia,
              placeat facere odit hic similique natus eaque est omnis reprehenderit voluptate
              nesciunt. Neque sapiente dolore dicta natus, ad at incidunt corporis recusandae quae a
              porro necessitatibus hic totam tempora alias enim amet adipisci tempore nesciunt id
              quaerat vel molestiae facilis. Impedit, voluptate tenetur! Veniam dolorem porro
              aliquam repellendus nemo ducimus neque facere modi magni voluptates quasi recusandae
              fuga dolores nulla eum, tempora nihil eaque molestiae asperiores. Ex pariatur
              distinctio voluptate nemo corrupti, eaque aspernatur, repellat officiis, perferendis
              beatae dolor autem asperiores a voluptatem! Cum, quaerat reiciendis qui labore harum
              laboriosam? Numquam et iusto reprehenderit officiis a quasi reiciendis repellat
              deleniti facere sit quisquam in nihil, fuga totam? Nostrum impedit ad quisquam
              aspernatur tenetur tempora nihil, corporis consequatur cum unde, sit perferendis
              corrupti a optio necessitatibus sunt voluptas laudantium aliquam assumenda odio fuga
              ut. Maiores asperiores debitis mollitia quis, esse commodi nisi eveniet quidem placeat
              consequatur dolorem omnis ipsam autem nesciunt suscipit iusto veniam? Perspiciatis
              itaque fuga saepe a illo at. Nisi, dolor harum voluptates error, eum quis expedita eos
              sint quidem blanditiis molestias illo accusamus? Unde inventore aliquid ex quisquam
              odit? Ad, quaerat quibusdam. Cupiditate quidem dolorum ipsam facilis ratione
              consectetur. Tempora magnam placeat veniam quaerat aliquid non, nobis tempore odio
              ducimus molestias aliquam id vero explicabo, magni doloribus maxime! Dolor adipisci
              aliquam suscipit. Aperiam enim similique pariatur quae perferendis reprehenderit harum
              ipsum dolore facere quibusdam officia nam rerum quaerat officiis quia optio
              asperiores, tempore ut. Alias non officia at quas esse, laudantium eligendi asperiores
              dolores perspiciatis provident suscipit pariatur velit excepturi doloremque quibusdam
              officiis debitis, obcaecati necessitatibus ut amet repellat. Sunt, officiis, iusto
              aspernatur hic eveniet doloremque cumque molestiae debitis corrupti temporibus
              suscipit eaque distinctio illum voluptatem. Tempore tenetur consequuntur molestias
              modi dignissimos cupiditate accusamus tempora repudiandae exercitationem nesciunt
              officia earum magni alias sequi rem quia quae, accusantium obcaecati itaque? Ab facere
              praesentium dolorum iusto aliquid amet debitis! Cum repellat eum iusto aperiam. Ipsam
              repellendus suscipit consequuntur nobis fugit ipsum voluptas ab ex. Eius, a
              consectetur, quidem architecto harum quibusdam quis debitis assumenda accusamus
              molestias dolore id numquam ipsum dolores corrupti fugiat minima repudiandae.
              Assumenda ex animi odio iure! Placeat, distinctio ratione, doloribus nam eos id
              voluptas eligendi, eius dicta ab odit dignissimos. Amet recusandae, dolorem iure quam
              ullam blanditiis unde autem eaque molestias esse! Quia iusto deserunt nesciunt
              quisquam, molestiae sunt reiciendis amet quis laboriosam explicabo ratione magnam, eos
              velit praesentium enim exercitationem aperiam accusantium fugit eius suscipit quaerat,
              veritatis officia a necessitatibus. Distinctio, reprehenderit ut? Ipsa, voluptatibus
              quis unde voluptas maxime nam fuga dolorem, assumenda nemo aut ipsam repudiandae sed
              nihil ex itaque, dicta non veritatis nesciunt cum accusamus iusto. Quod illum vero
              distinctio aliquam, a sequi perferendis facere? Nostrum, est deserunt ad delectus iste
              saepe doloribus assumenda tempore aspernatur et facere nisi voluptates, numquam soluta
              reprehenderit voluptatum accusamus vel eveniet! Sint explicabo necessitatibus possimus
              aperiam, nulla aut sunt eos laborum harum excepturi, earum quod dolorem recusandae,
              eius veritatis autem vero atque officiis deserunt impedit. Animi officiis eos
              reprehenderit dolor nulla nam, ullam, sapiente, eius rem ex nemo. Modi ullam delectus
              eius rerum ipsa. Nemo exercitationem reprehenderit temporibus vitae corrupti inventore
              cum, et illo doloribus vel aliquid. Adipisci nam necessitatibus sunt aliquid
              cupiditate. Porro, asperiores ipsa inventore aspernatur nisi perspiciatis tenetur
              explicabo nihil deserunt beatae magni ex distinctio itaque sint nulla iure, sed vitae
              laborum molestias modi quam quibusdam! Ducimus atque asperiores nihil voluptas
              incidunt? Provident amet laudantium alias sunt fuga obcaecati perspiciatis vel
              asperiores ipsum, ratione ea aspernatur id quia culpa aliquam nostrum mollitia
              quibusdam iusto dolore in nulla exercitationem, repudiandae, magnam at. Cumque ipsam
              inventore quos dicta laboriosam, placeat, exercitationem temporibus amet consectetur
              nemo id veniam perspiciatis tempore at est. Doloremque sint distinctio voluptates
              omnis saepe iure aliquid delectus architecto debitis! Fuga neque asperiores aut vel
              pariatur quibusdam exercitationem ex, natus explicabo, facere atque est quos quae
              eveniet. Quaerat, asperiores. Ullam, praesentium? Porro asperiores vero rem cumque
              quia odio repellendus, quae itaque nam facere unde repudiandae ad aliquid iure quos
              saepe, tempore autem possimus fuga ab consequatur? Tempore at, accusantium quo ut
              placeat possimus rerum aperiam blanditiis odio dicta eum dolores debitis eaque
              distinctio illum modi ex a, et est dolorum. Eaque eveniet inventore, officiis
              cupiditate soluta laborum quaerat fuga molestiae, voluptatibus dolorum dolorem placeat
              atque at deleniti eius sed, consequuntur iusto aspernatur natus. Obcaecati neque
              consectetur quisquam odio, itaque fuga, magni nisi deleniti suscipit, quidem
              praesentium incidunt reprehenderit cumque beatae voluptatem. Praesentium optio
              consequuntur eveniet sequi culpa veritatis tempore maiores magnam dolorem, dolores
              perspiciatis atque dicta nesciunt, amet, molestias placeat. Nobis ut, id, recusandae
              nihil natus quisquam non assumenda, soluta perspiciatis dolores quidem culpa ullam
              ipsa omnis. Iure quasi maxime non id harum itaque animi quo porro inventore explicabo
              deserunt, optio, quisquam obcaecati! Possimus vitae accusantium hic excepturi
              perferendis quis quam nihil impedit accusamus eaque fugit assumenda nemo, vero
              adipisci officiis commodi eius iste aliquam! Dolor deleniti quos quasi nulla a maxime
              commodi dolore, adipisci aliquam ipsa iure corrupti quam sed quia, dignissimos
              quibusdam. Cumque incidunt ducimus dolore corrupti modi quisquam nihil assumenda,
              perferendis deserunt reiciendis. Alias natus aliquid sed possimus unde mollitia
              quisquam libero dolorem! Recusandae quam saepe deleniti praesentium quidem eos eaque
              harum doloremque doloribus laudantium quo, maxime dolore. Quod dolorum adipisci, quam
              nesciunt placeat sint nam aut odio necessitatibus iure earum molestiae eum deleniti
              in, officia molestias? Molestias alias sequi beatae quos itaque repellat corporis
              corrupti vel odio magnam minus nihil dolore placeat molestiae, quis porro repellendus
              ipsum laborum? Doloremque, reiciendis numquam sapiente veritatis officiis minus itaque
              tenetur neque ipsa enim quos ipsum, vitae corrupti modi quas veniam natus
              reprehenderit. Assumenda labore fugiat similique laudantium ea quis dignissimos
              laboriosam, in eius aliquid autem dolore recusandae rem itaque vero non voluptatem
              voluptates. Odit eum suscipit laudantium consectetur. Omnis iure quos error quidem ea
              fugiat atque rerum ut ipsa quam laboriosam quae provident officiis molestiae ab
              cupiditate architecto, veritatis vero quisquam. Autem quisquam praesentium beatae
              consequuntur animi, saepe deserunt minima fugiat debitis odit reprehenderit repellat
              dolore impedit dolorum laboriosam perferendis quibusdam tempore nulla ullam nesciunt
              magnam fugit iste quo libero. Ducimus sapiente, adipisci corrupti voluptatibus eum
              tempore at a doloremque. Assumenda illum id doloribus fugit in quas itaque nesciunt
              tenetur eveniet pariatur consectetur maiores eum possimus dolorum aperiam harum sit
              error fuga hic iste architecto illo qui, dolor mollitia. Sit quis iste, modi
              reprehenderit alias quam libero aliquid fugit! Commodi ab velit ipsam odit labore eius
              voluptas reiciendis id, architecto laborum maiores, dolorum error laboriosam deleniti
              consectetur vero enim eveniet soluta repellat. Inventore odio beatae aspernatur
              consectetur sit perspiciatis aperiam ipsa assumenda, ipsum tempore? Veritatis quis
              assumenda, exercitationem, hic fuga culpa eaque voluptatum quasi rerum consectetur
              obcaecati nam odio nesciunt similique odit quidem. Doloribus possimus earum culpa non
              nulla? Consequuntur dolorem excepturi veritatis, porro, omnis magni labore quas
              voluptates vero recusandae necessitatibus error sapiente, facere autem placeat eius.
              Provident corrupti quam labore qui repellendus. A cumque repellendus aspernatur id
              vitae laudantium cupiditate quia provident repudiandae dolorum illum, obcaecati natus
              dolor necessitatibus adipisci eligendi deleniti accusantium, ab asperiores. Magni
              vitae amet, eos mollitia facere animi accusamus fugiat inventore hic dicta cumque aut,
              eum cum omnis velit ipsa assumenda tenetur. Culpa recusandae nam, saepe consequatur
              possimus pariatur repellendus magnam dolor aliquid rerum at laborum ducimus? Aperiam
              commodi doloremque autem incidunt obcaecati iste. Reprehenderit laudantium ipsum
              obcaecati totam eum in? Voluptas, provident at. Porro ut, quam asperiores possimus
              harum, culpa dolorum odio dolore expedita neque magni, voluptatem velit? Eius, optio
              nulla eum quidem omnis veritatis porro debitis fugit ipsa, tenetur, officiis
              dignissimos neque soluta saepe dolores. Velit iure sequi, culpa tenetur corrupti
              suscipit similique recusandae tempore magnam officiis quod cupiditate aperiam et quo
              possimus dolor quaerat voluptates accusantium eum vero. Ipsum repellat quasi excepturi
              ullam ut eaque ex sit aliquam corporis, veniam dolores, at sint reiciendis officiis
              rerum? Ipsum natus perferendis, harum minus nobis, suscipit, delectus deserunt
              blanditiis iure aperiam et saepe est! Adipisci placeat rem iste iure laudantium quae
              facere qui minima vitae incidunt ratione veritatis officiis nesciunt mollitia,
              eligendi perferendis voluptatum reiciendis accusamus! Ratione, libero repellat
              necessitatibus laboriosam molestias eveniet sequi, doloribus quam quisquam at,
              accusantium voluptates. Ex nulla quae fugit numquam ducimus sint iure nesciunt
              voluptas? Possimus est odio sed rerum rem totam molestias dicta! Accusantium accusamus
              ut debitis officia natus quas corporis culpa, similique provident pariatur veniam?
              Fugiat, quis consectetur explicabo pariatur beatae alias rem assumenda, accusamus
              similique nobis tempore libero ducimus cupiditate recusandae quasi facilis quaerat
              dicta veritatis ipsum fugit. Iure adipisci ducimus sunt sequi ex deserunt asperiores
              earum ipsum at quod assumenda, debitis, nihil doloremque harum quo dolore aliquam
              quidem. Cupiditate dolore animi consequuntur odio dolorum blanditiis illo voluptas
              voluptates consectetur beatae nobis alias vitae reprehenderit similique, tempore
              delectus saepe distinctio officiis architecto, at quo. Quaerat eius excepturi
              architecto consequatur temporibus. Ipsam minima ipsa praesentium a dolorum odit,
              architecto nobis facilis, similique perferendis obcaecati accusantium atque, est
              repellat odio quis sunt sit nam quae eaque sapiente et nulla. Perferendis aut totam
              odio laborum possimus porro. Dolorem magni blanditiis, pariatur molestiae aperiam
              voluptatibus, amet exercitationem enim veniam impedit quisquam sint? Ratione
              laboriosam eligendi quaerat hic odit voluptatum asperiores vel explicabo quam, nemo
              sint magnam nesciunt aperiam veniam distinctio numquam vitae in provident ipsam. Eos
              alias non consequuntur in sunt modi repellendus at molestiae quas iure dolorem nobis a
              quis distinctio perferendis unde quisquam sapiente qui, corporis consectetur quaerat!
              Earum ipsam id quisquam quos provident dignissimos officiis soluta totam sequi? Ea
              iusto eum excepturi! Rerum minima officia dolores optio officiis accusamus sequi
              voluptate consectetur suscipit maxime. Velit, pariatur ipsam tempora in saepe
              architecto eum similique? Cum, sequi itaque! Molestiae nobis inventore libero quod est
              iusto corporis illo ab cupiditate? Cumque, cum culpa, reiciendis nobis consectetur
              modi vero nisi harum praesentium non officiis temporibus, adipisci error nihil
              distinctio dolores ipsum repudiandae animi doloribus officia. Magni voluptas vitae
              dignissimos et doloribus adipisci sit tenetur, error praesentium nihil officia, cum
              molestias. Porro deleniti qui, natus eum voluptas tempore cum? Perspiciatis unde,
              earum tenetur sapiente modi odio esse dolorem facere quam illum aliquam maxime tempora
              sed repellat perferendis commodi sequi! Facilis deleniti illum quae in consequuntur
              enim officia minus perferendis ab natus pariatur impedit cum explicabo voluptates quia
              eos autem aspernatur laborum, quisquam a aperiam! Explicabo quae molestias atque
              molestiae quaerat reprehenderit non nesciunt itaque exercitationem voluptates, qui
              eum? Consequatur eligendi quae molestias libero iste nihil itaque cumque, consectetur,
              sint corrupti rerum similique, voluptates praesentium sed illum dolorum assumenda
              inventore ratione hic dolor fuga eaque. Sunt nemo saepe ratione placeat assumenda
              eaque fugiat inventore at, consequatur ut non suscipit delectus ipsam animi reiciendis
              facilis odio. Aliquam, aliquid accusantium! Ipsam sunt odio corrupti nihil dicta
              aspernatur! Aspernatur commodi cupiditate accusamus voluptatum, pariatur ipsum eos
              suscipit eveniet modi incidunt, est magni cum porro iusto animi, quisquam magnam quasi
              voluptates earum? Inventore quos exercitationem aliquam rem reiciendis, rerum at ea
              distinctio sit est doloremque nemo et quae consequatur ipsam aperiam illo nisi
              recusandae! Ea praesentium veritatis quibusdam molestiae? Ratione incidunt fugit
              minima, ullam soluta enim explicabo quibusdam nemo recusandae in. Accusamus voluptas
              animi odio optio consectetur molestias eveniet, deserunt enim, porro veniam aut
              exercitationem vel. Officiis, laborum. Neque, nihil. Accusamus amet ipsa fugiat error,
              beatae eaque officia reprehenderit repudiandae maxime impedit dolorum sed accusantium
              cupiditate corrupti harum eum aperiam consequuntur culpa voluptatibus doloremque in?
              Ipsum impedit quod, ducimus eos, autem possimus tempore sed fuga in minus amet aliquam
              dicta nostrum. Eum eveniet vitae perspiciatis consequatur optio repellat, soluta
              facere illum maiores adipisci recusandae magni non delectus! */}
            </DialogPanel>
          </DialogPanelRoot>
        ))}
      </div>
    ),
    code: `import {
  DialogPanel,
  DialogPanelRoot,
  DialogPanelTrigger,
} from "@/design-system/components/ui/dialog-panel";
import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <div className="flex gap-3">
      {(["sm", "md", "lg", "xl", "auto"] as const).map((size) => (
        <DialogPanelRoot key={size}>
          <DialogPanelTrigger render={<Button variant="outline">{size}</Button>} />
          <DialogPanel
            size={size}
            title={\`Dialog \${size}\`}
            footer={
              <>
                <Button variant="outline">Hủy</Button>
                <Button>Lưu</Button>
              </>
            }
          >
            <p className="text-sm text-muted-foreground">
              {size === "auto"
                ? "Dùng khi muốn tự kiểm soát kích thước bằng className riêng."
                : \`Preset kích thước \${size} cho dialog.\`}
            </p>
          </DialogPanel>
        </DialogPanelRoot>
      ))}
    </div>
  );
}`,
  },
];

export default function DialogPanelGuidePage() {
  useEffect(() => {
    document.title = `${guide.name} - UI Design System`;
  }, []);

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="rounded-[28px] border border-border/70 bg-card px-8 py-10 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Wrapper cho Dialog với layout chuẩn hóa, preset size và khả năng forward toàn bộ props
            của DialogContent.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>Import root, trigger và dialog panel wrapper.</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import {
  DialogPanel,
  DialogPanelRoot,
  DialogPanelTrigger,
} from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>
                DialogPanel kế thừa toàn bộ props của DialogContent.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-2xl border border-border/70">
                <table className="w-full text-left text-sm">
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
                        className={cn(index !== props.length - 1 && 'border-b border-border/70')}
                      >
                        <td className="px-4 py-3 font-medium">{prop.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{prop.type}</td>
                        <td className="px-4 py-3 text-muted-foreground">{prop.defaultValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card id="usages" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>3. Usages</CardTitle>
              <CardDescription>Các pattern phổ biến cho dialog wrapper.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={usageSamples[0]?.id} className="gap-6">
                <TabsList variant="line">
                  {usageSamples.map((sample) => (
                    <TabsTrigger key={sample.id} value={sample.id}>
                      {sample.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {usageSamples.map((sample) => (
                  <TabsContent key={sample.id} value={sample.id} className="space-y-5">
                    <div className="rounded-[20px] border border-dashed border-border bg-muted/30 p-8">
                      <div className="flex min-h-56 items-center justify-center rounded-[18px] bg-card px-6 shadow-sm">
                        {sample.preview}
                      </div>
                    </div>

                    <CodeBlock code={sample.code} id={sample.id} />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <aside className="hidden xl:block">
        <div className="sticky top-24 rounded-[24px] border border-border/70 bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            TOC
          </p>
          <nav className="mt-4 space-y-3 text-sm text-muted-foreground">
            <a href="#import" className="block transition hover:text-foreground">
              Import
            </a>
            <a href="#props" className="block transition hover:text-foreground">
              Props
            </a>
            <a href="#usages" className="block transition hover:text-foreground">
              Usages
            </a>
          </nav>
        </div>
      </aside>
    </div>
  );
}
