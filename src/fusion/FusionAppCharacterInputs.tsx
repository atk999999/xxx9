import { AnimatePresence, motion } from "framer-motion";
import {
  Loader2,
  MessageSquare,
  Plus,
  Shield,
  Sparkles,
  Star,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { getEnergyTypeInfo } from "../components/PokemonCard";
import { CHARACTER_DATA } from "./characterCatalog";
import { getEntityPowerInfo } from "./characterPower";
import { CharacterSelector } from "./CharacterSelector";
import { cn } from "./presentation";
import type { useFusionAppController } from "./useFusionAppController";

type Props = Pick<
  ReturnType<typeof useFusionAppController>,
  | "upgradeFusion"
  | "setUpgradeFusion"
  | "selectedChars"
  | "fusions"
  | "updateCharacter"
  | "isNsfw"
  | "removeCharacter"
  | "addCharacter"
  | "startFusion"
  | "isFusing"
  | "DAILY_QUOTA_LIMIT"
  | "quotaUsed"
>;

export function FusionAppCharacterInputs({
  upgradeFusion,
  setUpgradeFusion,
  selectedChars,
  fusions,
  updateCharacter,
  isNsfw,
  removeCharacter,
  addCharacter,
  startFusion,
  isFusing,
  DAILY_QUOTA_LIMIT,
  quotaUsed,
}: Props) {
  return (<section className="space-y-6 sm:space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Cấu Hình Dung Hợp</h2>
                  <p className="text-slate-400 text-sm sm:text-base">Chọn các nhân vật huyền thoại để tạo ra thực thể mới.</p>
                </div>

              <div className="space-y-3 sm:space-y-4">
                {upgradeFusion && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/50 rounded-2xl relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-2">
                      <div className="text-[8px] font-black bg-cyan-500 text-white px-2 py-0.5 rounded-full uppercase tracking-widest animate-pulse">Đang Nâng Cấp</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <img src={upgradeFusion.imageUrl} className="w-16 h-16 rounded-xl object-cover border border-cyan-500/30" referrerPolicy="no-referrer" />
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase font-bold text-cyan-400 mb-0.5">Thực thể gốc</div>
                        <div className="font-black text-white text-lg truncate tracking-tighter italic uppercase">{upgradeFusion.name}</div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                          <span>{upgradeFusion.powerLevel.toLocaleString()} BP</span>
                          <span className="w-1 h-1 rounded-full bg-slate-700" />
                          <span>Rank {upgradeFusion.rank}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setUpgradeFusion(null)}
                      className="absolute bottom-2 right-2 p-1.5 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                      title="Hủy nâng cấp"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                <AnimatePresence mode="wait">
                  {selectedChars.map((char, charIdx) => {
                    const info = getEntityPowerInfo(char, fusions);
                    const energy = getEnergyTypeInfo(info.rank);
                    const EnergyIcon = energy.icon;
                    return (
                      <motion.div 
                        key={char.id}
                        layout
                        initial={{ opacity: 0, x: -20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, x: 20 }}
                        className="p-3.5 sm:p-4 bg-slate-900/80 border-2 border-amber-400/30 hover:border-amber-400/60 rounded-2xl relative group shadow-lg transition-all"
                      >
                        {/* Pokemon Card Mini Top Bar */}
                        <div className="flex items-center justify-between gap-2 pb-2 mb-2.5 border-b border-slate-800">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] uppercase font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 flex items-center gap-1 shadow-sm">
                              <Star className="w-2.5 h-2.5 fill-current" />
                              THẺ THÀNH PHẦN #{charIdx + 1}
                            </span>
                            <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded border text-xs", energy.badgeBg)}>
                              Hệ {energy.name}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 font-mono text-[10px] text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-800/50">
                            <span>{info.formattedPower}</span>
                            <div className={cn("w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px]", energy.badgeBg)}>
                              <EnergyIcon className="w-2 h-2" />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                          <div className="space-y-1">
                            <label className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-slate-400">Tên Nhân Vật / Vật Phẩm</label>
                            <CharacterSelector 
                              value={char.fusionId ? `FUSION:${char.fusionId}` : char.name}
                              onChange={(val) => {
                                const idx = selectedChars.findIndex(c => c.id === char.id);
                                updateCharacter(idx, 'name', val);
                              }}
                              fusions={fusions}
                              upgradeFusion={upgradeFusion}
                              isNsfw={isNsfw}
                            />
                          </div>

                        <div className="space-y-1">
                          <label className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-slate-500">Thời Kỳ</label>
                          <select 
                            value={char.era}
                            disabled={!!char.fusionId}
                            onChange={(e) => {
                              const idx = selectedChars.findIndex(c => c.id === char.id);
                              updateCharacter(idx, 'era', e.target.value);
                            }}
                            className="w-full max-w-full bg-slate-800 border-none rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-cyan-500 py-1.5 sm:py-2"
                          >
                            {char.fusionId ? (
                              <option value={char.era}>{char.era}</option>
                            ) : (
                              CHARACTER_DATA[char.name].eras.map(e => <option key={e} value={e}>{e}</option>)
                            )}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-slate-500">Trạng Thái</label>
                          <select 
                            value={char.state}
                            disabled={!!char.fusionId}
                            onChange={(e) => {
                              const idx = selectedChars.findIndex(c => c.id === char.id);
                              updateCharacter(idx, 'state', e.target.value);
                            }}
                            className="w-full max-w-full bg-slate-800 border-none rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-cyan-500 py-1.5 sm:py-2"
                          >
                            {char.fusionId ? (
                              <option value={char.state}>{char.state}</option>
                            ) : (
                              CHARACTER_DATA[char.name].states[char.era]?.map(s => <option key={s} value={s}>{s}</option>)
                            )}
                          </select>
                        </div>
                      </div>

                      {char.name === "Dragon Ball Super" && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 space-y-1"
                        >
                          <label className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-yellow-500 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Nhập điều ước của bạn
                          </label>
                          <div className="relative">
                            <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input 
                              type="text"
                              placeholder="Ví dụ: Ước có thân thể bất tử..."
                              value={char.wish || ""}
                              onChange={(e) => {
                                const idx = selectedChars.findIndex(c => c.id === char.id);
                                updateCharacter(idx, 'wish', e.target.value);
                              }}
                              className="w-full bg-slate-800 border-none rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-yellow-500 py-2 pl-10 pr-4 text-yellow-100 placeholder:text-slate-600"
                            />
                          </div>
                        </motion.div>
                      )}
                      {selectedChars.length > 1 && (
                        <button 
                          onClick={() => removeCharacter(char.id)}
                          className="absolute -top-1.5 -right-1.5 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all shadow-lg z-10 flex items-center justify-center"
                          title="Xóa nhân vật"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>


                {selectedChars.length < 6 && (
                  <button 
                    onClick={addCharacter}
                    className="w-full py-2.5 sm:py-3 border-2 border-dashed border-slate-800 rounded-xl sm:rounded-2xl text-slate-500 hover:text-cyan-400 hover:border-cyan-500/50 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Thêm nhân vật
                  </button>
                )}
              </div>

              <button 
                onClick={startFusion}
                disabled={isFusing}
                className={cn(
                  "w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-3 shadow-2xl",
                  isFusing 
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                    : selectedChars.length === 1 && !upgradeFusion
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/20"
                      : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-500/20"
                )}
              >
                {isFusing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    {selectedChars.length === 1 && !upgradeFusion ? "Đang Triệu Hồi..." : "Đang Dung Hợp..."}
                  </>
                ) : (
                  <>
                    {selectedChars.length === 1 && !upgradeFusion ? <Sparkles className="w-6 h-6 fill-current" /> : <Zap className="w-6 h-6 fill-current" />}
                    {selectedChars.length === 1 && !upgradeFusion ? "TRIỆU HỒI BẢN GỐC" : "BẮT ĐẦU DUNG HỢP"}
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-bold text-slate-600">
                <Shield className="w-3 h-3" />
                <span>Còn lại {DAILY_QUOTA_LIMIT - quotaUsed} lượt dung hợp trong hôm nay</span>
              </div>
            </section>);
}
