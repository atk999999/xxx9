# Bản đồ mã nguồn sau khi tách file

Mục tiêu: dễ kiểm tra và sửa từng phần; giữ nguyên hành vi. Đây là tối ưu cấu trúc mã, không phải thay đổi gameplay hay cam kết tăng FPS/giảm quota.

## Điểm vào

| File | Trước | Sau | Vai trò |
| --- | ---: | ---: | --- |
| src/App.tsx | 4300 | 589 | Ghép các panel dung hợp, so sánh, sổ thẻ |
| story/components/GameUI.tsx | 1542 | 512 | Ghép giao diện chơi, cửa sổ và thanh bên |
| story/components/SettingsScreen.tsx | 1802 | 320 | Ghép màn tạo nhân vật và thế giới |

Số dòng bao gồm dòng trắng. Không nén code để giảm số dòng.

## Dung hợp: src/fusion/

- useFusionAppController.tsx: state, effect, callback, nhập/xuất thẻ, quota và điều phối gọi AI. Giữ thứ tự hook và các khóa localStorage gốc.
- characterCatalog.tsx: danh mục nhân vật, vũ trụ, thời kỳ và trạng thái.
- characterPower.tsx, powerComparison.tsx: cách tính và so sánh sức mạnh gốc.
- presentation.tsx: màu rank và định dạng BP/level.
- types.tsx: kiểu dữ liệu thẻ, nhân vật, kết quả so sánh; App.tsx vẫn re-export PowerComparisonMeta.
- specialFusionRules.ts: các quy tắc đặc biệt theo vật phẩm/nhân vật, giữ nguyên văn prompt.
- fusionPrompt.ts: ghép prompt và danh sách nhân vật, không gọi API.
- CharacterSelector.tsx, ErrorBoundary.tsx, MainMenu.tsx: thành phần độc lập.
- FusionAppHeader.tsx, FusionAppCharacterInputs.tsx, FusionAppFusionResult.tsx: đầu trang, đầu vào và kết quả.
- FusionAppComparisonInputs.tsx, FusionAppComparisonResult.tsx: chọn nhân vật và hiển thị so sánh.
- FusionAppCollectionHeader.tsx, FusionAppCollectionControls.tsx: tiêu đề và lọc/sắp xếp sổ thẻ.
- FusionAppConnectionDialog.tsx: cửa sổ cấu hình hiện có.

## Kể chuyện: story/components/game/

- useGameUIController.tsx: trạng thái giao diện, phân trang, wiki, lệnh nhập và callback.
- GameUIStoryPanel.tsx: lượt kể chuyện, lựa chọn và nhập hành động.
- GameUIStatsPanel.tsx: thông tin nhân vật, hành trang và nút thao tác.
- GameUIConfigDialog.tsx: cấu hình trong game.
- NarrativeDisplay.tsx, UserMessage.tsx, WikiQuickCard.tsx: nội dung kể, lời người chơi, thẻ wiki.
- appearance.tsx, types.tsx: lựa chọn hiển thị, icon phòng và kiểu props.

## Tạo nhân vật: story/components/settings/

- useSettingsScreenController.tsx: trạng thái, sinh thế giới, nhập/xuất mẫu, bắt đầu game.
- genrePresets.tsx: preset thể loại gốc.
- options.tsx: danh sách lựa chọn; SettingsScreen.tsx vẫn re-export QUICK_WORLDS và DESCENT_MODES.
- SettingsScreenWorldSelection.tsx, SettingsScreenCharacterSetup.tsx: các khối giao diện cấu hình.
- types.tsx: hợp đồng props của màn thiết lập.

Các panel nhận props có kiểu Pick<ReturnType<typeof use...Controller>, ...>. Import controller trong panel chỉ là import type; panel không tạo thêm phiên state và không gọi API riêng.

## Vùng cần bảo toàn

Bước tách file giữ nguyên dịch vụ kể chuyện, database, ảnh và prompt. Bản sửa lỗi tiếp theo chỉnh story/App.tsx (cảnh giới mở đầu và nút quay lại), shared/gemini.ts (giữ model người dùng chọn) và controller dung hợp (bảo vệ save, nhập backup, xử lý ảnh). Không đổi schema database hoặc khóa lưu cũ; thêm fusion_history_recovery để giữ dữ liệu hỏng trước khi nhập bản hợp lệ. Không thêm gọi AI, retry tự động hay embedding.

web_build/ được tạo lại bằng build; tên JS/CSS có hash mới là bình thường. package-lock.json khóa bộ dependency đã kiểm tra; package.json thêm kiểm thử hồi quy vào npm test, không thay dependency.

## Cách kiểm tra

```sh
npm ci
npm run lint
npm test
npm run build
```

Kiểm tra prompt với bản src/App.tsx trước refactor (giữ riêng ngoài dự án):

```sh
ORIGINAL_APP_SOURCE=/duong-dan/ban-goc/src/App.tsx node --import tsx tests/refactor-parity.test.ts
```

Kết quả phiên sửa:
- TypeScript: đạt.
- Bốn bộ kiểm thử gốc: đạt (hồ sơ/save, đa thế giới, rollback bộ nhớ/ảnh, registry thế giới).
- 1.584 tổ hợp prompt: khớp từng ký tự với bản gốc, không gọi API.
- HTML render của 5 trạng thái: khớp bản gốc (dung hợp, tạo nhân vật, xuyên giới, game trống, game có lượt và chỉ số).
- Build hai entry: đạt. Vite còn cảnh báo chunk lớn hơn 500 kB; chia file nguồn không đồng nghĩa giảm bundle tải về.
- Chưa chạy kiểm thử thao tác trên trình duyệt: tải Chromium thất bại trong môi trường này. HTML render không thay thế kiểm thử tương tác.
- Không thử gọi Gemini thật, không tiêu quota và không dùng khóa riêng của người chơi.

Lần sửa sau: đọc bản đồ này, mở module liên quan, sửa phạm vi nhỏ rồi chạy kiểm tra. Không gom các module trở lại App.tsx, không reset save hoặc thay prompt chỉ để dọn code.

## Bản sửa 6 lỗi sau kiểm tra

- historyStorage.ts: kiểm tra toàn bộ danh sách; từ chối ghi đè dữ liệu lưu hỏng; nhập backup hợp lệ mới cập nhật state; lỗi hết dung lượng không làm mất bản cũ. Khi nhập đè một bản hỏng bằng backup hợp lệ, lưu nguyên bản hỏng vào fusion_history_recovery trước.
- Nút xuất backup xuất nguyên dữ liệu hỏng khi không thể đọc, thay vì xuất danh sách trống.
- compressImage.ts: báo lỗi giải mã, lỗi canvas và hết thời gian 15 giây; thẻ vẫn theo luồng lưu không có ảnh của game, chỉ tạo lại ảnh khi người chơi yêu cầu.
- shared/gemini.ts và controller dung hợp: giữ nguyên model đã chọn, không tự chuyển Pro sang Flash hoặc đổi model đã lưu. Giữ model mặc định cũ khi chưa chọn. Model không được dịch vụ hỗ trợ sẽ báo lỗi, không âm thầm dùng model khác.
- story/App.tsx: lượt đầu dùng effectiveRules của thế giới đích; nút quay lại về landing khi tạo game mới và về game khi hủy xuyên giới.
- tests/remix-bugs.test.ts: kiểm thử save hỏng, backup sai, hết dung lượng, hồ sơ/ảnh/hành trình, xử lý ảnh, model, khởi tạo cảnh giới và điều hướng. Tất cả chạy không gọi API.

Lint, năm bộ kiểm thử (bốn bộ cũ + một bộ mới), đối chiếu 1.584 prompt dung hợp và build đều đạt. Chưa kiểm thử tương tác bằng trình duyệt hoặc gọi Gemini thật. Những kiểm tra này không bảo đảm dự án hết mọi lỗi khác.
