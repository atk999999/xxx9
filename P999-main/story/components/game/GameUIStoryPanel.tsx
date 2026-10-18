import { NarrativeDisplay } from "./NarrativeDisplay";
import type { useGameUIController } from "./useGameUIController";
import { UserMessage } from "./UserMessage";

type Props = Pick<
  ReturnType<typeof useGameUIController>,
  | "cinemaMode"
  | "currentStats"
  | "setShowRealmScaleModal"
  | "loading"
  | "onMultiverse"
  | "setCinemaMode"
  | "onExit"
  | "setShowStatsMobile"
  | "showStatsMobile"
  | "scrollContainerRef"
  | "totalPages"
  | "handlePageChange"
  | "currentPage"
  | "displayedTurns"
  | "wikiEntries"
  | "setSelectedWikiEntry"
  | "session"
  | "currentOptions"
  | "submitTurnWithModifiers"
  | "lengthMode"
  | "bottomRef"
  | "inputMode"
  | "onUndo"
  | "handleContinue"
  | "handleAutoStory"
  | "handlePlotTwist"
  | "force1200"
  | "lengthInfo"
  | "toggleInputMode"
  | "cycleLengthMode"
  | "inputRef"
  | "handleInputSubmit"
>;

export function GameUIStoryPanel({
  cinemaMode,
  currentStats,
  setShowRealmScaleModal,
  loading,
  onMultiverse,
  setCinemaMode,
  onExit,
  setShowStatsMobile,
  showStatsMobile,
  scrollContainerRef,
  totalPages,
  handlePageChange,
  currentPage,
  displayedTurns,
  wikiEntries,
  setSelectedWikiEntry,
  session,
  currentOptions,
  submitTurnWithModifiers,
  lengthMode,
  bottomRef,
  inputMode,
  onUndo,
  handleContinue,
  handleAutoStory,
  handlePlotTwist,
  force1200,
  lengthInfo,
  toggleInputMode,
  cycleLengthMode,
  inputRef,
  handleInputSubmit,
}: Props) {
  return (<div className={`flex-1 flex flex-col h-full w-full min-w-0 max-w-full overflow-hidden relative z-10 transition-all duration-700 ${cinemaMode ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
        
        {/* HEADER - Responsive on mobile */}
        <div className="min-h-[3.5rem] sm:h-16 flex items-center justify-between px-2.5 sm:px-6 border-b border-white/5 bg-ink-950/80 backdrop-blur-md z-50 shadow-sm relative gap-1.5 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 mr-1">
             <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-gold-400 via-crimson-500 to-arcane-600 flex items-center justify-center text-ink-950 shadow-[0_0_15px_rgba(234,179,8,0.3)] shrink-0">
                 <i className="fas fa-yin-yang fa-spin-slow text-xs sm:text-sm text-white"></i>
             </div>
             <div className="flex flex-col min-w-0 flex-1 justify-center">
                 <h1 className="font-display font-bold text-sm sm:text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-parchment-100 to-spirit-300 tracking-wide drop-shadow-sm truncate leading-tight">
                     {currentStats?.name || "Thiên Đạo Simulator"}
                 </h1>
                 
                 {/* Time Display */}
                 {currentStats?.currentTime && (
                     <div className="flex items-center gap-1 text-[9px] sm:text-[10px] uppercase tracking-wider text-ink-500 font-bold truncate mt-0.5">
                         <i className="far fa-clock text-gold-500/70 shrink-0 text-[8px] sm:text-[9px]"></i>
                         <span className="truncate">{currentStats.currentTime}</span>
                     </div>
                 )}
             </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button onClick={() => setShowRealmScaleModal(true)} title="Thước đo cảnh giới đối chiếu" className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-gold-500/15 hover:bg-gold-500/30 text-gold-300 border border-gold-500/40 flex items-center gap-1 text-xs font-bold transition-all shadow-sm">
                <i className="fas fa-ruler-combined text-xs" />
                <span className="hidden md:inline">Thước Đo Cảnh Giới</span>
            </button>
            <button disabled={loading} onClick={onMultiverse} title="Hành trình đa thế giới" className="p-1.5 sm:p-2 text-violet-300 hover:text-white rounded-lg hover:bg-ink-800/50 flex items-center justify-center"><i className="fas fa-globe text-sm sm:text-base" /></button>
            <button onClick={() => setCinemaMode(true)} className="p-1.5 sm:p-2 rounded-lg transition-all flex items-center justify-center text-ink-400 hover:text-parchment-100 hover:bg-ink-800/50" title="Chế độ Điện Ảnh (Ẩn UI)">
                <i className="fas fa-eye-slash text-sm sm:text-base"></i>
            </button>
            <button onClick={onExit} className="p-1.5 sm:p-2 rounded-lg transition-all flex items-center justify-center text-crimson-500/80 hover:text-crimson-400 hover:bg-ink-800/50" title="Về màn hình chính">
                <i className="fas fa-home text-sm sm:text-base"></i>
            </button>
            <button onClick={() => setShowStatsMobile(!showStatsMobile)} className="md:hidden text-parchment-400 p-1.5 sm:p-2 hover:bg-ink-800/50 rounded-lg flex items-center justify-center relative z-50" title="Xem thông tin nhân vật">
                <i className={`fas ${showStatsMobile ? 'fa-times' : 'fa-scroll'} text-sm sm:text-base`}></i>
            </button>
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden px-3 sm:px-6 md:px-20 lg:px-32 py-4 sm:py-8 scroll-smooth scrollbar-thin scrollbar-thumb-gold-500/10 pb-[230px] sm:pb-[220px]">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 w-full min-w-0">
            
            {/* PAGINATION CONTROLS */}
            {totalPages > 1 && (
                <div className="flex justify-center mb-6 animate-fade-in sticky top-0 z-20">
                    <div className="flex items-center gap-2 bg-ink-900/90 rounded-full px-2 py-1.5 border border-ink-700/50 backdrop-blur-md shadow-lg">
                        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="w-8 h-8 rounded-full flex items-center justify-center text-ink-500 hover:text-gold-400 hover:bg-ink-800 transition-colors disabled:opacity-30"><i className="fas fa-angle-double-left text-xs"></i></button>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="w-8 h-8 rounded-full flex items-center justify-center text-ink-500 hover:text-gold-400 hover:bg-ink-800 transition-colors disabled:opacity-30"><i className="fas fa-chevron-left text-xs"></i></button>
                        
                        <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest px-2 min-w-[80px] text-center">
                            Trang {currentPage} / {totalPages}
                        </span>
                        
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="w-8 h-8 rounded-full flex items-center justify-center text-ink-500 hover:text-gold-400 hover:bg-ink-800 transition-colors disabled:opacity-30"><i className="fas fa-chevron-right text-xs"></i></button>
                        <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="w-8 h-8 rounded-full flex items-center justify-center text-ink-500 hover:text-gold-400 hover:bg-ink-800 transition-colors disabled:opacity-30"><i className="fas fa-angle-double-right text-xs"></i></button>
                    </div>
                </div>
            )}

            {/* RENDER TURNS (PAGINATED) */}
            {displayedTurns.map((turn, idx) => {
               let worldEvents: string[] | undefined = undefined;
               if (turn.role === 'model' && turn.rawResponseJSON) {
                   try {
                       const json = JSON.parse(turn.rawResponseJSON);
                       if (Array.isArray(json.worldEvents)) {
                           worldEvents = json.worldEvents;
                       }
                   } catch {}
               }

               return (
                  <div key={idx} className="relative group">
                    {turn.role === 'model' ? (
                        <div className="pl-0 md:pl-0 border-none">
                          <NarrativeDisplay 
                            text={turn.narrative || ''} 
                            worldEvents={worldEvents} 
                            wikiEntries={wikiEntries} 
                            onWikiClick={setSelectedWikiEntry} 
                            style={{ fontFamily: session.fontFamily || "'Merriweather', serif", color: session.textColor || "#fffbeb" }} 
                            isLivingWorldEnabled={session.mechanics?.livingWorld ?? false} 
                          />
                        </div>
                    ) : (
                        <div className="flex justify-center my-6 sm:my-8 animate-slide-up">
                          <div className="relative max-w-2xl w-full group">
                            <div className="px-4 py-4 sm:px-8 sm:py-6 rounded-xl border backdrop-blur-md relative overflow-hidden bg-ink-900/60 border-gold-500/20 shadow-xl">
                              <div className="absolute inset-0 bg-gradient-to-r pointer-events-none from-transparent via-gold-500/5 to-transparent"></div>
                              <i className="fas fa-pen absolute top-4 right-4 text-ink-600 text-xs"></i>
                              
                              <div className="text-[10px] font-bold mb-3 uppercase tracking-[0.2em] flex items-center gap-2 text-gold-500">
                                <i className="fas fa-comment-alt"></i> Mệnh Lệnh
                              </div>
                              {/* Use Collapsible Component */}
                              <UserMessage text={turn.userPrompt || ''} />
                            </div>
                          </div>
                        </div>
                    )}
                  </div>
               );
            })}
            
            {loading && (
              <div className="flex flex-col items-center justify-center space-y-4 py-8 opacity-90">
                <div className="relative w-16 h-16"><div className="absolute inset-0 border-2 border-gold-500/10 rounded-full"></div><div className="absolute inset-0 border-2 border-t-gold-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div><div className="absolute inset-2 border-2 border-t-transparent border-r-crimson-400 border-b-transparent border-l-transparent rounded-full animate-spin-slow direction-reverse"></div><div className="absolute inset-0 flex items-center justify-center"><i className="fas fa-feather-alt text-gold-500/50 animate-pulse"></i></div></div>
                <span className="text-gold-400 text-xs tracking-[0.3em] uppercase animate-pulse font-display">Thiên Đạo Diễn Sinh...</span>
              </div>
            )}
            

            <div ref={bottomRef} className="h-6" />
          </div>
        </div>

        {/* INPUT & CONTROLS - FIXED BOTTOM */}
        <div className={`fixed bottom-0 left-0 right-0 px-2.5 py-2 sm:px-4 sm:py-3 md:p-6 z-40 transition-all duration-500 border-t border-white/5 backdrop-blur-xl shadow-[0_-5px_30px_rgba(0,0,0,0.5)] ${inputMode === 'system' ? 'bg-indigo-950/95 border-t-purple-500/20' : 'bg-ink-900/95 border-t-gold-500/10'}`}>
          <div className="max-w-4xl mx-auto relative flex flex-col gap-1.5 sm:gap-2.5 w-full min-w-0">
            
            {/* QUICK ACTIONS ROW: UNDO, CONTINUE, AUTO STORY, PLOT TWIST */}
            <div className="flex items-center justify-between gap-1 sm:gap-2 w-full min-w-0">
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                <button 
                  onClick={onUndo} 
                  disabled={loading} 
                  className="px-2 py-1 sm:px-3 sm:py-1.5 bg-ink-900/70 border border-ink-700/60 rounded-lg text-[9px] sm:text-[10px] font-bold text-ink-300 hover:text-white hover:border-ink-500 uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 transition-colors"
                >
                  <i className="fas fa-undo text-[8px] sm:text-xs"></i> <span>Hoàn Tác</span>
                </button>
                <button 
                  onClick={handleContinue} 
                  disabled={loading} 
                  className="px-2 py-1 sm:px-3 sm:py-1.5 bg-ink-900/70 border border-ink-700/60 rounded-lg text-[9px] sm:text-[10px] font-bold text-ink-300 hover:text-white hover:border-ink-500 uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 transition-colors"
                >
                  <i className="fas fa-forward text-[8px] sm:text-xs"></i> <span>Tiếp Tục</span>
                </button>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                <button 
                  onClick={handleAutoStory} 
                  disabled={loading}
                  className="bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-500/40 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg font-bold text-[9px] sm:text-[10px] uppercase tracking-wide flex items-center gap-1 sm:gap-1.5 transition-all"
                >
                  <i className="fas fa-route text-[8px] sm:text-xs"></i> <span>Theo Truyện</span>
                </button>
                <button 
                  onClick={handlePlotTwist} 
                  disabled={loading}
                  className="bg-crimson-900/60 hover:bg-crimson-800 text-rose-200 border border-crimson-500/40 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg font-bold text-[9px] sm:text-[10px] uppercase tracking-wide flex items-center gap-1 sm:gap-1.5 transition-all"
                >
                  <i className="fas fa-bolt text-[8px] sm:text-xs"></i> <span>Plot Twist</span>
                </button>
              </div>
            </div>

            {/* STATUS & MODE SUB-BAR */}
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-ink-400 italic px-1 w-full min-w-0">
              <span className="truncate pr-2">
                {inputMode === 'system' ? 'Chế độ Thiên Đạo' : 'Chế độ Nhập Vai'}
              </span>
              <span className="shrink-0 text-gold-500/90 font-medium">
                {force1200 ? 'Epic 1200+ (Khóa)' : (lengthMode === 'epic' ? 'Cực Dài (1200+)' : lengthInfo.label)}
              </span>
            </div>

            {/* INPUT ROW */}
            <div className="flex gap-1.5 sm:gap-2 relative items-stretch w-full min-w-0">
              <button 
                onClick={toggleInputMode}
                className={`w-10 sm:w-12 h-10 sm:h-12 border rounded-xl flex items-center justify-center transition-all shadow-inner shrink-0 ${inputMode === 'system' ? 'bg-purple-900/40 border-purple-500 text-purple-300' : 'bg-gold-900/20 border-gold-500/30 text-gold-400 hover:text-white hover:bg-gold-900/40'}`}
                title={inputMode === 'system' ? "Chuyển sang chế độ Hành Động" : "Chuyển sang chế độ Thiên Đạo"}
              >
                <i className={`fas ${inputMode === 'system' ? 'fa-eye' : 'fa-user'} text-base sm:text-lg`}></i>
              </button>

              <div className={`flex-1 min-w-0 relative group flex items-center border rounded-xl overflow-hidden shadow-inner transition-all ${inputMode === 'system' ? 'bg-indigo-900/40 border-purple-500/50 focus-within:bg-indigo-900/60' : 'bg-ink-900/60 border-ink-700 focus-within:border-gold-500/50 focus-within:bg-ink-800/80'}`}>
                {/* LENGTH SELECTOR */}
                <button 
                  onClick={cycleLengthMode} 
                  disabled={force1200} 
                  className={`px-2.5 sm:px-3 h-full transition-colors flex items-center gap-1.5 border-r border-white/5 shrink-0 ${inputMode === 'system' ? 'text-purple-300 hover:text-purple-200' : 'text-ink-400 hover:text-gold-400'} ${force1200 ? 'opacity-50 cursor-not-allowed' : ''}`} 
                  title="Độ dài câu chuyện"
                >
                  <i className="fas fa-bars text-[10px] sm:text-xs"></i>
                  <span className="text-[11px] sm:text-xs font-bold whitespace-nowrap">{force1200 ? '1200+' : (lengthMode === 'epic' ? `Cực Dài` : lengthInfo.label)}</span>
                </button>
                
                <input 
                  ref={inputRef} 
                  type="text" 
                  placeholder={inputMode === 'system' ? "Nhập ý chí của Thiên Đạo..." : `Ra lệnh cho ${currentStats?.name || session.heroName}...`}
                  className={`flex-1 min-w-0 bg-transparent px-2.5 sm:px-4 py-2 sm:py-3.5 focus:outline-none font-serif h-full text-sm sm:text-base ${inputMode === 'system' ? 'text-purple-100 placeholder-purple-400/50' : 'text-parchment-100 placeholder-ink-600'}`}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !loading) { handleInputSubmit(e.currentTarget.value); e.currentTarget.value = ''; }}} 
                />
              </div>
              
              <button 
                onClick={() => { if(inputRef.current) { handleInputSubmit(inputRef.current.value); inputRef.current.value = ''; } }} 
                disabled={loading} 
                className={`w-11 sm:w-16 h-10 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 border shrink-0 ${inputMode === 'system' ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-purple-400/50 hover:shadow-[0_0_15px_rgba(147,51,234,0.4)]' : 'bg-gradient-to-br from-gold-500 to-amber-600 text-white border-gold-400/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]'}`}
              >
                <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-bolt'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>);
}
