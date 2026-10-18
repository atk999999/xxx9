import { AnimatePresence, motion } from "framer-motion";
import { Book, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { UNIVERSES } from "./characterCatalog";
import { cn, normalizeRankName } from "./presentation";
import { FusionResult } from "./types";

export const CharacterSelector = ({ 
  value, 
  onChange, 
  fusions, 
  upgradeFusion,
  isNsfw,
  fusionsOnly
}: { 
  value: string, 
  onChange: (val: string) => void, 
  fusions: FusionResult[],
  upgradeFusion?: FusionResult | null,
  isNsfw?: boolean,
  fusionsOnly?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCats, setExpandedCats] = useState<string[]>(fusionsOnly ? ["Sổ Dung Hợp"] : ["Vũ trụ 7"]); 
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fusionsOnly && !expandedCats.includes("Sổ Dung Hợp")) {
      setExpandedCats(prev => [...prev, "Sổ Dung Hợp"]);
    }
  }, [fusionsOnly]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCat = (cat: string) => {
    setExpandedCats(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const getDisplayName = (val: string) => {
    if (val.startsWith('FUSION:')) {
      const id = val.replace('FUSION:', '');
      return fusions.find(f => f.id === id)?.name || val;
    }
    return val;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white hover:bg-slate-700 transition-colors"
      >
        <span className="truncate">{getDisplayName(value)}</span>
        <ChevronDown className={cn("w-4 h-4 transition-transform text-slate-500", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-[100] top-full left-0 w-full mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-y-auto max-h-[400px]"
          >
            <div className="p-2 space-y-1">
              {!fusionsOnly && Object.entries(UNIVERSES)
                .filter(([universe]) => {
                  if (universe === "NSFW 18+" && !isNsfw) return false;
                  if (upgradeFusion) {
                    return universe === "Trang bị" || universe === "Vật phẩm (Items)" || universe === "DNA" || (universe === "NSFW 18+" && isNsfw);
                  }
                  return true;
                })
                .map(([universe, chars]) => {
                  const isExpanded = expandedCats.includes(universe);
                  return (
                    <div key={universe} className="space-y-1">
                      <button
                        onClick={() => toggleCat(universe)}
                        className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-slate-800 text-[10px] font-bold uppercase tracking-wider text-cyan-400"
                      >
                        <span>{universe}</span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                      {isExpanded && (
                        <div className="grid grid-cols-1 gap-0.5 pl-2">
                          {chars.map(p => (
                            <button
                              key={p}
                              onClick={() => {
                                onChange(p);
                                setIsOpen(false);
                              }}
                              className={cn(
                                "w-full text-left px-2 py-1.5 rounded-lg text-xs transition-colors",
                                value === p ? "bg-cyan-500/20 text-cyan-400" : "text-slate-300 hover:bg-slate-800"
                              )}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

              {fusions.length > 0 && (
                <div className={cn("space-y-1", !fusionsOnly && "border-t border-slate-800 pt-1 mt-1")}>
                  <button
                    onClick={() => toggleCat("Sổ Dung Hợp")}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-slate-800 text-[10px] font-bold uppercase tracking-wider text-yellow-400"
                  >
                    <span className="flex items-center gap-1"><Book className="w-3 h-3" /> Sổ Dung Hợp</span>
                    {expandedCats.includes("Sổ Dung Hợp") ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                  {expandedCats.includes("Sổ Dung Hợp") && (
                    <div className="grid grid-cols-1 gap-0.5 pl-2">
                      {fusions.map(f => (
                        <button
                          key={f.id}
                          title={f.name}
                          onClick={() => {
                            onChange(`FUSION:${f.id}`);
                            setIsOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-2 py-1.5 rounded-lg text-xs transition-colors",
                            value === `FUSION:${f.id}` ? "bg-yellow-500/20 text-yellow-400" : "text-slate-300 hover:bg-slate-800"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="truncate">{f.name}</span>
                            <span className="text-[9px] font-bold text-cyan-400/80 shrink-0 ml-2">{normalizeRankName(f.rank)}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
