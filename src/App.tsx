import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  FlaskConical,
  Loader2,
  Plus,
  Search,
  Shield,
  Star,
  Trash2,
  Zap,
} from "lucide-react";
import { ConnectionSettings } from "../shared/ConnectionSettings";
import { PokemonCard, getEnergyTypeInfo } from "./components/PokemonCard";
import { PokemonCardModal } from "./components/PokemonCardModal";
import { getEntityPowerInfo } from "./fusion/characterPower";
import { ErrorBoundary } from "./fusion/ErrorBoundary";
import { FusionAppCharacterInputs } from "./fusion/FusionAppCharacterInputs";
import { FusionAppCollectionControls } from "./fusion/FusionAppCollectionControls";
import { FusionAppCollectionHeader } from "./fusion/FusionAppCollectionHeader";
import { FusionAppComparisonInputs } from "./fusion/FusionAppComparisonInputs";
import { FusionAppComparisonResult } from "./fusion/FusionAppComparisonResult";
import { FusionAppConnectionDialog } from "./fusion/FusionAppConnectionDialog";
import { FusionAppFusionResult } from "./fusion/FusionAppFusionResult";
import { FusionAppHeader } from "./fusion/FusionAppHeader";
import { MainMenu } from "./fusion/MainMenu";
import { calculatePowerComparisonMeta } from "./fusion/powerComparison";
import { cn, formatBP } from "./fusion/presentation";
import { useFusionAppController } from "./fusion/useFusionAppController";

export default function App() {
  return (
    <ErrorBoundary>
      <FusionApp />
    </ErrorBoundary>
  );
}

function FusionApp() {
  const {
    showMenu,
    setShowMenu,
    setView,
    setMode,
    view,
    mode,
    setShowSettings,
    textModel,
    imageModel,
    DAILY_QUOTA_LIMIT,
    quotaUsed,
    error,
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
    fusionStep,
    currentFusion,
    setLabViewPokemonCard,
    labViewPokemonCard,
    retryingImage,
    retryCardImage,
    setInspectedFusion,
    setCompareChar1,
    setSelectedChars,
    compareChar1,
    compareChar2,
    setCurrentFusion,
    setCompareChar2,
    startComparison,
    isComparing,
    comparisonResult,
    exportBackup,
    importBackup,
    setFusions,
    bookSearch,
    setBookSearch,
    bookSortBy,
    setBookSortBy,
    setBookViewMode,
    bookViewMode,
    setBookRankFilter,
    bookRankFilter,
    isDeleting,
    deleteFusion,
    inspectedFusion,
    showSettings,
    handleTextModelChange,
    handleImageModelChange,
    setIsNsfw,
  } = useFusionAppController();
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[200]"
          >
            <MainMenu onStart={() => setShowMenu(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <FusionAppHeader
        setView={setView}
        setMode={setMode}
        view={view}
        mode={mode}
        setShowSettings={setShowSettings}
        textModel={textModel}
        imageModel={imageModel}
        DAILY_QUOTA_LIMIT={DAILY_QUOTA_LIMIT}
        quotaUsed={quotaUsed}
      />

      <main className="max-w-7xl mx-auto px-4 py-4 sm:py-8 w-full">
        <ConnectionSettings/>
        <a href="./story/index.html" className="block mb-5 rounded-xl bg-violet-900 p-4 text-white">🌌 Xuyên thế giới · Tiếp tục chuyến đi / Tạo thế giới</a>
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs sm:text-sm flex items-center gap-3">
            <Shield className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        {view === 'lab' ? (
          mode === 'fusion' ? (
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start w-full">
              {/* Left: Input */}
              <FusionAppCharacterInputs
                upgradeFusion={upgradeFusion}
                setUpgradeFusion={setUpgradeFusion}
                selectedChars={selectedChars}
                fusions={fusions}
                updateCharacter={updateCharacter}
                isNsfw={isNsfw}
                removeCharacter={removeCharacter}
                addCharacter={addCharacter}
                startFusion={startFusion}
                isFusing={isFusing}
                DAILY_QUOTA_LIMIT={DAILY_QUOTA_LIMIT}
                quotaUsed={quotaUsed}
              />

            {/* Right: Result */}
            <FusionAppFusionResult
                isFusing={isFusing}
                fusionStep={fusionStep}
                currentFusion={currentFusion}
                setLabViewPokemonCard={setLabViewPokemonCard}
                labViewPokemonCard={labViewPokemonCard}
                retryingImage={retryingImage}
                retryCardImage={retryCardImage}
                setInspectedFusion={setInspectedFusion}
                setCompareChar1={setCompareChar1}
                setMode={setMode}
                setUpgradeFusion={setUpgradeFusion}
                setSelectedChars={setSelectedChars}
                compareChar1={compareChar1}
                compareChar2={compareChar2}
                setView={setView}
                setCurrentFusion={setCurrentFusion}
              />
          </div>
        ) : (
          <div className="space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tighter italic uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                So Sánh Sức Mạnh Chuẩn Xác
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-xs sm:text-sm">
                Đối chiếu tương quan cấp độ, BP và cảnh giới giữa mọi nhân vật Dragon Ball hoặc thực thể trong Sổ Dung Hợp.
              </p>
            </div>

            <FusionAppComparisonInputs
                compareChar1={compareChar1}
                fusions={fusions}
                setCompareChar1={setCompareChar1}
                isNsfw={isNsfw}
                compareChar2={compareChar2}
                setCompareChar2={setCompareChar2}
              />

            {/* Live Instant Power Ratio Meter */}
            {(() => {
              const info1 = getEntityPowerInfo(compareChar1, fusions);
              const info2 = getEntityPowerInfo(compareChar2, fusions);
              const meta = calculatePowerComparisonMeta(info1, info2);
              return (
                <div className="p-4 sm:p-5 bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-xl space-y-3.5 backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs uppercase font-black tracking-wider text-slate-200">
                        Đo Đếm Lực Chiến Chuẩn Xác
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700/60 w-fit">
                      {meta.tierDisparity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-cyan-400 font-bold truncate max-w-[45%]">
                      {info1.name}: <span className="text-slate-300">{info1.formattedPower}</span>
                    </span>
                    <span className="text-red-400 font-bold truncate max-w-[45%] text-right">
                      {info2.name}: <span className="text-slate-300">{info2.formattedPower}</span>
                    </span>
                  </div>

                  {/* Relative Power Proportion Bar */}
                  <div className="space-y-1.5">
                    <div className="h-3 bg-slate-950 rounded-full overflow-hidden flex border border-slate-800/80 shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                        style={{ width: `${meta.prob1}%` }}
                      />
                      <div 
                        className="h-full bg-gradient-to-l from-red-500 to-orange-500 transition-all duration-300"
                        style={{ width: `${meta.prob2}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                      <span className="text-cyan-400">{meta.prob1}%</span>
                      <span className="text-yellow-400 px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded-md text-center max-w-[70%] truncate">
                        ⚡ {meta.ratioText}
                      </span>
                      <span className="text-red-400">{meta.prob2}%</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="flex justify-center pt-2">
              <button
                onClick={startComparison}
                disabled={isComparing}
                className="px-10 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-black uppercase tracking-wider rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(6,182,212,0.3)] flex items-center gap-3 cursor-pointer"
              >
                {isComparing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 fill-current" />}
                {isComparing ? "Đang phân tích tương quan..." : "Bắt đầu so sánh chuẩn xác"}
              </button>
            </div>

            {comparisonResult && (
              <FusionAppComparisonResult
                  comparisonResult={comparisonResult}
                  compareChar1={compareChar1}
                  compareChar2={compareChar2}
                  fusions={fusions}
                />
            )}
          </div>
        )
      ) : (
        <section className="space-y-6">
            {/* Top Binder Header with Pokemon TCG Theme */}
            <FusionAppCollectionHeader
              exportBackup={exportBackup}
              fusions={fusions}
              importBackup={importBackup}
              setFusions={setFusions}
            />

            {/* Filter, Search & Display Controls */}
            <FusionAppCollectionControls
              bookSearch={bookSearch}
              setBookSearch={setBookSearch}
              bookSortBy={bookSortBy}
              setBookSortBy={setBookSortBy}
              setBookViewMode={setBookViewMode}
              bookViewMode={bookViewMode}
              setBookRankFilter={setBookRankFilter}
              bookRankFilter={bookRankFilter}
              fusions={fusions}
            />

            {/* Empty State */}
            {(() => {
              const filteredFusions = fusions.filter(f => {
                if (bookSearch.trim()) {
                  const q = bookSearch.toLowerCase();
                  const matchName = f.name.toLowerCase().includes(q);
                  const matchChars = f.baseCharacters.some(c => c.name.toLowerCase().includes(q));
                  const matchRank = (f.rank || '').toLowerCase().includes(q);
                  if (!matchName && !matchChars && !matchRank) return false;
                }
                if (bookRankFilter === 'chaos') {
                  return (f.rank || '').toUpperCase().includes('HỖN ĐỘN') || (f.rank || '').toUpperCase().includes('CHAOS');
                }
                if (bookRankFilter === 'supreme') {
                  return (f.rank || '').toUpperCase().includes('KHỞI NGUYÊN') || (f.rank || '').toUpperCase().includes('ZENO');
                }
                if (bookRankFilter === 'angel') {
                  return (f.rank || '').toUpperCase().includes('THIÊN SỨ') || (f.rank || '').toUpperCase().includes('ANGEL') || (f.rank || '').toUpperCase().includes('ĐẠI THIÊN');
                }
                if (bookRankFilter === 'destroyer') {
                  return (f.rank || '').toUpperCase().includes('HỦY DIỆT') || (f.rank || '').toUpperCase().includes('DESTRUCTION');
                }
                if (bookRankFilter === 'instinct') {
                  return (f.rank || '').toUpperCase().includes('VÔ CỰC') || (f.rank || '').toUpperCase().includes('INSTINCT') || (f.rank || '').toUpperCase().includes('BẢN NGÃ');
                }
                if (bookRankFilter === 'saiyan') {
                  return (f.rank || '').toUpperCase().includes('SAIYAN');
                }
                if (bookRankFilter === 'mortal') {
                  return (f.rank || '').toUpperCase().includes('PHÀM NHÂN');
                }
                return true;
              }).sort((a, b) => {
                if (bookSortBy === 'power_desc') {
                  const isChaosA = (a.rank || '').toUpperCase().includes('HỖN ĐỘN');
                  const isChaosB = (b.rank || '').toUpperCase().includes('HỖN ĐỘN');
                  if (isChaosA && !isChaosB) return -1;
                  if (!isChaosA && isChaosB) return 1;
                  if (isChaosA && isChaosB) return (b.level || 1) - (a.level || 1);
                  return (b.powerLevel || 0) - (a.powerLevel || 0);
                }
                if (bookSortBy === 'level_desc') {
                  const isChaosA = (a.rank || '').toUpperCase().includes('HỖN ĐỘN');
                  const isChaosB = (b.rank || '').toUpperCase().includes('HỖN ĐỘN');
                  if (isChaosA && !isChaosB) return -1;
                  if (!isChaosA && isChaosB) return 1;
                  return (b.level || 1) - (a.level || 1);
                }
                if (bookSortBy === 'compat_desc') {
                  return (b.compatibility_score || 0) - (a.compatibility_score || 0);
                }
                return 0;
              });

              if (fusions.length === 0) {
                return (
                  <div className="py-20 text-center space-y-4 bg-slate-900/40 border-2 border-dashed border-amber-400/30 rounded-3xl p-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-amber-400/10 border-2 border-amber-400/30 flex items-center justify-center">
                      <Star className="w-10 h-10 text-amber-400 opacity-60" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white">Sổ Dung Hợp Đang Trống</h3>
                      <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
                        Hãy vào mục "Dung Hợp" để tạo ra các thực thể Dragon Ball và thu thập các thẻ bài Pokémon huyền thoại vào bộ sưu tập này!
                      </p>
                    </div>
                    <button
                      onClick={() => { setView('lab'); setMode('fusion'); }}
                      className="px-6 py-2.5 bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg hover:bg-amber-300 transition-all cursor-pointer"
                    >
                      Bắt đầu dung hợp ngay
                    </button>
                  </div>
                );
              }

              if (filteredFusions.length === 0) {
                return (
                  <div className="py-16 text-center space-y-3 bg-slate-900/30 border border-slate-800 rounded-3xl p-6">
                    <Search className="w-10 h-10 mx-auto text-slate-500 opacity-50" />
                    <p className="text-slate-300 font-bold text-sm">Không tìm thấy thẻ bài phù hợp với bộ lọc.</p>
                    <button
                      onClick={() => { setBookSearch(''); setBookRankFilter('all'); }}
                      className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-amber-400 font-bold"
                    >
                      Xóa bộ lọc tìm kiếm
                    </button>
                  </div>
                );
              }

              return bookViewMode === 'grid' ? (
                /* Pokemon Cards Grid (Album Thẻ Bài Pokemon 3D) */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
                  {filteredFusions.map((f) => (
                    <motion.div
                      key={f.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="h-full flex flex-col"
                    >
                      <PokemonCard
                        fusion={f}
                        isSelectedForCompare={compareChar1.fusionId === f.id || compareChar2.fusionId === f.id}
                        isDeleting={isDeleting === f.id}
                        onInspect={() => setInspectedFusion(f)}
                        onCompare={() => {
                          if (!compareChar1.fusionId || compareChar1.fusionId !== f.id) {
                            if (compareChar1.fusionId && (!compareChar2.fusionId || compareChar2.fusionId !== f.id)) {
                              setCompareChar2(compareChar1);
                            }
                            setCompareChar1({ id: crypto.randomUUID(), name: f.name, era: "Sổ Dung Hợp", state: `Rank ${f.rank}`, fusionId: f.id });
                          }
                          setMode('comparison');
                          setView('lab');
                        }}
                        onUpgrade={() => {
                          setUpgradeFusion(f);
                          setSelectedChars([{ id: crypto.randomUUID(), name: "Pin Infinity", era: "Vật phẩm (Items)", state: "Nguồn năng lượng vô hạn" }]);
                          setView('lab');
                          setMode('fusion');
                        }}
                        onDelete={(e) => deleteFusion(f.id, e)}
                        interactive={true}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Compact Deck Table View */
                <div className="space-y-2.5">
                  {filteredFusions.map((f) => {
                    const energy = getEnergyTypeInfo(f.rank);
                    const EnergyIcon = energy.icon;
                    const isSelected = compareChar1.fusionId === f.id || compareChar2.fusionId === f.id;
                    return (
                      <motion.div
                        key={f.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "p-3 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 hover:border-amber-400/50 cursor-pointer",
                          isSelected ? "border-amber-400 bg-amber-950/20" : "border-slate-800"
                        )}
                        onClick={() => setInspectedFusion(f)}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Mini Card Image */}
                          <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-amber-400/40 bg-slate-950 shrink-0 relative">
                            {f.imageUrl ? (
                              <img src={f.imageUrl} alt={f.name} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-500">TCG</div>
                            )}
                            <div className={cn("absolute bottom-0 right-0 w-4 h-4 rounded-full flex items-center justify-center text-[8px] border shadow", energy.badgeBg)}>
                              <EnergyIcon className="w-2.5 h-2.5" />
                            </div>
                          </div>

                          <div className="min-w-0 space-y-0.5">
                            <div className="flex items-center gap-2">
                              <h4 className="font-black text-sm text-white truncate uppercase">{f.name}</h4>
                              <span className="text-[9px] font-mono text-yellow-400 bg-yellow-400/10 px-1.5 py-0.2 rounded border border-yellow-400/30">
                                Lv.{f.level}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400 truncate">
                              <span className={cn("font-bold text-[10px]", energy.color)}>{f.rank}</span>
                              <span>•</span>
                              <span className="text-[10px]">HT: {f.baseCharacters.map(c => c.name).join(' + ')}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                          <div className="text-right">
                            <div className="text-xs font-black font-mono text-cyan-400">
                              {formatBP(f.powerLevel, f.rank, f.level)}
                            </div>
                            <div className="text-[9px] text-slate-500 font-mono">
                              Hợp: {f.compatibility_score}%
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!compareChar1.fusionId || compareChar1.fusionId !== f.id) {
                                  if (compareChar1.fusionId && (!compareChar2.fusionId || compareChar2.fusionId !== f.id)) {
                                    setCompareChar2(compareChar1);
                                  }
                                  setCompareChar1({ id: crypto.randomUUID(), name: f.name, era: "Sổ Dung Hợp", state: `Rank ${f.rank}`, fusionId: f.id });
                                }
                                setMode('comparison');
                                setView('lab');
                              }}
                              className={cn(
                                "p-2 rounded-xl text-xs font-bold transition-colors",
                                isSelected ? "bg-amber-400 text-slate-950 font-black" : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-400"
                              )}
                              title="So sánh"
                            >
                              <Zap className="w-3.5 h-3.5 fill-current" />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setUpgradeFusion(f);
                                setSelectedChars([{ id: crypto.randomUUID(), name: "Pin Infinity", era: "Vật phẩm (Items)", state: "Nguồn năng lượng vô hạn" }]);
                                setView('lab');
                                setMode('fusion');
                              }}
                              className="p-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 rounded-xl transition-colors"
                              title="Nâng cấp với item"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => deleteFusion(f.id, e)}
                              className="p-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-colors"
                              title="Xóa"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              );
            })()}
          </section>
        )}

        {/* Pokemon Card Interactive Inspect Modal */}
        {inspectedFusion && (
          <PokemonCardModal
            fusion={inspectedFusion}
            onRetryImage={retryCardImage}
            retryingImage={retryingImage===inspectedFusion.id}
            onClose={() => setInspectedFusion(null)}
            onCompare={(f) => {
              if (!compareChar1.fusionId || compareChar1.fusionId !== f.id) {
                if (compareChar1.fusionId && (!compareChar2.fusionId || compareChar2.fusionId !== f.id)) {
                  setCompareChar2(compareChar1);
                }
                setCompareChar1({ id: crypto.randomUUID(), name: f.name, era: "Sổ Dung Hợp", state: `Rank ${f.rank}`, fusionId: f.id });
              }
              setMode('comparison');
              setView('lab');
            }}
            onUpgrade={(f) => {
              setUpgradeFusion(f);
              setSelectedChars([{ id: crypto.randomUUID(), name: "Pin Infinity", era: "Vật phẩm (Items)", state: "Nguồn năng lượng vô hạn" }]);
              setView('lab');
              setMode('fusion');
            }}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 opacity-50">
            <FlaskConical className="w-5 h-5" />
            <span className="font-bold tracking-widest text-xs uppercase">Fusion Multiverse Lab</span>
          </div>
          <p className="text-slate-500 text-xs">Powered by Gemini AI & Firebase</p>
        </div>
      </footer>

      {/* Settings Modal */}
      <FusionAppConnectionDialog
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        handleTextModelChange={handleTextModelChange}
        textModel={textModel}
        handleImageModelChange={handleImageModelChange}
        imageModel={imageModel}
        isNsfw={isNsfw}
        setIsNsfw={setIsNsfw}
      />
    </div>
  );
}

export type { PowerComparisonMeta } from "./fusion/types";
