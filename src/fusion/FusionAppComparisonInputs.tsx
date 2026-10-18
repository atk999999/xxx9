import { User } from "lucide-react";
import { CHARACTER_DATA } from "./characterCatalog";
import { getEntityPowerInfo } from "./characterPower";
import { CharacterSelector } from "./CharacterSelector";
import { cn, getRankBg, getRankColor, normalizeRankName } from "./presentation";
import type { useFusionAppController } from "./useFusionAppController";

type Props = Pick<
  ReturnType<typeof useFusionAppController>,
  | "compareChar1"
  | "fusions"
  | "setCompareChar1"
  | "isNsfw"
  | "compareChar2"
  | "setCompareChar2"
>;

export function FusionAppComparisonInputs({
  compareChar1,
  fusions,
  setCompareChar1,
  isNsfw,
  compareChar2,
  setCompareChar2,
}: Props) {
  return (<div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-start relative">
              {/* Character 1 */}
              <div className="space-y-4 p-5 sm:p-6 bg-slate-900/60 border border-slate-800 rounded-3xl relative z-20 shadow-xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-transparent opacity-60 rounded-t-3xl" />
                
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-black text-cyan-400 tracking-widest flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Thực Thể 1
                  </span>
                  {compareChar1.fusionId && (
                    <span className="text-[8px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full font-bold uppercase">
                      Sổ Dung Hợp
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Chọn Thực Thể / Nhân Vật</label>
                    <CharacterSelector 
                      value={compareChar1.fusionId ? `FUSION:${compareChar1.fusionId}` : compareChar1.name} 
                      onChange={(val) => {
                        if (val.startsWith('FUSION:')) {
                          const fid = val.replace('FUSION:', '');
                          const fusion = fusions.find(f => f.id === fid);
                          if (fusion) {
                            setCompareChar1({ ...compareChar1, name: fusion.name, era: "Sổ Dung Hợp", state: `Rank ${fusion.rank}`, fusionId: fusion.id });
                          }
                        } else {
                          const era = CHARACTER_DATA[val]?.eras?.[0] || "Dragon Ball Super";
                          const state = CHARACTER_DATA[val]?.states?.[era]?.[0] || "Base";
                          setCompareChar1({ id: 'c1', name: val, era, state, fusionId: undefined });
                        }
                      }}
                      fusions={fusions}
                      isNsfw={isNsfw}
                    />
                  </div>

                  {/* Era & State Selectors if standard character */}
                  {!compareChar1.fusionId && CHARACTER_DATA[compareChar1.name] && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <label className="text-[9px] uppercase font-bold text-slate-500 block mb-1">Thời kỳ</label>
                        <select
                          value={compareChar1.era}
                          onChange={(e) => {
                            const newEra = e.target.value;
                            const newState = CHARACTER_DATA[compareChar1.name]?.states?.[newEra]?.[0] || "Base";
                            setCompareChar1(prev => ({ ...prev, era: newEra, state: newState }));
                          }}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg text-xs py-1.5 px-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                        >
                          {CHARACTER_DATA[compareChar1.name].eras.map(era => (
                            <option key={era} value={era}>{era}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] uppercase font-bold text-slate-500 block mb-1">Trạng thái</label>
                        <select
                          value={compareChar1.state}
                          onChange={(e) => setCompareChar1(prev => ({ ...prev, state: e.target.value }))}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg text-xs py-1.5 px-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                        >
                          {(CHARACTER_DATA[compareChar1.name].states[compareChar1.era] || ["Base"]).map(st => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Live Power Badge Preview */}
                  {(() => {
                    const info = getEntityPowerInfo(compareChar1, fusions);
                    return (
                      <div className="mt-3 p-3 bg-slate-950/80 border border-cyan-500/20 rounded-2xl flex items-center justify-between gap-2 shadow-inner">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={cn("text-[10px] font-black italic px-2 py-0.5 rounded border shadow-sm", getRankColor(info.rank), getRankBg(info.rank))}>
                            {normalizeRankName(info.rank)}
                          </span>
                          <span className="text-xs font-mono text-slate-300 font-bold truncate">
                            {info.formattedLevel}
                          </span>
                        </div>
                        <div className="text-xs font-mono font-black text-cyan-400 bg-cyan-400/10 px-2.5 py-1 rounded-lg border border-cyan-400/20 shrink-0">
                          {info.formattedPower}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* VS Divider */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-slate-950 border-4 border-slate-900 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                  <span className="text-xl font-black italic text-cyan-400">VS</span>
                </div>
              </div>

              {/* Character 2 */}
              <div className="space-y-4 p-5 sm:p-6 bg-slate-900/60 border border-slate-800 rounded-3xl relative z-20 shadow-xl">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-red-500 to-transparent opacity-60 rounded-t-3xl" />
                
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-black text-red-400 tracking-widest flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Thực Thể 2
                  </span>
                  {compareChar2.fusionId && (
                    <span className="text-[8px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-bold uppercase">
                      Sổ Dung Hợp
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Chọn Thực Thể / Nhân Vật</label>
                    <CharacterSelector 
                      value={compareChar2.fusionId ? `FUSION:${compareChar2.fusionId}` : compareChar2.name} 
                      onChange={(val) => {
                        if (val.startsWith('FUSION:')) {
                          const fid = val.replace('FUSION:', '');
                          const fusion = fusions.find(f => f.id === fid);
                          if (fusion) {
                            setCompareChar2({ ...compareChar2, name: fusion.name, era: "Sổ Dung Hợp", state: `Rank ${fusion.rank}`, fusionId: fusion.id });
                          }
                        } else {
                          const era = CHARACTER_DATA[val]?.eras?.[0] || "Dragon Ball Super";
                          const state = CHARACTER_DATA[val]?.states?.[era]?.[0] || "Base";
                          setCompareChar2({ id: 'c2', name: val, era, state, fusionId: undefined });
                        }
                      }}
                      fusions={fusions}
                      isNsfw={isNsfw}
                    />
                  </div>

                  {/* Era & State Selectors if standard character */}
                  {!compareChar2.fusionId && CHARACTER_DATA[compareChar2.name] && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <label className="text-[9px] uppercase font-bold text-slate-500 block mb-1">Thời kỳ</label>
                        <select
                          value={compareChar2.era}
                          onChange={(e) => {
                            const newEra = e.target.value;
                            const newState = CHARACTER_DATA[compareChar2.name]?.states?.[newEra]?.[0] || "Base";
                            setCompareChar2(prev => ({ ...prev, era: newEra, state: newState }));
                          }}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg text-xs py-1.5 px-2 text-slate-200 focus:outline-none focus:border-red-500"
                        >
                          {CHARACTER_DATA[compareChar2.name].eras.map(era => (
                            <option key={era} value={era}>{era}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] uppercase font-bold text-slate-500 block mb-1">Trạng thái</label>
                        <select
                          value={compareChar2.state}
                          onChange={(e) => setCompareChar2(prev => ({ ...prev, state: e.target.value }))}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg text-xs py-1.5 px-2 text-slate-200 focus:outline-none focus:border-red-500"
                        >
                          {(CHARACTER_DATA[compareChar2.name].states[compareChar2.era] || ["Base"]).map(st => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Live Power Badge Preview */}
                  {(() => {
                    const info = getEntityPowerInfo(compareChar2, fusions);
                    return (
                      <div className="mt-3 p-3 bg-slate-950/80 border border-red-500/20 rounded-2xl flex items-center justify-between gap-2 shadow-inner">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={cn("text-[10px] font-black italic px-2 py-0.5 rounded border shadow-sm", getRankColor(info.rank), getRankBg(info.rank))}>
                            {normalizeRankName(info.rank)}
                          </span>
                          <span className="text-xs font-mono text-slate-300 font-bold truncate">
                            {info.formattedLevel}
                          </span>
                        </div>
                        <div className="text-xs font-mono font-black text-red-400 bg-red-400/10 px-2.5 py-1 rounded-lg border border-red-400/20 shrink-0">
                          {info.formattedPower}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>);
}
