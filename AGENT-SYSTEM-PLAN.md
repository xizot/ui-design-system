# Kế hoạch xây bộ agent thiết kế giao diện Xizot

Ngày: 2026-10-13. Tài liệu thiết kế và kế hoạch cho bộ hướng dẫn đang được triển khai. Các ví dụ giao diện trong tài liệu là mục tiêu hành vi, không phải các page sản phẩm đã được xây dựng.

Trọng tâm: agent biết thiết kế một sản phẩm cụ thể, từ cấu trúc màn hình đến màu, font, component và tương tác. Kiểm tra kỹ thuật phục vụ kết quả này. Phân bổ lại 5 file rules tạm là một hạng mục trong kế hoạch.

## 1. Đầu ra phải khác gì so với bộ hiện tại?

Workflow hiện có đã yêu cầu đọc source, dùng semantic token, responsive và chọn đúng component. Cần bổ sung khả năng ra quyết định cụ thể:

- Dashboard bắt đầu với sidebar, topbar và canvas thế nào? Khi nào bỏ sidebar?
- Trang overview, quản lý danh sách, detail và settings khác nhau ra sao?
- Khi nào dùng một cột, hai cột 2:1, master–detail hoặc grid sản phẩm?
- Khi nào dùng filter ngang, khi nào mở filter panel? Có thật sự cần KPI ở đầu trang không?
- Typography nào dành cho nghiệp vụ, bài viết, hero? Font tiếng Việt và số liệu cần kiểm tra gì?
- Primary color xuất hiện ở đâu? Brand, status và chart có những vai trò nào?
- Khi nào chọn Card, Table, DataTable, SheetPanel, DialogPanel, Tabs hoặc Accordion?
- Làm sao loại hero thừa, card lồng card, badge vô nghĩa và nhiều CTA cạnh tranh?
- Sau khi render, bằng chứng nào cho thấy kết quả đạt yêu cầu?

### Kết quả nghiệm thu

1. Cùng brief được xử lý nhất quán về shell, hierarchy, component và trạng thái quan trọng.
2. Sản phẩm khác bản chất có thiết kế khác nhau có lý do; không dùng chung một template dashboard.
3. Page mới trong app cũ kế thừa ngôn ngữ thiết kế đang dùng.
4. Sửa nhỏ không làm thay theme, font, shell hoặc kiến trúc không liên quan.
5. UI hoạt động với dữ liệu dài, tiếng Việt, số 0, lỗi, thiếu dữ liệu và màn hình nhỏ.
6. Consumer build/chạy được với các component thực sự được chọn.

Không có prompt bảo đảm tuyệt đối thẩm mỹ và hành vi agent. Bộ này phải có default rõ, ví dụ đã kiểm chứng, review sau render và tập đánh giá để đo độ ổn định.

## 2. Hệ thống quyết định thiết kế theo 4 lớp

**Loại sản phẩm → kiểu màn hình → hướng thị giác → component và interaction.**

| Lớp              | Quyết định                                                     | Ví dụ                                                               |
| ---------------- | -------------------------------------------------------------- | ------------------------------------------------------------------- |
| Product          | Người dùng, công việc, tần suất, môi trường                    | Nhân viên xử lý đơn cả ngày; khách mua sản phẩm; người đọc tài liệu |
| Page pattern     | Shell, thứ tự vùng, tỷ lệ, điều hướng                          | Sidebar workspace; list–detail; article + TOC; product grid         |
| Visual direction | Typography, density, palette roles, radius, elevation, imagery | Workbench gọn; business thoáng; editorial ấm; product-led           |
| Interaction      | Component, state ownership, feedback, responsive               | DataTable + toolbar + SheetPanel; RHF form + inline error           |

Một dashboard có nhiều page pattern. Một sản phẩm có marketing bên ngoài và workspace bên trong: chia sẻ brand, có thể khác shell, typography hierarchy và mật độ.

### Phân loại ràng buộc

- **Invariant:** đúng contract; không mất dữ liệu; accessible name; keyboard/focus; nội dung không bịa; không đổi scope.
- **Default:** dashboard nhiều module dùng sidebar, form tuần tự dùng một cột, một accent brand chính. Có thể đổi nếu task/content chứng minh cần.
- **Option:** inset shell, icon rail, display font, gradient, imagery. Chọn khi có mục đích.

Mỗi guideline phải thuộc một loại rõ ràng. Không biến sở thích thị giác thành lệnh cấm toàn cục.

## 3. Default layout theo sản phẩm

| Surface                            | Layout mặc định                                       | Điều hướng                                                  | Khi đổi phương án                                                   |
| ---------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------- |
| Dashboard / admin / SaaS workspace | **Sidebar trái + topbar gọn + main canvas**           | Sidebar cho module; topbar cho ngữ cảnh/tiện ích toàn app   | App chỉ một công việc hoặc ít destination: top navigation có thể đủ |
| Vận hành dữ liệu dày               | Sidebar/rail + toolbar + vùng dữ liệu lớn             | Giữ vị trí đang làm việc; detail cạnh bên nếu cần đối chiếu | Wallboard chỉ giám sát: full canvas, điều hướng tối thiểu           |
| Inbox / ticket / message           | Navigation + danh sách + detail                       | Master–detail, chuyển item liên tục                         | Mobile: list/detail thành từng màn hình                             |
| Landing / website dịch vụ          | **Top navigation + nội dung dọc + footer**            | Anchor/page links; CTA theo mục tiêu                        | Không thêm sidebar chỉ vì đã có component                           |
| Storefront / catalog               | Header tìm kiếm/danh mục + product grid               | Filter riêng; cart dễ tìm                                   | B2B so sánh thuộc tính nhiều: table có thể phù hợp                  |
| Documentation                      | Topbar + navigation trái + article + TOC phải khi cần | Trái là cây tài liệu; phải là heading trong bài             | Bài ngắn bỏ TOC; site nhỏ bỏ navigation trái                        |
| Blog / editorial                   | Header gọn + cột đọc trung tâm                        | Chuyên mục/search nếu nội dung đủ lớn                       | Không giữ hai sidebar làm hẹp vùng đọc                              |
| Portfolio / studio                 | Navigation ít mục + selected work + case study        | Thứ tự kể chuyện theo dự án                                 | Biểu đạt mạnh được phép nếu vẫn đọc/điều hướng được                 |
| Login / reset password             | Một khối tác vụ tập trung                             | Quay lại/đổi phương thức khi có                             | Split branding chỉ khi có asset/thông điệp thật                     |
| Checkout / onboarding              | Shell tập trung vào tiến trình                        | Back, progress, next                                        | Không mang toàn bộ navigation workspace vào quy trình dễ bỏ dở      |
| Settings                           | App shell + nhóm setting + local navigation khi cần   | Theo khái niệm người dùng                                   | Ít setting: một page, không tạo tab cho có                          |

Những default này cần trở thành dữ liệu tra cứu được, kèm điều kiện lựa chọn và ngoại lệ.

## 4. Dashboard: sidebar là default có cấu trúc rõ

### 4.1. Shell

- Desktop: ưu tiên `SidebarProvider` + `Sidebar` + `SidebarInset` theo source.
- Sidebar: brand/workspace ở đầu, module chính ở thân, profile/settings ở cuối nếu app có.
- Nhóm menu theo công việc/domain; không theo tên component hoặc bảng database.
- Active item phản ánh route. Không bịa destination, count hoặc permission.
- Default expanded để đọc tên. Icon rail khi người dùng cần canvas rộng và icon vẫn có tên truy cập được.
- Topbar chứa ngữ cảnh toàn app hoặc breadcrumb khi có phân cấp. Page title/actions nằm trong page header; tránh lặp cùng tiêu đề nhiều lần.
- Không tự thêm organization switcher, notification bell, global search, help menu nếu app không có chức năng đó.
- Mobile: navigation mở theo yêu cầu; không giữ sidebar chiếm cố định chiều ngang.

**Source hiện tại:** Sidebar có `variant="sidebar" | "floating" | "inset"`, `collapsible="offcanvas" | "icon" | "none"`; width desktop 16rem, rail 3rem, mobile 18rem. Đây là điểm bắt đầu có thật, không phải prop được đề xuất thêm.

### 4.2. Chọn shell variant

| Variant    | Dùng khi                                                       | Tránh khi                                           |
| ---------- | -------------------------------------------------------------- | --------------------------------------------------- |
| `sidebar`  | Nghiệp vụ, ranh giới nav/content rõ, ưu tiên diện tích dữ liệu | Không có navigation đủ ý nghĩa                      |
| `inset`    | Cần phân biệt canvas làm việc với khung app bằng một surface   | Bên trong đã quá nhiều card/surface lồng nhau       |
| `floating` | Navigation tách khỏi canvas, hướng thị giác thoáng             | Margin/radius làm dense table mất diện tích hữu ích |
| Icon rail  | Module ổn định, người dùng quen, canvas cần rộng               | Tên khó hiểu, icon mơ hồ, thiếu label/tooltip       |

Chọn một shell cho các page cùng khu vực sản phẩm; không đổi giữa các trang chỉ để tạo khác biệt.

### 4.3. Overview dashboard

Thứ tự đề xuất: **page context → phạm vi thời gian/dữ liệu → số liệu cần quyết định → xu hướng chính → việc cần chú ý**.

- KPI phải có câu hỏi, nguồn dữ liệu, đơn vị, khoảng thời gian và cách so sánh rõ.
- 3–4 KPI là điểm bắt đầu bố cục thường dùng, không phải số lượng bắt buộc. Hai chỉ số thật tốt hơn bốn chỉ số bịa.
- Chart chính lớn hơn chart phụ khi có quan hệ giải thích; bắt đầu tỷ lệ 2:1 nếu phù hợp, chuyển một cột ở màn hình hẹp.
- Nếu người dùng vào để xử lý việc, vùng “cần hành động” có thể đứng trước analytics.
- Không tự thêm recent activity, map, donut hoặc bảng mẫu để lấp chỗ.

## 5. Page patterns bên trong app

### 5.1. Quản lý danh sách

**Page header → search/filter toolbar → applied filters khi cần → DataTable → pagination.** Detail/edit là route hoặc panel theo mức độ công việc.

- Primary action ở page header; row actions ở row. Không nhân đôi create action vô cớ.
- Search khi có định danh/tên hữu ích; không thêm ô search chỉ vì template có.
- Filter thường dùng ở toolbar. Advanced filters vào popover/panel nếu giảm nhiễu; luôn làm rõ bộ lọc đang áp dụng.
- Không thêm KPI mặc định vào mọi list. Chỉ thêm nếu giúp chọn ưu tiên hoặc quyết định.
- DataTable phục vụ so sánh hàng/cột và thao tác. Không tự đổi sang card trên mobile khi làm mất khả năng so sánh quan trọng.
- Bảng rộng: ưu tiên cột thiết yếu, overflow trong vùng bảng, row identity/action dễ tìm. Card summary chỉ là phương án cho task mobile phù hợp.
- Bulk actions chỉ khi có selection và operation thật; định nghĩa selection theo page hay toàn bộ kết quả.

### 5.2. Detail

**Identity + status + actions → nội dung chính → context/lịch sử.**

- Một cột cho nội dung tuyến tính hoặc ít thông tin.
- Hai cột khoảng 2:1 cho main content và summary/context độc lập; summary xuống dưới trên mobile.
- Dùng rows/definition list cho label–value; không tạo Card cho mỗi thuộc tính.
- Tabs chỉ khi nhóm nội dung có nhu cầu chuyển đổi thực; không tách ba field thành ba tab.
- Timeline khi thứ tự sự kiện có ý nghĩa và có dữ liệu thời điểm/actor.
- Detail cần permalink/reload hoặc xử lý dài: route. Xem nhanh và đối chiếu list: SheetPanel.

### 5.3. Create/edit form

**Title/context → nhóm field theo quyết định người dùng → actions.**

- Một cột cho form đọc tuần tự; hai cột cho field ngắn có quan hệ rõ khi đủ chiều rộng.
- Form dài có section heading; không card hóa từng field.
- Multi-step khi có giai đoạn thật, phụ thuộc dữ liệu hoặc workflow dài cần chia; không chia theo số field tùy tiện.
- Form dài/quan trọng dùng route; form ngắn trong context hiện tại dùng DialogPanel/SheetPanel.
- Sticky actions chỉ khi giúp form dài; không che lỗi, focus hoặc nội dung.
- Giữ values khi lỗi; không reset/close chỉ vì promise resolved.

### 5.4. Settings

- Nhóm theo khái niệm người dùng: profile, thông báo, tích hợp… nếu có trong app.
- Setting cùng lifecycle dùng chung save; nhóm độc lập có thể save riêng nếu scope rõ.
- Immediate-save cho toggle đơn giản khi contract và rollback rõ; không trộn tùy tiện với form có Save.
- Action phá hủy ở vùng riêng, giải thích hậu quả; không làm cả page mang màu cảnh báo.

### 5.5. Master–detail

- List giữ context để chuyển item; detail là vùng tập trung.
- Chọn item, unsaved changes, back/forward và mobile back có hành vi xác định.
- Không mở chuỗi modal từ detail panel nếu một route rõ hơn.
- Không ép ba cột khi chiều rộng khiến list và detail đều khó dùng.

## 6. Patterns cho website ngoài workspace

| Pattern              | Composition đề xuất                                                                 | Quyết định quan trọng                                               | Không tự thêm                                                       |
| -------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| SaaS/service landing | Topnav → value proposition → evidence → cách hoạt động/offer → next action → footer | Hero một thông điệp; split text/media khi media chứng minh sản phẩm | Dashboard shell, logo/testimonial giả, bộ sáu feature card bắt buộc |
| Pricing              | Context → gói so sánh được → billing/điều kiện → thông tin còn vướng → action       | Tổng chi phí/chu kỳ rõ; highlight gói có lý do                      | Most popular, giảm giá, scarcity không có căn cứ                    |
| Product catalog      | Search/category → results context + filter/sort → grid → pagination/load more       | Image/name/price/availability có hierarchy ổn định                  | Chart/KPI, urgency giả                                              |
| Product detail       | Gallery + purchase information → mô tả/specs → nội dung hỗ trợ                      | Variant/quantity/total rõ; mobile giữ reading order                 | Sticky purchase che nội dung; related products không có dữ liệu     |
| Article/docs         | Context/title → readable column → headings/code/table → next/related nếu có         | Measure dễ đọc, semantic headings, code overflow local              | Card mỗi paragraph, display font cho body, TOC trống                |
| Portfolio            | Identity → selected work → case study → contact                                     | Chất lượng dự án/imagery dẫn dắt; ít dự án có chiều sâu             | Client logo, giải thưởng, metric bịa                                |

Pattern có thể rút gọn. Xóa region không có nội dung; không giữ placeholder để hoàn thành template.

## 7. Hướng thị giác: recipe đủ cụ thể để bắt đầu thiết kế

Page pattern quyết định cấu trúc. Visual recipe quyết định cảm giác và cách phân cấp. Hai phần độc lập: dashboard không bắt buộc một màu xanh hoặc một font duy nhất.

### 7.1. Bộ recipe ban đầu

| Recipe                    | Phù hợp                                         | Màu/surface                                                             | Typography                                                  | Spacing và hình khối                                                              |
| ------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Operational workbench** | TMS, admin, tài chính, quản trị dữ liệu         | Neutral ít sắc; brand xuất hiện ở action/selection; status màu có nghĩa | Sans dễ đọc, số thẳng hàng; title tiết chế                  | Compact hoặc comfortable; border nhẹ; shadow chỉ khi cần phân lớp; sidebar thường |
| **Calm business**         | B2B SaaS, CRM, workspace hỗn hợp                | Nền neutral dịu, surface rõ, một accent brand                           | Sans cho heading/body, hierarchy rõ, không quá nhiều weight | Comfortable; khoảng cách section thoáng; inset shell khi hợp lý                   |
| **Editorial warm**        | Nội dung, học tập, tư vấn, dịch vụ có nhiều chữ | Neutral ấm, text tối, accent ít                                         | Serif cho heading/prose nếu hợp brand; sans cho control     | Cột đọc giới hạn; khoảng trắng tạo nhịp; ít box, ít shadow                        |
| **Product-led**           | Commerce, giới thiệu sản phẩm, portfolio        | Nền làm nổi media, accent hỗ trợ action                                 | Tên sản phẩm/giá rõ; heading biểu đạt vừa đủ                | Grid đều, media ratio ổn định, section theo nội dung                              |
| **Technical precise**     | Developer tools, monitoring, docs kỹ thuật      | Neutral lạnh; chart/selection phân biệt tốt                             | Sans cho nội dung; mono cho code/ID, không mono toàn bộ UI  | Grid thẳng, border rõ, density theo công việc                                     |

Đây là định hướng đề xuất của Xizot, không phải khẳng định các recipe đã có sẵn trong source. Triển khai phải render và kiểm tra từng recipe trước khi đánh dấu được hỗ trợ.

### 7.2. Recipe phải có dữ liệu gì?

Mỗi recipe gồm:

- Tình huống nên/không nên dùng.
- Background/surface/text/brand roles, light/dark nếu hỗ trợ.
- Font roles và fallback; font candidate không đồng nghĩa đã tải/cài.
- Type roles, density, spacing rhythm, radius và elevation.
- Cách dùng icon, image và chart.
- Một ví dụ đúng, một phản ví dụ với lý do.
- Giới hạn: phần nào có thể tùy biến, phần nào cần giữ để nhất quán.
- Trạng thái kiểm chứng và các component đã chạy với recipe.

Không tạo hàng chục theme khác màu nhưng không khác quyết định thiết kế. Bắt đầu với 5 recipe; chỉ mở rộng khi có nhu cầu không được phục vụ.

### 7.3. Quy trình chọn hướng

1. Có app/brand hiện tại: kế thừa, chỉ thay khi được yêu cầu.
2. App mới: nhận diện task, nội dung và page pattern.
3. Chọn một recipe phù hợp; nêu lý do bằng một câu cụ thể.
4. Chọn màu/font trong phạm vi recipe, dựa trên brand/assets nếu có.
5. Render một page đại diện với dữ liệu thật hoặc fixture ghi rõ.
6. Đánh giá hierarchy, readability và thao tác; chỉnh recipe trước khi nhân rộng nhiều page.

Không hỏi người dùng từng pixel hay bắt chọn mọi màu. Khi thiếu sở thích thẩm mỹ, agent tự quyết có lý do. Hỏi khi thiếu quyết định ảnh hưởng nội dung, business flow hoặc brand bắt buộc.

## 8. Hệ màu: quyết định cách sử dụng trước khi quyết định mã màu

### 8.1. Mô hình role

| Role                       | Sử dụng                                     | Ràng buộc                                                   |
| -------------------------- | ------------------------------------------- | ----------------------------------------------------------- |
| Canvas                     | Nền toàn page/app                           | Không cạnh tranh nội dung                                   |
| Surface                    | Card, panel, menu, vùng cần tách            | Phân lớp bằng màu/border/elevation có chủ đích              |
| Primary text               | Nội dung chính                              | Đủ contrast trên surface thực tế                            |
| Secondary text             | Metadata, chú thích                         | Không dùng quá nhạt để tạo vẻ tinh tế                       |
| Brand/action               | Primary action, link/selection theo pattern | Không tô mọi icon, border và heading cùng accent            |
| Success/warning/error/info | Trạng thái có nghĩa                         | Có text/icon bổ sung; không suy ra ý nghĩa từ hue đơn thuần |
| Focus                      | Vị trí bàn phím                             | Hiện rõ trên background/surface và không bị che             |
| Chart series               | Phân biệt dữ liệu                           | Không đồng nhất mặc định với status tốt/xấu                 |

Ví dụ lựa chọn family khi app chưa có brand: workbench có thể dùng cool neutral + blue; editorial có thể dùng warm neutral + terracotta; product-led có thể dùng neutral + accent lấy từ brand. Đây là phương án thẩm mỹ, không phải quy tắc “ngành nào phải dùng màu gì”.

### 8.2. Quy trình tạo palette có thể dùng

1. Lấy brand có sẵn; nếu chưa có, chọn một accent family phù hợp recipe.
2. Chọn neutral family hòa hợp; phân biệt canvas/surface/text trước.
3. Tạo cặp foreground/background cho từng role và state.
4. Kiểm tra default, hover, active/selected, focus, invalid và disabled theo semantics.
5. Nếu hỗ trợ dark: thiết kế role dark riêng; không đảo màu máy móc.
6. Render trên Button, Input, Badge, Card, DataTable, Panel và Chart thật.
7. Đo contrast sau compositing; chỉnh màu cho đến khi đạt, lưu palette đã kiểm chứng.

Mục tiêu contrast: text thường ít nhất 4.5:1; large text 3:1 theo định nghĩa và ngoại lệ của WCAG. Không làm tròn một tỷ lệ thiếu thành pass. Xem [WCAG Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

Các phần hình ảnh/control cần thiết để nhận biết có yêu cầu contrast riêng; không áp 3:1 máy móc cho mọi đường kẻ trang trí. Xem [WCAG Non-text Contrast](https://www.w3.org/WAI/WCAG22/understanding/non-text-contrast.html).

### 8.3. Việc cần làm trong source Xizot

- Inventory token đang có trong CSS và cách component dùng token.
- `Badge` hiện có success/warning/info qua lớp emerald/amber/sky. Xác định semantic status contract dùng chung trước khi mở rộng theme; giữ tương thích API hiện tại.
- Tách preset đã được kiểm chứng khỏi preset chỉ để demo. Không quảng bá mọi preset như một theme sẵn sàng dùng.
- Consumer theme override có owner rõ; agent không ghi mã màu rải trong mỗi component.
- Raw color hợp lệ tại định nghĩa theme, data visualization hoặc asset có lý do. Không dùng regex cấm mọi mã màu làm thước đo thiết kế.
- Tên role phải thống nhất; không tạo một bộ `danger/error/destructive` có semantics chồng chéo mà không mapping.

### Nghiệm thu màu

Mỗi recipe được công bố có bảng role/state, cặp contrast đo được, screenshot light/dark theo scope hỗ trợ, và không dùng màu làm tín hiệu duy nhất. “Có class semantic” chưa đủ pass.

## 9. Typography: chọn theo vai trò và ngôn ngữ

### 9.1. Chính sách font

| Tình huống         | Default                                                | Ngoại lệ                                                        |
| ------------------ | ------------------------------------------------------ | --------------------------------------------------------------- |
| App đã có font     | Giữ font và weight hiện tại nếu đáp ứng task           | Redesign có yêu cầu hoặc lỗi readability/coverage được xác minh |
| Workbench mới      | System sans hoặc Inter/Geist nếu đã tích hợp phù hợp   | Font brand khác có kiểm tra tương đương                         |
| Business/marketing | Một sans dùng body/control; heading có thể cùng family | Display family riêng khi tạo identity cần thiết                 |
| Editorial          | Body dễ đọc; thử serif có chủ đích cho heading/prose   | Sans hoàn toàn nếu brand/content phù hợp hơn                    |
| Technical          | Sans cho UI; mono cho code, số định danh cần phân biệt | Không dùng mono cho mọi label/paragraph                         |

Candidate để thử, không tự cài: Inter/Geist từ hướng hiện có; Source Serif 4 cho editorial; IBM Plex Sans/Mono cho hướng kỹ thuật. Việc ghép font là quyết định thiết kế đề xuất. Kiểm tra nguồn, license, glyph/weight và cách load trước khi chấp nhận. Nguồn font: [Source Serif](https://github.com/adobe-fonts/source-serif), [IBM Plex](https://github.com/IBM/plex).

Default một family chính; thêm family thứ hai khi có vai trò khác biệt. Không tải ba font chỉ vì docs đang có ba font.

### 9.2. Type roles và thông số khởi điểm

Các số dưới đây là **điểm bắt đầu để render/review**, không phải lệnh override toàn thư viện.

| Role                       | Điểm bắt đầu                                     | Cần kiểm tra                                        |
| -------------------------- | ------------------------------------------------ | --------------------------------------------------- |
| Label/table text nghiệp vụ | 13–14px; line-height 18–22px                     | Tiếng Việt, độ đậm, contrast, không dồn dòng        |
| Body ứng dụng              | 14–16px; line-height khoảng 1.45–1.6             | Form/detail đọc được, không quá nhỏ để nhồi dữ liệu |
| Page title workspace       | 24–30px; weight 600                              | Rõ hơn section title nhưng không chiếm nửa màn hình |
| Section title              | 16–20px; weight 500–600                          | Phân biệt với label/body dù không dùng màu          |
| Article body               | 16–18px; line-height khoảng 1.6–1.75             | Measure, paragraph spacing và đọc dài               |
| Marketing hero             | 40–64px desktop; 30–40px mobile làm điểm bắt đầu | Số dòng, nội dung thật, không clip ở zoom/text dài  |
| KPI value                  | 28–36px tùy density                              | Đơn vị, label, biến động và số dài vẫn rõ           |
| Metadata/caption           | 12–13px khi phù hợp                              | Không đưa thông tin thiết yếu xuống mức khó đọc     |

- Mapping role vào token/class **sau khi kiểm tra computed size**. Source hiện override `text-lg` và `text-xl` thành 1rem; không giả định scale Tailwind mặc định.
- Heading HTML phản ánh cấu trúc nội dung, không chọn `h1/h2` chỉ vì muốn cỡ chữ.
- Số ở bảng/metric dùng tabular numerals khi font hỗ trợ; canh phải giá trị cần so sánh.
- Không dùng uppercase dày đặc cho tiếng Việt; không tracking rộng cho body dài.
- Test: tên địa chỉ dài, chữ có dấu, `0`, `1.000.000`, mã `O0I1`, đơn vị, giá âm và chuỗi trộn Việt/Anh.
- Font chưa tải được vẫn có fallback đọc được; kiểm tra layout shift và line wrap khi load xong.
- Chỉ load weight/subset thực dùng; kiểm tra coverage của file font được load, không suy đoán từ tên family.

### Nghiệm thu typography

Một bảng role → token → computed size/line-height/weight/family; screenshot tiếng Việt; fallback hoạt động; không cắt dấu; hierarchy còn rõ ở mobile và zoom. Không đổi scale shared trước khi trace callers và kiểm tra ảnh hưởng.

## 10. Spacing, density, geometry và responsive

### 10.1. Density là cấu hình theo surface

| Density     | Dùng cho                                     | Điểm bắt đầu                                                                                   |
| ----------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Compact     | Bảng/danh sách thao tác lặp lại trên desktop | Page padding 16–24px; gap nhóm 12–16px; control nhỏ theo API; giữ hit area đủ dùng             |
| Comfortable | Form, settings, dashboard hỗn hợp            | Page padding 24–32px desktop, 16px mobile; gap nhóm 16–24px                                    |
| Spacious    | Marketing, editorial, portfolio              | Section spacing 48–96px desktop, giảm có chủ đích trên mobile; chiều rộng nội dung có giới hạn |

Đây là defaults ở lớp composition. Không đổi chiều cao/border nội bộ control bằng selector để ép một density; dùng size prop thật, hoặc thay shared contract nếu có nhu cầu tái sử dụng đã xác minh.

### 10.2. Nhịp khoảng cách

- Khoảng cách giữa nhóm lớn hơn khoảng cách giữa phần tử trong nhóm.
- Label và field gần nhau; helper/error thuộc field, không trôi sang nhóm kế tiếp.
- Margin/padding theo scale có ý nghĩa; tránh mỗi section một con số tùy hứng.
- Content rộng theo task: table tận dụng canvas; form không kéo field qua toàn màn hình; article bắt đầu khoảng 60–75ch rồi kiểm tra theo font/ngôn ngữ.
- Card dùng khi cần một đơn vị nội dung/action hoặc surface độc lập. Các section liên tục có thể dùng heading + spacing/separator.

### 10.3. Geometry

- Giữ một logic radius theo cấp control/card/overlay. Pill dành cho tag/action phù hợp, không làm mọi input thành pill mặc định.
- Border phân chia vùng; shadow biểu đạt elevation; không thêm cả border đậm, shadow đậm và nền khác cho mọi container.
- Chỉ sticky/fixed khi phục vụ navigation hoặc action cần luôn truy cập; kiểm tra tổng chiều cao các vùng sticky.
- Mỗi vùng scroll có lý do. Tránh document scroll + panel scroll + table scroll theo cả hai chiều cùng lúc khi không cần.

### 10.4. Responsive theo cấu trúc

| Surface   | Desktop                              | Màn hình hẹp                                                                    |
| --------- | ------------------------------------ | ------------------------------------------------------------------------------- |
| Workspace | Sidebar + main                       | Sidebar mở theo yêu cầu; main đủ rộng                                           |
| Dashboard | KPI grid; main/secondary chart       | Stack theo thứ tự quyết định; chart có height phù hợp                           |
| List      | Toolbar ngang + table                | Wrap action/filter; filter nâng cao mở theo yêu cầu; overflow bảng có kiểm soát |
| Detail    | Main + context 2:1 nếu cần           | Một cột, identity/action vẫn tìm được                                           |
| Form      | Một hoặc hai cột có quan hệ          | Một cột theo reading order                                                      |
| Catalog   | Grid theo min card width và viewport | Giảm cột; không thu card đến mức giá/name khó đọc                               |
| Docs      | Nav + article + TOC                  | Nav/TOC chuyển thành disclosure phù hợp; article ưu tiên                        |

Breakpoint dựa trên khi nội dung không còn dùng được; tái sử dụng hệ breakpoint của project. Kiểm tra tại 360/390, 768, 1280/1440px và các điểm chuyển layout thực tế. Thêm kiểm tra reflow tương đương 320 CSS px theo phạm vi tiêu chí; bảng cần bố cục hai chiều có ngoại lệ cụ thể, không dùng ngoại lệ để cho cả page tràn ngang. Xem [WCAG Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).

Target tương tác phải xét kích thước và khoảng cách theo WCAG 2.5.8; 24×24 CSS px là mức tối thiểu của tiêu chí với các ngoại lệ quy định, không phải khuyến nghị mọi nút mobile nên nhỏ như vậy. Với thao tác cảm ứng chính, bắt đầu vùng bấm khoảng 40–44px nếu bố cục cho phép. Xem [WCAG Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

## 11. Component selection phải bắt đầu từ nhu cầu

### 11.1. Decision table

| Nhu cầu                              | Ưu tiên                                            | Khi chọn phương án khác                                               |
| ------------------------------------ | -------------------------------------------------- | --------------------------------------------------------------------- |
| Đi đến destination                   | Link kết hợp API composition được component hỗ trợ | Button cho action, không giả link bằng click handler vô cớ            |
| Một action chính                     | Button variant chính                               | Secondary/outline/ghost theo mức ưu tiên thực                         |
| So sánh dữ liệu tĩnh                 | Table                                              | DataTable khi cần điều khiển sort/filter/page/selection               |
| Danh sách tương tác nghiệp vụ        | DataTable                                          | Card/list nếu task thiên khám phá hoặc mỗi item không có bộ cột chung |
| Chọn ít phương án, cần nhìn cùng lúc | RadioGroup hoặc control tương ứng                  | Select khi lựa chọn dài và không cần so sánh đồng thời                |
| Chọn nhiều phương án độc lập         | Checkbox group                                     | MultipleCombobox khi danh sách lớn, cần search                        |
| Chọn một entity nhiều options        | SingleCombobox                                     | Lazy variant khi dữ liệu thực sự remote/paged                         |
| On/off áp dụng ngay                  | Switch theo save contract                          | Checkbox khi là một lựa chọn được submit cùng form                    |
| Chuyển nhóm nội dung cùng context    | Tabs                                               | Route navigation khi destination độc lập cần lịch sử/permalink riêng  |
| Chi tiết phụ có thể ẩn               | Accordion/Collapsible                              | Hiển thị trực tiếp khi cần quyết định hoặc sửa lỗi                    |
| Tác vụ ngắn, tập trung               | DialogPanel                                        | Route nếu dài/nhiều bước; SheetPanel nếu cần ngữ cảnh list            |
| Xem/edit cạnh vùng làm việc          | SheetPanel                                         | Split view khi thao tác đối chiếu thường xuyên và đủ diện tích        |
| Thông tin/điều khiển nhỏ gần trigger | PopoverPanel                                       | Dialog cho tác vụ đòi hỏi tập trung hoặc form dài                     |
| Một đơn vị nội dung độc lập          | Card                                               | Heading + spacing/rows cho thông tin liên tục                         |
| Status ngắn                          | Badge có text và semantic meaning                  | Plain text khi badge không làm rõ điều gì                             |
| Lỗi cần sửa tại field                | RHF field error                                    | Form-level Alert cho lỗi toàn form; toast không thay thế              |
| Empty dataset                        | Empty với lời giải thích và action nếu có          | Filtered no-results phải có thông tin/filter recovery khác            |
| Đang tải                             | Skeleton theo footprint hoặc Spinner cục bộ        | Không phủ cả app khi chỉ một section refresh                          |

### 11.2. API traps cần thành ví dụ chạy được

Đã đọc từ source/catalog hiện tại, cần tái kiểm tra khi triển khai:

- `Button loading` thêm spinner/aria-busy; không mặc định ngăn repeat activation. Pending submit cần `disabled` theo contract.
- `DataTable` dùng controlled state và manual sort/page; rows truyền vào phải phù hợp state. Không giả định nó tự xử lý toàn bộ dữ liệu client.
- Combobox dùng option ID; local và lazy có contract khác. Label đang chọn phải còn hiển thị được khi option không ở page hiện tại.
- `NumberInput`/RHF numeric value không được ép qua truthiness làm mất `0`; giữ edit/caret behavior.
- DatePicker, DateRangePicker, TimePicker và RHFTimePicker có representation khác nhau; chuyển đổi ở boundary có chủ đích.
- Panel footer mặc định không tự sở hữu RHF submit. Form submit, pending, cancel và close phải wire đúng.
- Card có `size` điều phối spacing; ưu tiên API đó trước khi override padding của từng slot.
- Composition của Base UI không được suy ra từ ví dụ Radix/shadcn khác phiên bản.

Mỗi trap có một consumer example tự chứa, chỉ import từ source được cài và một test cho behavior dễ sai. Không nhân bản toàn bộ props/type definitions vào JSON thủ công.

## 12. UX không dư thừa nhưng đủ trạng thái

### 12.1. Kiểm tra tính cần thiết

Mỗi region/control phải trả lời: **Giúp người dùng hiểu gì, quyết định gì hoặc làm gì? Dữ liệu/contract nào chứng minh cần nó?**

| Dấu hiệu                                   | Cách xử lý mặc định                                                        |
| ------------------------------------------ | -------------------------------------------------------------------------- |
| Hero trong trang xử lý đơn                 | Đổi thành page header gọn trừ khi có mục tiêu khác rõ                      |
| KPI trên mọi list page                     | Bỏ nếu không ảnh hưởng ưu tiên/quyết định                                  |
| Card lồng card chỉ để chia khối            | Dùng section/heading/spacing hoặc separator                                |
| Nhiều primary action cạnh tranh            | Phân ưu tiên trong từng region, giữ action theo context                    |
| Icon cho mọi label                         | Giữ icon giúp nhận diện; bỏ icon trang trí lặp lại                         |
| Tooltip giải thích nội dung thiết yếu      | Đưa nội dung thành label/helper hiển thị                                   |
| Modal xác nhận thao tác vô hại             | Thực hiện trực tiếp nếu contract không yêu cầu xác nhận                    |
| Toast thành công cho mọi click             | Giữ feedback tại nơi đổi state; toast cho sự kiện cần xác nhận theo UX app |
| Dropdown chỉ chứa action phổ biến duy nhất | Hiển thị action trực tiếp nếu không có giới hạn thực                       |
| Search/sort/tab không có behavior thật     | Không render control giả; triển khai hoặc bỏ                               |
| Stepper chia một form đơn giản             | Gom về form có section rõ                                                  |
| Sticky UI chiếm phần lớn viewport          | Giảm số vùng sticky, giữ action thực sự cần                                |

Không tối giản bằng cách xóa label, error, loading, cancel hoặc thông tin giúp quyết định.

### 12.2. State matrix theo flow

| Flow          | Trạng thái phải định nghĩa khi reachable                   | Acceptance                                                                          |
| ------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Query/list    | Initial loading, loaded, empty, no-results, refresh, error | Không hiển thị empty trong lúc chưa có kết quả; refresh không làm mất context vô cớ |
| Mutation      | Idle, pending, success, failure                            | Không submit lặp; success được xác định từ contract; lỗi giữ khả năng sửa/retry     |
| Edit form     | Pristine, dirty, invalid, pending, server error            | Reset/entity switch rõ; không tự ghi đè draft mới bằng data cũ                      |
| Remote search | Query changes, pending, stale response, selected option    | Response cũ không thay kết quả mới; selection vẫn có label                          |
| Overlay       | Open, focus, action, cancel, close                         | Focus vào/ra đúng; Escape và unsaved close có policy phù hợp                        |
| Navigation    | Route, active item, history, reload                        | Back/forward và deep link đúng với requirement                                      |
| Permission    | Các trạng thái quyền đã có contract                        | Không tự tạo permission để justify hidden/disabled UI                               |

Không scaffold mọi state cho page tĩnh không thể đi vào state đó. Loading giả hoặc delay để tạo animation không phải UX cần thiết.

## 13. Chart, icon, imagery và motion

### Chart selection

| Câu hỏi                      | Hướng chart                                                     | Chú ý                                                     |
| ---------------------------- | --------------------------------------------------------------- | --------------------------------------------------------- |
| Thay đổi theo thời gian?     | Line; area nếu khối lượng tích lũy/độ lớn là thông điệp phù hợp | Khoảng thời gian, đơn vị và missing points                |
| So sánh các nhóm?            | Bar; horizontal bar cho label dài                               | Trục/điểm bắt đầu không làm sai cảm nhận; sort có ý nghĩa |
| Thành phần của tổng?         | Stacked bar; donut chỉ khi ít phần và đọc được                  | Tổng/nhãn rõ; không nhiều slice nhỏ không phân biệt       |
| Một giá trị so với mục tiêu? | Metric + target/progress phù hợp                                | Không bịa target để có gauge                              |
| Cần tra con số chính xác?    | Table hoặc chart kèm dữ liệu truy cập được                      | Tooltip không là cách duy nhất lấy thông tin quan trọng   |

- Chart title mô tả câu hỏi; đơn vị, thời gian, legend và series name có nghĩa.
- Không mặc định “tăng = xanh/tốt”; chi phí, lỗi, thời gian trễ tăng có thể là xấu.
- Chuẩn bị no-data, partial/missing-data, số lớn, label dài; không biến dữ liệu thiếu thành 0.
- Palette category ổn định trong cùng sản phẩm; không gán màu ngẫu nhiên mỗi render.

### Icon/imagery

- Dùng hệ icon đang có; kích thước và stroke nhất quán theo role.
- Icon-only action có accessible name, focus và target đủ dùng.
- Image chỉ khi cung cấp evidence, nhận diện hoặc mood có chủ đích; không nhét ảnh stock vào workbench.
- Dùng tỷ lệ media nhất quán trong grid; crop không mất nội dung quan trọng.
- Alt text theo mục đích; asset trang trí có xử lý phù hợp, không đọc lặp nội dung.
- Agent không tự phát sinh asset/license không rõ nguồn. Asset được cung cấp hoặc tạo mới phải khớp brief.

### Motion

- Default theo component; custom motion để diễn tả feedback, state transition hoặc continuity.
- Điểm bắt đầu: hover/focus nhanh, panel transition vừa đủ; hiệu chỉnh bằng cảm nhận và reduced-motion, không áp cùng duration cho mọi thứ.
- Không animation delay việc bấm, không stagger từng row bảng đang xử lý, không auto carousel gây mất context.
- Kiểm tra thao tác nhanh/liên tiếp và reduced motion; trang không phụ thuộc animation để hiểu thông tin.

## 14. Bốn brief mẫu chứng minh agent biết ra quyết định

Các ví dụ dưới đây là target behavior. Chúng chưa phải implementation đã hoàn thành.

### A. “Làm dashboard quản lý đơn hàng cho nhân viên vận hành”

- Product: tác vụ lặp lại; page pattern mặc định quản lý danh sách, không tự suy thành analytics overview.
- Shell: sidebar trái `variant="sidebar"`, topbar gọn, main dùng phần rộng còn lại.
- Recipe: Operational workbench, compact ở bảng, comfortable ở form.
- Page: title + tạo đơn nếu có contract → search theo định danh + filter thật → applied filters → DataTable.
- Detail: SheetPanel nếu xem nhanh; route nếu cần đầy đủ lịch sử/edit dài.
- Color: neutral canvas, brand action/selection, status màu theo nghĩa có text.
- Type: label/table 13–14px điểm bắt đầu, title 24–28px; số thẳng hàng.
- Loại: hero, chart, KPI, chat widget, notification và fake activity chưa được yêu cầu.
- Check: filter ở page sau, zero/no-results, stale search, row action, keyboard, table overflow, form fail giữ dữ liệu.

### B. “Làm trang tổng quan hiệu suất vận hành”

- Kế thừa cùng workspace shell, không tạo shell mới.
- Page: phạm vi dữ liệu → metric được xác minh → trend chính → breakdown hoặc việc cần chú ý.
- Grid: KPI theo số dữ liệu thật; vùng trend/breakdown có thể 2:1; mobile stack theo priority.
- Chỉ chọn chart sau khi biết câu hỏi, unit và data shape.
- Check: con số khớp nguồn, period comparison hợp lệ, lỗi từng section, no-data khác zero, label dài.

### C. “Làm website giới thiệu dịch vụ tư vấn”

- Shell: top navigation; không sidebar.
- Recipe: Calm business hoặc Editorial warm tùy tone/nội dung đã cung cấp.
- Hero: headline nói rõ dịch vụ/giá trị; một primary CTA; media chỉ khi có asset phù hợp.
- Sections: vấn đề giải quyết → dịch vụ/quy trình có thật → evidence có thật → contact; bỏ phần thiếu dữ liệu.
- Type/space: body đọc thoải mái, hero đủ nổi bật, section spacing lớn hơn workbench.
- Form liên hệ dùng RHF; check invalid, pending, failed send và success thật.
- Không bịa “1000 khách hàng”, testimonial, team avatar hoặc 24/7 support.

### D. “Thêm trang cài đặt thông báo vào app đang có”

- Đọc shell/theme/font hiện tại, giữ chúng.
- Group theo kênh hoặc tình huống thông báo được business contract xác nhận.
- Checkbox/switch dựa trên submit model, không dựa vào control nào trông đẹp hơn.
- Form một cột hoặc row setting, helper text khi lựa chọn có hậu quả khó hiểu.
- Không thêm hero, chart, recipe mới, font mới hoặc onboarding.
- Check lưu, lỗi, retry, dirty state và trạng thái thật sau reload.

## 15. Workflow agent từ brief đến giao diện đã kiểm chứng

| Bước             | Agent làm gì                                                                   | Artifact vừa đủ                                                          |
| ---------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| 1. Understand    | Xác định task, người dùng, content/data, phạm vi, existing product decisions   | Brief ngắn và những điều chưa rõ có ảnh hưởng                            |
| 2. Classify      | Chọn product profile và page pattern; phân biệt sửa nhỏ/thêm page/redesign     | Pattern ID + rationale                                                   |
| 3. Compose       | Chốt shell, vùng nội dung, reading order, action priority, responsive          | Sơ đồ vùng bằng text hoặc sketch; không dựng full UI trước khi biết flow |
| 4. Style         | Kế thừa hoặc chọn recipe; mapping color/type/density/geometry                  | Design decisions ngắn, chỉ ghi lựa chọn có ý nghĩa                       |
| 5. Bind          | Chọn component thật; đọc contract, state owner, data/form boundary             | Component map và state matrix theo flow                                  |
| 6. Build         | Dựng một trang đại diện, dùng content thật hoặc fixture rõ ràng, wire behavior | Implementation có thể chạy                                               |
| 7. Critique      | Render rồi đánh giá hierarchy, readability, dư thừa, accessibility, state      | Danh sách issue có vị trí/evidence/cách sửa                              |
| 8. Refine        | Sửa issue theo tác động; kiểm tra lại phần bị ảnh hưởng                        | Diff đã sửa và kết quả kiểm chứng                                        |
| 9. Carry forward | Ghi quyết định cần dùng lại và bàn giao                                        | Design record nếu cần; checks/pass/fail/unverified                       |

### Trình tự critique sau render

1. Nhìn tổng thể: mục tiêu, hierarchy và primary work area có rõ không?
2. Đi theo tác vụ: người dùng hoàn thành việc với bao nhiêu lần chuyển context? Bước nào không cần thiết?
3. Đọc nội dung: label, contrast, font, line wrap, số dài/tiếng Việt.
4. Thao tác bàn phím và pointer: focus, error, pending, cancel/retry.
5. Kiểm tra viewport nhỏ, zoom và theme đang hỗ trợ.
6. Xóa chi tiết không giúp hiểu/quyết định/hành động; sau đó mới polish micro-spacing.

Mỗi lần refine phải xuất phát từ issue quan sát được. Không đổi palette/layout liên tục vì “cảm giác chưa đủ hiện đại”. Nếu có lỗi blocker chưa giải quyết thì chưa hoàn thành; thiếu runtime phải ghi rõ, không thay bằng mental review.

### Design record mẫu trong consumer

```text
Product/task:
Existing decisions to preserve:
Profile + page pattern + rationale:
Shell and navigation:
Ordered regions + primary action:
Recipe or inherited theme:
Color roles / typography roles / density:
Component choices + source contracts:
Data/form ownership + reachable states:
Narrow-screen behavior:
Elements intentionally omitted and why:
Acceptance checks:
Unresolved business decisions:
```

Record dùng ở `design/MASTER.md` cho quyết định chung; page record chỉ ghi khác biệt cần thiết. Sửa label/button nhỏ không cần tạo record. Không yêu cầu agent trình bày toàn bộ checklist này trong mỗi câu trả lời cho người dùng.

## 16. Phân bổ thành các file có trách nhiệm rõ

| Owner                                            | Nội dung                                                                       |
| ------------------------------------------------ | ------------------------------------------------------------------------------ |
| Core `xizot-design-system/SKILL.md`              | Đọc source, phân loại task, route tới workflow cần thiết                       |
| `.agents/rules/react.md`                         | Naming, types/boundaries, state/effects, implementation constraints            |
| Core `references/feature-structure.md`           | Ownership ứng dụng, locality, dependency direction; không ép cấu trúc TMS      |
| `xizot-page-builder/SKILL.md`                    | Quy trình product → pattern → recipe → component/state → render/refine         |
| Page-builder `data/page-patterns.json`           | 13 patterns: shell, regions, layout, responsive, omissions, acceptance         |
| Page-builder `data/visual-recipes.json`          | 5 directions: color/font/type/density/geometry/media và checks                 |
| Page-builder `references/page-patterns.md`       | Cách chọn pattern và sidebar variant, exceptions và scope                      |
| Page-builder `references/visual-foundations.md`  | Cách biến visual recipe thành palette/type/layout được kiểm chứng              |
| Page-builder `references/component-decisions.md` | Chọn control/container/feedback và loại UX thừa                                |
| `xizot-forms`                                    | Values/defaults/validation/submit/reset/error ownership                        |
| `xizot-quality` và `references/design-review.md` | Critique theo tác vụ, evidence, blockers và rubric khi cần đánh giá            |
| `xizot-system`                                   | Shared-contract impact và kiểm tra kỹ thuật phù hợp                            |
| Core `scripts/ui-source.py`                      | Tra cứu source/profile/pattern/recipe; không tự tuyên bố UI đã được kiểm chứng |

Không tạo skill riêng cho từng màu, font hay page pattern. Metadata skill chỉ dùng cho discovery. Dữ liệu pattern/recipe là default có thể tra cứu từng mục, không được nạp toàn bộ vào mọi task.

### Xử lý 5 file rules tạm

- `coding-convention.md` và `coding-conventions.md`: gom phần naming/type/boundary hợp lệ vào React rules; bỏ text proposal và quy định dựa trên app cũ.
- `feature-structure.md` và `new-folder-structure.md`: gom thành feature ownership reference; không buộc consumer dùng `src/components/features`, `action.ts`, folder-per-component hoặc đúng số file.
- `anti-patterns.md`: chuyển nội dung có giá trị sang đúng owner; bỏ link thiếu, prohibition trùng, rule `safeAction/useAsync`, cấm FormProvider và thủ tục xin phép riêng của TMS.
- Xóa 5 file tạm sau khi nội dung đã phân bổ. Không giữ hai rulebook cạnh tranh.

## 17. Các phase và điều kiện hoàn thành

| Phase                 | Deliverable                                                       | Acceptance                                                                                                |
| --------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 1. Chuẩn hóa nội dung | Rules gọn; feature ownership; không còn link vào TMS              | Mỗi ràng buộc có owner; không có requirement dựa trên source không tồn tại                                |
| 2. Quyết định layout  | 13 patterns và sidebar decision guide                             | Phân biệt được overview/list/detail/form/site/reading; mỗi pattern có mobile và omissions                 |
| 3. Hướng thị giác     | 5 recipes + foundation guide                                      | Có quyết định color/font/density cụ thể và giới hạn; không claim palette/font đã validate khi chưa render |
| 4. Component/UX       | Decision table, mutation feedback, form integration               | Không bịa API; mỗi component gợi ý tồn tại; trạng thái có owner                                           |
| 5. Workflow           | Routing, brief, design record, render/critique/refine             | Sửa nhỏ giữ nhỏ; app hiện hữu được kế thừa; page mới có quyết định cụ thể                                 |
| 6. Kiểm chứng         | Kiểm tra liên kết, dữ liệu, CLI copy, component exports, đóng gói | Kết quả có bằng chứng; không lấy static pass thay cho agent/browser behavior                              |
| 7. Dọn repo           | Bỏ file test và cơ chế/file retirement theo yêu cầu cuối          | Không còn import/lệnh/link tới file đã xóa; giữ tooling phục vụ sử dụng thực tế                           |

Trong phiên triển khai này, kiểm chứng dùng công cụ/lệnh thực tế nhưng không giữ các file test trong repo. Consumer product UI, migration font/token dùng chung và chứng nhận chất lượng thị giác cho từng sản phẩm vẫn phải được kiểm tra ở task tương ứng; bộ hướng dẫn không tự thay đổi giao diện sản phẩm.

## 18. Đánh giá kết quả agent khi áp dụng

Bắt đầu bằng các yêu cầu độc lập: quản lý đơn, tổng quan hiệu suất, sửa form số, detail dài, inbox, settings, landing dịch vụ, pricing, catalog, product detail, docs, portfolio, login và sửa label trong app có brand sẵn.

Với mỗi yêu cầu, quan sát trực tiếp:

1. Chọn đúng pattern/shell và biết kế thừa brand không?
2. Nêu và thực hiện được hierarchy, responsive, component và reachable states không?
3. Có tự thêm vùng/claim/feature không được hỗ trợ không?
4. Có đọc đúng source và dùng API thật không?
5. Giao diện render và luồng thao tác đạt kiểm tra ở design review không?

Chạy lại các tình huống quan trọng khi đổi model, workflow hoặc shared contract. Có thể đánh giá độc lập nếu môi trường cho phép. Không lưu hàng loạt fixture hoặc lịch sử bộ cũ vào hướng dẫn hằng ngày. Một kết quả tốt ở một task không đủ chứng minh mọi task đều tốt.

## 19. Kiểm tra tích hợp tối thiểu

Giữ phần này gọn: source import đúng; guidance/data/scripts được phân phối đầy đủ; CLI lookup chạy khi copy vào consumer; project build với component đang dùng; cấu hình/font/provider cần thiết được kiểm tra ở app thực. Không đưa chi tiết cài đặt vào workflow thiết kế thông thường.

Mỗi claim phải có loại bằng chứng: **source đã đọc**, **lệnh đã chạy**, **interaction đã quan sát**, **visual đã review** hoặc **chưa kiểm chứng**. File hướng dẫn và điểm số không thể thay thế bằng chứng tương ứng.
