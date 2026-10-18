import { AnimatePresence, motion } from "framer-motion";
import {
  Cpu,
  Image as ImageIcon,
  Settings,
  ShieldAlert,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "./presentation";
import type { useFusionAppController } from "./useFusionAppController";

type Props = Pick<
  ReturnType<typeof useFusionAppController>,
  | "showSettings"
  | "setShowSettings"
  | "handleTextModelChange"
  | "textModel"
  | "handleImageModelChange"
  | "imageModel"
  | "isNsfw"
  | "setIsNsfw"
>;

export function FusionAppConnectionDialog({
  showSettings,
  setShowSettings,
  handleTextModelChange,
  textModel,
  handleImageModelChange,
  imageModel,
  isNsfw,
  setIsNsfw,
}: Props) {
  return (<AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 my-8 max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between shrink-0">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Settings className="w-5 h-5 text-cyan-400" />
                  Cài đặt & Mô hình AI
                </h3>
                <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 overflow-y-auto pr-1">
                {/* AI Text/Logic Model Configuration */}
                <div className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                        <Cpu className="w-4 h-4 text-cyan-400" />
                        Mô hình Phân tích & Lực chiến
                      </p>
                      <p className="text-xs text-slate-400">Điều khiển logic dung hợp & thang đo cấp độ</p>
                    </div>
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-mono px-2 py-0.5 rounded-full border border-cyan-500/30">
                      Mới nhất
                    </span>
                  </div>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => handleTextModelChange('gemini-3.8-flash')}
                      className={cn(
                        "w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-3",
                        textModel === 'gemini-3.8-flash'
                          ? "bg-cyan-500/10 border-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                      )}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-200">Gemini 3.8 Flash</span>
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-semibold">Khuyên dùng</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">Tốc độ xử lý siêu tốc, hiểu sâu ngữ cảnh Dragon Ball và tuân thủ chặt chẽ tỷ lệ BP = Level * 100.</p>
                      </div>
                      <div className={cn(
                        "w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0",
                        textModel === 'gemini-3.8-flash' ? "border-cyan-400 bg-cyan-400" : "border-slate-600"
                      )}>
                        {textModel === 'gemini-3.8-flash' && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTextModelChange('gemini-4-argon')}
                      className={cn(
                        "w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-3",
                        textModel === 'gemini-4-argon'
                          ? "bg-cyan-500/10 border-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                      )}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-200">Gemini 4 Argon</span>
                          <span className="text-[9px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded font-semibold">Tư duy sâu</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">Khả năng lập luận cao cấp, thích hợp so sánh chiến thuật và kịch bản đối đầu chuyên sâu.</p>
                      </div>
                      <div className={cn(
                        "w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0",
                        textModel === 'gemini-4-argon' ? "border-cyan-400 bg-cyan-400" : "border-slate-600"
                      )}>
                        {textModel === 'gemini-4-argon' && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                    </button>
                  </div>
                </div>

                {/* AI Image Generation Model Configuration */}
                <div className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-emerald-400" />
                        Mô hình Tạo ảnh (Image Model)
                      </p>
                      <p className="text-xs text-slate-400">Xuất hình ảnh sprite 16-bit Extreme Butoden</p>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Mới nhất
                    </span>
                  </div>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => handleImageModelChange('gemini-3.1-flash-lite-image')}
                      className={cn(
                        "w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-3",
                        imageModel === 'gemini-3.1-flash-lite-image'
                          ? "bg-emerald-500/10 border-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                      )}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-200">Gemini 3.1 Flash Lite Image</span>
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-semibold">Khuyên dùng</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">Mô hình tạo ảnh thế hệ mới nhất, thay thế hoàn toàn gemini-2.5-flash-image cũ. Tạo sprite DBZ sắc nét và ổn định.</p>
                      </div>
                      <div className={cn(
                        "w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0",
                        imageModel === 'gemini-3.1-flash-lite-image' ? "border-emerald-400 bg-emerald-400" : "border-slate-600"
                      )}>
                        {imageModel === 'gemini-3.1-flash-lite-image' && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleImageModelChange('gemini-nano-banana-2.1')}
                      className={cn(
                        "w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-3",
                        imageModel === 'gemini-nano-banana-2.1'
                          ? "bg-emerald-500/10 border-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                      )}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-200">Gemini Nano Banana 2.1</span>
                          <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-semibold">HQ Pro</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">Mô hình tạo hình ảnh độ phân giải cao cao cấp (yêu cầu API key kích hoạt tính năng hình ảnh).</p>
                      </div>
                      <div className={cn(
                        "w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0",
                        imageModel === 'gemini-nano-banana-2.1' ? "border-emerald-400 bg-emerald-400" : "border-slate-600"
                      )}>
                        {imageModel === 'gemini-nano-banana-2.1' && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Status Notice */}
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex gap-3 items-start">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-cyan-200/80 leading-relaxed">
                    Hệ thống đã nâng cấp toàn diện: Cả mô hình văn bản và mô hình tạo ảnh đều được cập nhật lên các phiên bản mới nhất từ Google GenAI.
                  </p>
                </div>

                {/* NSFW Option */}
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                  <div className="space-y-1">
                    <p className="font-bold text-sm">Chế độ NSFW</p>
                    <p className="text-xs text-slate-500">Bật nội dung người lớn và gợi cảm.</p>
                  </div>
                  <button 
                    onClick={() => {
                      const newVal = !isNsfw;
                      setIsNsfw(newVal);
                      localStorage.setItem('is_nsfw', String(newVal));
                    }}
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative",
                      isNsfw ? "bg-cyan-500" : "bg-slate-700"
                    )}
                  >
                    <motion.div 
                      animate={{ x: isNsfw ? 24 : 4 }}
                      className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-md"
                    />
                  </button>
                </div>
                {isNsfw && (
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex gap-3 items-start">
                    <ShieldAlert className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-yellow-200/70 leading-relaxed">
                      Lưu ý: Chế độ NSFW có thể khiến AI từ chối tạo nội dung nếu vi phạm chính sách an toàn của Google. Nếu gặp lỗi, hãy thử tắt chế độ này.
                    </p>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setShowSettings(false)}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-colors"
              >
                Lưu và đóng
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>);
}
