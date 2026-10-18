import { GameGenre, NSFWFocus, WritingStyle } from "../../types";
import { FONTS } from "./options";
import type { useSettingsScreenController } from "./useSettingsScreenController";

type Props = Pick<
  ReturnType<typeof useSettingsScreenController>,
  | "name"
  | "setName"
  | "customTitle"
  | "setCustomTitle"
  | "setGender"
  | "gender"
  | "backgroundImageUrl"
  | "setBackgroundImageUrl"
  | "setBackgroundType"
  | "backgroundType"
  | "handleBgClick"
  | "bgInputRef"
  | "handleBgFileChange"
  | "setFontFamily"
  | "fontFamily"
  | "setAiModel"
  | "aiModel"
  | "memoryDepth"
  | "setMemoryDepth"
  | "handleGenreChange"
  | "genre"
  | "isCustomGenre"
  | "handleCustomGenreSelect"
  | "customGenreName"
  | "setCustomGenreName"
  | "setWritingStyle"
  | "writingStyle"
  | "autoPronouns"
  | "setAutoPronouns"
  | "setIsNSFW"
  | "isNSFW"
  | "setNsfwIntensity"
  | "nsfwIntensity"
  | "toggleNsfwFocus"
  | "nsfwFocus"
> & {
  activeTab?: "character" | "config" | "all";
  openingLength?: number;
  setOpeningLength?: (val: number) => void;
  autoCodex?: boolean;
  setAutoCodex?: (val: boolean) => void;
  livingWorld?: boolean;
  setLivingWorld?: (val: boolean) => void;
};

export function SettingsScreenWorldSelection({
  activeTab = "all",
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
  genre,
  isCustomGenre,
  handleCustomGenreSelect,
  customGenreName,
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
  openingLength = 0,
  setOpeningLength,
  autoCodex = true,
  setAutoCodex,
  livingWorld = true,
  setLivingWorld,
}: Props) {
  if (activeTab === "character") {
    return (
      <section className="glass-panel rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden border-t border-white/5 h-full">
        <div className="absolute top-0 right-0 p-32 bg-gold-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

        <h2 className="text-lg font-display font-bold text-parchment-100 mb-6 border-b border-white/5 pb-3 flex items-center gap-2.5">
          <i className="fas fa-user-astronaut text-gold-400"></i>
          <span>Hồ Sơ Luân Hồi</span>
        </h2>

        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-ink-500 uppercase tracking-wider">Đạo Hiệu</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-ink-950/40 border border-ink-700 rounded-lg px-3 py-2.5 text-parchment-100 focus:border-gold-500 focus:bg-ink-950/60 outline-none transition-all placeholder-ink-600 font-display text-sm shadow-inner"
                placeholder="Tên nhân vật..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-ink-500 uppercase tracking-wider">Tên File Save (Tùy chọn)</label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full bg-ink-950/40 border border-ink-700 rounded-lg px-3 py-2.5 text-parchment-100 focus:border-gold-500 focus:bg-ink-950/60 outline-none transition-all placeholder-ink-600 font-display text-sm shadow-inner"
                placeholder="Vd: Thế giới One Piece..."
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-ink-500 uppercase tracking-wider">Giới Tính</label>
            <div className="flex bg-ink-950/40 p-1 rounded-lg border border-ink-700 shadow-inner">
              {['Nam', 'Nữ'].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
                    gender === g
                      ? 'bg-ink-800 text-gold-400 shadow-sm border border-ink-600'
                      : 'text-ink-600 hover:text-ink-300'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-ink-500 uppercase tracking-wider block mb-1">Hình Nền / Video (Tùy chọn)</label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="URL Ảnh/Video..."
                  value={backgroundImageUrl}
                  onChange={(e) => setBackgroundImageUrl(e.target.value)}
                  className="w-full bg-ink-950 border border-ink-700 rounded-lg px-3 py-2 text-xs text-parchment-200 outline-none focus:border-gold-500 pr-12"
                />
                <div className="absolute right-0 top-0 h-full flex items-center pr-1">
                  <button
                    type="button"
                    onClick={() => setBackgroundType(prev => prev === 'image' ? 'video' : 'image')}
                    className={`text-[8px] font-bold px-1 py-0.5 rounded ${backgroundType === 'video' ? 'bg-crimson-500/20 text-crimson-400 border border-crimson-500/50' : 'bg-ink-800 text-ink-500 border border-ink-700'}`}
                    title={backgroundType === 'video' ? "Đang chọn chế độ Video" : "Đang chọn chế độ Ảnh"}
                  >
                    {backgroundType === 'video' ? 'VID' : 'IMG'}
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={handleBgClick}
                className="bg-ink-800 border border-ink-700 text-ink-400 px-3 rounded-lg hover:text-gold-400 hover:border-gold-500 transition-colors"
                title="Tải lên tệp ảnh hoặc video từ máy"
              >
                <i className="fas fa-upload text-xs"></i>
              </button>
              <input type="file" ref={bgInputRef} onChange={handleBgFileChange} accept="image/*,video/*" className="hidden" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-ink-500 uppercase tracking-wider block mb-1">Font Chữ Hiển Thị</label>
            <div className="grid grid-cols-2 gap-2">
              {FONTS.map(f => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFontFamily(f.value)}
                  className={`p-2 rounded-lg border text-xs text-left transition-all ${fontFamily === f.value ? 'bg-ink-800 border-gold-500 text-gold-400 shadow-sm' : 'bg-ink-950/40 border-ink-700 text-ink-400 hover:border-ink-500'} ${f.class}`}
                  style={{ fontFamily: f.value }}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (activeTab === "config") {
    return (
      <section className="glass-panel rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden border-t border-white/5 space-y-6">
        <div className="absolute top-0 right-0 p-32 bg-purple-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

        <div className="border-b border-white/5 pb-3 flex items-center justify-between">
          <h2 className="text-lg font-display font-bold text-parchment-100 flex items-center gap-2.5">
            <i className="fas fa-brain text-gold-400"></i>
            <span>Cấu Hình AI & Thiên Đạo Vận Hành</span>
          </h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold">
            {aiModel}
          </span>
        </div>

        {/* AI MODEL SELECTION (2x2 GRID) */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-ink-500 uppercase tracking-wider flex items-center justify-between">
            <span>Mô Hình AI Tạo Sinh Cốt Truyện</span>
            <span className="text-gold-400/80 lowercase text-[9px] font-mono">Đã xác thực hoạt động</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'gemini-3.8-flash', label: 'Flash 3.8', sub: 'Thông Minh Nhất', icon: 'fa-brain', color: 'text-purple-400' },
              { id: 'gemini-3.6-flash', label: 'Flash 3.6', sub: 'Chuẩn Xác & Mượt', icon: 'fa-bolt', color: 'text-yellow-400' },
              { id: 'gemini-3.5-flash', label: 'Flash 3.5', sub: 'Cân Bằng Tối Ưu', icon: 'fa-fire', color: 'text-orange-400' },
              { id: 'gemini-3.1-flash-lite', label: 'Flash Lite 3.1', sub: 'Siêu Tốc Độ', icon: 'fa-feather', color: 'text-blue-400' },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setAiModel(m.id)}
                className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-lg border transition-all ${
                  aiModel === m.id
                    ? 'bg-ink-800 border-gold-500/60 shadow-md ring-1 ring-gold-500/30'
                    : 'bg-ink-950/40 border-ink-700 hover:border-ink-500'
                }`}
              >
                <i className={`fas ${m.icon} ${m.color} text-base mb-1`}></i>
                <span className={`text-[11px] font-bold ${aiModel === m.id ? 'text-gold-300' : 'text-parchment-200'}`}>{m.label}</span>
                <span className="text-[8px] text-ink-500">{m.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* SUPER MEMORY TOGGLE */}
        <div className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 ${memoryDepth === 'high' ? 'bg-jade-900/30 border-jade-500/50 shadow-[0_0_15px_rgba(34,197,94,0.15)]' : 'bg-ink-950/40 border-ink-700'}`}>
          <div>
            <div className={`text-xs font-bold flex items-center gap-2 transition-colors ${memoryDepth === 'high' ? 'text-jade-400' : 'text-parchment-200'}`}>
              <i className="fas fa-microchip"></i>
              <span>SIÊU TRÍ NHỚ (SUPER MEMORY)</span>
            </div>
            <div className="text-[10px] text-ink-400 mt-0.5 leading-relaxed">
              {memoryDepth === 'high'
                ? "AI sẽ nhớ lại chi tiết từ quá khứ rất xa (tăng độ chính xác & nhất quán)."
                : "Chế độ tiêu chuẩn. AI chỉ nhớ các sự kiện gần đây."}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMemoryDepth(prev => prev === 'standard' ? 'high' : 'standard')}
            className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ml-3 ${memoryDepth === 'high' ? 'bg-jade-500' : 'bg-ink-700'}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${memoryDepth === 'high' ? 'translate-x-6' : 'translate-x-1'}`}></div>
          </button>
        </div>

        {/* WRITING STYLE & PRONOUNS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-ink-500 uppercase tracking-wider">Phong Cách Viết</label>
            <div className="flex bg-ink-950/40 p-1 rounded-lg border border-ink-700 shadow-inner">
              {[
                { id: 'convert', label: 'Convert' },
                { id: 'smooth', label: 'Văn Dịch' },
                { id: 'anime', label: 'Anime/LN' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setWritingStyle(s.id as WritingStyle)}
                  className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
                    writingStyle === s.id
                      ? 'bg-ink-800 text-gold-400 shadow-sm border border-ink-600'
                      : 'text-ink-600 hover:text-ink-300'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-ink-500 uppercase tracking-wider flex justify-between items-center">
              <span>Thống Nhất Xưng Hô (AI Tự Động)</span>
            </label>
            <div className="flex items-center justify-between bg-ink-950/40 px-3 py-2 rounded-lg border border-ink-700">
              <span className="text-xs text-ink-400">
                {autoPronouns ? "AI tự định danh theo quan hệ" : "Xưng hô mặc định"}
              </span>
              <button
                type="button"
                onClick={() => setAutoPronouns(!autoPronouns)}
                className={`w-10 h-5 rounded-full border transition-all relative flex-shrink-0 ml-2 ${
                  autoPronouns ? 'bg-gold-600 border-gold-400' : 'bg-ink-900 border-ink-600'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-all ${
                  autoPronouns ? 'left-5' : 'left-0.5'
                }`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* OPENING LENGTH SELECTION */}
        {setOpeningLength && (
          <div className="space-y-2 pt-1 border-t border-white/5">
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
                { val: 1500, label: 'Đại Tự Sự (1500+)' },
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
        )}

        {/* AUTO CODEX & LIVING WORLD SWITCHES */}
        {(setAutoCodex || setLivingWorld) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {setAutoCodex && (
              <div className="bg-ink-950/40 border border-ink-800/80 rounded-xl p-3 flex items-center justify-between">
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
                  className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ml-2 ${autoCodex ? 'bg-gold-500' : 'bg-ink-800'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${autoCodex ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>
            )}

            {setLivingWorld && (
              <div className="bg-ink-950/40 border border-ink-800/80 rounded-xl p-3 flex items-center justify-between">
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
                  className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ml-2 ${livingWorld ? 'bg-arcane-600' : 'bg-ink-800'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${livingWorld ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>
            )}
          </div>
        )}

        {/* NSFW TOGGLE & DETAIL (FULL PRESERVATION) */}
        <div className="pt-3 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-crimson-400 flex items-center gap-2">
                <i className="fas fa-exclamation-triangle"></i>
                Chế độ 18+ (NSFW)
              </span>
              <span className="text-[10px] text-ink-500">Bật nội dung người lớn, ngôn từ thô tục và cảnh nóng.</span>
            </div>
            <button
              type="button"
              onClick={() => setIsNSFW(!isNSFW)}
              className={`w-12 h-6 rounded-full border transition-all relative ${
                isNSFW
                  ? 'bg-crimson-900 border-crimson-500'
                  : 'bg-ink-950 border-ink-700'
              }`}
            >
              <div className={`w-4 h-4 rounded-full absolute top-0.5 transition-all ${
                isNSFW
                  ? 'left-6 bg-crimson-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                  : 'left-1 bg-ink-600'
              }`}></div>
            </button>
          </div>

          {isNSFW && (
            <div className="mt-3 bg-crimson-900/10 border border-crimson-500/20 rounded-lg p-3 animate-slide-up">
              <div className="text-[10px] font-bold text-crimson-300 uppercase tracking-wider mb-2">Mức độ chi tiết</div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setNsfwIntensity('soft')}
                  className={`py-1.5 px-3 rounded text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                    nsfwIntensity === 'soft'
                      ? 'bg-crimson-500/20 text-crimson-200 border-crimson-500/50'
                      : 'bg-ink-900/50 text-ink-500 border-transparent hover:text-crimson-300'
                  }`}
                >
                  <i className="fas fa-feather-alt"></i> Vừa phải (Romantic)
                </button>
                <button
                  type="button"
                  onClick={() => setNsfwIntensity('extreme')}
                  className={`py-1.5 px-3 rounded text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                    nsfwIntensity === 'extreme'
                      ? 'bg-crimson-600 text-white border-crimson-400 shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                      : 'bg-ink-900/50 text-ink-500 border-transparent hover:text-crimson-300'
                  }`}
                >
                  <i className="fas fa-fire"></i> Cực hạn (Hardcore)
                </button>
              </div>

              {nsfwIntensity === 'extreme' && (
                <div className="mt-2 pt-2 border-t border-crimson-500/20">
                  <div className="text-[9px] font-bold text-crimson-300 uppercase tracking-wider mb-2">Trọng tâm miêu tả (Chọn nhiều)</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'body', label: 'Cơ Thể', icon: 'fa-venus' },
                      { id: 'emotion', label: 'Cảm Xúc', icon: 'fa-heart-pulse' },
                      { id: 'dialogue', label: 'Lời Thoại', icon: 'fa-comments' },
                      { id: 'action', label: 'Hành Động', icon: 'fa-hand-rock' },
                      { id: 'vulgar', label: 'Cực Dâm', icon: 'fa-pepper-hot' },
                      { id: 'roleplay', label: 'Giữ Tính Cách', icon: 'fa-user-check' },
                    ].map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleNsfwFocus(item.id as NSFWFocus)}
                        className={`
                          cursor-pointer p-1.5 rounded border text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all
                          ${nsfwFocus.includes(item.id as NSFWFocus)
                            ? 'bg-crimson-500/30 border-crimson-400 text-crimson-100'
                            : 'bg-ink-900/50 border-ink-800 text-ink-500 hover:text-crimson-300'}
                        `}
                      >
                        <i className={`fas ${item.icon}`}></i>
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }

  // FALLBACK: activeTab === 'all'
  return (
    <section className="glass-panel rounded-2xl p-6 md:p-10 shadow-xl relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 p-40 bg-gold-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

      <h2 className="text-xl font-display font-bold text-parchment-100 mb-8 border-b border-white/5 pb-4 flex items-center gap-3">
        <i className="fas fa-user-astronaut text-gold-400"></i>
        Hồ Sơ Luân Hồi
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* COL 1: Basic Info & BG */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-ink-500 uppercase tracking-wider">Đạo Hiệu</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-ink-950/40 border border-ink-700 rounded-lg pl-3 pr-3 py-3 text-parchment-100 focus:border-gold-500 focus:bg-ink-950/60 outline-none transition-all placeholder-ink-600 font-display shadow-inner"
                placeholder="Tên nhân vật..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-ink-500 uppercase tracking-wider">Tên File Save (Tùy chọn)</label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full bg-ink-950/40 border border-ink-700 rounded-lg pl-3 pr-3 py-3 text-parchment-100 focus:border-gold-500 focus:bg-ink-950/60 outline-none transition-all placeholder-ink-600 font-display shadow-inner"
                placeholder="Vd: Thế giới One Piece..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-ink-500 uppercase tracking-wider">Giới Tính</label>
            <div className="flex bg-ink-950/40 p-1 rounded-lg border border-ink-700 shadow-inner">
              {['Nam', 'Nữ'].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${
                    gender === g
                      ? 'bg-ink-800 text-gold-400 shadow-sm border border-ink-600'
                      : 'text-ink-600 hover:text-ink-300'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-ink-500 uppercase tracking-wider block mb-1">Hình Nền / Video (Tùy chọn)</label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="URL Ảnh/Video..."
                  value={backgroundImageUrl}
                  onChange={(e) => setBackgroundImageUrl(e.target.value)}
                  className="w-full bg-ink-950 border border-ink-700 rounded-lg px-3 py-2 text-xs text-parchment-200 outline-none focus:border-gold-500 pr-12"
                />
                <div className="absolute right-0 top-0 h-full flex items-center pr-1">
                  <button
                    type="button"
                    onClick={() => setBackgroundType(prev => prev === 'image' ? 'video' : 'image')}
                    className={`text-[8px] font-bold px-1 py-0.5 rounded ${backgroundType === 'video' ? 'bg-crimson-500/20 text-crimson-400 border border-crimson-500/50' : 'bg-ink-800 text-ink-500 border border-ink-700'}`}
                    title={backgroundType === 'video' ? "Đang chọn chế độ Video" : "Đang chọn chế độ Ảnh"}
                  >
                    {backgroundType === 'video' ? 'VID' : 'IMG'}
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={handleBgClick}
                className="bg-ink-800 border border-ink-700 text-ink-400 px-3 rounded-lg hover:text-gold-400 hover:border-gold-500 transition-colors"
              >
                <i className="fas fa-upload text-xs"></i>
              </button>
              <input type="file" ref={bgInputRef} onChange={handleBgFileChange} accept="image/*,video/*" className="hidden" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-ink-500 uppercase tracking-wider block mb-1">Font Chữ Hiển Thị</label>
            <div className="grid grid-cols-2 gap-2">
              {FONTS.map(f => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFontFamily(f.value)}
                  className={`p-2 rounded-lg border text-xs text-left transition-all ${fontFamily === f.value ? 'bg-ink-800 border-gold-500 text-gold-400 shadow-sm' : 'bg-ink-950/40 border-ink-700 text-ink-400 hover:border-ink-500'} ${f.class}`}
                  style={{ fontFamily: f.value }}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* AI MODEL & MEMORY SELECTION */}
          <div className="space-y-2 mt-2">
            <label className="text-[10px] font-bold text-ink-500 uppercase tracking-wider block mb-1">Cấu Hình AI</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'gemini-3.8-flash', label: 'Flash 3.8', sub: 'Thông Minh Nhất', icon: 'fa-brain', color: 'text-purple-400' },
                { id: 'gemini-3.6-flash', label: 'Flash 3.6', sub: 'Chuẩn Xác & Mượt', icon: 'fa-bolt', color: 'text-yellow-400' },
                { id: 'gemini-3.5-flash', label: 'Flash 3.5', sub: 'Cân Bằng Tối Ưu', icon: 'fa-fire', color: 'text-orange-400' },
                { id: 'gemini-3.1-flash-lite', label: 'Flash Lite 3.1', sub: 'Siêu Tốc Độ', icon: 'fa-feather', color: 'text-blue-400' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setAiModel(m.id)}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-lg border transition-all ${
                    aiModel === m.id
                      ? 'bg-ink-800 border-gold-500/50 shadow-sm'
                      : 'bg-ink-950/40 border-ink-700 hover:border-ink-500'
                  }`}
                >
                  <i className={`fas ${m.icon} ${m.color} text-sm mb-1`}></i>
                  <span className={`text-[10px] font-bold ${aiModel === m.id ? 'text-parchment-100' : 'text-ink-500'}`}>{m.label}</span>
                  <span className="text-[8px] text-ink-600">{m.sub}</span>
                </button>
              ))}
            </div>

            <div className={`mt-3 flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${memoryDepth === 'high' ? 'bg-jade-900/30 border-jade-500/50 shadow-[0_0_15px_rgba(34,197,94,0.15)]' : 'bg-ink-950/40 border-ink-700'}`}>
              <div>
                <div className={`text-xs font-bold flex items-center gap-2 transition-colors ${memoryDepth === 'high' ? 'text-jade-400' : 'text-parchment-200'}`}>
                  <i className="fas fa-microchip"></i>
                  SIÊU TRÍ NHỚ (SUPER MEMORY)
                </div>
                <div className="text-[9px] text-ink-500 mt-1 leading-relaxed">
                  {memoryDepth === 'high'
                    ? "AI sẽ nhớ lại chi tiết từ quá khứ rất xa (tăng độ chính xác & nhất quán)."
                    : "Chế độ tiêu chuẩn. AI chỉ nhớ các sự kiện gần đây."}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMemoryDepth(prev => prev === 'standard' ? 'high' : 'standard')}
                className={`w-10 h-5 rounded-full relative transition-colors ${memoryDepth === 'high' ? 'bg-jade-500' : 'bg-ink-700'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${memoryDepth === 'high' ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* COL 2: Genre & Style */}
        <div className="space-y-6">
          <div className="rounded-lg border border-gold-500/30 bg-gold-500/10 p-3 text-sm text-gold-300 font-semibold">Thế giới cố định: Tiên Nghịch · Tu Tiên</div>
          <details className="rounded-lg border border-ink-700 p-3"><summary className="cursor-pointer text-xs text-ink-400">Tùy chọn hiển thị và kể chuyện nâng cao</summary>
          <div className="space-y-2 mt-3">
            <label className="text-[10px] font-bold text-ink-500 uppercase tracking-wider">Phong Cách Viết</label>
            <div className="flex bg-ink-950/40 p-1 rounded-lg border border-ink-700 shadow-inner">
              {[
                { id: 'convert', label: 'Convert (Hán Việt)' },
                { id: 'smooth', label: 'Văn Dịch' },
                { id: 'anime', label: 'Anime / Light Novel' }
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setWritingStyle(s.id as WritingStyle)}
                  className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${
                    writingStyle === s.id
                      ? 'bg-ink-800 text-gold-400 shadow-sm border border-ink-600'
                      : 'text-ink-600 hover:text-ink-300'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 mt-3">
            <label className="text-[10px] font-bold text-ink-500 uppercase tracking-wider flex justify-between items-center">
              <span>Thống Nhất Xưng Hô (AI Tự Động)</span>
            </label>
            <div className="flex items-center justify-between bg-ink-950/40 p-3 rounded-lg border border-ink-700">
              <div className="text-xs text-ink-400 italic">
                {autoPronouns ? "AI sẽ tự xác định xưng hô dựa trên ngữ cảnh và quan hệ." : "Sử dụng xưng hô mặc định của hệ thống."}
              </div>
              <button
                type="button"
                onClick={() => setAutoPronouns(!autoPronouns)}
                className={`w-12 h-6 rounded-full border transition-all relative flex-shrink-0 ${
                  autoPronouns ? 'bg-gold-600 border-gold-400' : 'bg-ink-900 border-ink-600'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${
                  autoPronouns ? 'left-7' : 'left-1'
                }`}></div>
              </button>
            </div>
          </div>
          </details>
        </div>

        {/* NSFW Toggle (Full Width) */}
        <div className="md:col-span-2 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-crimson-400 flex items-center gap-2">
                <i className="fas fa-exclamation-triangle"></i>
                Chế độ 18+ (NSFW)
              </span>
              <span className="text-[10px] text-ink-500">Bật nội dung người lớn, ngôn từ thô tục và cảnh nóng.</span>
            </div>
            <button
              type="button"
              onClick={() => setIsNSFW(!isNSFW)}
              className={`w-14 h-8 rounded-full border transition-all relative ${
                isNSFW
                  ? 'bg-crimson-900 border-crimson-500'
                  : 'bg-ink-950 border-ink-700'
              }`}
            >
              <div className={`w-6 h-6 rounded-full absolute top-1 transition-all ${
                isNSFW
                  ? 'left-7 bg-crimson-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                  : 'left-1 bg-ink-600'
              }`}></div>
            </button>
          </div>

          {isNSFW && (
            <div className="mt-4 bg-crimson-900/10 border border-crimson-500/20 rounded-lg p-3 animate-slide-up">
              <div className="text-[10px] font-bold text-crimson-300 uppercase tracking-wider mb-2">Mức độ chi tiết</div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setNsfwIntensity('soft')}
                  className={`py-2 px-3 rounded text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                    nsfwIntensity === 'soft'
                      ? 'bg-crimson-500/20 text-crimson-200 border-crimson-500/50'
                      : 'bg-ink-900/50 text-ink-500 border-transparent hover:text-crimson-300'
                  }`}
                >
                  <i className="fas fa-feather-alt"></i> Vừa phải (Romantic)
                </button>
                <button
                  type="button"
                  onClick={() => setNsfwIntensity('extreme')}
                  className={`py-2 px-3 rounded text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                    nsfwIntensity === 'extreme'
                      ? 'bg-crimson-600 text-white border-crimson-400 shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                      : 'bg-ink-900/50 text-ink-500 border-transparent hover:text-crimson-300'
                  }`}
                >
                  <i className="fas fa-fire"></i> Cực hạn (Hardcore)
                </button>
              </div>

              {nsfwIntensity === 'extreme' && (
                <div className="mt-3 pt-3 border-t border-crimson-500/20">
                  <div className="text-[9px] font-bold text-crimson-300 uppercase tracking-wider mb-2">Trọng tâm miêu tả (Chọn nhiều)</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { id: 'body', label: 'Cơ Thể', icon: 'fa-venus' },
                      { id: 'emotion', label: 'Cảm Xúc', icon: 'fa-heart-pulse' },
                      { id: 'dialogue', label: 'Lời Thoại', icon: 'fa-comments' },
                      { id: 'action', label: 'Hành Động', icon: 'fa-hand-rock' },
                      { id: 'vulgar', label: 'Cực Dâm & Trần Trụi', icon: 'fa-pepper-hot' },
                      { id: 'roleplay', label: 'Giữ Đúng Tính Cách', icon: 'fa-user-check' },
                    ].map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleNsfwFocus(item.id as NSFWFocus)}
                        className={`
                          cursor-pointer p-2 rounded border text-xs font-bold flex items-center justify-center gap-2 transition-all
                          ${nsfwFocus.includes(item.id as NSFWFocus)
                            ? 'bg-crimson-500/30 border-crimson-400 text-crimson-100'
                            : 'bg-ink-900/50 border-ink-800 text-ink-500 hover:text-crimson-300'}
                        `}
                      >
                        <i className={`fas ${item.icon}`}></i>
                        {item.label}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-[10px] text-ink-500 italic text-center">
                    *Chọn "Giữ Đúng Tính Cách" để AI không biến nhân vật thành bạo dâm/tàn nhẫn vô lý.
                  </div>
                </div>
              )}

              <div className="mt-2 text-[10px] text-crimson-400/80 italic text-center leading-relaxed pt-2">
                {nsfwIntensity === 'extreme'
                  ? "⚠️ CẢNH BÁO: Dùng từ lóng thô tục (l*n, c*c, đ*t...), mô tả giải phẫu chi tiết. Người chơi kiểm soát hoàn toàn việc kết thúc (xuất tinh)."
                  : "Mô tả cảnh nóng rõ ràng nhưng tập trung vào cảm xúc và cốt truyện."}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
