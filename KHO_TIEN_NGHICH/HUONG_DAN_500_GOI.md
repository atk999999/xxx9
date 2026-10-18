# Kho Tiên Nghịch: 500 gói / 2.095 chương

- Đủ 2.095 chương, gộp thành đúng 500 file packages/pack-001.json đến pack-500.json.
- package-index.json: chapter_map ánh xạ ID chương sang file gói và offset (đếm từ 0).
- index.json: chỉ mục từ khóa gốc, giữ nguyên.
- source.json: nguồn gốc, giữ nguyên.
- src/lib/tienNghichPackReader.ts: hàm ví dụ để truy xuất chương theo ID.
- SHA-256 trong package-index.json là hash của JSON gốc, không phải JSON đã tái mã hóa.
- CẢNH BÁO: đường dẫn cũ /knowledge/tien-nghich/{id}.json không còn tồn tại. Mọi code gọi trực tiếp phải đổi sang reader mới trước khi dùng. Chưa xác nhận tích hợp Gemini.
- Đã đối chiếu cấu trúc JSON 2.095 chương trước và sau gộp, không mất dữ liệu JSON.
