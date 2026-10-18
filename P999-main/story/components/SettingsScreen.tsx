import React from "react";
import { SettingsScreenCharacterSetup } from "./settings/SettingsScreenCharacterSetup";
import { SettingsScreenWorldSelection } from "./settings/SettingsScreenWorldSelection";
import { SettingsScreenProps } from "./settings/types";
import { useSettingsScreenController } from "./settings/useSettingsScreenController";

export const SettingsScreen: React.FC<SettingsScreenProps> = (props) => {
  const [activeTab, setActiveTab] = React.useState<'character' | 'aiConfig' | 'world'>('character');
  const {
    isGeneratingWorld,
    isTransmigration,
    useManualWorldBuilder,
    targetWorldName,
    generatingStatus,
    isCustomGenre,
    customGenreName,
    genre,
    onBack,
    handleSaveDraft,
    showSaveToast,
    handleExportTemplate,
    importInputRef,
    handleImportFile,
    handleImportClick,
    handleStart,
    name,
    setName,
    customTitle,
    setCustomTitle,
    setGender,
    gender,
    backgroundImageUrl,
    setBackgroundImageUrl,
    setBackgroundType,
    backgroundType,
    handleBgClick,
    bgInputRef,
    handleBgFileChange,
    setFontFamily,
    fontFamily,
    setAiModel,
    aiModel,
    memoryDepth,
    setMemoryDepth,
    handleGenreChange,
    handleCustomGenreSelect,
    setCustomGenreName,
    setWritingStyle,
    writingStyle,
    autoPronouns,
    setAutoPronouns,
    setIsNSFW,
    isNSFW,
    setNsfwIntensity,
    nsfwIntensity,
    toggleNsfwFocus,
    nsfwFocus,
    setIsEditingAttributes,
    isEditingAttributes,
    currentPersonality,
    setCurrentPersonality,
    currentData,
    currentTalents,
    setCurrentTalents,
    setUseManualWorldBuilder,
    setTargetWorldName,
    initialTemplate,
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
  } = useSettingsScreenController(props);
  return (
    <div className="min-h-screen bg-transparent text-parchment-100 font-serif flex flex-col selection:bg-gold-500/30 selection:text-gold-200">
      {isGeneratingWorld && (
          <div className="fixed inset-0 z-[300] bg-ink-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-gold-400 to-amber-600 flex items-center justify-center text-ink-950 shadow-[0_0_30px_rgba(234,179,8,0.6)] animate-spin-slow">
                  <i className="fas fa-yin-yang text-3xl"></i>
              </div>
              <h2 className="text-2xl font-display font-bold text-gold-300">
                {isTransmigration && !useManualWorldBuilder 
                  ? `Đang Mở Thiên Môn Giáng Lâm ${targetWorldName}...` 
                  : "Đang Kiến Tạo Thế Giới & Cốt Truyện Độc Bản..."}
              </h2>
              <p className="text-sm text-gold-400 font-mono animate-pulse">{generatingStatus}</p>
              <p className="text-xs text-parchment-300 max-w-md">
                  {isTransmigration && !useManualWorldBuilder
                    ? `Thiên Đạo AI đang tự động phân tích DNA nhân vật và tái hiện bối cảnh, đại thế lực, NPC cùng cốt truyện mở đầu kịch tính của ${targetWorldName}.`
                    : `AI đang tự động thiết lập bối cảnh, hướng đi cốt truyện, các thế lực và NPC cho thể loại ${isCustomGenre ? customGenreName : genre} của bạn.`}
              </p>
          </div>
      )}
      
      {/* HEADER - Keep existing */}
      <header className="border-b border-white/5 bg-ink-950/80 backdrop-blur-md p-4 sticky top-0 z-30 shadow-2xl">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
             <button onClick={onBack} className="text-ink-400 hover:text-white transition-colors">
                <i className="fas fa-arrow-left text-lg"></i>
             </button>
             <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center text-ink-950 shadow-[0_0_20px_rgba(234,179,8,0.4)] ring-2 ring-gold-500/20">
                  <i className="fas fa-yin-yang fa-spin-slow text-lg"></i>
                </div>
                <h1 className="text-xl md:text-2xl font-display font-bold text-parchment-100 tracking-wide hidden md:block">
                  Kiến Tạo <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-amber-500">Nhân Vật</span>
                </h1>
             </div>
          </div>
          <div className="flex gap-3">
             <div className="flex gap-2">
                 <button 
                    onClick={handleSaveDraft} 
                    className="text-xs text-ink-400 hover:text-jade-400 border border-ink-700 hover:border-jade-500/50 w-9 h-9 md:w-auto md:h-auto md:px-3 md:py-2 rounded-full transition-all flex items-center justify-center relative" 
                    title="Lưu Nháp Trình Duyệt (Save Local)"
                 >
                    {showSaveToast && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-jade-600 text-white text-[10px] px-2 py-1 rounded shadow animate-fade-in whitespace-nowrap">
                            Đã Lưu!
                        </div>
                    )}
                    <i className="fas fa-save md:mr-1"></i> 
                    <span className="hidden md:inline">Lưu</span>
                 </button>

                 <button 
                    onClick={handleExportTemplate} 
                    className="text-xs text-ink-400 hover:text-gold-400 border border-ink-700 hover:border-gold-500/50 w-9 h-9 md:w-auto md:h-auto md:px-3 md:py-2 rounded-full transition-all flex items-center justify-center" 
                    title="Xuất File Temp (.json)"
                 >
                    <i className="fas fa-file-export md:mr-1"></i> 
                    <span className="hidden md:inline">Xuất Temp</span>
                 </button>
                 <input type="file" ref={importInputRef} onChange={handleImportFile} accept=".json" className="hidden" />
                 <button 
                    onClick={handleImportClick} 
                    className="text-xs text-ink-400 hover:text-spirit-400 border border-ink-700 hover:border-spirit-500/50 w-9 h-9 md:w-auto md:h-auto md:px-3 md:py-2 rounded-full transition-all flex items-center justify-center" 
                    title="Nhập File Temp (.json)"
                 >
                    <i className="fas fa-file-import md:mr-1"></i> 
                    <span className="hidden md:inline">Nhập Temp</span>
                 </button>
             </div>

             <button
                onClick={handleStart}
                className="group bg-gradient-to-r from-gold-600 to-amber-600 hover:from-gold-500 hover:to-amber-500 text-white font-bold py-2 px-6 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all transform hover:scale-105 flex items-center gap-2 border border-gold-400/50"
             >
                <span className="text-sm tracking-wide">Bắt Đầu</span>
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
             </button>
          </div>
        </div>
      </header>

      {/* TAB NAVIGATION BAR */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-6 pb-2">
        <div className="flex items-center justify-between p-1.5 bg-ink-950/70 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('character')}
            className={`flex-1 py-3 px-3 sm:px-5 rounded-xl font-display font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'character'
                ? 'bg-gradient-to-r from-gold-500/20 to-amber-500/20 text-gold-300 border border-gold-500/50 shadow-md'
                : 'text-ink-500 hover:text-parchment-200 hover:bg-ink-900/50 border border-transparent'
            }`}
          >
            <i className={`fas fa-user-ninja ${activeTab === 'character' ? 'text-gold-400' : 'text-ink-600'}`}></i>
            <span>Nhân Vật</span>
            {name ? (
              <span className="hidden md:inline-block text-[10px] px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 font-mono truncate max-w-[100px]">
                {name}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('aiConfig')}
            className={`flex-1 py-3 px-3 sm:px-5 rounded-xl font-display font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'aiConfig'
                ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-200 border border-purple-500/50 shadow-md'
                : 'text-ink-500 hover:text-parchment-200 hover:bg-ink-900/50 border border-transparent'
            }`}
          >
            <i className={`fas fa-brain ${activeTab === 'aiConfig' ? 'text-purple-400' : 'text-ink-600'}`}></i>
            <span>Cấu Hình AI</span>
            <span className="hidden md:inline-block text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
              {aiModel.includes('3.8') ? '3.8' : aiModel.includes('3.6') ? '3.6' : aiModel.includes('3.5') ? '3.5' : '3.1'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('world')}
            className={`flex-1 py-3 px-3 sm:px-5 rounded-xl font-display font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'world'
                ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-200 border border-emerald-500/50 shadow-md'
                : 'text-ink-500 hover:text-parchment-200 hover:bg-ink-900/50 border border-transparent'
            }`}
          >
            <i className={`fas fa-globe-asia ${activeTab === 'world' ? 'text-emerald-400' : 'text-ink-600'}`}></i>
            <span>Thế Giới</span>
            <span className="hidden md:inline-block text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
              Tiên Nghịch
            </span>
          </button>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8 animate-fade-in pb-20">
        
        {/* TAB 1: CHARACTER & TRAITS */}
        {activeTab === 'character' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Basic Profile & Visual */}
              <div className="lg:col-span-7">
                <SettingsScreenWorldSelection
                  activeTab="character"
                  name={name}
                  setName={setName}
                  customTitle={customTitle}
                  setCustomTitle={setCustomTitle}
                  setGender={setGender}
                  gender={gender}
                  backgroundImageUrl={backgroundImageUrl}
                  setBackgroundImageUrl={setBackgroundImageUrl}
                  setBackgroundType={setBackgroundType}
                  backgroundType={backgroundType}
                  handleBgClick={handleBgClick}
                  bgInputRef={bgInputRef}
                  handleBgFileChange={handleBgFileChange}
                  setFontFamily={setFontFamily}
                  fontFamily={fontFamily}
                  setAiModel={setAiModel}
                  aiModel={aiModel}
                  memoryDepth={memoryDepth}
                  setMemoryDepth={setMemoryDepth}
                  handleGenreChange={handleGenreChange}
                  genre={genre}
                  isCustomGenre={isCustomGenre}
                  handleCustomGenreSelect={handleCustomGenreSelect}
                  customGenreName={customGenreName}
                  setCustomGenreName={setCustomGenreName}
                  setWritingStyle={setWritingStyle}
                  writingStyle={writingStyle}
                  autoPronouns={autoPronouns}
                  setAutoPronouns={setAutoPronouns}
                  setIsNSFW={setIsNSFW}
                  isNSFW={isNSFW}
                  setNsfwIntensity={setNsfwIntensity}
                  nsfwIntensity={nsfwIntensity}
                  toggleNsfwFocus={toggleNsfwFocus}
                  nsfwFocus={nsfwFocus}
                />
              </div>

              {/* Personality & Talents Cards */}
              <div className="lg:col-span-5 space-y-6">
                <div className="glass-panel rounded-2xl p-6 shadow-xl border-t border-white/5">
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                    <h2 className="text-lg font-display font-bold text-parchment-200">
                      Thiên Phú & Tính Cách
                    </h2>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setIsEditingAttributes(!isEditingAttributes)}
                        className={`text-[10px] uppercase tracking-wider font-bold border px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 ${isEditingAttributes ? 'bg-gold-500 text-ink-950 border-gold-500' : 'text-gold-400 border-gold-500/30 hover:bg-gold-500/10'}`}
                        title="Tự nhập tay các chỉ số"
                      >
                        <i className={`fas ${isEditingAttributes ? 'fa-check' : 'fa-pen'}`}></i>
                        {isEditingAttributes ? 'Xong' : 'Tự Chỉnh'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Personality Card */}
                    <div className="p-6 rounded-xl border relative overflow-hidden group transition-all shadow-lg bg-gradient-to-br from-ink-900 to-ink-950 border-ink-800 hover:border-crimson-500/40">
                      <div className="text-[9px] text-ink-500 uppercase tracking-widest mb-2 font-bold">Tính Cách</div>
                      
                      {isEditingAttributes ? (
                        <input 
                          value={currentPersonality}
                          onChange={(e) => setCurrentPersonality(e.target.value)}
                          className="w-full bg-ink-950/50 border border-ink-700 rounded p-2 text-center font-bold font-display text-lg text-crimson-400 focus:border-crimson-500 outline-none placeholder-ink-700 relative z-20"
                          placeholder="Nhập tính cách..."
                        />
                      ) : (
                        <div className="text-lg font-bold font-display text-crimson-400 transition-all leading-tight">
                          {currentPersonality}
                        </div>
                      )}
                    </div>

                    {/* Talents Card */}
                    <div className="p-6 rounded-xl border relative overflow-hidden group transition-all shadow-lg bg-gradient-to-br from-ink-900 to-ink-950 border-ink-800 hover:border-arcane-500/40">
                      <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                        <i className="fas fa-star text-6xl text-arcane-500"></i>
                      </div>

                      <div className="text-[9px] text-ink-500 uppercase tracking-widest mb-4 font-bold">{currentData.talentLabel}</div>
                      
                      {isEditingAttributes ? (
                        <textarea 
                          value={currentTalents.join(", ")}
                          onChange={(e) => setCurrentTalents(e.target.value.split(",").map(t => t.trim()))}
                          className="w-full h-24 bg-ink-950/50 border border-ink-700 rounded p-2 text-sm text-arcane-300 focus:border-arcane-500 outline-none placeholder-ink-700 resize-none relative z-20 font-medium leading-relaxed"
                          placeholder="Nhập các thiên phú, cách nhau bởi dấu phẩy..."
                        />
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {currentTalents.map((t, i) => (
                            <span key={i} className="text-[10px] px-2.5 py-1.5 bg-ink-950 border border-ink-700 rounded text-arcane-300 font-medium">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Step Button */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('aiConfig')}
                className="px-6 py-3 rounded-xl bg-ink-900 hover:bg-ink-800 border border-gold-500/40 text-gold-300 font-bold text-xs sm:text-sm flex items-center gap-2.5 shadow-lg transition-all hover:translate-x-1"
              >
                <span>Tiếp tục: Cấu Hình AI</span>
                <i className="fas fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: AI & ENGINE CONFIGURATION */}
        {activeTab === 'aiConfig' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <SettingsScreenWorldSelection
              activeTab="config"
              name={name}
              setName={setName}
              customTitle={customTitle}
              setCustomTitle={setCustomTitle}
              setGender={setGender}
              gender={gender}
              backgroundImageUrl={backgroundImageUrl}
              setBackgroundImageUrl={setBackgroundImageUrl}
              setBackgroundType={setBackgroundType}
              backgroundType={backgroundType}
              handleBgClick={handleBgClick}
              bgInputRef={bgInputRef}
              handleBgFileChange={handleBgFileChange}
              setFontFamily={setFontFamily}
              fontFamily={fontFamily}
              setAiModel={setAiModel}
              aiModel={aiModel}
              memoryDepth={memoryDepth}
              setMemoryDepth={setMemoryDepth}
              handleGenreChange={handleGenreChange}
              genre={genre}
              isCustomGenre={isCustomGenre}
              handleCustomGenreSelect={handleCustomGenreSelect}
              customGenreName={customGenreName}
              setCustomGenreName={setCustomGenreName}
              setWritingStyle={setWritingStyle}
              writingStyle={writingStyle}
              autoPronouns={autoPronouns}
              setAutoPronouns={setAutoPronouns}
              setIsNSFW={setIsNSFW}
              isNSFW={isNSFW}
              setNsfwIntensity={setNsfwIntensity}
              nsfwIntensity={nsfwIntensity}
              toggleNsfwFocus={toggleNsfwFocus}
              nsfwFocus={nsfwFocus}
              openingLength={openingLength}
              setOpeningLength={setOpeningLength}
              autoCodex={autoCodex}
              setAutoCodex={setAutoCodex}
              livingWorld={livingWorld}
              setLivingWorld={setLivingWorld}
            />

            {/* Bottom Step Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('character')}
                className="px-5 py-3 rounded-xl bg-ink-900 hover:bg-ink-800 border border-ink-700 text-ink-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all hover:-translate-x-1"
              >
                <i className="fas fa-arrow-left text-xs"></i>
                <span>Quay lại Nhân Vật</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('world')}
                className="px-6 py-3 rounded-xl bg-ink-900 hover:bg-ink-800 border border-purple-500/40 text-purple-200 font-bold text-xs sm:text-sm flex items-center gap-2.5 shadow-lg transition-all hover:translate-x-1"
              >
                <span>Tiếp tục: Thiết Lập Thế Giới</span>
                <i className="fas fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: WORLD & TRANSMIGRATION */}
        {activeTab === 'world' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <SettingsScreenCharacterSetup
              isTransmigration={isTransmigration}
              useManualWorldBuilder={useManualWorldBuilder}
              setUseManualWorldBuilder={setUseManualWorldBuilder}
              targetWorldName={targetWorldName}
              setTargetWorldName={setTargetWorldName}
              genre={genre}
              initialTemplate={initialTemplate}
              name={name}
              setGenre={setGenre}
              descentMode={descentMode}
              setDescentMode={setDescentMode}
              setOpeningLength={setOpeningLength}
              openingLength={openingLength}
              setAutoCodex={setAutoCodex}
              autoCodex={autoCodex}
              setLivingWorld={setLivingWorld}
              livingWorld={livingWorld}
              settings={settings}
              handleClearReference={handleClearReference}
              refFileInputRef={refFileInputRef}
              handleReferenceFileChange={handleReferenceFileChange}
              workTitlePrompt={workTitlePrompt}
              setWorkTitlePrompt={setWorkTitlePrompt}
              handleWorkTitleAssist={handleWorkTitleAssist}
              loadingField={loadingField}
              renderWorldField={renderWorldField}
            />

            {/* Bottom Action Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('aiConfig')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-ink-900 hover:bg-ink-800 border border-ink-700 text-ink-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:-translate-x-1"
              >
                <i className="fas fa-arrow-left text-xs"></i>
                <span>Quay lại Cấu Hình AI</span>
              </button>

              <button
                type="button"
                onClick={handleStart}
                className="w-full sm:w-auto group bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 hover:from-gold-400 hover:to-amber-500 text-ink-950 font-display font-extrabold py-3.5 px-9 rounded-xl shadow-[0_0_25px_rgba(234,179,8,0.4)] transition-all transform hover:scale-105 flex items-center justify-center gap-2.5 border border-gold-300/50"
              >
                <i className="fas fa-meteor text-base group-hover:rotate-45 transition-transform"></i>
                <span className="text-sm tracking-wider uppercase">Bắt Đầu Hành Trình</span>
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export { DESCENT_MODES, QUICK_WORLDS } from "./settings/options";
