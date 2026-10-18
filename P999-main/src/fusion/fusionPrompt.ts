import {
  buildSpecialFusionRules,
  type FusionPromptInput,
} from "./specialFusionRules";

export function buildFusionPrompt(input: FusionPromptInput) {
  const { selectedChars, fusions, upgradeFusion, isSummon, isNsfw } = input;
  const specialInstructions = buildSpecialFusionRules(input);
  const charList = upgradeFusion
    ? `${upgradeFusion.name} + ${selectedChars
        .map((c) => {
          if (c.fusionId) {
            const f = fusions.find((x) => x.id === c.fusionId);
            return `${f?.name} (Kết quả dung hợp từ: ${f?.baseCharacters.map((bc) => bc.name).join(", ")}, Rank ${f?.rank}; Cấp ${f?.level}; BP ${f?.powerLevel}; Tính cách: ${f?.personality || "Chưa xác định"}; Năng lực và hành trình: ${f?.description || ""})`;
          }
          return `${c.name} (${c.era}, ${c.state})`;
        })
        .join(", ")}`
    : selectedChars
        .map((c) => {
          if (c.fusionId) {
            const f = fusions.find((x) => x.id === c.fusionId);
            return `${f?.name} (Kết quả dung hợp từ: ${f?.baseCharacters.map((bc) => bc.name).join(", ")}, Rank ${f?.rank}; Cấp ${f?.level}; BP ${f?.powerLevel}; Tính cách: ${f?.personality || "Chưa xác định"}; Năng lực và hành trình: ${f?.description || ""})`;
          }
          return `${c.name} (${c.era}, ${c.state})`;
        })
        .join(", ");

  const prompt = isSummon
    ? `Triệu hồi nhân vật Dragon Ball bản gốc: ${charList}.
        ${specialInstructions}
        Yêu cầu:
        - Tên: Đúng nguyên tác (${selectedChars[0].name}).
        - Ngoại hình: Đúng nguyên tác của ${selectedChars[0].name} ở thời kỳ ${selectedChars[0].era} và trạng thái ${selectedChars[0].state}.
        - DNA & Logic: Phân tích sức mạnh bản gốc dựa trên cốt truyện.
        - Lực chiến (Power Level): Tính toán chính xác theo thang đo nguyên tác.
        - Cấp độ (Level): Phù hợp với mốc chuẩn (Goku DBS Base = 350, Goku Blue = 1,000, Vegeta Blue Evolution = 1,200, Beerus = 100,000+).
        - Đánh giá xếp hạng (Rank): Dựa trên sức mạnh thực tế.
        - Trả về JSON: { "name": "Tên", "description": "Mô tả", "personality": "Tính cách tổng hợp từ các nhân vật nguồn: khí chất, giá trị, cách suy nghĩ, cách nói, phản ứng khi nguy hiểm và mâu thuẫn nội tâm", "dna_analysis": "DNA", "dna_components": [{ "race": "Tên chủng tộc", "percentage": number, "color": "Tailwind color class (e.g. bg-blue-500)" }], "fusion_logic": "Logic", "quote": "Câu thoại đặc trưng", "powerLevel": number, "level": number, "rank": "Rank", "power_comparison": "So sánh", "compatibility_score": 100, "compatibility_status": "Perfect", "visual_prompt": "Detailed English prompt for image gen of ${selectedChars[0].name} in ${selectedChars[0].state} state. High quality, original Dragon Ball art style, NO mechanical parts, NO machine details, NO cyborg elements, 100% original character appearance." }`
    : `Dung hợp Dragon Ball: ${charList}.
      ${specialInstructions}
      YÊU CẦU ĐẶC BIỆT: ĐỘ TƯƠNG THÍCH & LOGIC VẬT PHẨM (CRITICAL)
      - Phân tích sự tương thích giữa các nguồn năng lượng:
        + Năng lượng Hủy Diệt (Hakai) vs Năng lượng Sáng Tạo: Độ tương thích cực thấp.
        + Tà ác thuần túy vs Lòng tốt thuần túy: Độ tương thích thấp.
        + Thần thánh vs Phàm nhân: Cần sự cân bằng.
      - LOGIC VẬT PHẨM ĐẶC BIỆT:
        + Nếu có "Tước đoạt" (Deprive) nhắm vào "DNA Saiyan" hoặc nhân vật Saiyan: Thực thể bị mất đi "Huyết mạch Saiyan", sức mạnh giảm CỰC SÂU (ít nhất 90% so với trạng thái gốc). Tiềm năng vô hạn bị triệt tiêu.
        + "Sợi xích infinity" (Infinity Chain) chỉ giải phóng sức mạnh hiện có trong cơ thể. Nếu sức mạnh đã bị "Tước đoạt", việc giải phong ấn KHÔNG THỂ tạo ra sức mạnh thần thánh hay vượt bậc. Nó chỉ giải phóng cái "vỏ rỗng" còn sót lại.
        + Kết hợp "Tước đoạt" + "Sợi xích infinity" trên một Saiyan sẽ tạo ra một thực thể "Phế thải" hoặc "Suy kiệt", Rank không được vượt quá A hoặc S dù có giải ấn.
      - Nếu độ tương thích thấp (< 40%):
        + Lực chiến và Cấp độ bị giảm mạnh (có thể chỉ bằng 50% tổng sức mạnh).
        + Ngoại hình: Biến dạng, không ổn định.
      - Nếu độ tương thích cực thấp (< 10%):
        + Thực thể bị coi là "Thất bại" (Failed Fusion) hoặc "Tử vong" (Fatal).
      Yêu cầu:
      - Tên: BẮT BUỘC đúng nguyên tác nếu là nhân vật đơn, hoặc sáng tạo hợp lý nếu là dung hợp. Không được sai lệch tên nhân vật gốc.
      - Ngoại hình: Kết hợp đặc điểm của TẤT CẢ nhân vật. TUYỆT ĐỐI KHÔNG mặc định ngoại hình giống Goku (tóc, mặt, quần áo) trừ khi Goku có trong danh sách dung hợp. Phải tạo ra một diện mạo hoàn toàn mới dựa trên sự kết hợp thực tế của các nhân vật.
      - DNA & Logic: Phân tích chi tiết.
      - Lực chiến (Power Level): Tính toán dựa trên thang đo nguyên tác Dragon Ball một cách hợp lý. 
      - LOGIC KHOẢNG CÁCH SỨC MẠNH & THANG ĐO CHUẨN XÁC (CRITICAL):
        + Khoảng cách giữa Phàm nhân (Goku Blue: Level 1,000) và Thần Hủy Diệt (Beerus: Level 100,000) là CỰC LỚN (Gấp 100 lần).
        + Khoảng cách giữa Thần Hủy Diệt (Beerus: Level 100,000) và Thiên Sứ (Whis: Level 10 Triệu) là TUYỆT ĐỐI (Gấp 100 lần Beerus).
        + Đại Thiên Sứ (Level 30 Tỷ) mạnh gấp 3.000 lần Whis.
        + Zeno (Level 3 Nghìn Tỷ) mạnh gấp 100 lần Đại Thiên Sứ.
        + Khởi Nguyên Thần (Level 3 Tỷ Tỷ) mạnh gấp 1 triệu lần Zeno.
        + Hỗn Độn Thần mạnh gấp 1 tỷ lần Khởi Nguyên Thần, đo bằng ngôi sao trắng ⭐.
      - QUY TẮC BẮT BUỘC VỀ CHỈ SỐ (CRITICAL):
        + Cấp độ (level) và Lực chiến (powerLevel) PHẢI tỷ lệ thuận với nhau: BP = Level * 100 (với mọi cảnh giới dưới Hỗn Độn Thần).
        + Tuyệt đối không để xảy ra mâu thuẫn chỉ số.
      - Cấp độ (Level) & Cảnh giới (Rank) chuẩn xác:
        + Mốc: Goku DBS Base = Level 350 | BP: 35,000 -> Rank: "CHIẾN BINH PHÀM NHÂN"
        + Mốc: Goku Super Saiyan Blue = Level 1,000 | BP: 100,000 -> Rank: "SIÊU SAIYAN BLUE"
        + Mốc: Vegeta Blue Evolution = Level 1,200 | BP: 120,000 -> Rank: "SIÊU SAIYAN BLUE"
        + Mốc: Goku Ultra Instinct (Bản Năng Vô Cực) = Level 50,000+ | BP: 5,000,000 -> Rank: "BẢN NĂNG VÔ CỰC"
        + Mốc: Beerus (Thần Hủy Diệt) = Level 100,000+ | BP: 10,000,000 -> Rank: "THẦN HỦY DIỆT"
        + Mốc: Whis (Thiên Sứ) = Level 10,000,000+ | BP: 1,000,000,000 -> Rank: "THIÊN SỨ"
        + Mốc: Đại Thiên Sứ (Grand Priest): Level 30,000,000,000 (30 Tỷ) | BP: 3 Nghìn Tỷ -> Rank: "ĐẠI THIÊN SỨ"
        + Mốc: Zeno (Vua Vạn Vật): Level 3,000,000,000,000 (3 Nghìn Tỷ) | BP: 300 Triệu Tỷ -> Rank: "VUA VẠN VẬT ZENO"
        + Mốc: Khởi Nguyên Thần (Origin God): Level 3,000,000,000,000,000,000 (3 Tỷ Tỷ) | BP: 300 Tỷ Tỷ -> Rank: "KHỞI NGUYÊN THẦN"
        + Mốc: Hỗn Độn Thần (Chaos God): Trên Khởi Nguyên Thần 1 tỷ lần. BP và Level được thay thế bằng ngôi sao ⭐ màu trắng (Level = số lượng sao: 1, 2, 3...; powerLevel = 0) -> Rank: "HỖN ĐỘN THẦN"
      - CHỈ bao gồm zombie_compatibility và zombie_multiplier NẾU có Virus Zombie tham gia.
       - power_comparison: So sánh sức mạnh một cách CHUẨN XÁC, NGẮN GỌN. QUY TẮC: Nếu nhân vật/dung hợp thuộc thời kỳ DBZ hoặc có Level < 1000 (mortal ki tier), tuyệt đối KHÔNG so sánh với Super Saiyan Blue hoặc các mốc thần thánh DBS; phải so sánh với các mốc chuẩn DBZ tương ứng (như Goku Z Base, SSJ3 Goku, Perfect Cell, v.v.). Chỉ khi Level >= 1000 mới được so sánh với Siêu Saiyan Blue hay các mốc thần thánh.
       - Trả về JSON: { "name": "Tên", "description": "Mô tả", "personality": "Tính cách tổng hợp từ các nhân vật nguồn: khí chất, giá trị, cách suy nghĩ, cách nói, phản ứng khi nguy hiểm và mâu thuẫn nội tâm", "dna_analysis": "DNA", "dna_components": [{ "race": "Tên chủng tộc", "percentage": number, "color": "Tailwind color class (e.g. bg-blue-500)" }], "fusion_logic": "Logic", "quote": "Câu thoại", "powerLevel": number, "level": number, "rank": "Tên Cảnh Giới (HỖN ĐỘN THẦN / KHỞI NGUYÊN THẦN / VUA VẠN VẬT ZENO / ĐẠI THIÊN SỨ / THIÊN SỨ / THẦN HỦY DIỆT / BẢN NĂNG VÔ CỰC / SIÊU SAIYAN BLUE / CHIẾN BINH PHÀM NHÂN)", "power_comparison": "Chuỗi so sánh chuẩn xác", "compatibility_score": number (0-100), "compatibility_status": "Perfect/Stable/Unstable/Failed/Fatal", "zombie_compatibility": number (optional), "zombie_multiplier": number (optional), "visual_prompt": "MANDATORY: Detailed English prompt for image generation. Describe the character's appearance based on the fusion logic. Include details about hair, eyes, skin, and clothing. Focus on the 'Xác' or 'Hồi sinh' state if applicable." }
      LƯU Ý: KHÔNG ĐƯỢC có dấu phẩy thừa ở cuối mảng hoặc đối tượng.
      Ngôn ngữ: Tiếng Việt (trừ visual_prompt).`;

  return { prompt, charList };
}
