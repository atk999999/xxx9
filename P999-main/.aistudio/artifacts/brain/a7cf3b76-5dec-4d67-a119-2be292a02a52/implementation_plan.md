# Kế Hoạch: Lưu Trữ và Khôi Phục Phiên Đọc Truyện (Thiên Đạo Simulator)

Mục tiêu: Đảm bảo khi người dùng thoát ứng dụng (đóng tab/trình duyệt hoặc rời khỏi app) và quay lại, tiến trình đọc truyện, cốt truyện, chỉ số nhân vật, và các lượt tương tác (turns) trước đó được tự động khôi phục hoặc có tùy chọn tiếp tục phiên gần nhất mà không bị mất.

---

### 1. Tổng Quan & Giải Pháp
- **Vấn đề hiện tại**: Mặc dù dữ liệu đã được lưu trữ trong cơ sở dữ liệu cục bộ (IndexedDB qua Dexie tại `story/db.ts`), khi khởi động lại ứng dụng `story/index.html`, ứng dụng mặc định hiển thị màn hình cài đặt (`settings`) hoặc bắt đầu game mới mà chưa tự động kiểm tra và khôi phục phiên đang chơi gần nhất (`active session`).
- **Giải pháp đề xuất**:
  1. Thêm cơ chế **Auto-Resume / Last Session Check** khi khởi động `story/App.tsx`.
  2. Kiểm tra bản lưu gần nhất trong `db.sessions` (sắp xếp theo thời gian tạo/cập nhật gần nhất).
  3. Hiển thị thông báo hoặc màn hình chờ/tiếp tục nhanh (ví dụ: "Tiếp tục hành trình: [Tên nhân vật]" hoặc "Bắt đầu mới").
  4. Đảm bảo mọi lượt tương tác (turn) và trạng thái `currentStats`, `currentOptions` được lưu tự động ngay khi phát sinh.

---

### 2. Luồng Trải Nghiệm Người Dùng (UX Flow)
1. **Khởi động lại app (`story/index.html`)**:
   - Ứng dụng kiểm tra IndexedDB (`db.sessions`).
   - Nếu tìm thấy phiên gần nhất (`latest session`):
     - Hiển thị giao diện chào mừng với tùy chọn nổi bật: **"Tiếp tục hành trình trước"** hoặc **"Bắt đầu ván mới"**.
   - Nếu không có phiên nào, chuyển trực tiếp vào màn hình Cài đặt/Tạo nhân vật (`landing` / `settings`).
2. **Trong khi đọc truyện**:
   - Mỗi khi AI trả về kết quả hoặc người dùng chọn lựa/quay về checkpoint, tự động upsert vào `db.sessions` và `db.turns`.
   - Lưu trạng thái cuộn trang (scroll position) và tab đang mở vào `localStorage` để khôi phục chính xác vị trí đọc.

---

### 3. Kiến Trúc Kỹ Thuật (Technical Approach)
- **Kiểm tra phiên gần nhất trong `story/App.tsx`**:
  ```typescript
  useEffect(() => {
    async function checkLastSession() {
      const lastSession = await db.sessions.orderBy('createdAt').reverse().first();
      if (lastSession) {
        // Cung cấp state để hiển thị nút "Tiếp tục phiên trước" trên Landing/Settings screen
        setLatestSession(lastSession);
      }
    }
    checkLastSession();
  }, []);
  ```
- **Hàm `handleResumeLatestSession`**:
  - Tải session, turns, registry từ Dexie DB.
  - Thiết lập state `session`, `turns`, `currentStats`, `currentOptions` và chuyển view sang `'game'`.
- **Đảm bảo không sửa code ngay lúc này** (theo yêu cầu của người dùng: "chưa sửa lúc này", chỉ cung cấp phương án).

---

### 4. Quyết Định & Ràng Buộc
- Không làm ảnh hưởng đến tính năng xuyên thế giới (Multiverse) hay lịch sử dung hợp (`fusion_history`).
- Giữ nguyên các quy tắc về Thang đo sức mạnh (Power Scaling) và bộ nhớ cốt truyện.
