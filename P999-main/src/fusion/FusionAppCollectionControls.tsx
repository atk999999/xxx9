import {
  Activity,
  Flame,
  Grid,
  List,
  Search,
  Skull,
  Sparkles,
  Star,
  Swords,
  X,
  Zap,
} from "lucide-react";
import { cn } from "./presentation";
import type { useFusionAppController } from "./useFusionAppController";

type Props = Pick<
  ReturnType<typeof useFusionAppController>,
  | "bookSearch"
  | "setBookSearch"
  | "bookSortBy"
  | "setBookSortBy"
  | "setBookViewMode"
  | "bookViewMode"
  | "setBookRankFilter"
  | "bookRankFilter"
  | "fusions"
>;

export function FusionAppCollectionControls({
  bookSearch,
  setBookSearch,
  bookSortBy,
  setBookSortBy,
  setBookViewMode,
  bookViewMode,
  setBookRankFilter,
  bookRankFilter,
  fusions,
}: Props) {
  return (<div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                {/* Search Box */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={bookSearch}
                    onChange={(e) => setBookSearch(e.target.value)}
                    placeholder="Tìm kiếm thẻ bài theo tên, nhân vật hợp thành, hoặc cảnh giới..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400/80 transition-colors"
                  />
                  {bookSearch && (
                    <button 
                      onClick={() => setBookSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Sort & View Mode Toggle */}
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={bookSortBy}
                    onChange={(e: any) => setBookSortBy(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-xs rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-amber-400"
                  >
                    <option value="newest">🕒 Mới Tạo Nhất</option>
                    <option value="power_desc">⚡ Lực Chiến (BP) Cao Nhất</option>
                    <option value="level_desc">🏆 Cấp Độ (Level) Cao Nhất</option>
                    <option value="compat_desc">🧬 Độ Tương Thích Cao Nhất</option>
                  </select>

                  <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setBookViewMode('grid')}
                      className={cn(
                        "p-1.5 rounded-lg transition-colors cursor-pointer",
                        bookViewMode === 'grid' ? "bg-amber-400 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                      )}
                      title="Chế độ Thẻ Bài Pokemon 3D"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookViewMode('deck')}
                      className={cn(
                        "p-1.5 rounded-lg transition-colors cursor-pointer",
                        bookViewMode === 'deck' ? "bg-amber-400 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                      )}
                      title="Chế độ Danh Sách Thẻ TCG"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Energy Type / Rank Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 custom-scrollbar text-xs">
                <button
                  onClick={() => setBookRankFilter('all')}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1",
                    bookRankFilter === 'all' 
                      ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-black" 
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  <span>Tất Cả ({fusions.length})</span>
                </button>

                <button
                  onClick={() => setBookRankFilter('chaos')}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1",
                    bookRankFilter === 'chaos' 
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md font-black" 
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  <Star className="w-3.5 h-3.5" />
                  <span>Hỗn Độn Thần ⭐</span>
                </button>

                <button
                  onClick={() => setBookRankFilter('supreme')}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1",
                    bookRankFilter === 'supreme' 
                      ? "bg-purple-600 text-white shadow-md font-black" 
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Khởi Nguyên & Zeno</span>
                </button>

                <button
                  onClick={() => setBookRankFilter('angel')}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1",
                    bookRankFilter === 'angel' 
                      ? "bg-blue-500 text-white shadow-md font-black" 
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Thiên Sứ & Đại Sứ</span>
                </button>

                <button
                  onClick={() => setBookRankFilter('destroyer')}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1",
                    bookRankFilter === 'destroyer' 
                      ? "bg-purple-800 text-purple-100 shadow-md font-black" 
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  <Skull className="w-3.5 h-3.5" />
                  <span>Thần Hủy Diệt</span>
                </button>

                <button
                  onClick={() => setBookRankFilter('instinct')}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1",
                    bookRankFilter === 'instinct' 
                      ? "bg-cyan-500 text-slate-950 shadow-md font-black" 
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Bản Năng Vô Cực</span>
                </button>

                <button
                  onClick={() => setBookRankFilter('saiyan')}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1",
                    bookRankFilter === 'saiyan' 
                      ? "bg-amber-600 text-white shadow-md font-black" 
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Siêu Saiyan</span>
                </button>

                <button
                  onClick={() => setBookRankFilter('mortal')}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1",
                    bookRankFilter === 'mortal' 
                      ? "bg-slate-700 text-white shadow-md font-black" 
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  <Swords className="w-3.5 h-3.5" />
                  <span>Phàm Nhân</span>
                </button>
              </div>
            </div>);
}
