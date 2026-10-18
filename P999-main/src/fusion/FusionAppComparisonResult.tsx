import { motion } from "framer-motion";
import { Activity, Flame, Trophy, User, Zap } from "lucide-react";
import Markdown from "react-markdown";
import { getEntityPowerInfo } from "./characterPower";
import { calculatePowerComparisonMeta } from "./powerComparison";
import { cn, getRankColor, normalizeRankName } from "./presentation";
import type { useFusionAppController } from "./useFusionAppController";

type Props = Pick<
  ReturnType<typeof useFusionAppController>,
  "comparisonResult" | "compareChar1" | "compareChar2" | "fusions"
>;

export function FusionAppComparisonResult({
  comparisonResult,
  compareChar1,
  compareChar2,
  fusions,
}: Props) {
  return (<motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="p-6 sm:p-8 bg-slate-900/90 border border-slate-800 rounded-[2rem] backdrop-blur-xl relative overflow-hidden shadow-2xl">
                  {/* Winner Top Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-md shadow-yellow-500/20 flex items-center gap-1">
                          <Trophy className="w-3 h-3" /> Người Thắng Cuộc
                        </span>
                        {comparisonResult.powerRatio && (
                          <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold rounded-full">
                            {comparisonResult.powerRatio}
                          </span>
                        )}
                      </div>
                      <h3 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                        {comparisonResult.winner}
                      </h3>
                    </div>

                    {/* Relative Power Share Bar */}
                    {comparisonResult.winProbability && (
                      <div className="w-full sm:w-72 space-y-1.5 p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                        <div className="flex justify-between text-[10px] font-mono font-bold">
                          <span className="text-cyan-400 truncate max-w-[120px]">{compareChar1.name}: {comparisonResult.winProbability.char1}%</span>
                          <span className="text-red-400 truncate max-w-[120px]">{compareChar2.name}: {comparisonResult.winProbability.char2}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden flex">
                          <div className="h-full bg-cyan-500 transition-all duration-500" style={{ width: `${comparisonResult.winProbability.char1}%` }} />
                          <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${comparisonResult.winProbability.char2}%` }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Decisive Reason */}
                  <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
                    <p className="text-yellow-200 text-sm sm:text-base leading-relaxed italic font-medium">
                      "{comparisonResult.winnerReason}"
                    </p>
                  </div>

                  {/* 2-Column Power Analysis & Battle Scenario */}
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-8">
                    <div className="space-y-3 p-5 bg-slate-950/40 border border-slate-800/80 rounded-2xl">
                      <h4 className="text-sm font-bold flex items-center gap-2 text-cyan-400 uppercase tracking-wider">
                        <Activity className="w-4 h-4" /> Phân tích sức mạnh & Cấp bậc
                      </h4>
                      <div className="prose prose-invert prose-xs sm:prose-sm max-w-none text-slate-300 leading-relaxed">
                        <Markdown>{comparisonResult.powerAnalysis}</Markdown>
                      </div>
                    </div>
                    <div className="space-y-3 p-5 bg-slate-950/40 border border-slate-800/80 rounded-2xl">
                      <h4 className="text-sm font-bold flex items-center gap-2 text-red-400 uppercase tracking-wider">
                        <Flame className="w-4 h-4" /> Kịch bản đối đầu thực chiến
                      </h4>
                      <div className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                        {comparisonResult.battleScenario}
                      </div>
                    </div>
                  </div>

                  {/* Precision Power & Realm Comparative Matrix */}
                  {(() => {
                    const info1 = getEntityPowerInfo(compareChar1, fusions);
                    const info2 = getEntityPowerInfo(compareChar2, fusions);
                    const meta = calculatePowerComparisonMeta(info1, info2);
                    const isWinner1 = meta.winnerChar === 1;
                    const isWinner2 = meta.winnerChar === 2;
                    const isDraw = meta.winnerChar === 0;

                    return (
                      <div className="mt-8 space-y-5 pt-6 border-t border-slate-800">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-200 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-400 fill-current" /> 
                            Bảng Đối Chiếu Chỉ Số & Cảnh Giới Lực Chiến Chuẩn Xác
                          </h4>
                          <span className="text-[10px] uppercase font-bold text-slate-400 font-mono bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 w-fit">
                            BP = Level * 100
                          </span>
                        </div>

                        {/* Side-by-Side Precision Metric Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Entity 1 Card */}
                          <div className={cn(
                            "p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden space-y-3",
                            isWinner1 ? "bg-cyan-950/30 border-cyan-500/40 shadow-lg shadow-cyan-500/5 ring-1 ring-cyan-500/30" : "bg-slate-950/60 border-slate-800/80"
                          )}>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-cyan-400 flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5" /> {info1.name}
                              </span>
                              <span className={cn(
                                "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border shadow-sm",
                                isWinner1 ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/40" : isDraw ? "bg-slate-800 text-slate-300 border-slate-700" : "bg-slate-900 text-slate-400 border-slate-800"
                              )}>
                                {isWinner1 ? "🏆 Bên Thắng Cuộc" : isDraw ? "⚖️ Cân Bằng" : "Yếu Thế Hơn"}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/60 space-y-1">
                                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Cảnh Giới</span>
                                <div className={cn("text-xs font-black italic truncate", getRankColor(info1.rank))}>
                                  {normalizeRankName(info1.rank)}
                                </div>
                              </div>
                              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/60 space-y-1">
                                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Cấp Độ Thực Tế</span>
                                <div className="text-xs font-mono font-black text-white truncate">
                                  {info1.formattedLevel}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/60 space-y-1">
                                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Lực Chiến Tuyệt Đối</span>
                                <div className="text-xs font-mono font-black text-cyan-300 truncate">
                                  {info1.formattedPower}
                                </div>
                              </div>
                              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/60 space-y-1">
                                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Tỉ Lệ Thắng Dự Tính</span>
                                <div className="text-xs font-mono font-black text-yellow-400">
                                  {meta.prob1}%
                                </div>
                              </div>
                            </div>

                            <div className="p-2.5 bg-slate-900/40 rounded-xl border border-slate-800/40 text-[11px] text-slate-300 leading-snug">
                              <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5 tracking-wider">Hệ Thức Năng Lượng</span>
                              <span className="text-cyan-200 font-medium">{meta.energyType1}</span>
                            </div>
                          </div>

                          {/* Entity 2 Card */}
                          <div className={cn(
                            "p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden space-y-3",
                            isWinner2 ? "bg-red-950/30 border-red-500/40 shadow-lg shadow-red-500/5 ring-1 ring-red-500/30" : "bg-slate-950/60 border-slate-800/80"
                          )}>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-red-400 flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5" /> {info2.name}
                              </span>
                              <span className={cn(
                                "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border shadow-sm",
                                isWinner2 ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/40" : isDraw ? "bg-slate-800 text-slate-300 border-slate-700" : "bg-slate-900 text-slate-400 border-slate-800"
                              )}>
                                {isWinner2 ? "🏆 Bên Thắng Cuộc" : isDraw ? "⚖️ Cân Bằng" : "Yếu Thế Hơn"}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/60 space-y-1">
                                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Cảnh Giới</span>
                                <div className={cn("text-xs font-black italic truncate", getRankColor(info2.rank))}>
                                  {normalizeRankName(info2.rank)}
                                </div>
                              </div>
                              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/60 space-y-1">
                                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Cấp Độ Thực Tế</span>
                                <div className="text-xs font-mono font-black text-white truncate">
                                  {info2.formattedLevel}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/60 space-y-1">
                                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Lực Chiến Tuyệt Đối</span>
                                <div className="text-xs font-mono font-black text-red-300 truncate">
                                  {info2.formattedPower}
                                </div>
                              </div>
                              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/60 space-y-1">
                                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Tỉ Lệ Thắng Dự Tính</span>
                                <div className="text-xs font-mono font-black text-yellow-400">
                                  {meta.prob2}%
                                </div>
                              </div>
                            </div>

                            <div className="p-2.5 bg-slate-900/40 rounded-xl border border-slate-800/40 text-[11px] text-slate-300 leading-snug">
                              <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5 tracking-wider">Hệ Thức Năng Lượng</span>
                              <span className="text-red-200 font-medium">{meta.energyType2}</span>
                            </div>
                          </div>
                        </div>

                        {/* Combat Verdict Callout */}
                        <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center shrink-0 text-yellow-400">
                              <Flame className="w-5 h-5 fill-current" />
                            </div>
                            <div>
                              <div className="text-[9px] uppercase font-bold tracking-widest text-yellow-500/70">Phán Quyết Thực Chiến Tuyệt Đối</div>
                              <div className="text-xs sm:text-sm font-bold text-white italic">
                                {meta.combatVerdict}
                              </div>
                            </div>
                          </div>
                          <div className="shrink-0 text-right font-mono text-[11px] font-bold text-cyan-300 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-800/50">
                            Chênh lệch: {meta.ratioText}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </motion.div>);
}
