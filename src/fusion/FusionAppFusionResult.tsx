import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Cpu,
  Dna,
  Eye,
  Flame,
  FlaskConical,
  Ghost,
  Image as ImageIcon,
  Loader2,
  Plus,
  Shield,
  Skull,
  Sparkles,
  Star,
  Trophy,
  User,
  Zap,
} from "lucide-react";
import Markdown from "react-markdown";
import { missingPortrait } from "../../shared/cardImage";
import { PokemonCard } from "../components/PokemonCard";
import {
  cn,
  formatBP,
  formatLevel,
  getRankBg,
  getRankColor,
  normalizeRankName,
} from "./presentation";
import type { useFusionAppController } from "./useFusionAppController";

type Props = Pick<
  ReturnType<typeof useFusionAppController>,
  | "isFusing"
  | "fusionStep"
  | "currentFusion"
  | "setLabViewPokemonCard"
  | "labViewPokemonCard"
  | "retryingImage"
  | "retryCardImage"
  | "setInspectedFusion"
  | "setCompareChar1"
  | "setMode"
  | "setUpgradeFusion"
  | "setSelectedChars"
  | "compareChar1"
  | "compareChar2"
  | "setView"
  | "setCurrentFusion"
>;

export function FusionAppFusionResult({
  isFusing,
  fusionStep,
  currentFusion,
  setLabViewPokemonCard,
  labViewPokemonCard,
  retryingImage,
  retryCardImage,
  setInspectedFusion,
  setCompareChar1,
  setMode,
  setUpgradeFusion,
  setSelectedChars,
  compareChar1,
  compareChar2,
  setView,
  setCurrentFusion,
}: Props) {
  return (<section className="relative min-h-[600px]">
              <AnimatePresence mode="wait">
                {isFusing ? (
                  <motion.div 
                    key="fusing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center space-y-8 bg-slate-900/20 backdrop-blur-sm rounded-3xl border border-slate-800"
                  >
                    <div className="relative">
                      <div className="w-32 h-32 border-4 border-cyan-500/20 rounded-full animate-ping" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold text-white animate-pulse">{fusionStep}</h3>
                      <p className="text-slate-500 text-sm">Quá trình này có thể mất vài giây...</p>
                    </div>
                  </motion.div>
                ) : currentFusion ? (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* View Switcher Header */}
                    <div className="flex items-center justify-between p-3 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-lg">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="text-xs uppercase font-black text-white">Thực Thể Dung Hợp Mới</span>
                      </div>
                      <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                        <button
                          type="button"
                          onClick={() => setLabViewPokemonCard(true)}
                          className={cn(
                            "px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer",
                            labViewPokemonCard ? "bg-amber-400 text-slate-950 font-black shadow-md" : "text-slate-400 hover:text-white"
                          )}
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>Thẻ Bài Pokemon</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setLabViewPokemonCard(false)}
                          className={cn(
                            "px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer",
                            !labViewPokemonCard ? "bg-cyan-600 text-white font-bold shadow-md" : "text-slate-400 hover:text-white"
                          )}
                        >
                          <Activity className="w-3.5 h-3.5" />
                          <span>Báo Cáo Lab</span>
                        </button>
                      </div>
                    </div>

                      {(currentFusion.imageStatus==='failed'||currentFusion.imageUrl.includes('picsum.photos'))&&<div className="p-3 bg-amber-950 text-amber-200 rounded-lg text-sm">
                        <p>Tạo ảnh chưa thành công. Hồ sơ nhân vật đã được giữ lại.</p><p>{currentFusion.imageError||'Thẻ cũ đang dùng ảnh ngẫu nhiên thay thế.'}</p>
                        <button disabled={!!retryingImage} onClick={()=>retryCardImage(currentFusion)} className="p-2 bg-amber-800 rounded">{retryingImage===currentFusion.id?'Đang tạo ảnh…':'Tạo lại riêng ảnh'}</button>
                      </div>}

                    {labViewPokemonCard ? (
                      /* Pokemon Card Featured View */
                      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-5">
                        <div className="w-full max-w-[340px] mx-auto">
                          <PokemonCard
                            fusion={currentFusion}
                            onInspect={() => setInspectedFusion(currentFusion)}
                            onCompare={() => {
                              setCompareChar1({ id: crypto.randomUUID(), name: currentFusion.name, era: "Sổ Dung Hợp", state: `Rank ${currentFusion.rank}`, fusionId: currentFusion.id });
                              setMode('comparison');
                            }}
                            onUpgrade={() => {
                              setUpgradeFusion(currentFusion);
                              setSelectedChars([{ id: crypto.randomUUID(), name: "Pin Infinity", era: "Vật phẩm (Items)", state: "Nguồn năng lượng vô hạn" }]);
                              setMode('fusion');
                            }}
                            isSelectedForCompare={compareChar1.fusionId === currentFusion.id || compareChar2.fusionId === currentFusion.id}
                            interactive={true}
                          />
                        </div>

                        {currentFusion.power_comparison && (
                          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-center gap-3">
                            <Trophy className="w-5 h-5 text-yellow-500 shrink-0" />
                            <div className="text-xs text-yellow-200 font-medium">
                              <span className="font-bold uppercase text-[9px] text-yellow-500 block">So Sánh Sức Mạnh</span>
                              {currentFusion.power_comparison}
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                            <span className="text-[9px] uppercase font-bold text-slate-500 block">Độ Tương Thích</span>
                            <div className="font-bold text-white text-sm">
                              {currentFusion.compatibility_score}% ({currentFusion.compatibility_status})
                            </div>
                          </div>
                          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                            <span className="text-[9px] uppercase font-bold text-slate-500 block">Hệ Thức Thẻ Bài</span>
                            <div className="font-bold text-amber-400 text-sm truncate">
                              {normalizeRankName(currentFusion.rank)}
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={() => setInspectedFusion(currentFusion)}
                            className="flex-1 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-400/20"
                          >
                            <Eye className="w-4 h-4" />
                            Phóng To & Xem Lật 3D
                          </button>
                          <button
                            onClick={() => {
                              setUpgradeFusion(currentFusion);
                              setSelectedChars([{ id: crypto.randomUUID(), name: "Pin Infinity", era: "Vật phẩm (Items)", state: "Nguồn năng lượng vô hạn" }]);
                              setView('lab');
                            }}
                            className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
                          >
                            <Plus className="w-4 h-4" />
                            NÂNG CẤP VỚI ITEM
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Original Detailed Lab Report */
                      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">

                    <div className="aspect-square sm:aspect-video relative bg-slate-950 max-h-[400px] sm:max-h-none overflow-hidden">
                      {currentFusion.imageUrl ? (
                        <img 
                          src={currentFusion.imageUrl} 
                          alt={currentFusion.name}
                          className="w-full h-full object-cover object-top"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).onerror = null;
                            (e.target as HTMLImageElement).src = missingPortrait;
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-700">
                          <ImageIcon className="w-12 h-12" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2 flex-wrap">
                        <div className="px-2.5 py-1 sm:px-3 sm:py-1 bg-cyan-600 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-full">
                          THỰC THỂ MỚI
                        </div>
                        {currentFusion.baseCharacters.some(c => c.name === "Pin Infinity") && (
                          <div className="px-2.5 py-1 sm:px-3 sm:py-1 bg-yellow-600 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1 shadow-lg shadow-yellow-500/20">
                            <Zap className="w-2 h-2 sm:w-3 sm:h-3 fill-current" />
                            NĂNG LƯỢNG VÔ HẠN
                          </div>
                        )}
                        {currentFusion.baseCharacters.some(c => c.name === "DNA Saiyan") && (
                          <div className="px-2.5 py-1 sm:px-3 sm:py-1 bg-red-600 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1 shadow-lg shadow-red-500/20">
                            <Dna className="w-2 h-2 sm:w-3 sm:h-3" />
                            GEN SAIYAN
                          </div>
                        )}
                        {currentFusion.baseCharacters.some(c => c.name === "DNA Hakai") && (
                          <div className="px-2.5 py-1 sm:px-3 sm:py-1 bg-purple-600 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1 shadow-lg shadow-purple-500/20">
                            <Flame className="w-2 h-2 sm:w-3 sm:h-3 fill-current" />
                            SỨC MẠNH HỦY DIỆT
                          </div>
                        )}
                        {currentFusion.baseCharacters.some(c => c.name === "DNA Thiên sứ") && (
                          <div className="px-2.5 py-1 sm:px-3 sm:py-1 bg-blue-400 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1 shadow-lg shadow-blue-400/20">
                            <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 fill-current" />
                            QUYỀN NĂNG THIÊN SỨ
                          </div>
                        )}
                        {currentFusion.baseCharacters.some(c => c.name === "DNA Kaioshin") && (
                          <div className="px-2.5 py-1 sm:px-3 sm:py-1 bg-emerald-600 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1 shadow-lg shadow-emerald-500/20">
                            <Shield className="w-2 h-2 sm:w-3 sm:h-3" />
                            LINH HỒN KAIOSHIN
                          </div>
                        )}
                        {currentFusion.baseCharacters.some(c => c.name === "Người Phàm") && (
                          <div className="px-2.5 py-1 sm:px-3 sm:py-1 bg-slate-600 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1 shadow-lg shadow-slate-500/20">
                            <User className="w-2 h-2 sm:w-3 sm:h-3" />
                            Ý CHÍ NGƯỜI PHÀM
                          </div>
                        )}
                        {currentFusion.baseCharacters.some(c => c.name === "Linh hồn") && (
                          <div className="px-2.5 py-1 sm:px-3 sm:py-1 bg-indigo-600 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1 shadow-lg shadow-indigo-500/20">
                            <Ghost className="w-2 h-2 sm:w-3 sm:h-3" />
                            LINH HỒN THỨC TỈNH
                          </div>
                        )}
                        {currentFusion.baseCharacters.some(c => c.name === "Dơi hút máu") && (
                          <div className="px-2.5 py-1 sm:px-3 sm:py-1 bg-red-950 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1 shadow-lg shadow-red-900/40 border border-red-500/30">
                            <Skull className="w-2 h-2 sm:w-3 sm:h-3" />
                            CẠN MÁU (DEBUFF)
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
                      <div className="space-y-1.5 sm:space-y-2 min-w-0 w-full">
                        <h3 className="text-xl sm:text-3xl font-black tracking-tighter text-white uppercase italic break-all leading-tight w-full">
                          {currentFusion.name}
                        </h3>
                        <p className="text-cyan-400 font-medium italic text-xs sm:text-base break-words">"{currentFusion.quote}"</p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 p-3 sm:p-6 bg-slate-900/80 border border-cyan-500/20 rounded-xl sm:rounded-3xl relative overflow-hidden group w-full min-w-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-10 h-10 sm:w-16 sm:h-16 bg-cyan-500/10 rounded-lg sm:rounded-2xl flex items-center justify-center text-cyan-400 relative z-10 shrink-0">
                          <Zap className="w-5 h-5 sm:w-8 sm:h-8 fill-current" />
                        </div>
                        <div className="flex-1 text-center sm:text-left relative z-10 min-w-0 w-full flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-8 overflow-hidden">
                          <div className="flex-1 min-w-0 overflow-hidden">
                            <div className="text-[7px] sm:text-[10px] uppercase tracking-[0.3em] font-black text-cyan-500/60 mb-1">Chỉ số sức mạnh</div>
                            <div 
                              title={currentFusion.powerLevel ? `${currentFusion.powerLevel.toLocaleString('vi-VN')} BP` : undefined}
                              className="text-lg sm:text-4xl font-black tracking-tighter text-white font-mono flex flex-wrap items-baseline gap-1 sm:gap-2 justify-center sm:justify-start break-all leading-none w-full overflow-hidden"
                            >
                              {currentFusion.rank.toUpperCase().includes('HỖN ĐỘN') || currentFusion.rank.toUpperCase().includes('CHAOS') ? (
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: Math.min(10, currentFusion.level) }).map((_, i) => (
                                    <span key={i} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">⭐</span>
                                  ))}
                                  {currentFusion.level > 10 && <span className="text-sm ml-1">x{currentFusion.level}</span>}
                                </div>
                              ) : (
                                formatBP(currentFusion.powerLevel, currentFusion.rank, currentFusion.level)
                              )}
                            </div>
                          </div>
                          <div className="shrink-0 border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-8 min-w-0 overflow-hidden">
                            <div className="text-[7px] sm:text-[10px] uppercase tracking-[0.3em] font-black text-yellow-500/60 mb-1">Cấp độ</div>
                            <div className="text-xl sm:text-4xl font-black tracking-tighter text-yellow-500 italic leading-none break-all">
                              {currentFusion.rank.toUpperCase().includes('HỖN ĐỘN') || currentFusion.rank.toUpperCase().includes('CHAOS') ? (
                                <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">⭐</span>
                              ) : (
                                formatLevel(currentFusion.level || 1, currentFusion.rank)
                              )}
                            </div>
                          </div>
                        </div>
                        <div className={cn(
                          "px-2 py-1 sm:px-6 sm:py-3 border rounded-lg sm:rounded-2xl font-black italic text-xs sm:text-2xl relative z-10 shrink-0 shadow-xl break-all text-center",
                          getRankColor(currentFusion.rank),
                          getRankBg(currentFusion.rank)
                        )}>
                          {normalizeRankName(currentFusion.rank)}
                        </div>
                      </div>

                      <div className={cn(
                        "p-3 sm:p-4 border rounded-xl sm:rounded-2xl flex items-center gap-3 sm:gap-4 shadow-lg",
                        currentFusion.compatibility_score >= 80 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-emerald-500/5" :
                        currentFusion.compatibility_score >= 40 ? "bg-amber-500/10 border-amber-500/20 text-amber-400 shadow-amber-500/5" :
                        "bg-red-500/10 border-red-500/20 text-red-400 shadow-red-500/5"
                      )}>
                        <div className={cn(
                          "w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0",
                          currentFusion.compatibility_score >= 80 ? "bg-emerald-500/20 text-emerald-500" :
                          currentFusion.compatibility_score >= 40 ? "bg-amber-500/20 text-amber-500" :
                          "bg-red-500/20 text-red-500"
                        )}>
                          <Activity className="w-4 h-4 sm:w-6 sm:h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={cn(
                            "text-[7px] sm:text-[10px] uppercase tracking-[0.2em] font-black mb-0.5 sm:mb-1",
                            currentFusion.compatibility_score >= 80 ? "text-emerald-500/60" :
                            currentFusion.compatibility_score >= 40 ? "text-amber-500/60" :
                            "text-red-500/60"
                          )}>Độ tương thích linh hồn & DNA</div>
                          <div className="text-xs sm:text-lg font-bold italic leading-tight break-words">
                            {currentFusion.compatibility_score}% - Trạng thái: {currentFusion.compatibility_status}
                          </div>
                        </div>
                      </div>

                      {currentFusion.power_comparison && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 sm:p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl sm:rounded-2xl flex items-center gap-3 sm:gap-4 shadow-lg shadow-yellow-500/5"
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-500 shrink-0">
                            <Trophy className="w-4 h-4 sm:w-6 sm:h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[7px] sm:text-[10px] uppercase tracking-[0.2em] font-black text-yellow-500/60 mb-0.5 sm:mb-1">So sánh sức mạnh</div>
                            <div className="text-xs sm:text-lg font-bold text-white italic leading-tight break-words">
                              {currentFusion.power_comparison}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div className="prose prose-invert prose-sm max-w-none text-slate-300 break-words overflow-hidden">
                        <Markdown>{currentFusion.description}</Markdown>
                      </div>

                      {currentFusion.baseCharacters.some(c => c.name === "Virus Zombie") && currentFusion.zombie_compatibility !== undefined && (
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-red-900/30">
                          <div className="p-4 bg-red-950/20 border border-red-500/20 rounded-2xl space-y-1">
                            <div className="text-[10px] uppercase font-black text-red-500 flex items-center gap-2">
                              <Dna className="w-3 h-3" />
                              Độ tương thích Zombie
                            </div>
                            <div className="text-2xl font-black text-white font-mono">
                              {currentFusion.zombie_compatibility}%
                            </div>
                          </div>
                          <div className="p-4 bg-red-950/20 border border-red-500/20 rounded-2xl space-y-1">
                            <div className="text-[10px] uppercase font-black text-red-500 flex items-center gap-2">
                              <Zap className="w-3 h-3" />
                              Hệ số cường hóa
                            </div>
                            <div className="text-2xl font-black text-white font-mono">
                              x{currentFusion.zombie_multiplier?.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      )}

                      {currentFusion.dna_components && currentFusion.dna_components.length > 0 && (
                        <div className="space-y-3 pt-4 border-t border-slate-800">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-xs">
                            <Activity className="w-4 h-4" />
                            Phân tích DNA Chi tiết
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {currentFusion.dna_components.map((comp, idx) => (
                              <div key={idx} className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/50 flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-[10px] font-bold text-white truncate uppercase tracking-tighter">{comp.race}</span>
                                  <span className="text-[10px] font-mono text-emerald-400 font-bold">{comp.percentage}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${comp.percentage}%` }}
                                    transition={{ duration: 1, delay: idx * 0.1 }}
                                    className={cn("h-full rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)]", comp.color || "bg-emerald-500")}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {currentFusion.dna_analysis && (
                        <div className="space-y-3 pt-4 border-t border-slate-800">
                          <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider text-xs">
                            <Dna className="w-4 h-4" />
                            Phân tích DNA & Sinh học
                          </div>
                          <div className="prose prose-invert prose-sm max-w-none text-slate-400 bg-slate-950/50 p-4 rounded-xl border border-slate-800/50 break-words overflow-hidden">
                            <Markdown>{currentFusion.dna_analysis}</Markdown>
                          </div>
                        </div>
                      )}

                      {currentFusion.fusion_logic && (
                        <div className="space-y-3 pt-4 border-t border-slate-800">
                          <div className="flex items-center gap-2 text-purple-400 font-bold uppercase tracking-wider text-xs">
                            <Cpu className="w-4 h-4" />
                            Logic Dung Hợp & Tương Thích
                          </div>
                          <div className="prose prose-invert prose-sm max-w-none text-slate-400 bg-slate-950/50 p-4 rounded-xl border border-slate-800/50 break-words overflow-hidden">
                            <Markdown>{currentFusion.fusion_logic}</Markdown>
                          </div>
                        </div>
                      )}

                      <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-4">
                        <button 
                          onClick={() => {
                            setUpgradeFusion(currentFusion);
                            setSelectedChars([{ id: crypto.randomUUID(), name: "Pin Infinity", era: "Vật phẩm (Items)", state: "Nguồn năng lượng vô hạn" }]);
                            setView('lab');
                          }}
                          className="flex-1 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                        >
                          <Plus className="w-5 h-5" />
                          NÂNG CẤP VỚI ITEM
                        </button>
                        <button 
                          onClick={() => {
                            setCurrentFusion(null);
                            setUpgradeFusion(null);
                            setSelectedChars([
                              { id: crypto.randomUUID(), name: "Goku", era: "Dragon Ball Z (Frieza Saga)", state: "Base" },
                              { id: crypto.randomUUID(), name: "Vegeta", era: "Dragon Ball Z (Frieza Saga)", state: "Base" }
                            ]);
                          }}
                          className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                          <FlaskConical className="w-5 h-5" />
                          DUNG HỢP MỚI
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>


                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-800 rounded-2xl sm:rounded-3xl p-6 text-center">
                    <FlaskConical className="w-12 h-12 sm:w-16 sm:h-16 mb-4 opacity-20" />
                    <p className="text-base sm:text-lg font-medium">Sẵn sàng thí nghiệm</p>
                    <p className="text-xs sm:text-sm">Kết quả dung hợp sẽ xuất hiện tại đây</p>
                  </div>
                )}
              </AnimatePresence>
            </section>);
}
