# Kết quả kiểm tra bản cập nhật

## Đã qua
- TypeScript: npm run lint.
- Hai bộ kiểm thử dữ liệu: npm test. Bao gồm ảnh/tính cách, snapshot độc lập, lưu/nhập, quy đổi cảnh giới, sao Hỗn Độn, giữ hành trang/trạng thái, kỹ năng, chống tạo thẻ trùng, bảo vệ dữ liệu lỗi/quota.
- Kiểm thử Chromium: màn hình 390x844 và phòng dung hợp 1280x800. AI gợi ý tính cách qua SDK với phản hồi chặn giả lập; tạo chuyến đi, lưu thẻ, chuyển thế giới, nhập lại thẻ trưởng thành, tạo thẻ từ nhân vật 5.0S, cập nhật sức mạnh.
- Kiểm thử mở lại bản lưu trên máy; nhập JSON có ID trùng vẫn tạo bản riêng; hoàn tác không xóa mở đầu; phản hồi API lỗi không ghi thêm lượt; không có lỗi JavaScript trang trong luồng kiểm thử.
- Build web: npm run build. Hai trang ở web_build/index.html và web_build/story/index.html.

## Giới hạn
- Không gọi Gemini thật: chưa có key hợp lệ trong môi trường. Chưa xác nhận quota, model khả dụng hoặc chất lượng kể chuyện/tạo ảnh thực tế của tài khoản người dùng.

## Các sửa lỗi tiếp theo
- Thêm danh sách bản lưu cục bộ trên màn hình chính.
- Nhập JSON qua giao dịch tạo ID mới cho session, lượt chơi và wiki; không ghi vào ID nguồn.
- Hoàn tác giữ mở đầu; tạo lại chỉ thay lượt cũ sau khi phản hồi mới thành công.
- Giữ tính cách chỉnh trước khi chuyển thế giới; thẻ xuất mang ký ức hiện tại.
- Không crash khi chỉnh bảng cảnh giới còn một hàng.
- Mở sổ dung hợp không tự ghi đè dữ liệu không đọc được; thông báo khi bộ nhớ đầy.
- CSS và biểu tượng truyện được đóng gói cục bộ.

## Sửa các mục 1–4
- Hoàn tác/tạo lại: mỗi lượt mới lưu snapshot summary/wiki trước lượt. Khôi phục summary, wiki và lượt chơi trong cùng giao dịch. Save cũ không có snapshot được dựng lại từ các lượt còn giữ và các mục wiki tự thêm không do AI tạo.
- Không gọi embedding trong luồng truyện. Tìm ký ức/wiki bằng từ khóa cục bộ, dùng đúng wiki trước lượt khi tạo lại.
- Ký ức xuyên giới gửi AI giới hạn 5.200 ký tự, ưu tiên thế giới gần nhất và tối đa hai thế giới liên quan; tóm tắt giới hạn 6.000 ký tự. Không gửi storyProgress lồng trong mô bản. Dữ liệu gốc không bị cắt/xóa.
- Tạo ảnh thất bại/không trả ảnh được báo rõ. Không tự thử model khác; không dùng ảnh ngẫu nhiên che lỗi. Có Tạo lại riêng ảnh ở kết quả lỗi và màn hình xem thẻ. Một lần bấm chỉ gọi một yêu cầu ảnh, không chạy lại dung hợp hay tăng bộ đếm lượt dung hợp nội bộ. API ảnh vẫn có thể tính phí theo tài khoản.
- PASS tests/memory-image.test.ts: hoàn tác snapshot/legacy, nhập snapshot không lẫn ID, giới hạn/chọn ký ức, lỗi ảnh và không tự retry.
- PASS Chromium: năm lượt giả lập kích hoạt tóm tắt, hoàn tác trả lại summary/wiki trước lượt; 0 request embedding; retry ảnh lỗi/thành công giữ ID/chỉ số/tính cách/số thẻ/bộ đếm dung hợp.
- Các phản hồi AI vẫn là giả lập; chưa dùng API key thật.
