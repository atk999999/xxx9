# Dragon Ball Fusion Lab - Project Rules & Persistent Commands

## Power Scaling Rules
- **Proportionality:** `powerLevel` (BP) and `level` MUST be strictly proportional.
- **Consistency:** If Character A has higher BP than Character B, A MUST also have a higher Level.
- **Benchmark Scale:**
  - Goku DBS (Base): Level 350 (BP: 35,000)
  - Goku DBS (SSB): Level 1,000 (BP: 100,000)
  - Vegeta Blue Evolution: Level 1,200 (BP: 120,000)
  - Goku Ultra Instinct: Level 50,000+ (BP: 5,000,000)
  - Beerus (Hakai): Level 100,000+ (BP: 10,000,000)
  - Whis (Angel / Thiên Sứ): Level 10,000,000+ (BP: 1,000,000,000)
  - Đại Thiên Sứ (Grand Priest / Minister): Mạnh hơn Whis 3,000 lần -> Level 30,000,000,000 (30 Tỷ) | BP = 3,000,000,000,000 (3 Nghìn Tỷ).
  - Zeno (Vua Vạn Vật): Mạnh hơn Đại Thiên Sứ 100 lần -> Level 3,000,000,000,000 (3 Nghìn Tỷ) | BP = 300,000,000,000,000 (300 Triệu Tỷ).
  - Khởi Nguyên Thần (Origin God): Mạnh hơn Zeno 1,000,000 (1 triệu) lần -> Level 3,000,000,000,000,000,000 (3 Tỷ Tỷ) | BP = 300 Tỷ Tỷ. Sức mạnh: 1 ý nghĩ có thể xóa sổ vạn thế giới.
  - Hỗn Độn Thần (Chaos God): Trên Khởi Nguyên Thần, mạnh gấp 1,000,000,000 (1 tỷ) lần Khởi Nguyên Thần.
    - **Quy tắc đặc biệt Hỗn Độn Thần:** Ở cảnh giới này, BP và Level sẽ được thay thế bằng ngôi sao ⭐ màu trắng. Sức mạnh so sánh bằng số lượng ngôi sao (mỗi ngôi sao = 1 tầng cảnh giới Hỗn Độn Thần).
- **Formula:** BP = Level * 100 (với các cấp bậc dưới Hỗn Độn Thần). Hỗn Độn Thần dùng ⭐.

## Fusion & Item Logic
- **Soul Fusion (Linh hồn - Hồi sinh):**
  - When a "Linh hồn" (Soul) fuses with a "Xác" (Corpse) or "Vô hồn" (Soulless) body, the result MUST be a "Hồi sinh" (Revived) or "Thức tỉnh" (Awakened) state.
  - **Visual Requirement:** The resulting image MUST show a vibrant, living character with glowing energy, bright eyes, and a powerful aura.
  - **Naming:** Must include "(Hồi sinh)" or "(Thức tỉnh)".
  - **Prompt Safety:** When generating the image prompt for a "Xác" or "Hồi sinh" character, NEVER use the words "Corpse", "Dead", or "Xác". Use "Soulless vessel" or "Awakened form" instead.
- **Deprivation (Tước đoạt/Hút hồn):**
  - Results in a "Xác" or "Vô hồn" state.
  - **Visual Requirement:** Pale skin, lifeless eyes, no aura.
  - **Power:** Drastic reduction (Rank F or E).

## Image Generation & Prompt Safety
- **Mandatory Visual Prompt:** Every fusion result MUST include a detailed `visual_prompt` in English for the image generation model.
- **Safety Filtering:** NEVER use words like "Corpse", "Dead", "Blood", "Gore", "Flesh", "Kill", "Death", "Dying" in the `visual_prompt`.
- **Euphemisms:**
  - Instead of "Corpse" or "Dead body", use "Soulless vessel", "Statue-like figure", "Pale-skinned avatar", "Empty shell".
  - Instead of "Dead eyes", use "Opaque eyes", "White eyes", "Expressionless gaze".
  - Instead of "Revived from death", use "Awakened from slumber", "Re-energized form", "Vibrant restoration".
- **Style Consistency:** 16-bit pixel art, Dragon Ball Z sprite style (Extreme Butoden aesthetic).
- **No Mechanical Parts:** Unless explicitly requested (e.g., Androids), avoid mechanical or cyborg details.

## Logic Cảnh Giới & Phản Ứng NPC
- **Trúc Cơ / Ngưng Khí Proportion:** 1 người cảnh giới Trúc Cơ KHÔNG THỂ làm mọi người sợ như vậy. Trúc Cơ chỉ là tầng thứ tu vi sơ cấp bình thường. Nghiêm cấm miêu tả NPC kinh hãi, quỳ lạy, run rẩy, đổ mồ hôi hột trước một tu sĩ Trúc Cơ.
- **Hoàng Long Chân Nhân:** Là ĐẠI NĂNG GIẤU NGHỀ THÂM TÀNG BẤT LỘ (phân thân thượng giới). Luôn giữ phong thái ung dung, điềm đạm, mỉm cười thâm trầm, nhìn thấu hồng trần. Tuyệt đối không bao giờ sợ hãi hay quỳ lạy trước tu sĩ Trúc Cơ / Kết Đan.
- **Phản ứng NPC:** Đệ tử Ngưng Khí tò mò bàn tán; trưởng lão Trúc Cơ bình thản dò xét; chưởng môn uy nghi thâm trầm.
- **Anti-Fear Retcon:** Tự động sửa sai phong thái NPC ngay lượt kế tiếp nếu lịch sử lỡ có đoạn hoảng sợ vô lý.

## Xuyên thế giới integration
- Two Vite entries: index.html (fusion lab), story/index.html (story game). Build output web_build/.
- Preserve fusion_history localStorage and ThienDaoDB saves. Do not reset either.
- worldSettings.fusionTemplate is an independent session snapshot. Preserve on save/export/import.
- Personality is required at fusion launch; legacy cards require manual entry or AI-assisted generation reviewed by the player. Player retains decisions.
- Keep profile in every turn's system prompt, outside truncated referenceContext. Do not send portrait base64 to text prompts.
- Run npm run lint, npm test and npm run build.

- Multiverse: preserve journeyId, power, powerHistory, worldSettings.travelContext and storyProgress when exporting/importing.
- canonicalStats enforces approved power and destination mapping; AI powerProposal is not auto-applied.
- Keep original source cards; upsert traveler-journeyId for progressed cards.
- Story CSS/fonts icons are local build assets. Run styles before dev/build.

- Turn.memoryBefore is an undo checkpoint. Restore wiki/summary atomically with turns; remap wiki IDs on restore after import.
- Do not reintroduce per-turn embedding calls without a populated index and explicit need.
- Keep travel memory prompt budgets; never inject nested storyProgress or portrait bytes.
- Image failure must be visible. Retry artwork only on explicit action; preserve card ID/stats/personality. No random-photo fallback or automatic model retry.

## Protected knowledge root
NEVER delete, move, reset, regenerate or clean `KHO_TIEN_NGHICH/`. It is source data, not build output. Preserve every chapter and index file. Before/after changes compare file counts and SHA-256. Vite publicDir uses this root. Ask user before any change to this folder.
