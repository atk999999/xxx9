import {
  Book,
  FlaskConical,
  Settings,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { cn } from "./presentation";
import type { useFusionAppController } from "./useFusionAppController";

type Props = Pick<
  ReturnType<typeof useFusionAppController>,
  | "setView"
  | "setMode"
  | "view"
  | "mode"
  | "setShowSettings"
  | "textModel"
  | "imageModel"
  | "DAILY_QUOTA_LIMIT"
  | "quotaUsed"
>;

export function FusionAppHeader({
  setView,
  setMode,
  view,
  mode,
  setShowSettings,
  textModel,
  imageModel,
  DAILY_QUOTA_LIMIT,
  quotaUsed,
}: Props) {
  return (<header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-2 overflow-hidden">
          <div className="flex items-center gap-2 cursor-pointer min-w-0" onClick={() => setView('lab')}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
              <FlaskConical className="text-white w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="text-base sm:text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hidden xs:block truncate uppercase">
              DBZ FUSION LAB
            </h1>
          </div>

          <nav className="flex items-center gap-3 sm:gap-6 shrink-0">
            <button 
              onClick={() => { setView('lab'); setMode('fusion'); }}
              className={cn(
                "text-xs sm:text-sm font-medium transition-colors hover:text-cyan-400 flex items-center gap-1 sm:gap-2",
                view === 'lab' && mode === 'fusion' ? "text-cyan-400" : "text-slate-400"
              )}
            >
              <FlaskConical className="w-5 h-5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Dung Hợp</span>
            </button>
            <button 
              onClick={() => { setView('lab'); setMode('comparison'); }}
              className={cn(
                "text-xs sm:text-sm font-medium transition-colors hover:text-cyan-400 flex items-center gap-1 sm:gap-2",
                view === 'lab' && mode === 'comparison' ? "text-cyan-400" : "text-slate-400"
              )}
            >
              <Trophy className="w-5 h-5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">So Sánh</span>
            </button>
            <button 
              onClick={() => setView('fusions')}
              className={cn(
                "text-xs sm:text-sm font-medium transition-colors hover:text-cyan-400 flex items-center gap-1 sm:gap-2",
                view === 'fusions' ? "text-cyan-400" : "text-slate-400"
              )}
            >
              <Book className="w-5 h-5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Sổ Dung Hợp</span>
            </button>
          </nav>

          {/* Active AI Models indicator */}
          <button 
            onClick={() => setShowSettings(true)}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 bg-slate-900/60 border border-cyan-500/30 hover:border-cyan-400 rounded-xl transition-all cursor-pointer group shrink-0"
            title="Nhấp để xem & cài đặt mô hình AI"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[10px] font-bold text-slate-200">
                AI: <span className="text-cyan-400">{textModel.replace('gemini-', '')}</span>
              </span>
              <span className="text-[9px] text-slate-400">
                Ảnh: <span className="text-emerald-400">{imageModel.replace('gemini-', '').replace('-image', '')}</span>
              </span>
            </div>
          </button>

          <button 
            onClick={() => setShowSettings(true)}
            className="p-2 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-cyan-500/30 transition-colors text-slate-400 hover:text-cyan-400 shrink-0"
            title="Cài đặt trò chơi & Mô hình AI"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Quota Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-3 px-2 sm:px-4 py-1 sm:py-2 bg-slate-900/50 border border-slate-800 rounded-xl sm:rounded-2xl hover:border-cyan-500/30 transition-colors group cursor-default min-w-0">
            <div className="relative hidden xs:block shrink-0">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-500 animate-pulse" />
              <div className="absolute inset-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-ping opacity-20" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[7px] sm:text-[9px] uppercase tracking-[0.1em] text-slate-500 font-black leading-none mb-0.5 truncate">Hạn Mức</span>
              <div className="flex items-baseline gap-0.5 sm:gap-1">
                <span className="text-[10px] sm:text-sm font-mono font-black text-slate-200">
                  {DAILY_QUOTA_LIMIT - quotaUsed}
                </span>
                <span className="text-[8px] sm:text-[10px] font-mono font-bold text-slate-600">/{DAILY_QUOTA_LIMIT}</span>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-slate-800 mx-1 shrink-0" />
            <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform shrink-0">
              <Zap className="w-4 h-4 fill-current" />
            </div>
          </div>
        </div>
      </header>);
}
