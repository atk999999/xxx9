import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";

export function MainMenu({ onStart }: { onStart: () => void }) {
  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center space-y-8 max-w-md w-full text-center"
      >
        {/* Author Image */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
          <div className="relative w-32 h-32 rounded-full border-2 border-slate-800 overflow-hidden shadow-2xl bg-slate-900">
            <img 
              src="https://i.pinimg.com/736x/f1/73/4e/f1734e565985011684c3600f1352467d.jpg"
              alt="Author"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/tom-thinking/300/300";
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            FUSION MULTIVERSE
          </h1>
          <div className="flex items-center justify-center gap-2 text-cyan-400 font-mono text-sm font-bold">
            <Sparkles className="w-4 h-4" />
            <span>PHIÊN BẢN 2.5</span>
          </div>
        </div>

        <div className="w-full space-y-4 pt-8">
          <button 
            onClick={onStart}
            className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
          >
            <Zap className="w-6 h-6 fill-current group-hover:animate-pulse" />
            BẮT ĐẦU GAME
          </button>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-left">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Tác giả</p>
              <p className="text-sm font-bold text-slate-200">Lá bài tẩy</p>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-left">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Zalo</p>
              <p className="text-sm font-bold text-slate-200">0799885135</p>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-slate-600 font-medium pt-8">
          © 2024 Fusion Multiverse Lab. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
