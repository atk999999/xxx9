import { getWorldPowerRules, powerOf } from "../../../shared/multiverse";
import { findPresetWorld } from "../../services/worldRegistry";
import { GameGenre } from "../../types";
import { RealmScaleCard } from "../RealmScaleCard";
import { DESCENT_MODES } from "./options";
import type { useSettingsScreenController } from "./useSettingsScreenController";

type Props = Pick<
  ReturnType<typeof useSettingsScreenController>,
  | "isTransmigration"
  | "useManualWorldBuilder"
  | "setUseManualWorldBuilder"
  | "targetWorldName"
  | "setTargetWorldName"
  | "genre"
  | "initialTemplate"
  | "name"
  | "setGenre"
  | "descentMode"
  | "setDescentMode"
  | "setOpeningLength"
  | "openingLength"
  | "setAutoCodex"
  | "autoCodex"
  | "setLivingWorld"
  | "livingWorld"
  | "settings"
  | "handleClearReference"
  | "refFileInputRef"
  | "handleReferenceFileChange"
  | "workTitlePrompt"
  | "setWorkTitlePrompt"
  | "handleWorkTitleAssist"
  | "loadingField"
  | "renderWorldField"
>;

export function SettingsScreenCharacterSetup({
  isTransmigration,
  useManualWorldBuilder,
  setUseManualWorldBuilder,
  targetWorldName,
  setTargetWorldName,
  genre,
  initialTemplate,
  name,
  setGenre,
  descentMode,
  setDescentMode,
  setOpeningLength,
  openingLength,
  setAutoCodex,
  autoCodex,
  setLivingWorld,
  livingWorld,
  settings,
  handleClearReference,
  refFileInputRef,
  handleReferenceFileChange,
  workTitlePrompt,
  setWorkTitlePrompt,
  handleWorkTitleAssist,
  loadingField,
  renderWorldField,
}: Props) {
  return (<div className="w-full space-y-6">
               {isTransmigration && !useManualWorldBuilder ? (
                   /* THIÊN MÔN XUYÊN KHÔNG (STREAMLINED FAST TRANSMIGRATION) */
                   <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-2xl border-t border-gold-500/30 relative overflow-hidden space-y-6">
                       {/* Background Auras */}
                       <div className="absolute top-0 right-0 p-32 bg-gold-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                       <div className="absolute bottom-0 left-0 p-32 bg-purple-500/5 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

                       {/* Header */}
                       <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/5 gap-3">
                           <div>
                               <div className="flex items-center gap-2.5">
                                   <div className="w-8 h-8 rounded-lg bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
                                       <i className="fas fa-meteor text-sm"></i>
                                   </div>
                                   <h2 className="text-xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-amber-200 to-gold-400">
                                       Thiên Môn Xuyên Không
                                   </h2>
                                   <span className="text-[9px] uppercase tracking-wider font-bold bg-gold-500/10 text-gold-400 border border-gold-500/30 px-2 py-0.5 rounded-full">
                                       AI Tự Động Hóa 100%
                                   </span>
                               </div>
                               <p className="text-xs text-parchment-400 mt-1.5 leading-relaxed">
                                   Lược bỏ mọi kiến tạo thủ công rườm rà. Bạn chỉ cần chọn <strong className="text-gold-300">Thế Giới Đích Đến</strong>, Thiên Đạo AI sẽ tự động phân tích DNA nhân vật và tái hiện bối cảnh, đại thế lực, NPC cùng cốt truyện mở đầu kịch tính.
                               </p>
                           </div>


                       </div>

                       {/* Target World Name Input */}
                       <div className="space-y-2.5">
                           <label className="text-[10px] font-bold text-gold-400 uppercase tracking-widest flex items-center gap-2">
                               <i className="fas fa-compass"></i>
                               <span>Thế Giới Đích Đến</span>
                           </label>
                           <div className="relative">
                               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold-400">
                                   <i className="fas fa-globe-asia text-base"></i>
                               </div>
                               <div className="w-full bg-ink-950/70 border-2 border-gold-500/40 rounded-xl pl-11 pr-4 py-3.5 text-base text-gold-300 font-bold">Tiên Nghịch</div>
                           </div>

                           {/* Preset Matched Notification Banner */}
                           {(() => {
                             const matched = findPresetWorld(targetWorldName);
                             if (!matched) return null;
                             return (
                               <div className="mt-2 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-xs text-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-lg animate-fadeIn">
                                 <div className="flex items-start gap-2.5 min-w-0">
                                   <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping mt-1 shrink-0" />
                                   <div>
                                     <div className="font-bold text-white flex items-center gap-2 flex-wrap">
                                       <span>THẾ GIỚI CÓ SẴN: {matched.names[0].toUpperCase()}</span>
                                       <span className="text-[9px] font-mono bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded border border-emerald-400/40">
                                         {matched.badge}
                                       </span>
                                     </div>
                                     <p className="text-[11px] text-emerald-300/90 mt-0.5">
                                       {matched.summary} Không cần AI tạo lại bối cảnh — Vào game tức thì trong <strong>0 giây (Tiết kiệm 100% Quota)</strong>!
                                     </p>
                                   </div>
                                 </div>
                                 <div className="text-[10px] font-mono font-black bg-emerald-400 text-slate-950 px-2.5 py-1 rounded-lg uppercase tracking-wider shrink-0 self-start sm:self-auto shadow-sm">
                                   ⚡ 0 Quota
                                 </div>
                               </div>
                             );
                           })()}

                           {/* THƯỚC ĐO CẢNH GIỚI ĐỐI CHIẾU */}
                           <div className="pt-2">
                             <RealmScaleCard 
                               worldName={targetWorldName || "Thế Giới Đích Đến"}
                               rules={getWorldPowerRules(targetWorldName, genre)}
                               currentPower={powerOf(initialTemplate?.fusionCard || { level: 1 })}
                               characterName={name || initialTemplate?.fusionCard?.name || "Nhân vật"}
                             />
                           </div>
                       </div>

                       {/* Descent Mode (Chân Thân vs Đầu Thai) */}
                       <div className="space-y-2.5 pt-2">
                           <label className="text-[10px] font-bold text-gold-400 uppercase tracking-widest flex items-center gap-2">
                               <i className="fas fa-meteor"></i>
                               <span>Phương Thức Giáng Lâm Vào Thế Giới</span>
                           </label>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                               {DESCENT_MODES.map((mode) => {
                                   const isSelected = descentMode === mode.id;
                                   return (
                                       <div
                                           key={mode.id}
                                           onClick={() => setDescentMode(mode.id)}
                                           className={`p-4 rounded-xl border-2 cursor-pointer transition-all relative overflow-hidden ${
                                               isSelected 
                                                   ? 'bg-gradient-to-br from-ink-900 to-ink-950 border-gold-400 shadow-[0_0_15px_rgba(234,179,8,0.2)] ring-1 ring-gold-400/40' 
                                                   : 'bg-ink-950/40 border-ink-800 hover:border-ink-700 opacity-70 hover:opacity-100'
                                           }`}
                                       >
                                           <div className="flex items-center justify-between mb-1.5">
                                               <div className="flex items-center gap-2">
                                                   <i className={`fas ${mode.icon} ${isSelected ? 'text-gold-400' : 'text-ink-500'}`}></i>
                                                   <span className={`text-sm font-bold font-display ${isSelected ? 'text-gold-300' : 'text-parchment-200'}`}>
                                                       {mode.title}
                                                   </span>
                                               </div>
                                               <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-gold-500/20 text-gold-300' : 'bg-ink-900 text-ink-500'}`}>
                                                   {mode.subtitle}
                                               </span>
                                           </div>
                                           <p className="text-xs text-parchment-400 leading-relaxed font-serif">
                                               {mode.desc}
                                           </p>
                                       </div>
                                   );
                               })}
                           </div>
                       </div>

                       {/* Opening Story Length Selection */}
                       <div className="space-y-2 pt-2">
                           <label className="text-[10px] font-bold text-ink-400 uppercase tracking-wider flex items-center gap-2">
                               <i className="fas fa-scroll text-gold-500"></i>
                               <span>Độ Dài Chương Mở Đầu Của AI:</span>
                           </label>
                           <div className="flex flex-wrap gap-2">
                               {[
                                   { val: 0, label: 'Mặc định' },
                                   { val: 400, label: '400 chữ' },
                                   { val: 600, label: '600 chữ' },
                                   { val: 1200, label: '1200 chữ (Cố định)' },
                                   { val: 1500, label: 'Đại Tự Sự (1500+)' }
                               ].map(opt => (
                                   <button
                                       key={opt.val}
                                       type="button"
                                       onClick={() => setOpeningLength(opt.val)}
                                       className={`text-xs px-3 py-1.5 rounded-lg border font-bold transition-all ${
                                           openingLength === opt.val 
                                               ? 'bg-gold-500 text-ink-950 border-gold-400 shadow-[0_0_10px_rgba(234,179,8,0.3)]' 
                                               : 'bg-ink-950/60 text-ink-400 border-ink-800 hover:text-gold-300 hover:border-gold-500/30'
                                       }`}
                                   >
                                       {opt.label}
                                   </button>
                               ))}
                           </div>
                       </div>

                       {/* Auto Codex & Living World Switches */}
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/5">
                           <div className="bg-ink-950/40 border border-ink-800/80 rounded-xl p-3.5 flex items-center justify-between">
                               <div>
                                   <div className="text-xs font-bold text-parchment-200 flex items-center gap-1.5">
                                       <i className="fas fa-book-open text-gold-500"></i> Tự động ghi Wiki (Auto Codex)
                                   </div>
                                   <div className="text-[9px] text-ink-500 mt-0.5">
                                       Tự động lưu NPC/Địa danh mới vào Bách Khoa.
                                   </div>
                               </div>
                               <button
                                   type="button"
                                   onClick={() => setAutoCodex(!autoCodex)}
                                   className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${autoCodex ? 'bg-gold-500' : 'bg-ink-800'}`}
                               >
                                   <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${autoCodex ? 'translate-x-6' : 'translate-x-1'}`}></div>
                               </button>
                           </div>

                           <div className="bg-ink-950/40 border border-ink-800/80 rounded-xl p-3.5 flex items-center justify-between">
                               <div>
                                   <div className="text-xs font-bold text-parchment-200 flex items-center gap-1.5">
                                       <i className="fas fa-globe-americas text-arcane-500"></i> Thế Giới Sống (Living World)
                                   </div>
                                   <div className="text-[9px] text-ink-500 mt-0.5">
                                       Mô phỏng sự kiện nền chân thực cho các phe phái.
                                   </div>
                               </div>
                               <button
                                   type="button"
                                   onClick={() => setLivingWorld(!livingWorld)}
                                   className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${livingWorld ? 'bg-arcane-600' : 'bg-ink-800'}`}
                               >
                                   <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${livingWorld ? 'translate-x-6' : 'translate-x-1'}`}></div>
                               </button>
                           </div>
                       </div>

                       {/* AI Promise Banner */}
                       <div className="bg-gradient-to-r from-gold-500/10 via-amber-500/5 to-transparent border border-gold-500/20 rounded-xl p-4 flex items-start gap-3">
                           <i className="fas fa-sparkles text-gold-400 text-sm mt-0.5 shrink-0"></i>
                           <p className="text-xs text-parchment-300 leading-relaxed font-serif">
                               Khi bạn nhấn nút <strong className="text-gold-300 uppercase tracking-wide">"Bắt Đầu"</strong> ở góc trên, Thiên Đạo AI sẽ tự động phân tích DNA & Căn cơ của <span className="text-gold-400 font-bold">{name || "nhân vật"}</span>, sau đó kết nối toàn bộ điển tích của <span className="text-gold-400 font-bold">{targetWorldName || "dị giới"}</span> để tạo ra thế giới hoàn chỉnh và chương mở đầu giáng lâm kịch tính nhất!
                           </p>
                       </div>
                   </div>
               ) : (
                   /* MANUAL WORLD BUILDER */
                   <div className="glass-panel rounded-2xl p-6 shadow-xl border-t border-white/5">
                       <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                           <div>
                               <h2 className="text-xl font-display font-bold text-parchment-200">
                                   <i className="fas fa-globe-asia text-gold-500 mr-3"></i> Kiến Tạo Thế Giới
                               </h2>
                               <p className="text-xs text-ink-500 mt-1 pl-8">Thiết lập bối cảnh cho hành trình của bạn.</p>
                           </div>

                           {isTransmigration && (
                               <button
                                   type="button"
                                   onClick={() => setUseManualWorldBuilder(false)}
                                   className="text-[11px] text-gold-400 hover:text-gold-300 border border-gold-500/40 px-3 py-1.5 rounded-lg bg-gold-500/10 transition-all flex items-center gap-1.5"
                               >
                                   <i className="fas fa-meteor"></i>
                                   <span>Về Thiên Môn Xuyên Không</span>
                               </button>
                           )}
                       </div>

                       {/* NEW: REFERENCE FILE UPLOAD */}
                       <div className="bg-ink-950/40 border border-emerald-500/30 rounded-xl p-5 mb-4 relative overflow-hidden group">
                           <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50"></div>
                           <label className="block text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-3 flex justify-between">
                               <span><i className="fas fa-file-alt mr-2"></i> Nhập Dữ Liệu Thế Giới (File .txt)</span>
                               {settings.referenceContext && (
                                   <button onClick={handleClearReference} className="text-crimson-400 hover:text-white transition-colors">
                                       <i className="fas fa-trash-alt mr-1"></i> Xóa
                                   </button>
                               )}
                           </label>
                           <div className="flex gap-2 items-center">
                               <input 
                                   type="file" 
                                   accept=".txt"
                                   ref={refFileInputRef}
                                   onChange={handleReferenceFileChange}
                                   className="hidden"
                               />
                               <button 
                                   onClick={() => refFileInputRef.current?.click()}
                                   className="bg-ink-800 hover:bg-emerald-900/30 text-parchment-200 px-5 py-2 rounded-lg border border-ink-700 font-bold transition-colors flex items-center gap-2 text-sm"
                               >
                                   <i className="fas fa-upload text-emerald-400"></i>
                                   {settings.referenceContext ? "Chọn File Khác" : "Tải lên File TXT"}
                               </button>
                               <p className="text-xs text-ink-500 italic flex-1 truncate">
                                   {settings.referenceContext ? "Đã tải dữ liệu thành công (AI sẽ sử dụng)." : "Tải lên thông tin về nhân vật, sự kiện, lịch sử... để AI nhập vai chính xác."}
                               </p>
                           </div>
                       </div>
                       
                       {/* NEW: Work Title Assist */}
                       <div className="bg-ink-950/40 border border-arcane-500/30 rounded-xl p-5 mb-8 relative overflow-hidden">
                           <div className="absolute top-0 left-0 w-1 h-full bg-arcane-500/50"></div>
                           <label className="block text-[10px] font-bold text-arcane-400 uppercase tracking-wider mb-3">
                               <i className="fas fa-film mr-2"></i> Nhập Tên Tác Phẩm / Anime / Game (+ Ý tưởng)
                           </label>
                           <div className="flex gap-2">
                               <input 
                                   type="text"
                                   value={workTitlePrompt}
                                   onChange={(e) => setWorkTitlePrompt(e.target.value)}
                                   onKeyDown={(e) => e.key === 'Enter' && handleWorkTitleAssist()}
                                   placeholder="Vd: Naruto (Main là thành viên Akatsuki), Harry Potter, One Piece..."
                                   className="flex-1 bg-ink-900/80 border border-ink-700 rounded-lg px-4 py-2 text-sm focus:border-arcane-500/50 outline-none text-parchment-200 placeholder-ink-600 transition-colors font-serif shadow-inner"
                               />
                               <button 
                                   onClick={handleWorkTitleAssist}
                                   disabled={loadingField === 'workTitle'}
                                   className="bg-ink-800 hover:bg-arcane-900/30 text-parchment-200 px-5 rounded-lg border border-ink-700 font-bold transition-colors disabled:opacity-50 min-w-[100px] flex items-center justify-center gap-2"
                               >
                                   {loadingField === 'workTitle' ? <i className="fas fa-spinner fa-spin text-arcane-400"></i> : <i className="fas fa-robot text-arcane-400"></i>}
                                   <span className="hidden md:inline text-xs">AI Tái Hiện</span>
                               </button>
                           </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="col-span-1 md:col-span-2">
                               {renderWorldField('worldContext', 'Bối Cảnh & Địa Lý', 'Mô tả không gian, thời gian, lịch sử...')}
                           </div>
                           
                           {genre === GameGenre.ANIME_CROSSOVER && (
                               <div className="col-span-1 md:col-span-2 bg-purple-900/20 p-4 rounded-xl border border-purple-500/30">
                                   {renderWorldField('crossoverWorlds', 'Các Thế Giới Muốn Gộp', 'Vd: Naruto x One Piece x Bleach, Attack on Titan x Gundam...')}
                               </div>
                           )}

                           {renderWorldField('openingStory', 'Cốt Truyện Khởi Đầu', 'Mô tả cụ thể hoàn cảnh bắt đầu của nhân vật (Ví dụ: Tỉnh dậy trong một ngôi miếu hoang...)', 
                               <div className="flex flex-wrap items-center gap-2 mt-2">
                                   <span className="text-[10px] font-bold text-ink-500 uppercase mr-2">Độ dài mở đầu:</span>
                                   {[
                                       { val: 0, label: 'Mặc định' },
                                       { val: 400, label: '400 chữ' },
                                       { val: 600, label: '600 chữ' },
                                       { val: 1200, label: '1200 chữ (Cố định)' },
                                       { val: 1500, label: 'Đại Tự Sự (1500+)' }
                                   ].map(opt => (
                                       <button
                                           key={opt.val}
                                           onClick={() => setOpeningLength(opt.val)}
                                           className={`text-[9px] px-2 py-1 rounded border transition-all font-bold ${
                                               openingLength === opt.val 
                                               ? 'bg-gold-500 text-black border-gold-500' 
                                               : 'bg-ink-900 text-ink-400 border-ink-700 hover:text-gold-400'
                                           }`}
                                       >
                                           {opt.label}
                                       </button>
                                   ))}
                               </div>
                           )}
                           {renderWorldField('plotDirection', 'Hướng Đi Cốt Truyện', 'Mục tiêu chính, kẻ thù định mệnh...')}
                           {renderWorldField('majorFactions', 'Các Thế Lực Lớn', 'Tông môn, Triều đình, Tổ chức...')}
                           {renderWorldField('keyNpcs', 'Nhân Vật Quan Trọng', 'Sư phụ, hồng nhan, kẻ thù...')}
                       </div>

                       {/* --- NEW SECTION: AUTO CODEX TOGGLE ONLY --- */}
                       <div className="mt-8 pt-6 border-t border-white/5">
                            <div className="bg-ink-900/30 border border-ink-700/50 rounded-xl p-5 flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-bold text-parchment-200 flex items-center gap-2">
                                        <i className="fas fa-book-open text-gold-500"></i> Tự động ghi Wiki (Auto Codex)
                                    </div>
                                    <div className="text-[10px] text-ink-500 mt-1">
                                        Hệ thống sẽ tự động phát hiện NPC/Địa danh mới và lưu vào Bách khoa toàn thư.
                                    </div>
                                </div>
                                <button
                                    onClick={() => setAutoCodex(!autoCodex)}
                                    className={`w-12 h-6 rounded-full relative transition-colors ${autoCodex ? 'bg-gold-500' : 'bg-ink-700'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${autoCodex ? 'translate-x-7' : 'translate-x-1'}`}></div>
                                </button>
                            </div>
                       </div>

                       {/* --- NEW SECTION: LIVING WORLD TOGGLE --- */}
                       <div className="mt-4">
                            <div className="bg-ink-900/30 border border-ink-700/50 rounded-xl p-5 flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-bold text-parchment-200 flex items-center gap-2">
                                        <i className="fas fa-globe-americas text-arcane-500"></i> Thế Giới Sống (Living World)
                                    </div>
                                    <div className="text-[10px] text-ink-500 mt-1">
                                        Kích hoạt mô phỏng sự kiện nền cho các phe phái (Tốn thêm token, tăng độ chân thực).
                                    </div>
                                </div>
                                <button
                                    onClick={() => setLivingWorld(!livingWorld)}
                                    className={`w-12 h-6 rounded-full relative transition-colors ${livingWorld ? 'bg-arcane-600' : 'bg-ink-700'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${livingWorld ? 'translate-x-7' : 'translate-x-1'}`}></div>
                                </button>
                            </div>
                       </div>
                   </div>
               )}
            </div>);
}
