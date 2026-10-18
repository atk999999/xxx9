import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const normalizeRankName = (rank: string): string => {
  const r = (rank || "").toUpperCase().trim();
  if (r.includes("HỖN ĐỘN") || r.includes("CHAOS")) return "HỖN ĐỘN THẦN";
  if (r.includes("KHỞI NGUYÊN") || r.includes("ORIGIN"))
    return "KHỞI NGUYÊN THẦN";
  if (r.includes("ZENO")) return "VUA VẠN VẬT ZENO";
  if (
    r.includes("ĐẠI THIÊN SỨ") ||
    r.includes("GRAND MINISTER") ||
    r.includes("GRAND PRIEST") ||
    r.includes("DAISHINKAN")
  )
    return "ĐẠI THIÊN SỨ";
  if (
    r.includes("THIÊN SỨ") ||
    r.includes("ANGEL") ||
    r === "SS" ||
    r === "SSS"
  )
    return "THIÊN SỨ";
  if (r.includes("HỦY DIỆT") || r.includes("DESTRUCTION") || r === "S")
    return "THẦN HỦY DIỆT";
  if (
    r.includes("VÔ CỰC") ||
    r.includes("INSTINCT") ||
    r === "UR" ||
    r === "LR" ||
    r === "ZEN" ||
    r.includes("BẢN NGÃ")
  )
    return "BẢN NĂNG VÔ CỰC";
  if (
    r.includes("SIÊU SAIYAN") ||
    r.includes("SAIYAN") ||
    r === "SSR" ||
    r === "SR"
  )
    return "SIÊU SAIYAN";
  if (
    r === "A" ||
    r === "B" ||
    r === "C" ||
    r === "D" ||
    r === "E" ||
    r === "F"
  )
    return "CHIẾN BINH PHÀM NHÂN";
  return rank || "CHIẾN BINH PHÀM NHÂN";
};

export const getRankColor = (rank: string) => {
  const r = (rank || "").toUpperCase();
  if (r.includes("HỖN ĐỘN") || r.includes("CHAOS"))
    return "text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-white animate-pulse font-black drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]";
  if (r.includes("KHỞI NGUYÊN") || r.includes("ORIGIN"))
    return "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-pulse font-black drop-shadow-[0_0_12px_rgba(192,38,211,0.6)]";
  if (r.includes("ZENO"))
    return "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 animate-pulse font-black drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]";
  if (r.includes("ĐẠI THIÊN SỨ") || r.includes("GRAND"))
    return "text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-300 to-indigo-300 animate-pulse font-black drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]";
  if (
    r.includes("THIÊN SỨ") ||
    r.includes("ANGEL") ||
    r === "SS" ||
    r === "SSS"
  )
    return "text-yellow-300 font-black drop-shadow-[0_0_8px_rgba(253,224,71,0.5)]";
  if (r.includes("HỦY DIỆT") || r.includes("DESTRUCTION") || r === "S")
    return "text-purple-400 font-black drop-shadow-[0_0_8px_rgba(192,132,252,0.4)]";
  if (
    r.includes("VÔ CỰC") ||
    r.includes("INSTINCT") ||
    r === "UR" ||
    r === "LR" ||
    r === "ZEN" ||
    r.includes("BẢN NGÃ")
  )
    return "text-cyan-300 font-extrabold drop-shadow-[0_0_6px_rgba(103,232,249,0.4)]";
  if (
    r.includes("SIÊU SAIYAN") ||
    r.includes("SAIYAN") ||
    r === "SSR" ||
    r === "SR"
  )
    return "text-amber-400 font-bold";
  return "text-slate-300 font-semibold";
};

export const getRankBg = (rank: string) => {
  const r = (rank || "").toUpperCase();
  if (r.includes("HỖN ĐỘN") || r.includes("CHAOS"))
    return "bg-white/20 border-white/60 shadow-[0_0_30px_rgba(255,255,255,0.4)]";
  if (r.includes("KHỞI NGUYÊN") || r.includes("ORIGIN"))
    return "bg-purple-950/40 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.4)]";
  if (r.includes("ZENO"))
    return "bg-cyan-950/40 border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]";
  if (r.includes("ĐẠI THIÊN SỨ") || r.includes("GRAND"))
    return "bg-blue-950/40 border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]";
  if (
    r.includes("THIÊN SỨ") ||
    r.includes("ANGEL") ||
    r === "SS" ||
    r === "SSS"
  )
    return "bg-yellow-500/10 border-yellow-400/30 shadow-[0_0_10px_rgba(234,179,8,0.2)]";
  if (r.includes("HỦY DIỆT") || r.includes("DESTRUCTION") || r === "S")
    return "bg-purple-900/20 border-purple-500/30";
  if (
    r.includes("VÔ CỰC") ||
    r.includes("INSTINCT") ||
    r === "UR" ||
    r === "LR" ||
    r === "ZEN" ||
    r.includes("BẢN NGÃ")
  )
    return "bg-cyan-950/30 border-cyan-400/30";
  if (
    r.includes("SIÊU SAIYAN") ||
    r.includes("SAIYAN") ||
    r === "SSR" ||
    r === "SR"
  )
    return "bg-amber-950/30 border-amber-400/30";
  return "bg-slate-800/50 border-slate-700/60";
};

export const getRankEnergyType = (rank: string): string => {
  const r = (rank || "").toUpperCase();
  if (r.includes("HỖN ĐỘN") || r.includes("CHAOS"))
    return "Hư Vô Tối Thượng (Vượt trên quy luật không gian thời gian)";
  if (r.includes("KHỞI NGUYÊN") || r.includes("ORIGIN"))
    return "Quyền Năng Sáng Thế & Xóa Bỏ Vô Hạn Vũ Trụ";
  if (r.includes("ZENO"))
    return "Quyền Lực Tuyệt Đối Xóa Sổ Đa Vũ Trụ (Erasing Authority)";
  if (r.includes("ĐẠI THIÊN SỨ") || r.includes("GRAND"))
    return "Thần Khí Tối Thượng Tột Đỉnh (Apex Divine Ki)";
  if (
    r.includes("THIÊN SỨ") ||
    r.includes("ANGEL") ||
    r === "SS" ||
    r === "SSS"
  )
    return "Thần Khí Thiên Sứ & Bản Năng Vô Cực Hoàn Hảo";
  if (r.includes("HỦY DIỆT") || r.includes("DESTRUCTION") || r === "S")
    return "Năng Lượng Hủy Diệt (Hakai Energy)";
  if (
    r.includes("VÔ CỰC") ||
    r.includes("INSTINCT") ||
    r === "UR" ||
    r === "LR" ||
    r === "ZEN" ||
    r.includes("BẢN NGÃ")
  )
    return "Thần Khí Cảnh Giới Vô Cực / Bản Ngã";
  if (
    r.includes("SIÊU SAIYAN") ||
    r.includes("SAIYAN") ||
    r === "SSR" ||
    r === "SR"
  )
    return "Khí Siêu Saiyan Thần / Siêu Saiyan";
  return "Ki Chiến Binh Vũ Trụ (Mortal Ki)";
};

export const formatBP = (bp: number, rank?: string, level?: number): string => {
  if (
    rank &&
    (rank.toUpperCase().includes("HỖN ĐỘN") ||
      rank.toUpperCase().includes("CHAOS"))
  ) {
    return `⭐ x${level || 1}`;
  }
  if (!bp || isNaN(bp)) return "0 BP";
  if (bp >= 1e18) {
    const v = (bp / 1e18).toFixed(1).replace(/\.0$/, "");
    return `${v} Tỷ Tỷ BP`;
  }
  if (bp >= 1e15) {
    const v = (bp / 1e15).toFixed(1).replace(/\.0$/, "");
    return `${v} Triệu Tỷ BP`;
  }
  if (bp >= 1e12) {
    const v = (bp / 1e12).toFixed(1).replace(/\.0$/, "");
    return `${v} Nghìn Tỷ BP`;
  }
  if (bp >= 1e9) {
    const v = (bp / 1e9).toFixed(1).replace(/\.0$/, "");
    return `${v} Tỷ BP`;
  }
  if (bp >= 1e6) {
    const v = (bp / 1e6).toFixed(1).replace(/\.0$/, "");
    return `${v} Triệu BP`;
  }
  return `${bp.toLocaleString("vi-VN")} BP`;
};

export const formatLevel = (level: number, rank?: string): string => {
  if (
    rank &&
    (rank.toUpperCase().includes("HỖN ĐỘN") ||
      rank.toUpperCase().includes("CHAOS"))
  ) {
    return `⭐ x${level || 1}`;
  }
  if (!level || isNaN(level)) return "Cấp 1";
  if (level >= 1e18)
    return `Cấp ${(level / 1e18).toFixed(1).replace(/\.0$/, "")} Tỷ Tỷ`;
  if (level >= 1e15)
    return `Cấp ${(level / 1e15).toFixed(1).replace(/\.0$/, "")} Triệu Tỷ`;
  if (level >= 1e12)
    return `Cấp ${(level / 1e12).toFixed(1).replace(/\.0$/, "")} Nghìn Tỷ`;
  if (level >= 1e9)
    return `Cấp ${(level / 1e9).toFixed(1).replace(/\.0$/, "")} Tỷ`;
  if (level >= 1e6)
    return `Cấp ${(level / 1e6).toFixed(1).replace(/\.0$/, "")} Triệu`;
  return `Cấp ${level.toLocaleString("vi-VN")}`;
};
