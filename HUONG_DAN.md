# Dung hợp · Xuyên thế giới — bản cập nhật

## Chạy bản web
npm install
npm run dev

Build: npm run build. Kết quả ở web_build/. Đưa toàn bộ thư mục này lên cùng một máy chủ web. index.html là phòng dung hợp, story/index.html là phần truyện. Không mở bằng file://.

## Luồng sử dụng
1. Tại sổ dung hợp, mở thẻ → Dùng mô bản · Xuyên thế giới. Thẻ cũ có thể nhập tính cách hoặc bấm AI gợi ý; có nút lưu tính cách về thẻ gốc.
2. Chọn thế giới và kiểm tra cấp gốc/bảng quy đổi. Cấp gốc giữ nguyên khi chuyển thế giới; cảnh giới là nhãn theo bảng. Đây là quy ước của trò chơi, không phải số liệu chính thức của nguyên tác.
3. Trong truyện, bấm nút hình quả địa cầu trên thanh đầu để mở Hành trình đa thế giới.
4. Lưu nhân vật về sổ dung hợp tạo/cập nhật một thẻ hành trình riêng; giữ nguyên thẻ nguồn. Nhân vật tạo bình thường từ 5.0S cũng xuất thành thẻ được. Nhân vật chưa có ảnh dùng ảnh chữ đại diện.
5. Sang thế giới tiếp theo giữ hành trang, kỹ năng, trạng thái, tính cách, ký ức tóm tắt và sức mạnh. Bản lưu thế giới trước vẫn ở màn hình chính. Mỗi lần chuyển tạo một bản lưu mới thuộc cùng hành trình.
6. Thẻ hành trình có thể tiếp tục dùng để dung hợp hoặc xuyên thế giới. Kỹ năng và tính cách được đưa vào dữ liệu dung hợp.
7. Trong bảng hành trình có thể cập nhật tính cách và xác nhận sức mạnh mới kèm lý do. AI chỉ đề xuất thay đổi sức mạnh; người chơi xác nhận trước khi áp dụng.

## Gemini
Mở Kết nối Gemini để nhập key và model, rồi Kiểm tra kết nối. Key nhập tại đây chỉ lưu trong sessionStorage của tab, không nằm trong file xuất. Có thể dùng GEMINI_API_KEY qua .env.local như dự án gốc. Model trong Kết nối Gemini được ưu tiên cho phần truyện và gợi ý tính cách; phòng dung hợp vẫn giữ bộ chọn model văn bản/hình ảnh riêng.
Không kèm key thật. Chưa thử tài khoản Gemini thật; có kiểm thử phản hồi giả lập qua SDK và giao diện. Tính năng AI cần Internet. CSS và biểu tượng phần truyện đã đóng gói cục bộ; font Google có thể dùng font dự phòng.

## Dữ liệu
Giữ fusion_history và ThienDaoDB như hai dự án gốc. Cần cùng địa chỉ web để hai phần dùng chung bộ nhớ. Dữ liệu ở địa chỉ cũ không tự chuyển sang địa chỉ mới: dùng xuất/nhập JSON. Xuất bản lưu truyện giữ hồ sơ mô bản/hành trình; xuất sổ dung hợp giữ các thẻ. Bản lưu từng thế giới vẫn xuất riêng.

## Kiểm tra
npm run lint
npm test
npm run build

Kiểm thử trình duyệt: tests/browser.mjs cần Playwright và Chromium. Có thể chỉ định PLAYWRIGHT_MODULE và CHROMIUM_PATH nếu môi trường có sẵn.


## Bản sửa 1–4
Hoàn tác nay lùi cả ký ức tóm tắt và wiki. Với save cũ, dữ liệu được dựng lại từ lịch sử có sẵn; save mới có snapshot chính xác trước mỗi lượt.
Ký ức được tìm theo từ khóa trên máy để giảm lời gọi AI; chỉ phần liên quan được gửi đi, lịch sử đầy đủ vẫn giữ.
Nếu tạo ảnh lỗi, mở thẻ và bấm Tạo lại riêng ảnh. Không cần dung hợp lại. Nút này chỉ gọi API tạo ảnh và giữ các thông tin nhân vật khác.
