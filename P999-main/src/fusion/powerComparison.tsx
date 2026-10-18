import { getEntityPowerInfo } from "./characterPower";
import { getRankEnergyType } from "./presentation";
import { PowerComparisonMeta } from "./types";

export const calculatePowerComparisonMeta = (
  info1: ReturnType<typeof getEntityPowerInfo>,
  info2: ReturnType<typeof getEntityPowerInfo>,
): PowerComparisonMeta => {
  const energyType1 = getRankEnergyType(info1.rank);
  const energyType2 = getRankEnergyType(info2.rank);

  if (info1.score === info2.score) {
    if (info1.isChaos && info2.isChaos) {
      return {
        expectedWinner: "Hòa (Ngang tài ngang sức)",
        winnerChar: 0,
        ratio: 1,
        ratioText: `Cân bằng tuyệt đối ở Cảnh Giới Hỗn Độn Thần (Cùng sở hữu ${info1.level} ⭐)`,
        prob1: 50,
        prob2: 50,
        tierDisparity: "Hỗn Độn Thần Tối Thượng ⭐",
        combatVerdict:
          "Thế trận cân bằng tuyệt đối — Hai thực thể tối cao ngang ngửa về tầng cảnh giới Hư Vô ⭐.",
        energyType1,
        energyType2,
      };
    }
    return {
      expectedWinner: "Hòa (Ngang tài ngang sức)",
      winnerChar: 0,
      ratio: 1,
      ratioText: "Thế trận cân bằng, chênh lệch không đáng kể (Gần như 1:1)",
      prob1: 50,
      prob2: 50,
      tierDisparity: "Cùng đẳng cấp lực chiến",
      combatVerdict:
        "Thế trận giằng co bất phân thắng bại — Lực chiến và nội lực ngang ngửa 1:1.",
      energyType1,
      energyType2,
    };
  }

  const higher = Math.max(info1.score, info2.score);
  const lower = Math.max(1, Math.min(info1.score, info2.score));
  const ratio = higher / lower;
  const winnerChar = info1.score > info2.score ? 1 : 2;
  const higherName = winnerChar === 1 ? info1.name : info2.name;
  const lowerName = winnerChar === 1 ? info2.name : info1.name;
  const lowerState = winnerChar === 1 ? info2.state : info1.state;

  let ratioText = "";
  let prob1 = 50;
  let prob2 = 50;
  let tierDisparity = "";
  let combatVerdict = "";

  if (info1.isChaos && info2.isChaos) {
    const s1 = info1.level;
    const s2 = info2.level;
    const starRatio = Math.max(s1, s2) / Math.max(1, Math.min(s1, s2));
    ratioText = `${higherName} vượt trội với ${Math.max(s1, s2)} ⭐ (Gấp ${starRatio.toFixed(1).replace(/\.0$/, "")} lần so với ${Math.min(s1, s2)} ⭐)`;
    prob1 = s1 > s2 ? 95 : 5;
    prob2 = s2 > s1 ? 95 : 5;
    tierDisparity = "Chênh lệch tầng cấp Hỗn Độn Thần ⭐";
    combatVerdict =
      "Chênh lệch cảnh giới sao ⭐ — Kẻ sở hữu nhiều sao hơn áp đảo hoàn toàn năng lượng hư vô.";
  } else if (info1.isChaos !== info2.isChaos) {
    const nonChaos = info1.isChaos ? info2 : info1;
    if (nonChaos.rank.includes("KHỞI NGUYÊN")) {
      ratioText = `${higherName} ngự trị Cảnh Giới Hỗn Độn Thần ⭐ (Mạnh gấp 1 Tỷ lần Khởi Nguyên Thần)`;
    } else {
      ratioText = `${higherName} ngự trị Cảnh Giới Hỗn Độn Thần ⭐ (Áp đảo vô cực, vượt xa vạn giới)`;
    }
    prob1 = info1.isChaos ? 99.9 : 0.1;
    prob2 = info2.isChaos ? 99.9 : 0.1;
    tierDisparity = "Cảnh Giới Hỗn Độn Thần ⭐ vs Vạn Vật";
    combatVerdict =
      "Áp đảo vô cực — Sức mạnh Hỗn Độn Thần ⭐ đứng trên mọi quy luật hiện thực và vạn vũ trụ.";
  } else if (ratio >= 0.95 && ratio <= 1.05) {
    ratioText = `Thế trận cân bằng, chênh lệch không đáng kể (Gần như 1:1 so với ${lowerName} - ${lowerState})`;
    prob1 = 50;
    prob2 = 50;
    tierDisparity = "Ngang tài ngang sức";
    combatVerdict =
      "Giao tranh kịch tính giằng co — Thắng bại quyết định ở từng khoảnh khắc và bản lĩnh.";
  } else if (ratio >= 0.8 && ratio < 0.95) {
    ratioText = `${higherName} tiệm cận ngưỡng sức mạnh của ${lowerName} (${lowerState}) (Bằng ${(ratio * 100).toFixed(0)}% sức mạnh đối phương)`;
    prob1 = winnerChar === 1 ? 55 : 45;
    prob2 = winnerChar === 2 ? 55 : 45;
    tierDisparity = "Tiệm cận ngưỡng lực chiến";
    combatVerdict =
      "Giao tranh ngang ngửa — Kẻ thấp hơn bám sát nút và có thể lật ngược thế cờ khi sơ hở.";
  } else if (ratio >= 1e18) {
    ratioText = `${higherName} mạnh gấp ${(ratio / 1e18).toFixed(1).replace(/\.0$/, "")} Tỷ Tỷ lần so với ${lowerName} (${lowerState})`;
    prob1 = winnerChar === 1 ? 99.9 : 0.1;
    prob2 = winnerChar === 2 ? 99.9 : 0.1;
    tierDisparity = "Cách biệt vũ trụ vô tận";
    combatVerdict =
      "Xóa sổ ngay tức khắc trong 1 ý niệm — Khoảng cách lực chiến vượt quá tầm hiểu biết vạn vật.";
  } else if (ratio >= 1e15) {
    ratioText = `${higherName} mạnh gấp ${(ratio / 1e15).toFixed(1).replace(/\.0$/, "")} Triệu Tỷ lần so với ${lowerName} (${lowerState})`;
    prob1 = winnerChar === 1 ? 99.9 : 0.1;
    prob2 = winnerChar === 2 ? 99.9 : 0.1;
    tierDisparity = "Cách biệt cảnh giới đa vũ trụ";
    combatVerdict =
      "Xóa sổ chớp mắt — Uy lực đa vũ trụ hủy diệt đối phương ngay khi trận chiến vừa bắt đầu.";
  } else if (ratio >= 1e12) {
    ratioText = `${higherName} mạnh gấp ${(ratio / 1e12).toFixed(1).replace(/\.0$/, "")} Nghìn Tỷ lần so với ${lowerName} (${lowerState})`;
    prob1 = winnerChar === 1 ? 99.9 : 0.1;
    prob2 = winnerChar === 2 ? 99.9 : 0.1;
    tierDisparity = "Cách biệt vạn giới tối cao";
    combatVerdict =
      "Quyền năng thần thánh tuyệt đối — Đối phương hoàn toàn bất lực trước ý chí hủy diệt.";
  } else if (ratio >= 1e6) {
    ratioText = `${higherName} mạnh gấp ${(ratio / 1e6).toFixed(1).replace(/\.0$/, "")} Triệu lần so với ${lowerName} (${lowerState})`;
    prob1 = winnerChar === 1 ? 99.9 : 0.1;
    prob2 = winnerChar === 2 ? 99.9 : 0.1;
    tierDisparity = "Cách biệt tối cao";
    combatVerdict =
      "Áp đảo tuyệt đối — Cảnh giới vượt bậc hàng triệu lần, đè bẹp mọi phản kháng.";
  } else if (ratio >= 1000) {
    ratioText = `${higherName} mạnh gấp ${Math.round(ratio).toLocaleString("vi-VN")} lần so với ${lowerName} (${lowerState})`;
    prob1 = winnerChar === 1 ? 99.5 : 0.5;
    prob2 = winnerChar === 2 ? 99.5 : 0.5;
    tierDisparity = "Cách biệt thần thánh áp đảo";
    combatVerdict =
      "Hạ gục chớp nhoáng (One-hit KO) — Khoảng cách hàng nghìn lần khiến đối thủ không thể chạm tới.";
  } else if (ratio >= 100) {
    ratioText = `${higherName} mạnh gấp ${Math.round(ratio).toLocaleString("vi-VN")} lần so với ${lowerName} (${lowerState})`;
    prob1 = winnerChar === 1 ? 98 : 2;
    prob2 = winnerChar === 2 ? 98 : 2;
    tierDisparity = "Cách biệt cảnh giới tuyệt đối";
    combatVerdict =
      "Áp đảo chớp nhoáng — Khoảng cách cảnh giới hơn 100 lần không cho phép đối phương kịp ra đòn.";
  } else if (ratio >= 10) {
    ratioText = `${higherName} mạnh gấp ${ratio.toFixed(1).replace(/\.0$/, "")} lần so với ${lowerName} (${lowerState})`;
    prob1 = winnerChar === 1 ? 95 : 5;
    prob2 = winnerChar === 2 ? 95 : 5;
    tierDisparity = "Chênh lệch cách biệt lớn";
    combatVerdict =
      "Áp đảo toàn diện — Đối thủ bị dồn ép hoàn toàn và không có cơ hội lật ngược tình thế.";
  } else if (ratio >= 2) {
    ratioText = `${higherName} bằng ${ratio.toFixed(1).replace(/\.0$/, "")} lần sức mạnh của ${lowerName} (${lowerState}) (Cao hơn ${((ratio - 1) * 100).toFixed(0)}%)`;
    prob1 = winnerChar === 1 ? 80 : 20;
    prob2 = winnerChar === 2 ? 80 : 20;
    tierDisparity = "Ưu thế áp đảo rõ rệt";
    combatVerdict =
      "Chiếm ưu thế vượt trội — Làm chủ hoàn toàn nhịp độ trận đấu và kiểm soát thế công.";
  } else if (ratio >= 1.15) {
    ratioText = `${higherName} nhỉnh hơn ${lowerName} (${lowerState}) (Gấp ${ratio.toFixed(2)} lần)`;
    prob1 = winnerChar === 1 ? 65 : 35;
    prob2 = winnerChar === 2 ? 65 : 35;
    tierDisparity = "Chênh lệch kỹ năng & nội lực";
    combatVerdict =
      "Nhỉnh hơn một bậc — Tận dụng sơ hở và lợi thế nội lực để dứt điểm chiến thắng.";
  } else {
    ratioText = `Thế trận cân bằng, chênh lệch không đáng kể (Gần như 1:1 so với ${lowerName} - ${lowerState})`;
    prob1 = 51;
    prob2 = 49;
    tierDisparity = "Ngang tài ngang sức";
    combatVerdict =
      "Giao tranh kịch tính giằng co — Thắng bại quyết định ở từng khoảnh khắc và bản lĩnh.";
  }

  return {
    expectedWinner: higherName,
    winnerChar,
    ratio,
    ratioText,
    prob1,
    prob2,
    tierDisparity,
    combatVerdict,
    energyType1,
    energyType2,
  };
};
