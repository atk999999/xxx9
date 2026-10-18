import { NSFWFocus } from "../../types";
import type { useGameUIController } from "./useGameUIController";

type Props = Pick<
  ReturnType<typeof useGameUIController>,
  | "setShowGameConfig"
  | "session"
  | "updateMechanics"
  | "setForce1200"
  | "force1200"
  | "onUpdateSession"
  | "toggleNsfwFocus"
>;

export function GameUIConfigDialog({
  setShowGameConfig,
  session,
  updateMechanics,
  setForce1200,
  force1200,
  onUpdateSession,
  toggleNsfwFocus,
}: Props) {
  return (<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
              {/* ... (Existing Game Config Content) ... */}
              <div className="bg-ink-900 border border-gold-500/30 rounded-xl w-full max-w-lg shadow-2xl p-6 relative overflow-hidden">
                  <button onClick={() => setShowGameConfig(false)} className="absolute top-4 right-4 text-ink-500 hover:text-white"><i className="fas fa-times"></i></button>
                  <h3 className="text-xl font-display font-bold text-gold-400 mb-6 flex items-center gap-2">
                      <i className="fas fa-cogs"></i> Cấu Hình Trò Chơi
                  </h3>
                  
                  <div className="space-y-6 overflow-y-auto max-h-[70vh] pr-2 scrollbar-thin scrollbar-thumb-ink-700">
                      {/* GAMEPLAY SETTINGS */}
                      <div className="bg-ink-950/50 p-4 rounded-lg border border-ink-800 space-y-4">
                          <h4 className="text-xs font-bold text-ink-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-2">Hệ Thống</h4>
                          
                          {/* Living World Toggle */}
                          <div className="flex justify-between items-start">
                              <div>
                                  <h4 className="text-sm font-bold text-parchment-200 flex items-center gap-2">
                                      <i className="fas fa-globe-americas text-arcane-400"></i> Thông Tin Thế Giới
                                  </h4>
                                  <p className="text-[10px] text-ink-500 mt-1">
                                      {session.mechanics?.livingWorld 
                                        ? "Đang Bật: Hệ thống sẽ tự động tạo sự kiện ngẫu nhiên cho các phe phái (Living World)." 
                                        : "Đang Tắt: Chỉ tập trung vào nhân vật chính, không mô phỏng thế giới nền."}
                                  </p>
                              </div>
                              <button
                                 onClick={() => updateMechanics('livingWorld', !(session.mechanics?.livingWorld))}
                                 className={`w-12 h-6 rounded-full relative transition-colors border ${session.mechanics?.livingWorld ? 'bg-arcane-600 border-arcane-400' : 'bg-ink-900 border-ink-600'}`}
                              >
                                 <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-md ${session.mechanics?.livingWorld ? 'translate-x-7' : 'translate-x-1'}`}></div>
                              </button>
                          </div>

                          {/* Fixed Length 1200+ Toggle */}
                          <div className="flex justify-between items-start pt-2 border-t border-white/5">
                              <div>
                                  <h4 className="text-sm font-bold text-parchment-200 flex items-center gap-2">
                                      <i className="fas fa-file-alt text-spirit-400"></i> Cố định 1200 từ (Epic Mode)
                                  </h4>
                                  <p className="text-[10px] text-ink-500 mt-1">
                                      Luôn yêu cầu AI viết ít nhất 1200 chữ mỗi lượt (Bỏ qua chế độ Ngắn/Vừa).
                                  </p>
                              </div>
                              <button
                                 onClick={() => setForce1200(!force1200)}
                                 className={`w-12 h-6 rounded-full relative transition-colors border ${force1200 ? 'bg-spirit-600 border-spirit-400' : 'bg-ink-900 border-ink-600'}`}
                              >
                                 <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-md ${force1200 ? 'translate-x-7' : 'translate-x-1'}`}></div>
                              </button>
                          </div>
                      </div>

                      {/* CHỌN MÔ HÌNH AI */}
                      <div className="bg-ink-950/50 p-4 rounded-lg border border-ink-800 space-y-3">
                          <h4 className="text-xs font-bold text-ink-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-2">Mô Hình AI</h4>
                          <div className="grid grid-cols-2 gap-2">
                              {[
                                  { id: 'gemini-3.8-flash', label: 'Flash 3.8', sub: 'Thông Minh Nhất', icon: 'fa-brain', color: 'text-purple-400' },
                                  { id: 'gemini-3.6-flash', label: 'Flash 3.6', sub: 'Chuẩn Xác & Mượt', icon: 'fa-bolt', color: 'text-yellow-400' },
                                  { id: 'gemini-3.5-flash', label: 'Flash 3.5', sub: 'Cân Bằng Tối Ưu', icon: 'fa-fire', color: 'text-orange-400' },
                                  { id: 'gemini-3.1-flash-lite', label: 'Flash Lite 3.1', sub: 'Siêu Tốc Độ', icon: 'fa-feather', color: 'text-blue-400' },
                              ].map((m) => (
                                  <button
                                      key={m.id}
                                      onClick={() => onUpdateSession('aiModel', m.id)}
                                      className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-lg border transition-all ${
                                          (session.aiModel || 'gemini-3.8-flash') === m.id
                                          ? 'bg-ink-800 border-gold-500/50 shadow-sm'
                                          : 'bg-ink-900 border-ink-700 hover:border-ink-500'
                                      }`}
                                  >
                                      <i className={`fas ${m.icon} ${m.color} text-sm mb-1`}></i>
                                      <span className={`text-[10px] font-bold ${(session.aiModel || 'gemini-3.8-flash') === m.id ? 'text-parchment-100' : 'text-ink-500'}`}>{m.label}</span>
                                      <span className="text-[8px] text-ink-600">{m.sub}</span>
                                  </button>
                              ))}
                          </div>
                          <p className="text-[9px] text-ink-600 italic mt-1">* Lưu ý: Flash 3.8 thông minh nhất; Flash 3.1 & 3.5 phản hồi nhanh và tiết kiệm token.</p>
                      </div>

                      {/* SUPER MEMORY SECTION */}
                      <div className="bg-ink-950/50 p-4 rounded-lg border border-ink-800">
                          <div className="flex justify-between items-start mb-2">
                              <div>
                                  <h4 className="text-sm font-bold text-parchment-200 flex items-center gap-2">
                                      <i className="fas fa-brain text-jade-400"></i> Siêu Trí Nhớ (Super Memory)
                                  </h4>
                                  <p className="text-[10px] text-ink-500 mt-1">
                                      {session.memoryDepth === 'high' 
                                          ? "Đang Bật: AI quét toàn bộ lịch sử để nhớ lại chi tiết cũ (Tốn token hơn)." 
                                          : "Đang Tắt: AI chỉ nhớ ngữ cảnh gần đây (Tốc độ nhanh hơn)."}
                                  </p>
                              </div>
                              <button
                                 onClick={() => onUpdateSession('memoryDepth', session.memoryDepth === 'high' ? 'standard' : 'high')}
                                 className={`w-12 h-6 rounded-full relative transition-colors border ${session.memoryDepth === 'high' ? 'bg-jade-600 border-jade-400' : 'bg-ink-900 border-ink-600'}`}
                              >
                                 <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-md ${session.memoryDepth === 'high' ? 'translate-x-7' : 'translate-x-1'}`}></div>
                              </button>
                          </div>
                      </div>

                      {/* NSFW SETTINGS SECTION */}
                      <div className={`bg-ink-950/50 p-4 rounded-lg border transition-colors ${session.isNSFW ? 'border-crimson-500/30' : 'border-ink-800'}`}>
                          <div className="flex justify-between items-start mb-4">
                              <div>
                                  <h4 className="text-sm font-bold text-parchment-200 flex items-center gap-2">
                                      <i className="fas fa-exclamation-triangle text-crimson-400"></i> Chế độ NSFW (18+)
                                  </h4>
                                  <p className="text-[10px] text-ink-500 mt-1">Bật/Tắt nội dung người lớn.</p>
                              </div>
                              <button
                                 onClick={() => onUpdateSession('isNSFW', !session.isNSFW)}
                                 className={`w-12 h-6 rounded-full relative transition-colors border ${session.isNSFW ? 'bg-crimson-600 border-crimson-400' : 'bg-ink-900 border-ink-600'}`}
                              >
                                 <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-md ${session.isNSFW ? 'translate-x-7' : 'translate-x-1'}`}></div>
                              </button>
                          </div>

                          {session.isNSFW && (
                              <div className="space-y-4 pt-4 border-t border-white/5 animate-slide-up">
                                  {/* Intensity Toggle */}
                                  <div>
                                      <div className="text-[10px] font-bold text-ink-500 uppercase tracking-wide mb-2">Mức độ chi tiết</div>
                                      <div className="flex gap-2">
                                          <button 
                                              onClick={() => onUpdateSession('nsfwIntensity', 'soft')}
                                              className={`flex-1 py-2 rounded text-xs font-bold border transition-all ${session.nsfwIntensity === 'soft' ? 'bg-crimson-500/20 border-crimson-500 text-crimson-200' : 'bg-ink-900 border-ink-700 text-ink-500'}`}
                                          >
                                              Vừa Phải (Soft)
                                          </button>
                                          <button 
                                              onClick={() => onUpdateSession('nsfwIntensity', 'extreme')}
                                              className={`flex-1 py-2 rounded text-xs font-bold border transition-all ${session.nsfwIntensity === 'extreme' ? 'bg-crimson-600 border-crimson-400 text-white shadow-lg' : 'bg-ink-900 border-ink-700 text-ink-500'}`}
                                          >
                                              Cực Hạn (Extreme)
                                          </button>
                                      </div>
                                  </div>

                                  {/* Detailed Options (Only for Extreme) */}
                                  {session.nsfwIntensity === 'extreme' && (
                                      <div>
                                          <div className="text-[10px] font-bold text-ink-500 uppercase tracking-wide mb-2">Tùy chọn trọng tâm (Chọn nhiều)</div>
                                          <div className="grid grid-cols-2 gap-2">
                                              {[
                                                  { id: 'body', label: 'Miêu tả Cơ Thể', icon: 'fa-venus' },
                                                  { id: 'action', label: 'Hành Động Trần Trụi', icon: 'fa-hand-rock' },
                                                  { id: 'emotion', label: 'Cảm Xúc/Khoái Cảm', icon: 'fa-heart-pulse' },
                                                  { id: 'dialogue', label: 'Lời Thoại Dâm Tục', icon: 'fa-comments' },
                                                  { id: 'vulgar', label: 'Từ Ngữ Thô Tục', icon: 'fa-pepper-hot' },
                                                  { id: 'roleplay', label: 'Giữ Đúng Tính Cách', icon: 'fa-user-check' },
                                              ].map((opt) => (
                                                  <button
                                                      key={opt.id}
                                                      onClick={() => toggleNsfwFocus(opt.id as NSFWFocus)}
                                                      className={`
                                                          p-2 rounded border text-xs font-bold flex items-center gap-2 transition-all
                                                          ${(session.nsfwFocus || []).includes(opt.id as NSFWFocus)
                                                              ? 'bg-crimson-900/60 border-crimson-500 text-crimson-100 shadow-sm'
                                                              : 'bg-ink-900 border-ink-800 text-ink-500 hover:border-crimson-500/30'
                                                          }
                                                      `}
                                                  >
                                                      <i className={`fas ${opt.icon} w-4 text-center`}></i>
                                                      {opt.label}
                                                  </button>
                                              ))}
                                          </div>
                                          <div className="mt-2 text-[10px] text-ink-500 italic">
                                              *Lưu ý: Chọn "Giữ Đúng Tính Cách" để tránh AI biến nhân vật thành bạo dâm/tàn nhẫn vô lý.
                                          </div>
                                      </div>
                                  )}
                              </div>
                          )}
                      </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                      <button onClick={() => setShowGameConfig(false)} className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-ink-950 font-bold rounded shadow-lg text-sm">
                          Đóng & Áp Dụng
                      </button>
                  </div>
              </div>
          </div>);
}
