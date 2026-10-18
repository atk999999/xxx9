# Kho tham khảo Tiên Nghịch

Đã kiểm tra SHA-256 EPUB khớp báo cáo nguồn và đối chiếu đủ 2.096 tệp chương: 2.095 chương truyện, loại mục lục khỏi kết quả tìm kiếm. Đây không phải xác minh thủ công mọi tình tiết.

Dữ liệu tại KHO_TIEN_NGHICH/knowledge/tien-nghich: toàn văn từng chương, chỉ mục tìm kiếm và source.json. Vite tự sao chép sang web_build/knowledge khi build. Giữ cả thư mục knowledge khi triển khai web.

Tích hợp trong generateTurn và năm module tạo bối cảnh/cốt truyện/thế lực/NPC/mở đầu. Tìm kiếm từ khóa cục bộ, đọc tối đa ba chương mỗi truy vấn, cache tối đa 12 chương; prompt tham khảo tối đa 4.200 ký tự gồm quy tắc và nguồn chương/đoạn. Không thêm API embedding hay lượt gọi Gemini. Có tăng token đầu vào do đoạn tham khảo; không thể cam kết quota không tăng.

Không nhét sách vào save, không thay đổi schema save, dung hợp, cấu hình Gemini hoặc ảnh. Save cũ tự dùng kho khi kể lượt mới. Truyện nguyên tác là tham khảo, nhánh người chơi và trạng thái save được giữ ưu tiên. Dữ kiện không đủ bằng chứng không được khẳng định là nguyên tác. Quy tắc tùy biến sẵn có của game vẫn giữ nguyên.

Tìm kiếm là lexical (không hiểu ngữ nghĩa hoàn toàn), không có bộ lọc chương theo thời điểm vì game chưa có mốc nguyên tác đáng tin cậy. Prompt yêu cầu không tiết lộ tương lai, nhưng không bảo đảm AI tuân thủ tuyệt đối. Chưa thẩm định thủ công từng đoạn hoặc từng NPC. Nếu tải dữ liệu lỗi, game tiếp tục với chỉ dẫn không khẳng định lore chưa kiểm chứng và ghi cảnh báo console.

Tái tạo dữ liệu: python scripts/build-tien-nghich.py <thư_mục_kho_gốc> <EPUB>
Kiểm tra: npm run lint; npm test; npm run build.

Kết quả kiểm tra bản giao: npm run lint, npm test, npm run build đều thành công. Sửa thêm thứ tự đóng thẻ details/div bị sai trong bản nguồn, để build được. Chưa gọi Gemini thật hoặc xác minh hành vi AI trong phiên chơi trực tiếp.

Kho nam o thu muc goc KHO_TIEN_NGHICH. Vite publicDir tro vao thu muc nay de giu nguyen URL /knowledge/tien-nghich/. KHONG xoa, doi ten, hay tao lai kho neu chua duoc phep.
