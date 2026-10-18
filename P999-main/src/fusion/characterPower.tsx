import { formatBP, formatLevel } from "./presentation";
import { BaseCharacter, FusionResult } from "./types";

export const getStandardCharacterStats = (
  name: string,
  era: string = "Dragon Ball Super",
  state: string = "Base",
) => {
  const n = (name || "").toLowerCase();
  const s = (state || "").toLowerCase();
  const e = (era || "").toLowerCase();
  const isDBZ =
    e.includes("z") ||
    e.includes("kid") ||
    e.includes("future") ||
    e.includes("dbz");

  // Supreme Deities
  if (n.includes("hỗn độn") || n.includes("chaos")) {
    let stars = 1;
    if (s.includes("10") || s.includes("x10")) stars = 10;
    else if (s.includes("5") || s.includes("⭐⭐⭐⭐⭐")) stars = 5;
    else if (s.includes("3") || s.includes("⭐⭐⭐")) stars = 3;
    else if (s.includes("2") || s.includes("⭐⭐")) stars = 2;
    return {
      rank: "HỖN ĐỘN THẦN",
      level: stars,
      powerLevel: 0,
      isChaos: true,
      score: 3e27 * stars,
    };
  }
  if (n.includes("khởi nguyên") || n.includes("origin god")) {
    const isAwakened = s.includes("thức tỉnh") || s.includes("ý nghĩ");
    const lvl = isAwakened ? 6e18 : 3e18; // 3 Tỷ Tỷ Level
    return {
      rank: "KHỞI NGUYÊN THẦN",
      level: lvl,
      powerLevel: lvl * 100,
      isChaos: false,
      score: lvl,
    };
  }
  if (n.includes("zeno")) {
    const isMax = s.includes("xóa sổ") || s.includes("angry");
    const lvl = isMax ? 6e12 : 3e12; // 3 Nghìn Tỷ Level
    return {
      rank: "ZENO",
      level: lvl,
      powerLevel: lvl * 100,
      isChaos: false,
      score: lvl,
    };
  }
  if (
    n.includes("đại thiên sứ") ||
    n.includes("grand priest") ||
    n.includes("grand minister") ||
    n.includes("daishinkan")
  ) {
    const isFull = s.includes("full") || s.includes("serious");
    const lvl = isFull ? 45_000_000_000 : 30_000_000_000; // 30 Tỷ Level (3000x Whis)
    return {
      rank: "ĐẠI THIÊN SỨ",
      level: lvl,
      powerLevel: lvl * 100,
      isChaos: false,
      score: lvl,
    };
  }
  if (
    n.includes("whis") ||
    n.includes("vados") ||
    n.includes("marcarita") ||
    n.includes("chronoa") ||
    n.includes("thiên sứ")
  ) {
    const isSerious = s.includes("serious");
    const lvl = isSerious ? 12_000_000 : 10_000_000; // 10 Triệu Level
    return {
      rank: "THIÊN SỨ",
      level: lvl,
      powerLevel: lvl * 100,
      isChaos: false,
      score: lvl,
    };
  }
  if (
    n.includes("beerus") ||
    n.includes("champa") ||
    n.includes("belmod") ||
    n.includes("hủy diệt")
  ) {
    const isHakai = s.includes("hakai") || s.includes("serious");
    const lvl = isHakai ? 120_000 : 100_000;
    return {
      rank: "THẦN HỦY DIỆT",
      level: lvl,
      powerLevel: lvl * 100,
      isChaos: false,
      score: lvl,
    };
  }

  // Dragon Ball Z Era Strict Scaling (Max level 500, never reaches Super Saiyan Blue Level 1,000)
  if (isDBZ) {
    if (n.includes("goku")) {
      if (s.includes("super saiyan 3") || s.includes("ss3"))
        return {
          rank: "SIÊU SAIYAN",
          level: 350,
          powerLevel: 35_000,
          isChaos: false,
          score: 350,
        };
      if (s.includes("super saiyan 2") || s.includes("ss2"))
        return {
          rank: "SIÊU SAIYAN",
          level: 250,
          powerLevel: 25_000,
          isChaos: false,
          score: 250,
        };
      if (s.includes("super saiyan") || s.includes("ss"))
        return {
          rank: "SIÊU SAIYAN",
          level: 150,
          powerLevel: 15_000,
          isChaos: false,
          score: 150,
        };
      return {
        rank: "CHIẾN BINH PHÀM NHÂN",
        level: 50,
        powerLevel: 5_000,
        isChaos: false,
        score: 50,
      };
    }
    if (n.includes("vegeta")) {
      if (s.includes("majin") || s.includes("super saiyan 2"))
        return {
          rank: "SIÊU SAIYAN",
          level: 240,
          powerLevel: 24_000,
          isChaos: false,
          score: 240,
        };
      if (s.includes("super saiyan"))
        return {
          rank: "SIÊU SAIYAN",
          level: 140,
          powerLevel: 14_000,
          isChaos: false,
          score: 140,
        };
      return {
        rank: "CHIẾN BINH PHÀM NHÂN",
        level: 45,
        powerLevel: 4_500,
        isChaos: false,
        score: 45,
      };
    }
    if (n.includes("gogeta") || n.includes("vegito")) {
      return {
        rank: "SIÊU SAIYAN",
        level: 480,
        powerLevel: 48_000,
        isChaos: false,
        score: 480,
      };
    }
    return {
      rank: "CHIẾN BINH PHÀM NHÂN",
      level: 100,
      powerLevel: 10_000,
      isChaos: false,
      score: 100,
    };
  }

  // Dragon Ball GT Era Scaling
  if (e.includes("gt")) {
    if (s.includes("ss4") || s.includes("4"))
      return {
        rank: "SIÊU SAIYAN 4",
        level: 2_000,
        powerLevel: 200_000,
        isChaos: false,
        score: 2_000,
      };
    return {
      rank: "SIÊU SAIYAN",
      level: 800,
      powerLevel: 80_000,
      isChaos: false,
      score: 800,
    };
  }

  // Goku (DBS / Default)
  if (n.includes("goku")) {
    if (
      s.includes("bản năng vô cực") ||
      s.includes("ultra instinct") ||
      s.includes("ui")
    ) {
      return {
        rank: "BẢN NĂNG VÔ CỰC",
        level: 50_000,
        powerLevel: 5_000_000,
        isChaos: false,
        score: 50_000,
      };
    }
    if (s.includes("blue evolution") || s.includes("kaioken")) {
      return {
        rank: "SIÊU SAIYAN BLUE",
        level: 1_500,
        powerLevel: 150_000,
        isChaos: false,
        score: 1_500,
      };
    }
    if (s.includes("blue") || s.includes("ssb")) {
      return {
        rank: "SIÊU SAIYAN BLUE",
        level: 1_000,
        powerLevel: 100_000,
        isChaos: false,
        score: 1_000,
      };
    }
    if (s.includes("god")) {
      return {
        rank: "SIÊU SAIYAN GOD",
        level: 800,
        powerLevel: 80_000,
        isChaos: false,
        score: 800,
      };
    }
    if (s.includes("super saiyan 4") || s.includes("ss4")) {
      return {
        rank: "SIÊU SAIYAN 4",
        level: 2_500,
        powerLevel: 250_000,
        isChaos: false,
        score: 2_500,
      };
    }
    if (s.includes("super saiyan 3") || s.includes("ss3")) {
      return {
        rank: "SIÊU SAIYAN 3",
        level: 500,
        powerLevel: 50_000,
        isChaos: false,
        score: 500,
      };
    }
    if (s.includes("super saiyan 2") || s.includes("ss2")) {
      return {
        rank: "SIÊU SAIYAN 2",
        level: 450,
        powerLevel: 45_000,
        isChaos: false,
        score: 450,
      };
    }
    if (s.includes("super saiyan") || s.includes("ss")) {
      return {
        rank: "SIÊU SAIYAN",
        level: 400,
        powerLevel: 40_000,
        isChaos: false,
        score: 400,
      };
    }
    return {
      rank: "CHIẾN BINH PHÀM NHÂN",
      level: 350,
      powerLevel: 35_000,
      isChaos: false,
      score: 350,
    };
  }

  // Vegeta (DBS / Default)
  if (n.includes("vegeta")) {
    if (s.includes("ultra ego") || s.includes("bản ngã")) {
      return {
        rank: "BẢN NĂNG VÔ CỰC",
        level: 50_000,
        powerLevel: 5_000_000,
        isChaos: false,
        score: 50_000,
      };
    }
    if (s.includes("blue evolution") || s.includes("evolution")) {
      return {
        rank: "SIÊU SAIYAN BLUE",
        level: 1_200,
        powerLevel: 120_000,
        isChaos: false,
        score: 1_200,
      };
    }
    if (s.includes("blue") || s.includes("ssb")) {
      return {
        rank: "SIÊU SAIYAN BLUE",
        level: 980,
        powerLevel: 98_000,
        isChaos: false,
        score: 980,
      };
    }
    if (s.includes("god")) {
      return {
        rank: "SIÊU SAIYAN GOD",
        level: 790,
        powerLevel: 79_000,
        isChaos: false,
        score: 790,
      };
    }
    if (s.includes("ss4")) {
      return {
        rank: "SIÊU SAIYAN 4",
        level: 2_400,
        powerLevel: 240_000,
        isChaos: false,
        score: 2_400,
      };
    }
    if (s.includes("super saiyan")) {
      return {
        rank: "SIÊU SAIYAN",
        level: 400,
        powerLevel: 40_000,
        isChaos: false,
        score: 400,
      };
    }
    return {
      rank: "CHIẾN BINH PHÀM NHÂN",
      level: 340,
      powerLevel: 34_000,
      isChaos: false,
      score: 340,
    };
  }

  // Jiren
  if (n.includes("jiren")) {
    const isLmt = s.includes("limit") || s.includes("full");
    const lvl = isLmt ? 48_000 : 15_000;
    return {
      rank: "BẢN NĂNG VÔ CỰC",
      level: lvl,
      powerLevel: lvl * 100,
      isChaos: false,
      score: lvl,
    };
  }

  // Broly
  if (n.includes("broly")) {
    if (s.includes("full power") || s.includes("legendary")) {
      return {
        rank: "BẢN NĂNG VÔ CỰC",
        level: 40_000,
        powerLevel: 4_000_000,
        isChaos: false,
        score: 40_000,
      };
    }
    if (s.includes("super saiyan")) {
      return {
        rank: "SIÊU SAIYAN",
        level: 8_000,
        powerLevel: 800_000,
        isChaos: false,
        score: 8_000,
      };
    }
    if (s.includes("wrathful")) {
      return {
        rank: "SIÊU SAIYAN",
        level: 1_500,
        powerLevel: 150_000,
        isChaos: false,
        score: 1_500,
      };
    }
    return {
      rank: "CHIẾN BINH PHÀM NHÂN",
      level: 400,
      powerLevel: 40_000,
      isChaos: false,
      score: 400,
    };
  }

  // Gogeta / Vegito
  if (n.includes("gogeta") || n.includes("vegito")) {
    if (s.includes("blue")) {
      return {
        rank: "BẢN NĂNG VÔ CỰC",
        level: 45_000,
        powerLevel: 4_500_000,
        isChaos: false,
        score: 45_000,
      };
    }
    if (s.includes("ss4")) {
      return {
        rank: "BẢN NĂNG VÔ CỰC",
        level: 30_000,
        powerLevel: 3_000_000,
        isChaos: false,
        score: 30_000,
      };
    }
    return {
      rank: "SIÊU SAIYAN",
      level: 5_000,
      powerLevel: 500_000,
      isChaos: false,
      score: 5_000,
    };
  }

  // Frieza
  if (n.includes("frieza")) {
    if (s.includes("black")) {
      return {
        rank: "BẢN NĂNG VÔ CỰC",
        level: 55_000,
        powerLevel: 5_500_000,
        isChaos: false,
        score: 55_000,
      };
    }
    if (s.includes("golden")) {
      return {
        rank: "SIÊU SAIYAN BLUE",
        level: 1_000,
        powerLevel: 100_000,
        isChaos: false,
        score: 1_000,
      };
    }
    return {
      rank: "CHIẾN BINH PHÀM NHÂN",
      level: 300,
      powerLevel: 30_000,
      isChaos: false,
      score: 300,
    };
  }

  // Gohan
  if (n.includes("gohan")) {
    if (s.includes("beast")) {
      return {
        rank: "BẢN NĂNG VÔ CỰC",
        level: 48_000,
        powerLevel: 4_800_000,
        isChaos: false,
        score: 48_000,
      };
    }
    if (s.includes("ultimate")) {
      return {
        rank: "SIÊU SAIYAN",
        level: 900,
        powerLevel: 90_000,
        isChaos: false,
        score: 900,
      };
    }
    return {
      rank: "CHIẾN BINH PHÀM NHÂN",
      level: 320,
      powerLevel: 32_000,
      isChaos: false,
      score: 320,
    };
  }

  return {
    rank: "CHIẾN BINH PHÀM NHÂN",
    level: 200,
    powerLevel: 20_000,
    isChaos: false,
    score: 200,
  };
};

export const getEntityPowerInfo = (
  char: BaseCharacter,
  fusions: FusionResult[],
) => {
  if (char.fusionId) {
    const fusion = fusions.find((f) => f.id === char.fusionId);
    if (fusion) {
      const isChaos =
        (fusion.rank || "").toUpperCase().includes("HỖN ĐỘN") ||
        (fusion.rank || "").toUpperCase().includes("CHAOS");
      const stars = Math.max(1, fusion.level || 1);
      const level = isChaos
        ? stars
        : fusion.level ||
          Math.max(1, Math.round((fusion.powerLevel || 100) / 100));
      const powerLevel = isChaos ? 0 : level * 100;
      const score = isChaos ? 3e27 * stars : level;

      return {
        name: fusion.name,
        era: "Sổ Dung Hợp",
        state: `Rank ${fusion.rank}`,
        rank: fusion.rank,
        level,
        powerLevel,
        isChaos,
        score,
        formattedPower: formatBP(powerLevel, fusion.rank, level),
        formattedLevel: formatLevel(level, fusion.rank),
        imageUrl: fusion.imageUrl,
        description: fusion.description,
      };
    }
  }

  // Standard character
  const stats = getStandardCharacterStats(char.name, char.era, char.state);
  return {
    name: char.name,
    era: char.era,
    state: char.state,
    rank: stats.rank,
    level: stats.level,
    powerLevel: stats.powerLevel,
    isChaos: stats.isChaos,
    score: stats.score,
    formattedPower: formatBP(stats.powerLevel, stats.rank, stats.level),
    formattedLevel: formatLevel(stats.level, stats.rank),
    imageUrl: undefined,
    description: `Nhân vật Dragon Ball: ${char.name} (${char.era} - ${char.state})`,
  };
};
