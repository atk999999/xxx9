import { compressImage } from './compressImage';
import { readHistory, persistHistory, importHistory, validateHistory, HISTORY_KEY } from './historyStorage';
import { GoogleGenAI } from "@google/genai";
import React, { useEffect, useState } from "react";
import {
  imageFailure,
  missingPortrait,
  requestCardImage,
} from "../../shared/cardImage";
import { getApiKey, getClient } from "../../shared/gemini";
import { CHARACTER_DATA, UNIVERSES } from "./characterCatalog";
import { getEntityPowerInfo } from "./characterPower";
import { buildFusionPrompt } from "./fusionPrompt";
import { calculatePowerComparisonMeta } from "./powerComparison";
import { normalizeRankName } from "./presentation";
import { BaseCharacter, ComparisonResult, FusionResult } from "./types";

export function useFusionAppController() {
  useEffect(() => {
    const refresh = () => {
      try {
        const loaded = readHistory(localStorage);
        if (loaded.error) setError(loaded.error);
        else setFusions(loaded.cards);
      } catch {}
    };
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);
  const [selectedChars, setSelectedChars] = useState<BaseCharacter[]>(() => {
    const saved = localStorage.getItem("selected_chars");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load selected characters:", e);
      }
    }
    return [
      {
        id: crypto.randomUUID(),
        name: "Goku",
        era: "Dragon Ball Z",
        state: "Base",
      },
      {
        id: crypto.randomUUID(),
        name: "Vegeta",
        era: "Dragon Ball Z",
        state: "Base",
      },
    ];
  });
  const [initialHistory] = useState(() => readHistory(localStorage));
  const [fusions, setFusions] = useState<FusionResult[]>(initialHistory.cards);
  const [isFusing, setIsFusing] = useState(false);
  const [retryingImage, setRetryingImage] = useState<string | null>(null);
  const [mode, setMode] = useState<"fusion" | "comparison">("fusion");

  // Comparison State
  const [compareChar1, setCompareChar1] = useState<BaseCharacter>(() => {
    if (fusions.length > 0) {
      const f = fusions[0];
      return {
        id: "c1",
        name: f.name,
        era: "Sổ Dung Hợp",
        state: `Rank ${f.rank}`,
        fusionId: f.id,
      };
    }
    return {
      id: "c1",
      name: "Goku",
      era: "Dragon Ball Super",
      state: "Super Saiyan Blue",
    };
  });
  const [compareChar2, setCompareChar2] = useState<BaseCharacter>(() => {
    if (fusions.length > 1) {
      const f = fusions[1];
      return {
        id: "c2",
        name: f.name,
        era: "Sổ Dung Hợp",
        state: `Rank ${f.rank}`,
        fusionId: f.id,
      };
    }
    return {
      id: "c2",
      name: "Beerus",
      era: "Dragon Ball Super",
      state: "Base",
    };
  });
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonResult, setComparisonResult] =
    useState<ComparisonResult | null>(null);

  const [fusionStep, setFusionStep] = useState<string>("");
  const [currentFusion, setCurrentFusion] = useState<FusionResult | null>(null);
  const [upgradeFusion, setUpgradeFusion] = useState<FusionResult | null>(null);
  const [view, setView] = useState<"lab" | "fusions">("lab");
  const [error, setError] = useState<React.ReactNode | null>(initialHistory.error);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [quotaUsed, setQuotaUsed] = useState<number>(0);
  const [isNsfw, setIsNsfw] = useState<boolean>(() => {
    return localStorage.getItem("is_nsfw") === "true";
  });
  const [inspectedFusion, setInspectedFusion] = useState<FusionResult | null>(
    null,
  );
  const [bookSearch, setBookSearch] = useState("");
  const [bookRankFilter, setBookRankFilter] = useState<string>("all");
  const [bookSortBy, setBookSortBy] = useState<
    "newest" | "power_desc" | "level_desc" | "compat_desc"
  >("newest");
  const [bookViewMode, setBookViewMode] = useState<"grid" | "deck">("grid");
  const [labViewPokemonCard, setLabViewPokemonCard] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const DAILY_QUOTA_LIMIT = 50;

  // --- Latest AI Models Configuration ---
  const [textModel, setTextModel] = useState<string>(() => {
    const saved = localStorage.getItem("gemini_text_model");
    return saved?.trim() || "gemini-3.8-flash";
  });
  const [imageModel, setImageModel] = useState<string>(() => {
    const saved = localStorage.getItem("gemini_image_model");
    return saved?.trim() || "gemini-3.1-flash-lite-image";
  });

  const handleTextModelChange = (model: string) => {
    setTextModel(model);
    localStorage.setItem("gemini_text_model", model);
  };

  const handleImageModelChange = (model: string) => {
    setImageModel(model);
    localStorage.setItem("gemini_image_model", model);
  };

  // --- Quota Management ---
  useEffect(() => {
    const today = new Date().toDateString();
    const savedQuotaDate = localStorage.getItem("fusion_quota_date");
    const savedQuotaUsed = localStorage.getItem("fusion_quota_used");

    if (savedQuotaDate !== today) {
      localStorage.setItem("fusion_quota_date", today);
      localStorage.setItem("fusion_quota_used", "0");
      setQuotaUsed(0);
    } else if (savedQuotaUsed) {
      setQuotaUsed(parseInt(savedQuotaUsed, 10));
    }
  }, []);

  const updateQuota = () => {
    const newUsed = quotaUsed + 1;
    setQuotaUsed(newUsed);
    localStorage.setItem("fusion_quota_used", newUsed.toString());
  };

  // --- Persistence ---
  useEffect(() => {
    try {
      persistHistory(localStorage, fusions);
    } catch {
      setError(
        "Không lưu được sổ dung hợp: dữ liệu cũ lỗi hoặc bộ nhớ đầy. Dữ liệu đang có chưa bị ghi đè; hãy xuất bản sao lưu.",
      );
    }
  }, [fusions]);

  useEffect(() => {
    localStorage.setItem("selected_chars", JSON.stringify(selectedChars));
  }, [selectedChars]);

  const deleteFusion = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDeleting === id) {
      setFusions((prev) => prev.filter((f) => f.id !== id));
      setIsDeleting(null);
    } else {
      setIsDeleting(id);
      setTimeout(() => setIsDeleting(null), 3000);
    }
  };

  const exportBackup = () => {
    const backupData = {
      fusions,
      quotaUsed,
      quotaDate: localStorage.getItem("fusion_quota_date"),
      version: "1.2",
    };
    let data = JSON.stringify(backupData, null, 2);
    let damaged = false;
    const original = localStorage.getItem(HISTORY_KEY);
    if (original !== null) {
      try { validateHistory(JSON.parse(original)); }
      catch { data = original; damaged = true; }
    }
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fusion-lab-${damaged ? "recovery" : "full-backup"}-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const backup = importHistory(localStorage, ev.target?.result as string);
        setFusions(backup.cards);
        // Quota metadata is secondary: a quota write error must not hide a successful card import.
        try {
          if (backup.quotaUsed !== undefined) {
            localStorage.setItem("fusion_quota_used", String(backup.quotaUsed));
            setQuotaUsed(backup.quotaUsed);
          }
          if (backup.quotaDate) localStorage.setItem("fusion_quota_date", backup.quotaDate);
          setError(null);
        } catch {
          setError("Đã nhập thẻ nhưng không lưu được thông tin lượt sử dụng.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Không nhập được bản sao lưu. Dữ liệu cũ được giữ nguyên.");
      }
    };
    reader.readAsText(file);
  };

  // --- Fusion Logic ---
  const addCharacter = () => {
    if (selectedChars.length < 6) {
      if (upgradeFusion) {
        setSelectedChars([
          ...selectedChars,
          {
            id: crypto.randomUUID(),
            name: "Pin Infinity",
            era: "Vật phẩm (Items)",
            state: "Nguồn năng lượng vô hạn",
          },
        ]);
      } else {
        setSelectedChars([
          ...selectedChars,
          {
            id: crypto.randomUUID(),
            name: "Gohan",
            era: "Dragon Ball Z (Teen)",
            state: "Base",
          },
        ]);
      }
    }
  };

  const removeCharacter = (id: string) => {
    const minChars = 1;
    if (selectedChars.length > minChars) {
      setSelectedChars(selectedChars.filter((c) => c.id !== id));
    }
  };

  const updateCharacter = (
    index: number,
    field: keyof BaseCharacter,
    value: string,
  ) => {
    const newChars = [...selectedChars];
    const char = newChars[index];
    if (field === "name") {
      if (value.startsWith("FUSION:")) {
        const fusionId = value.replace("FUSION:", "");
        const fusion = fusions.find((f) => f.id === fusionId);
        if (fusion) {
          newChars[index] = {
            ...char,
            name: fusion.name,
            era: "Sổ Dung Hợp",
            state: `Rank ${fusion.rank}`,
            fusionId: fusion.id,
          };
        }
      } else {
        const firstEra = CHARACTER_DATA[value].eras[0];
        const firstState = CHARACTER_DATA[value].states[firstEra][0];
        newChars[index] = {
          ...char,
          name: value,
          era: firstEra,
          state: firstState,
          fusionId: undefined,
        };
      }
    } else if (field === "era") {
      if (!char.fusionId) {
        const firstState = CHARACTER_DATA[char.name].states[value][0];
        newChars[index] = { ...char, era: value, state: firstState };
      }
    } else if (field === "state") {
      newChars[index] = { ...char, state: value };
    } else if (field === "wish") {
      newChars[index] = { ...char, wish: value };
    }
    setSelectedChars(newChars);
  };

  const startComparison = async () => {
    setIsComparing(true);
    setError(null);
    setComparisonResult(null);
    try {
      const apiKey = getApiKey();
      if (!apiKey) throw new Error("API Key missing");
      const currentAi = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const info1 = getEntityPowerInfo(compareChar1, fusions);
      const info2 = getEntityPowerInfo(compareChar2, fusions);

      const meta = calculatePowerComparisonMeta(info1, info2);
      const expectedWinner = meta.expectedWinner;
      const ratioText = meta.ratioText;
      const prob1 = meta.prob1;
      const prob2 = meta.prob2;

      const prompt = `
        BẠN LÀ CHUYÊN GIA PHÂN TÍCH LỰC CHIẾN DRAGON BALL.
        YÊU CẦU: PHÂN TÍCH SO SÁNH SỨC MẠNH VÀ XÁC ĐỊNH KẾT QUẢ ĐỐI ĐẦU CHUẨN XÁC, NGẮN GỌN, TRỰC DIỆN, KHÔNG RƯỜM RÀ:

        THỰC THỂ 1:
        - Tên: ${info1.name}
        - Trạng thái / Nguồn: ${info1.era} - ${info1.state}
        - Cảnh giới (Rank): ${info1.rank}
        - Cấp độ (Level): ${info1.formattedLevel}
        - Lực chiến (BP): ${info1.formattedPower}
        ${info1.description ? `- Chi tiết: ${info1.description}` : ""}

        THỰC THỂ 2:
        - Tên: ${info2.name}
        - Trạng thái / Nguồn: ${info2.era} - ${info2.state}
        - Cảnh giới (Rank): ${info2.rank}
        - Cấp độ (Level): ${info2.formattedLevel}
        - Lực chiến (BP): ${info2.formattedPower}
        ${info2.description ? `- Chi tiết: ${info2.description}` : ""}

        TƯƠNG QUAN LỰC CHIẾN THỰC TẾ:
        - Điểm sức mạnh quy đổi: ${info1.name} (${info1.score}) vs ${info2.name} (${info2.score})
        - Phán quyết thắng cuộc chuẩn mực: ${expectedWinner}
        - Tỉ lệ chênh lệch: ${ratioText}
        - Phân cấp cảnh giới: ${meta.tierDisparity}

        QUY TẮC BẮT BUỘC (CRITICAL):
        1. Người thắng cuộc (winner) BẮT BUỘC là "${expectedWinner}". Tuyệt đối không phán quyết sai lệch.
        2. Nếu một bên là HỖN ĐỘN THẦN (⭐), KHỞI NGUYÊN THẦN, ZENO, ĐẠI THIÊN SỨ hoặc cách biệt trên 100 lần: Trận chiến là áp đảo chớp nhoáng (One-hit K.O hoặc xóa sổ tức khắc bằng ý nghĩ).
        3. Văn phong súc tích, đi thẳng vào bản chất: cấp bậc thần tính, chất lượng Ki, tốc độ và kinh nghiệm chiến đấu. Không lan man.
        4. Tất cả nội dung viết bằng Tiếng Việt chuẩn mực.

        TRẢ VỀ ĐÚNG ĐỊNH DẠNG JSON:
        {
          "winner": "${expectedWinner}",
          "powerRatio": "${ratioText}",
          "winnerReason": "Lý do then chốt thắng cuộc (1-2 câu súc tích, chuẩn xác)",
          "powerAnalysis": "Phân tích so sánh ngắn gọn, chuẩn xác về cấp bậc, tốc độ, năng lượng (khoảng 3-4 câu)",
          "battleScenario": "Mô tả diễn biến và kết cục trận đấu đúng với tương quan chênh lệch (ngắn gọn, kịch tính)",
          "winProbability": { "char1": ${prob1}, "char2": ${prob2} }
        }
      `;

      const response = await currentAi.models.generateContent({
        model: textModel,
        contents: prompt,
        config: { responseMimeType: "application/json" },
      });

      const result = JSON.parse(response.text);
      result.powerRatio = result.powerRatio || ratioText;
      result.winProbability = result.winProbability || {
        char1: prob1,
        char2: prob2,
      };

      setComparisonResult(result);
    } catch (err) {
      console.error(err);
      setError("Không thể thực hiện so sánh sức mạnh lúc này.");
    } finally {
      setIsComparing(false);
    }
  };

  const retryCardImage = async (card: FusionResult) => {
    if (retryingImage || isFusing) return;
    setRetryingImage(card.id);
    try {
      const prompt =
        card.imagePrompt ||
        sanitizePrompt(
          card.visual_prompt ||
            `16-bit pixel art character portrait. ${card.name}. ${card.description}`,
        );
      const imageUrl = await compressImage(
        await requestCardImage(getClient(), imageModel, prompt),
      );
      const update = (f: FusionResult) =>
        f.id === card.id
          ? {
              ...f,
              imageUrl,
              imageStatus: "ready" as const,
              imageError: "",
              imagePrompt: prompt,
            }
          : f;
      setFusions((prev) => prev.map(update));
      setCurrentFusion((prev) => (prev ? update(prev) : prev));
      setInspectedFusion((prev) => (prev ? update(prev) : prev));
    } catch (e) {
      const message = imageFailure(e);
      const update = (f: FusionResult) =>
        f.id === card.id
          ? { ...f, imageStatus: "failed" as const, imageError: message }
          : f;
      setFusions((prev) => prev.map(update));
      setCurrentFusion((prev) => (prev ? update(prev) : prev));
      setInspectedFusion((prev) => (prev ? update(prev) : prev));
    } finally {
      setRetryingImage(null);
    }
  };

  const sanitizePrompt = (prompt: string): string => {
    let sanitized = prompt;
    sanitized = sanitized.replace(/corpse|dead body|xác/gi, "soulless vessel");
    sanitized = sanitized.replace(/dead eyes|lifeless eyes/gi, "opaque eyes");
    sanitized = sanitized.replace(
      /revived from death|hồi sinh/gi,
      "awakened from slumber",
    );
    sanitized = sanitized.replace(/blood|máu|gore/gi, "crimson energy");
    sanitized = sanitized.replace(/flesh/gi, "physical form");
    sanitized = sanitized.replace(/kill|killing|murder/gi, "defeat");
    sanitized = sanitized.replace(/death|dying/gi, "dormant state");
    return sanitized;
  };

  const startFusion = async () => {
    if (quotaUsed >= DAILY_QUOTA_LIMIT) {
      setError(
        `Bạn đã hết lượt dung hợp trong ngày (${DAILY_QUOTA_LIMIT}/${DAILY_QUOTA_LIMIT}). Vui lòng quay lại vào ngày mai!`,
      );
      return;
    }
    setIsFusing(true);
    const isSummon = selectedChars.length === 1 && !upgradeFusion;
    setFusionStep(
      isSummon
        ? "Đang triệu hồi thực thể bản gốc..."
        : "Đang phân tích cấu trúc DNA...",
    );
    setError(null);
    setCurrentFusion(null);
    try {
      const apiKey = getApiKey();
      if (!apiKey) throw new Error("API Key missing");
      const currentAi = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
      const { prompt, charList } = buildFusionPrompt({
        selectedChars,
        fusions,
        upgradeFusion,
        isSummon,
        isNsfw,
      });
      const dataResponse = await currentAi.models.generateContent({
        model: textModel,
        contents: prompt,
      });
      const text = dataResponse.text?.trim() || "";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const rawJson = jsonMatch ? jsonMatch[0] : text;
      const cleanJson = rawJson.replace(/,\s*\]/g, "]").replace(/,\s*\}/g, "}");
      const fusionData = JSON.parse(cleanJson);

      // Strict mathematical power normalization: BP = Level * 100
      const isChaos =
        (fusionData.rank || "").toUpperCase().includes("HỖN ĐỘN") ||
        (fusionData.rank || "").toUpperCase().includes("CHAOS");
      if (isChaos) {
        fusionData.rank = "HỖN ĐỘN THẦN";
        fusionData.powerLevel = 0;
        fusionData.level = Math.max(
          1,
          Math.round(Number(fusionData.level) || 1),
        );
      } else {
        let lvl = Math.max(1, Math.round(Number(fusionData.level) || 1));
        if (lvl <= 1 && fusionData.powerLevel && fusionData.powerLevel > 100) {
          lvl = Math.round(fusionData.powerLevel / 100);
        }

        const allDBZ = selectedChars.every(
          (c) =>
            (c.era || "").toLowerCase().includes("z") ||
            (c.era || "").toLowerCase().includes("kid") ||
            (c.era || "").toLowerCase().includes("future") ||
            (c.era || "").toLowerCase().includes("dbz"),
        );
        if (allDBZ) {
          if (lvl > 500) {
            lvl = 450;
          }
        }

        fusionData.level = lvl;
        fusionData.powerLevel = lvl * 100;
        fusionData.rank = normalizeRankName(fusionData.rank);

        // Enforce DBZ vs DBS tier separation for power_comparison
        if (
          lvl < 1000 &&
          fusionData.power_comparison &&
          (fusionData.power_comparison.toLowerCase().includes("blue") ||
            fusionData.power_comparison.toLowerCase().includes("thần thánh") ||
            fusionData.power_comparison.toLowerCase().includes("god"))
        ) {
          const dbzRatio = (lvl / 350).toFixed(1);
          fusionData.power_comparison = `Gấp ${dbzRatio} lần Goku Z Base (Tương đương cấp độ phàm nhân/DBZ)`;
        }
      }

      setFusionStep("Đang kiến tạo hình ảnh thực thể...");
      let imagePrompt = "";
      const isDnaTube =
        fusionData.name.startsWith("Ống DNA:") ||
        UNIVERSES["DNA"].includes(fusionData.name);

      if (isDnaTube) {
        imagePrompt = `Dragon Ball Z pixel art style, high quality 2D game asset. Item: A small, elegant glass vial/tube containing swirling, glowing liquid DNA. The liquid is vibrant and reflects the energy of ${fusionData.name}. TUYỆT ĐỐI KHÔNG ĐƯỢC xuất hiện khuôn mặt hay cơ thể nhân vật bên trong hay bên ngoài ống, chỉ là 1 ống thủy tinh chứa DNA lỏng đang cuộn xoáy. Style: 16-bit pixel art, sharp pixels, clean outlines, vibrant colors. Background: Solid dark laboratory background with subtle energy sparks.`;
      } else {
        const isCorpse =
          fusionData.name.toLowerCase().includes("xác") ||
          fusionData.name.toLowerCase().includes("vô hồn");
        const isRevived =
          fusionData.name.toLowerCase().includes("hồi sinh") ||
          fusionData.name.toLowerCase().includes("thức tỉnh");

        let stateDescription = "";
        if (isCorpse) {
          stateDescription =
            "The character is in a soulless state, pale skin, opaque eyes, no energy aura. Eerie atmosphere.";
        } else if (isRevived) {
          stateDescription =
            "The character is fully restored and awakened, glowing with divine energy, vibrant aura, powerful stance, eyes shining with life.";
        }

        imagePrompt = `Dragon Ball Z pixel art sprite style, high quality 2D fighting game character portrait. Character: ${fusionData.visual_prompt || `Fusion of ${charList}`}. ${stateDescription} Face: Unique fusion face, balanced mix of features from ${charList}, serious expression. Style: 16-bit pixel art, sharp pixels, clean outlines, vibrant colors, iconic Dragon Ball sprite aesthetic. Pose: Heroic standing battle stance. Background: Solid dark laboratory background with subtle energy sparks.`;
      }

      imagePrompt = sanitizePrompt(imagePrompt);

      let imageUrl = "";
      let imageError = "";
      try {
        imageUrl = await compressImage(
          await requestCardImage(currentAi, imageModel, imagePrompt),
        );
      } catch (e) {
        imageError = imageFailure(e);
      }
      setFusionStep("Đang lưu hồ sơ nhân vật…");
      const finalFusion: FusionResult = {
        ...fusionData,
        compatibility_score: fusionData.compatibility_score ?? 100,
        compatibility_status: fusionData.compatibility_status ?? "Stable",
        id: crypto.randomUUID(),
        imageUrl: imageUrl || missingPortrait,
        imageStatus: imageUrl ? "ready" : "failed",
        imageError,
        imagePrompt,
        baseCharacters: upgradeFusion
          ? [
              ...upgradeFusion.baseCharacters,
              ...selectedChars
                .filter((c) => c.name !== "Máy Hút DNA")
                .map(({ id, ...rest }) => rest),
            ]
          : selectedChars
              .filter((c) => c.name !== "Máy Hút DNA")
              .map(({ id, ...rest }) => rest),
        userId: "guest",
        createdAt: new Date().toISOString(),
      };

      setFusions((prev) => {
        // Nếu đang nâng cấp, xóa thực thể cũ khỏi danh sách
        const filtered = upgradeFusion
          ? prev.filter((f) => f.id !== upgradeFusion.id)
          : prev;
        return [finalFusion, ...filtered];
      });

      setCurrentFusion(finalFusion);
      setUpgradeFusion(null);
      updateQuota();
      setView("lab");
    } catch (err: any) {
      console.error("Fusion error:", err);
      if (
        err.message?.includes("PERMISSION_DENIED") ||
        err.message?.includes("403")
      ) {
        setError(
          <div className="flex flex-col gap-2">
            <p className="font-bold">
              Lỗi quyền truy cập API (403 Permission Denied).
            </p>
            <p className="text-xs opacity-80">
              Vui lòng chọn API Key từ dự án Google Cloud có bật thanh toán
              (Billing) để sử dụng các mô hình cao cấp như Gemini 3.8 Flash và
              Gemini 3.1 Flash Lite Image.
            </p>
            <div className="flex gap-2 mt-1">
              <a
                href="https://ai.google.dev/gemini-api/docs/billing"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-700 transition-colors"
              >
                Tài liệu Billing
              </a>
            </div>
          </div>,
        );
      } else {
        setError(err.message || "Quá trình dung hợp thất bại.");
      }
    } finally {
      setIsFusing(false);
      setFusionStep("");
    }
  };
  return {
    showMenu,
    setShowMenu,
    setView,
    setMode,
    view,
    mode,
    setShowSettings,
    textModel,
    imageModel,
    DAILY_QUOTA_LIMIT,
    quotaUsed,
    error,
    upgradeFusion,
    setUpgradeFusion,
    selectedChars,
    fusions,
    updateCharacter,
    isNsfw,
    removeCharacter,
    addCharacter,
    startFusion,
    isFusing,
    fusionStep,
    currentFusion,
    setLabViewPokemonCard,
    labViewPokemonCard,
    retryingImage,
    retryCardImage,
    setInspectedFusion,
    setCompareChar1,
    setSelectedChars,
    compareChar1,
    compareChar2,
    setCurrentFusion,
    setCompareChar2,
    startComparison,
    isComparing,
    comparisonResult,
    exportBackup,
    importBackup,
    setFusions,
    bookSearch,
    setBookSearch,
    bookSortBy,
    setBookSortBy,
    setBookViewMode,
    bookViewMode,
    setBookRankFilter,
    bookRankFilter,
    isDeleting,
    deleteFusion,
    inspectedFusion,
    showSettings,
    handleTextModelChange,
    handleImageModelChange,
    setIsNsfw,
  };
}
