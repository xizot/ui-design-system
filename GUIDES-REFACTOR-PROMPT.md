# Refactor toàn bộ giao diện component guides

Refactor trực tiếp toàn bộ UI guides trong `app/components/**` của repository Xizot. Hoàn thành implementation và kiểm chứng; không dừng ở kế hoạch hoặc một trang mẫu.

Đọc `AGENTS.md`, skill `xizot-design-system`, `xizot-page-builder` và `xizot-quality`. Dùng `xizot-forms` khi thay luồng form demo. Chỉ dùng `xizot-system` nếu cần thay shared contract thật sự.

```sh
python .agents/skills/xizot-design-system/scripts/ui-source.py pattern reading
python .agents/skills/xizot-design-system/scripts/ui-source.py recipe technical
```

Mục tiêu: một website documentation dễ tìm component, đọc API, thử ví dụ và copy code. Kế thừa font/theme hiện tại, có hierarchy rõ và ít chrome thừa.

1. Inventory mọi route thật, metadata, navigation, template và các ngoại lệ như Color/Installation. Kiểm tra source trước khi dùng API. Giữ nguyên unrelated edits.
2. Dùng một docs shell: header gọn, navigation trái có nhóm/search/active route, main đủ rộng; mobile mở navigation theo yêu cầu. TOC thuộc page và chỉ tạo cột khi có mục lục thật. Tránh grid lồng nhau và nested main.
3. Chuẩn hóa guide header, section, API table, preview/code và TOC thành composition dùng lại trong vùng docs. Không xây generic rendering engine hoặc thay primitive của thư viện chỉ để đổi docs.
4. Header gồm tên/mô tả ngắn; section dùng heading/spacing. Bỏ hero/card lồng/card trang trí, numbering không cần thiết, caption hướng dẫn viết template và các action lặp.
5. Preview giữ hành vi demo; code khớp use case, có nút copy luôn truy cập bằng bàn phím/touch. Tab label dài và code/table phải overflow cục bộ. Không phá màu/kích thước được demo bằng CSS override toàn cục.
6. Index và sidebar dùng metadata thống nhất, chỉ link route tồn tại. Giữ slug/deep link hiện hữu; sửa nội dung kỹ thuật sai chỉ khi đối chiếu source có bằng chứng.
7. Color giữ chọn/copy preset; Installation có nội dung phù hợp CLI thực tế. Không để ngoại lệ giữ layout cũ lệch phần còn lại.
8. Cập nhật template guide để page mới tiếp tục dùng composition mới. Giữ example tự chứa khi có thể, không import docs-only component vào snippet dành cho consumer.
9. Chạy scoped lint/types/build phù hợp. Dùng browser kiểm tra desktop/mobile, light/dark, navigation/search/no-results, TOC, usage tabs/copy, form và overlay đại diện. Sửa lỗi quan sát được rồi kiểm tra lại.
10. Không giữ file test, fixture test hoặc cơ chế retired trong repo. Có thể dùng kiểm tra tạm thời. Không tự commit/publish.

Nghiệm thu: mọi guide dùng hệ layout mới, không thiếu route hoặc biến mất ví dụ; metadata không trùng; một main landmark; heading/keyboard/focus đúng; không tràn ngang toàn page; code/props đọc được; theme và demo tương tác còn hoạt động. Báo chính xác đã kiểm tra và phần chưa kiểm chứng.
