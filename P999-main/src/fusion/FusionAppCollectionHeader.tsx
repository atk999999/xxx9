import { Download, Star, Trash2, Upload } from "lucide-react";
import type { useFusionAppController } from "./useFusionAppController";

type Props = Pick<
  ReturnType<typeof useFusionAppController>,
  "exportBackup" | "fusions" | "importBackup" | "setFusions"
>;

export function FusionAppCollectionHeader({
  exportBackup,
  fusions,
  importBackup,
  setFusions,
}: Props) {
  return (<div className="relative overflow-hidden rounded-3xl border-2 border-amber-400/50 bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/50 p-6 sm:p-8 shadow-2xl">
              {/* Background Glow & Pokemon Card Foil Aura */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-full shadow-md flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      POKÉMON DBZ TCG BINDER
                    </span>
                    <span className="px-3 py-1 bg-slate-800/80 border border-slate-700 text-cyan-300 text-[10px] font-mono font-bold rounded-full">
                      Album Thẻ Bài Sưu Tập
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white drop-shadow-sm">
                    Sổ Dung Hợp Thẻ Bài
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                    Khám phá và tra cứu toàn bộ các thực thể dung hợp dưới dạng thẻ bài Pokémon TCG. Hỗ trợ xoay lật 3D, kiểm tra chiêu thức và đối chiếu lực chiến tuyệt đối.
                  </p>
                </div>

                {/* Binder Action Buttons */}
                <div className="flex items-center gap-2.5 flex-wrap shrink-0">
                  <button 
                    onClick={exportBackup}
                    className="px-3.5 py-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl transition-all flex items-center gap-2 text-xs font-bold shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                    title="Sao lưu toàn bộ bộ bài của bạn"
                  >
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span>Sao lưu ({fusions.length})</span>
                  </button>

                  <label className="px-3.5 py-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl transition-all flex items-center gap-2 text-xs font-bold shadow-md hover:scale-105 active:scale-95 cursor-pointer">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>Khôi phục</span>
                    <input type="file" className="hidden" accept=".json" onChange={importBackup} />
                  </label>

                  {fusions.length > 0 && (
                    <button 
                      onClick={() => {
                        if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ bộ sưu tập thẻ bài?")) {
                          setFusions([]);
                          localStorage.setItem('fusion_history', JSON.stringify([]));
                        }
                      }}
                      className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                      title="Xóa tất cả thẻ bài"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Xóa hết</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Collector Stats Row */}
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-slate-800/80 text-xs">
                <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Tổng Số Thẻ</span>
                  <div className="text-xl font-black font-mono text-amber-400 flex items-center gap-1.5">
                    <span>{fusions.length}</span>
                    <span className="text-xs text-slate-500 font-normal">lá bài</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Thẻ Hỗn Độn / Tối Thượng</span>
                  <div className="text-xl font-black font-mono text-purple-300 flex items-center gap-1.5">
                    <span>
                      {fusions.filter(f => (f.rank || '').toUpperCase().includes('HỖN ĐỘN') || (f.rank || '').toUpperCase().includes('KHỞI NGUYÊN') || (f.rank || '').toUpperCase().includes('ZENO')).length}
                    </span>
                    <span className="text-xs text-purple-400 font-normal">Apex</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Thẻ Thiên Sứ & Thần</span>
                  <div className="text-xl font-black font-mono text-cyan-300 flex items-center gap-1.5">
                    <span>
                      {fusions.filter(f => (f.rank || '').toUpperCase().includes('THIÊN SỨ') || (f.rank || '').toUpperCase().includes('HỦY DIỆT') || (f.rank || '').toUpperCase().includes('VÔ CỰC')).length}
                    </span>
                    <span className="text-xs text-cyan-400 font-normal">Holo</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Độ Tương Thích TB</span>
                  <div className="text-xl font-black font-mono text-emerald-400 flex items-center gap-1.5">
                    <span>
                      {fusions.length > 0 
                        ? Math.round(fusions.reduce((acc, f) => acc + (f.compatibility_score || 0), 0) / fusions.length) 
                        : 0}%
                    </span>
                    <span className="text-xs text-emerald-500 font-normal">ổn định</span>
                  </div>
                </div>
              </div>
            </div>);
}
