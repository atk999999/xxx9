/** Local image decoding must settle even if the returned image is damaged. No API retry. */
export function compressImage(base64: string, timeoutMs = 15000): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    let settled = false;
    const finish = (error?: Error, value?: string) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      img.onload = null;
      img.onerror = null;
      if (error) reject(error); else resolve(value!);
    };
    const timer = setTimeout(() => finish(new Error('Quá thời gian xử lý ảnh. Bạn có thể thử tạo lại ảnh.')), timeoutMs);
    img.onerror = () => finish(new Error('Ảnh trả về bị lỗi hoặc không đọc được.'));
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 512;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Không khởi tạo được bộ xử lý ảnh.');
        ctx.drawImage(img, 0, 0, 512, 512);
        const result = canvas.toDataURL('image/jpeg', 0.8);
        if (!result.startsWith('data:image/')) throw new Error('Không xuất được ảnh.');
        finish(undefined, result);
      } catch (error) { finish(error instanceof Error ? error : new Error('Không xử lý được ảnh.')); }
    };
    try { img.src = base64; } catch (error) { finish(error instanceof Error ? error : new Error('Không đọc được ảnh.')); }
  });
}
