import { UNIVERSES } from "./characterCatalog";
import type { BaseCharacter, FusionResult } from "./types";

export interface FusionPromptInput {
  selectedChars: BaseCharacter[];
  fusions: FusionResult[];
  upgradeFusion: FusionResult | null;
  isSummon: boolean;
  isNsfw: boolean;
}

export function buildSpecialFusionRules({
  selectedChars,
  fusions,
  upgradeFusion,
  isSummon,
  isNsfw,
}: FusionPromptInput) {
  let specialInstructions = "";
  if (isNsfw) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (NSFW 18+ - NỘI DUNG NGƯỜI LỚN):
        - Thực thể có thể mang các đặc điểm cực kỳ quyến rũ, gợi cảm, trang phục thiếu vải hoặc táo bạo (nếu phù hợp).
        - Mô tả (description) và câu thoại (quote) có thể mang tính chất trưởng thành, lôi cuốn, mang hơi hướng 18+.
        - Hình ảnh (visual_prompt): Thêm các từ khóa mạnh như "extremely seductive", "revealing outfit", "curvy", "mature theme", "sensual pose", "adult content" (nhưng vẫn phải cân nhắc để không bị AI chặn hoàn toàn).
        - LƯU Ý: Vẫn phải giữ được cái chất của nhân vật gốc nhưng ở phiên bản "người lớn" hơn.`;
  }
  const hasPurifier = selectedChars.some((c) => c.name === "Thanh tẩy debuff");

  if (isSummon && UNIVERSES["DNA"].includes(selectedChars[0].name)) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Ống DNA):
        - ĐÂY LÀ MỘT VẬT PHẨM DNA.
        - NGOẠI HÌNH (Visual Prompt): Một ống thủy tinh nhỏ (glass vial/tube) trong suốt, bên trong chứa dung dịch DNA lỏng đang cuộn xoáy và phát sáng rực rỡ. TUYỆT ĐỐI KHÔNG ĐƯỢC xuất hiện khuôn mặt hay cơ thể nhân vật bên trong hay bên ngoài ống, chỉ là 1 ống thủy tinh chứa DNA lỏng.`;
  }

  if (isSummon) {
    specialInstructions += `
        ĐÂY LÀ TRIỆU HỒI BẢN GỐC (TUYỆT ĐỐI KHÔNG PHẢI DUNG HỢP):
        - Nhân vật: ${selectedChars[0].name} (${selectedChars[0].era}, ${selectedChars[0].state}).
        - YÊU CẦU BẮT BUỘC: Giữ nguyên 100% bản gốc. KHÔNG THÊM bất kỳ chi tiết máy móc, công nghệ, hay yếu tố ngoại lai nào.
        - TÊN NHÂN VẬT: Phải là "${selectedChars[0].name}" (Có thể kèm trạng thái như "Goku Super Saiyan Blue"). TUYỆT ĐỐI KHÔNG thêm các hậu tố như "-Machina", "Summoner", "Cyborg", v.v.
        - NGOẠI HÌNH: Phải giống hệt nguyên tác Dragon Ball. KHÔNG được có các bộ phận cơ khí hay hào quang lạ.
        - Hãy tạo ra các chỉ số sức mạnh, rank và mô tả CHÍNH XÁC theo nguyên tác Dragon Ball cho nhân vật này ở trạng thái này.
        - Độ tương thích (compatibility_score) cho triệu hồi bản gốc luôn là 100% và status là "Perfect".`;
  }

  if (selectedChars.some((c) => c.name === "Virus Zombie")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Virus Zombie):
        - Nếu có Virus Zombie tham gia, thực thể tạo ra PHẢI mang đặc tính: Bất tử (Immortal), Mất trí (Lost mind), Điên cuồng (Frenzied).
        - AI HÃY TỰ QUYẾT ĐỊNH: Phân tích DNA của các nhân vật khác để đưa ra "Độ tương thích" (zombie_compatibility) từ 0% đến 100%.
        - Dựa trên độ tương thích, hãy quyết định "Hệ số nhân sức mạnh" (zombie_multiplier) từ x10 đến x1,000,000.
        - Lực chiến (powerLevel) cuối cùng phải là kết quả sau khi đã nhân với hệ số này.
        - Ngoại hình phải thể hiện sự biến dị, đáng sợ, mang dấu ấn của đại dịch zombie.`;
  }
  const pinInfinity = selectedChars.find((c) => c.name === "Pin Infinity");
  if (pinInfinity) {
    if (pinInfinity.state === "Nguồn năng lượng vô hạn") {
      specialInstructions += `
          LƯU Ý ĐẶC BIỆT (Pin Infinity - Nguồn năng lượng vô hạn):
          - Thực thể PHẢI có nguồn năng lượng vô hạn, không bao giờ kiệt sức.
          - Lực chiến (powerLevel) PHẢI cực kỳ cao (tăng ít nhất x100 so với bình thường).
          - Ngoại hình có các chi tiết máy móc hoặc hào quang năng lượng xanh lam rực rỡ.`;
    } else if (pinInfinity.state === "Hút 99.9% năng lượng của vật chủ") {
      if (!hasPurifier) {
        specialInstructions += `
            LƯU Ý ĐẶC BIỆT (Pin Infinity - Hút 99.9% năng lượng của vật chủ):
            - Thực thể bị Pin Infinity hút cạn kiệt năng lượng (99.9%).
            - Lực chiến (powerLevel) PHẢI cực kỳ thấp (giảm x1000 so với bình thường).
            - Ngoại hình thể hiện sự kiệt quệ, hào quang mờ nhạt, có thể có các dây cáp hoặc thiết bị đang hút năng lượng từ cơ thể.
            - Tên thực thể nên có hậu tố "(Kiệt quệ)" hoặc "(Drained)".`;
      } else {
        specialInstructions += `
            LƯU Ý ĐẶC BIỆT (Pin Infinity - Năng lượng đã được thanh tẩy):
            - Pin Infinity đã bị thanh tẩy, không còn hút năng lượng.
            - Thực thể duy trì sức mạnh bình thường.`;
      }
    }
  }
  if (selectedChars.some((c) => c.name === "DNA Saiyan")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (DNA Saiyan):
        - Thực thể mang dòng máu Saiyan, có khả năng tăng tiến sức mạnh vô hạn sau mỗi trận chiến.
        - Phải thể hiện được đặc điểm của người Saiyan (tóc dựng, hào quang).
        - Có thể đạt đến các trạng thái từ Super Saiyan đến Saiyan Blue.`;
  }
  if (selectedChars.some((c) => c.name === "Vĩnh hằng sharingan")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Vĩnh hằng sharingan):
        - Thực thể sở hữu đôi mắt Vĩnh hằng Sharingan (Eternal Mangekyou Sharingan).
        - Có khả năng sử dụng ảo thuật tối thượng, triệu hồi Susanoo toàn chân thể.
        - Tăng khả năng phản xạ, đọc trước chuyển động của đối thủ.
        - Ngoại hình: Đôi mắt có hoa văn phức tạp màu đỏ rực rỡ, hào quang Susanoo bao quanh.`;
  }
  if (selectedChars.some((c) => c.name === "Rinnegan")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Rinnegan):
        - Thực thể sở hữu đôi mắt Rinnegan (Lục Đạo Nhãn).
        - Có khả năng sử dụng Lục Đạo Luân Hồi, hấp thụ nhẫn thuật và điều khiển trọng lực (Thần La Thiên Chinh).
        - Ngoại hình: Đôi mắt có các vòng tròn đồng tâm màu tím nhạt, hào quang mang tính tâm linh huyền bí.`;
  }
  if (selectedChars.some((c) => c.name === "Teiseigan")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Teiseigan):
        - Thực thể sở hữu đôi mắt Teiseigan (Tenseigan - Chuyển Sinh Nhãn).
        - Có khả năng điều khiển sức mạnh của mặt trăng, kích hoạt Chế độ hiền nhân Tenseigan.
        - Ngoại hình: Đôi mắt màu xanh dương rực rỡ với hoa văn bông tuyết, hào quang màu xanh lục bảo.`;
  }
  if (selectedChars.some((c) => c.name === "Thập vĩ")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Thập vĩ):
        - Thực thể sở hữu sức mạnh của Thập Vĩ (Juubi) - nguồn gốc của mọi Chakra.
        - Lực chiến (powerLevel) tăng vọt cực lớn, có thể đạt đến mức Thần Hủy Diệt.
        - Có khả năng bắn Bom Vĩ Thú (Bijuu Dama) và gây ra Thiên Địa Biến Dạng.
        - Ngoại hình: Có 10 cái đuôi khổng lồ, cơ thể mang đặc điểm của quái thú cổ đại, một con mắt Rinne-Sharingan lớn trên trán.`;
  }
  if (selectedChars.some((c) => c.name === "Gomu Gomu no Mi")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Gomu Gomu no Mi):
        - Thực thể sở hữu cơ thể cao su, miễn nhiễm hoàn toàn với các đòn tấn công bằng điện.
        - Nếu ở trạng thái Gear 5, thực thể mang hình dáng Thần Mặt Trời Nika: Tóc và quần áo chuyển sang màu trắng, có dải mây bao quanh cổ, nụ cười rạng rỡ.
        - Khả năng chiến đấu tự do, biến mọi thứ xung quanh thành cao su.`;
  }
  if (selectedChars.some((c) => c.name === "Lục nhãn & Vô hạ hạn")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Lục nhãn & Vô hạ hạn):
        - Thực thể sở hữu Lục Nhãn (Six Eyes) và Vô Hạ Hạn (Limitless).
        - Khả năng "Vô Hạn" khiến đối thủ không bao giờ có thể chạm vào thực thể.
        - Có thể sử dụng "Hư Thức: Tử" (Hollow Purple) để xóa sổ mọi vật chất trên đường đi.
        - Ngoại hình: Đôi mắt màu xanh dương rực rỡ như bầu trời, hào quang mang tính áp đảo tuyệt đối.`;
  }
  if (selectedChars.some((c) => c.name === "Sức mạnh Saitama")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Sức mạnh Saitama):
        - Thực thể sở hữu sức mạnh tuyệt đối, có thể kết thúc mọi trận chiến chỉ bằng một cú đấm.
        - Lực chiến (powerLevel) PHẢI ở mức không thể đo lường, vượt xa mọi giới hạn.
        - Ngoại hình: Có thể mang đặc điểm đầu hói hoặc ánh mắt nghiêm túc, áo choàng trắng.
        - Trong phần mô tả, hãy nhấn mạnh vào sự nhàm chán vì quá mạnh.`;
  }
  if (selectedChars.some((c) => c.name === "Hơi thở của mặt trời")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Hơi thở của mặt trời):
        - Thực thể sử dụng kỹ thuật kiếm thuật cổ xưa nhất, mang sức mạnh của mặt trời.
        - Các đòn tấn công mang hiệu ứng lửa rực rỡ, có khả năng chém đứt mọi loại phòng ngự.
        - Ngoại hình: Có các vết bớt đỏ trên trán, hào quang lửa mặt trời bao quanh vũ khí.`;
  }
  if (selectedChars.some((c) => c.name === "Sức mạnh Naruto (Lục đạo)")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Sức mạnh Naruto - Lục đạo):
        - Thực thể sở hữu sức mạnh của Lục Đạo Hiền Nhân.
        - Có khả năng sử dụng các quả Cầu Đạo Ngọc (Truth-Seeking Balls) bay quanh lưng.
        - Có thể sử dụng Bom Vĩ Thú Rasenshuriken.
        - Ngoại hình: Áo choàng hào quang màu vàng rực rỡ, đôi mắt có hoa văn đặc trưng của Lục Đạo.`;
  }
  if (selectedChars.some((c) => c.name === "Sức mạnh Ichigo (Bankai)")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Sức mạnh Ichigo - Bankai):
        - Thực thể sở hữu sức mạnh Tử Thần tối thượng.
        - Sử dụng thanh kiếm Tensa Zangetsu màu đen tuyền, tốc độ cực nhanh.
        - Có thể sử dụng tuyệt kỹ Mugetsu (Vô Nguyệt) để xóa sổ đối thủ.
        - Ngoại hình: Trang phục Tử Thần màu đen, có thể mang mặt nạ Hollow một phần.`;
  }
  if (selectedChars.some((c) => c.name === "Sức mạnh Natsu (Hỏa long vương)")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Sức mạnh Natsu - Hỏa long vương):
        - Thực thể sở hữu sức mạnh của Hỏa Long Vương.
        - Các đòn tấn công bằng lửa có nhiệt độ cực cao, có thể đốt cháy cả ma thuật.
        - Ngoại hình: Có vảy rồng xuất hiện trên da, hào quang lửa đỏ thẫm bao phủ.`;
  }
  if (
    selectedChars.some((c) => c.name === "Sức mạnh Meliodas (Ma thần vương)")
  ) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Sức mạnh Meliodas - Ma thần vương):
        - Thực thể sở hữu sức mạnh của Ma Thần Vương.
        - Có khả năng "Phản đòn toàn phần" (Full Counter) để phản lại mọi đòn tấn công năng lượng.
        - Ngoại hình: Dấu ấn ma thần trên trán, đôi cánh bóng tối, hào quang đen tím huyền bí.`;
  }
  if (selectedChars.some((c) => c.name === "DNA Hakai")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (DNA Hakai):
        - Thực thể sở hữu sức mạnh Hủy Diệt (Hakai), có thể xóa sổ vật chất.
        - Lực chiến cực lớn, hào quang màu tím đậm đặc trưng của Thần Hủy Diệt.
        - Tính cách có phần lạnh lùng, quyết đoán.`;
  }
  if (selectedChars.some((c) => c.name === "DNA Thiên sứ")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (DNA Thiên sứ):
        - Thực thể sở hữu quyền năng của Thiên Sứ, tốc độ và phản xạ tuyệt đối (Bản Năng Vô Cực).
        - Hào quang màu trắng bạc rực rỡ, vẻ ngoài thanh cao, điềm tĩnh.
        - Lực chiến ở mức tối thượng, vượt xa các cấp độ thông thường.`;
  }
  if (selectedChars.some((c) => c.name === "DNA Kaioshin")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (DNA Kaioshin):
        - Thực thể sở hữu sức mạnh sáng tạo và phép thuật của các vị thần tối cao.
        - Có khả năng sử dụng phép thuật Potara, chữa trị và tạo ra vật chất.
        - Hào quang dịu nhẹ màu xanh lá hoặc vàng, trang phục mang phong cách thần thánh.`;
  }
  if (selectedChars.some((c) => c.name === "DNA Mabu")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (DNA Mabu):
        - Thực thể sở hữu khả năng tái tạo vô hạn (Regeneration) và hấp thụ (Absorption).
        - Có thể biến đối thủ thành kẹo hoặc socola bằng ma thuật.
        - Thân hình co giãn linh hoạt, cực kỳ khó bị tiêu diệt vật lý.
        - Ngoại hình mang đặc điểm của chủng tộc Mabu (da hồng, có vòi trên đầu).`;
  }
  if (selectedChars.some((c) => c.name === "DNA Kaioken x1000000000")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (DNA Kaioken x1000000000):
        - Đây là trạng thái vượt xa mọi giới hạn vật lý (x1 tỷ lần sức mạnh).
        - Lực chiến (powerLevel) PHẢI ở mức không tưởng (astronomical), có thể đạt đến hàng tỷ tỷ tỷ.
        - Hào quang đỏ rực bao phủ toàn bộ không gian, áp lực cực lớn khiến vạn vật xung quanh tan biến.
        - Thực thể mang sức mạnh hủy diệt đa vũ trụ chỉ bằng một hơi thở.
        - Tuy nhiên, cơ thể luôn trong tình trạng quá tải năng lượng cực độ.`;
  }
  if (selectedChars.some((c) => c.name === "Người Phàm")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Người Phàm):
        - Thực thể mang trong mình ý chí và sự bền bỉ của con người.
        - Nếu dung hợp với các thực thể thần thánh, hãy nhấn mạnh vào sự cân bằng giữa sức mạnh tối thượng và tâm hồn phàm trần.
        - Có thể sở hữu những kỹ năng võ thuật tinh xảo hoặc trí tuệ công nghệ vượt trội.
        - Lực chiến có thể không quá cao nhưng khả năng thích nghi và tiềm năng là vô hạn.`;
  }
  if (selectedChars.some((c) => c.name === "DNA 10 quả tim")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (DNA 10 quả tim):
        - Thực thể sở hữu 10 quả tim, mang lại sức sống mãnh liệt và khả năng hồi phục không tưởng.
        - Mỗi quả tim đại diện cho một mạng sống hoặc một nguồn năng lượng dự trữ khổng lồ.
        - Lực chiến và khả năng chịu đựng tăng vọt.`;
  }
  if (selectedChars.some((c) => c.name === "Đoạt linh hồn")) {
    const otherChar = selectedChars.find((c) => c.name !== "Đoạt linh hồn");
    if (otherChar) {
      specialInstructions += `
          LƯU Ý ĐẶC BIỆT (Đoạt linh hồn):
          - ĐÂY LÀ QUÁ TRÌNH CƯỚP ĐOẠT LINH HỒN.
          - Thực thể tạo ra PHẢI là "Linh hồn của ${otherChar.name}".
          - NGOẠI HÌNH (Visual Prompt): Một thực thể dạng linh hồn (soul/spirit/ghostly form) mờ ảo, phát sáng xanh lam hoặc trắng nhạt, mang hình dáng của ${otherChar.name} (${otherChar.era}, ${otherChar.state}). Cơ thể có thể hơi trong suốt, có các dải năng lượng linh hồn bao quanh.
          - TÊN THỰC THỂ: Phải là "Linh hồn của ${otherChar.name}".
          - MÔ TẢ: Nhấn mạnh vào việc đây là phần tinh túy nhất, sức mạnh tâm linh thuần khiết của ${otherChar.name} sau khi bị tước đoạt khỏi thể xác.
          - Lực chiến (powerLevel) có thể cao hơn hoặc thấp hơn bản gốc tùy vào độ mạnh của linh hồn.`;
    }
  }
  if (selectedChars.some((c) => c.name === "Sợi xích infinity")) {
    if (!hasPurifier) {
      specialInstructions += `
          LƯU Ý ĐẶC BIỆT (Sợi xích infinity):
          - Thực thể bị phong ấn bởi Sợi xích Infinity, kìm hãm 10000% sức mạnh thực sự.
          - Nếu ở trạng thái "Phong ấn", lực chiến bị giảm đáng kể nhưng tiềm năng ẩn giấu cực lớn.
          - Nếu ở trạng thái "Giải phóng", lực chiến bùng nổ x100 lần.
          - Ngoại hình có các sợi xích quấn quanh cơ thể hoặc hào quang bị kìm hãm.`;
    } else {
      specialInstructions += `
          LƯU Ý ĐẶC BIỆT (Sợi xích infinity - Đã thanh tẩy):
          - Sợi xích đã bị phá vỡ hoặc thanh tẩy, không còn kìm hãm sức mạnh.
          - Thực thể bùng nổ sức mạnh tối đa.`;
    }
  }
  if (selectedChars.some((c) => c.name === "Găng tay vô cực")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Găng tay vô cực):
        - Thực thể sở hữu Găng tay vô cực với 6 viên đá vô cực.
        - Có khả năng thao túng thực tại, thời gian, không gian, linh hồn, sức mạnh và trí tuệ.
        - Lực chiến (powerLevel) PHẢI ở mức tối thượng, có thể xóa sổ một nửa vũ trụ chỉ bằng một cái búng tay.
        - Ngoại hình: Đeo một chiếc găng tay vàng lớn với 6 viên đá phát sáng rực rỡ.`;
  }
  if (selectedChars.some((c) => c.name === "DNA sao chép")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (DNA sao chép):
        - Thực thể có khả năng sao chép hoàn hảo sức mạnh của đối thủ hoặc các nhân vật khác trong danh sách dung hợp.
        - Lực chiến (powerLevel) PHẢI bằng 99% tổng sức mạnh của các nhân vật còn lại trong danh sách dung hợp cộng lại (hoặc 99% sức mạnh của nhân vật mạnh nhất nếu chỉ có 1 nhân vật khác).
        - Ngoại hình có thể có các bộ phận dạng gương hoặc trong suốt, phản chiếu hình ảnh của các nhân vật khác.
        - Kỹ năng bao gồm việc tái hiện lại các chiêu thức của đối phương với độ chính xác cực cao.`;
  }
  if (selectedChars.some((c) => c.name === "Đóng băng vĩnh viễn")) {
    if (!hasPurifier) {
      specialInstructions += `
          LƯU Ý ĐẶC BIỆT (Đóng băng vĩnh viễn):
          - Thực thể bị nhốt hoàn toàn trong một khối băng khổng lồ, vĩnh cửu.
          - Trạng thái: Mất ý thức hoàn toàn, không thể cử động.
          - Lực chiến (powerLevel) PHẢI cực kỳ thấp (gần như bằng 0).
          - Xếp hạng (Rank) PHẢI là hạng E hoặc D.
          - Ngoại hình: Toàn bộ cơ thể bị bao phủ bởi lớp băng dày, trong suốt, có hơi lạnh tỏa ra.`;
    } else {
      specialInstructions += `
          LƯU Ý ĐẶC BIỆT (Đóng băng vĩnh viễn - Đã tan chảy):
          - Khối băng đã tan chảy nhờ sức mạnh Thanh Tẩy.
          - Thực thể đã tỉnh lại và sẵn sàng chiến đấu.`;
    }
  }
  if (selectedChars.some((c) => c.name === "Dơi hút máu")) {
    if (!hasPurifier) {
      specialInstructions += `
          LƯU Ý ĐẶC BIỆT (Dơi hút máu):
          - Thực thể bị đàn dơi quỷ tấn công và hút cạn máu.
          - Lực chiến (powerLevel) PHẢI bị giảm cực mạnh, ít nhất 99% so với bình thường.
          - Xếp hạng (Rank) PHẢI bị hạ xuống ít nhất 2-3 bậc (ví dụ từ SSR xuống S hoặc A).
          - Ngoại hình: Da dẻ tái nhợt, hốc hác, có các vết cắn trên cổ hoặc cơ thể. Có đàn dơi đen bay xung quanh.
          - Tên thực thể nên có hậu tố "(Cạn máu)" hoặc "(Bloodless)".
          - Trong phần logic, hãy giải thích rằng việc mất máu khiến thực thể không thể duy trì sức mạnh thần thánh.`;
    } else {
      specialInstructions += `
          LƯU Ý ĐẶC BIỆT (Dơi hút máu - Đã thanh tẩy):
          - Mọi vết thương đã được chữa lành, lượng máu đã được khôi phục hoàn toàn.
          - Thực thể khỏe mạnh và tràn đầy sinh lực.`;
    }
  }
  if (selectedChars.some((c) => c.name === "Bộ não siêu máy tính")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Bộ não siêu máy tính):
        - Thực thể được cấy ghép Bộ não siêu máy tính, mang lại khả năng tính toán và phân tích đa vũ trụ.
        - Trí tuệ vượt xa mọi thực thể sống, có thể dự đoán trước mọi chiêu thức của đối thủ.
        - Lực chiến (powerLevel) tăng đáng kể nhờ việc tối ưu hóa việc sử dụng năng lượng.
        - Ngoại hình: Có các vi mạch phát sáng trên đầu hoặc cơ thể, mắt có thể hiển thị các dòng code hoặc dữ liệu.`;
  }
  if (selectedChars.some((c) => c.name === "Sinh mệnh vô hạn")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Sinh mệnh vô hạn):
        - Thực thể sở hữu sinh mệnh vô hạn, bất tử bất diệt theo nghĩa đen.
        - Khả năng hồi phục tuyệt đối, không thể bị tiêu diệt bởi bất kỳ đòn tấn công vật lý hay năng lượng nào.
        - Lực chiến tăng mạnh, hào quang xanh lá cây dịu nhẹ nhưng vô tận.`;
  }
  if (selectedChars.some((c) => c.name === "Thánh kiếm vô cực")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Thánh kiếm vô cực):
        - Thực thể sở hữu Thánh kiếm vô cực, vũ khí có thể chém đứt không gian và thời gian.
        - Có khả năng sát thần, bỏ qua mọi lớp phòng thủ của đối phương.
        - Ngoại hình: Cầm một thanh kiếm phát sáng rực rỡ với các ký tự cổ đại.`;
  }
  if (selectedChars.some((c) => c.name === "Thanh tẩy debuff")) {
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Thanh tẩy debuff):
        - Thực thể có khả năng thanh tẩy mọi trạng thái tiêu cực (debuff) như đóng băng, phong ấn, cạn máu, kiệt sức.
        - Luôn duy trì trạng thái chiến đấu hoàn hảo nhất.
        - Hào quang thanh khiết màu vàng kim bao quanh cơ thể.`;
  }
  if (
    selectedChars.some(
      (c) => c.name === "Bàn tay phải của Daishinkan (bị chặt đứt)",
    )
  ) {
    const item = selectedChars.find(
      (c) => c.name === "Bàn tay phải của Daishinkan (bị chặt đứt)",
    );
    if (item?.state === "Nguồn sức mạnh tối cao") {
      specialInstructions += `
          LƯU Ý ĐẶC BIỆT (Bàn tay phải của Daishinkan - Nguồn sức mạnh tối cao):
          - Thực thể sở hữu một phần sức mạnh của Đại Thiên Sứ (Daishinkan).
          - Lực chiến (powerLevel) PHẢI tăng vọt (ít nhất x5000 so with normal).
          - Có khả năng thao túng quy luật vật lý và thời gian ở mức độ sơ khai.
          - Ngoại hình: Có một cánh tay phải phát sáng rực rỡ hào quang Thiên Sứ, các vòng tròn thiên sứ xuất hiện xung quanh.`;
    } else if (item?.state === "Lời nguyền của Thiên Sứ") {
      if (!hasPurifier) {
        specialInstructions += `
            LƯU Ý ĐẶC BIỆT (Bàn tay phải của Daishinkan - Lời nguyền của Thiên Sứ):
            - Thực thể bị áp chế bởi lời nguyền từ bàn tay bị chặt đứt của Daishinkan.
            - Sức mạnh cực lớn nhưng cơ thể bị hủy hoại từ bên trong.
            - Lực chiến (powerLevel) tăng mạnh nhưng độ tương thích (compatibility_score) bị giảm 50%.
            - Trạng thái (compatibility_status) thường là "Unstable" hoặc "Fatal".
            - Ngoại hình: Cánh tay phải bị đen hóa hoặc rò rỉ năng lượng tối, cơ thể có các vết nứt phát sáng.`;
      } else {
        specialInstructions += `
            LƯU Ý ĐẶC BIỆT (Bàn tay phải của Daishinkan - Lời nguyền đã được thanh tẩy):
            - Lời nguyền đã bị xóa bỏ bởi sức mạnh Thanh Tẩy.
            - Thực thể thừa hưởng sức mạnh thuần khiết của Thiên Sứ mà không chịu tác động xấu.`;
      }
    }
  }
  if (selectedChars.some((c) => c.name === "Tước đoạt")) {
    const victim = selectedChars.find((c) => c.name !== "Tước đoạt");
    const victimName = victim ? victim.name : "nhân vật";
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Tước đoạt):
        - Thực thể kết quả CHÍNH LÀ ${victimName} nhưng ở trạng thái SAU KHI BỊ TƯỚC ĐOẠT.
        - Tên nhân vật: Phải là "${victimName} (Bị tước đoạt)" hoặc tương tự.
        - Nội dung: ${victimName} đã bị cướp đi hoàn toàn huyết mạch, sức mạnh hoặc tinh hoa bởi kỹ năng "Tước đoạt".
        - Lực chiến (powerLevel): Giảm cực mạnh hoặc trở nên hỗn loạn (thường là Rank F hoặc E, trừ khi bị biến dị thành thực thể hắc ám).
        - Ngoại hình: ${victimName} trông kiệt quệ, nhợt nhạt, đôi mắt vô hồn, hoặc mang những dấu vết của việc bị rút cạn năng lượng. Nếu bị cướp huyết mạch Saiyan, tóc có thể mất đi độ bóng hoặc chuyển sang màu xám xịt.
        - Trong phần mô tả, hãy tập trung vào sự mất mát, nỗi đau và trạng thái suy yếu của ${victimName} sau khi bị tước đoạt.`;
  }
  if (selectedChars.some((c) => c.name === "Máy Hút DNA")) {
    const targetChar =
      selectedChars.find((c) => c.name !== "Máy Hút DNA") || selectedChars[0];
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Máy Hút DNA - CHIẾT XUẤT 100% TINH HOA):
        - ĐÂY KHÔNG PHẢI LÀ DUNG HỢP. Máy Hút DNA chỉ là công cụ chiết xuất.
        - Máy Hút DNA đang chiết xuất 100% tinh hoa DNA của nhân vật: ${targetChar.name} (${targetChar.era}, ${targetChar.state}).
        - KẾT QUẢ TẠO RA PHẢI LÀ MỘT VẬT PHẨM: "Ống DNA: ${targetChar.name}".
        - TÊN VẬT PHẨM: Phải là "Ống DNA: ${targetChar.name}".
        - dna_components: PHẢI phản ánh 100% chủng tộc của ${targetChar.name}. Ví dụ: nếu là Goku thì là 100% Saiyan.
        - MÔ TẢ: Hãy mô tả đây là một thanh thủy tinh nhỏ, tinh khiết, bên trong chứa toàn bộ mã gen, sức mạnh và tiềm năng của ${targetChar.name}. Nó tỏa ra hào quang rực rỡ đặc trưng của nhân vật đó.
        - NGOẠI HÌNH (Visual Prompt): Một ống thủy tinh nhỏ (glass vial/tube) trong suốt, bên trong chứa dung dịch DNA lỏng đang cuộn xoáy và phát sáng rực rỡ với màu sắc năng lượng đặc trưng của ${targetChar.name}. TUYỆT ĐỐI KHÔNG ĐƯỢC xuất hiện khuôn mặt hay cơ thể nhân vật.
        - CHỈ SỐ: Giữ nguyên Rank và Power Level tương ứng với sức mạnh của DNA đó.
        - Độ tương thích luôn là 100% vì đây là chiết xuất nguyên chất.`;
  }
  if (selectedChars.some((c) => c.name === "Thiện Ác")) {
    const item = selectedChars.find((c) => c.name === "Thiện Ác");
    const isTurningEvil = item?.state === "Chuyển đổi Thiện sang Ác";
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Thiện Ác):
        - Thực thể bị biến đổi bản chất: ${isTurningEvil ? "Từ THIỆN sang ÁC" : "Từ ÁC sang THIỆN"}.
        - Năng lượng (Ki/Chakra/Reiatsu) cũng bị biến đổi tương ứng (ví dụ: Năng lượng thần thánh chuyển thành năng lượng hắc ám, hoặc ngược lại).
        - Tên nhân vật: Nên thêm hậu tố "(Evil)" hoặc "(Good)" hoặc "Sa ngã" / "Thức tỉnh".
        - Ngoại hình: Thay đổi màu sắc hào quang và ánh mắt để phản ánh sự thay đổi bản chất.`;
  }
  if (selectedChars.some((c) => c.name === "Dragon Ball Super")) {
    const item = selectedChars.find((c) => c.name === "Dragon Ball Super");
    const wish = item?.wish || "Ước có sức mạnh vô hạn";
    specialInstructions += `
        LƯU Ý ĐẶC BIỆT (Dragon Ball Super - SIÊU NGỌC RỒNG):
        - Thực thể được tạo ra từ điều ước với Rồng Thần Siêu Cấp (Super Shenron).
        - ĐIỀU ƯỚC: "${wish}".
        - Thực thể PHẢI sở hữu đặc điểm hoặc sức mạnh từ điều ước này.
        - Lực chiến (powerLevel) và Rank PHẢI tăng vọt để phản ánh quyền năng của Siêu Ngọc Rồng.
        - Ngoại hình: Có hào quang vàng kim rực rỡ của Siêu Ngọc Rồng, có thể có hình ảnh rồng thần thấp thoáng phía sau.`;
  }
  if (
    selectedChars.some(
      (c) =>
        c.name === "Đoạt linh hồn" ||
        c.name === "Nụ hôn tử thần" ||
        c.name === "Đoạt xác",
    )
  ) {
    const item = selectedChars.find(
      (c) =>
        c.name === "Đoạt linh hồn" ||
        c.name === "Nụ hôn tử thần" ||
        c.name === "Đoạt xác",
    );
    if (item?.state === "Hút hồn" || item?.state === "Đoạt xác") {
      const victim = selectedChars.find(
        (c) =>
          c.name !== "Đoạt linh hồn" &&
          c.name !== "Nụ hôn tử thần" &&
          c.name !== "Đoạt xác",
      );
      const victimName = victim ? victim.name : "nhân vật";
      specialInstructions += `
          LƯU Ý ĐẶC BIỆT (Hút hồn / Đoạt xác):
          - ĐÂY LÀ TRẠNG THÁI ĐOẠT XÁC: ${victimName} + ${item?.state} = Xác ${victimName}.
          - Thực thể kết quả PHẢI là "Xác ${victimName}" (hoặc "Xác nhân vật: ${victimName}").
          - Tên nhân vật: Phải là "Xác ${victimName}" hoặc "${victimName} (Vô hồn)".
          - Trạng thái: Đã bị đoạt linh hồn và thể xác, trở thành một cái xác rỗng.
          - Lực chiến (powerLevel): Giảm xuống mức tối thiểu (Rank F hoặc E), vì không còn linh hồn để điều khiển sức mạnh.
          - Ngoại hình: Cơ thể tái nhợt, đôi mắt trắng dã hoặc xám xịt, không có ánh sáng sự sống. Có thể có hiệu ứng linh hồn mờ ảo đang bay lơ lửng phía sau hoặc bị hút vào vật phẩm.
          - Mô tả: Tập trung vào sự trống rỗng, cái chết lâm sàng và việc linh hồn đã bị tước đoạt hoàn toàn.`;
    }
  }
  if (selectedChars.some((c) => c.name === "Linh hồn")) {
    const item = selectedChars.find((c) => c.name === "Linh hồn");
    const target = selectedChars.find((c) => c.name !== "Linh hồn");
    const targetName = target ? target.name : "nhân vật";

    if (item?.state === "Nhập hồn" || item?.state === "Hồi sinh") {
      specialInstructions += `
          LƯU Ý ĐẶC BIỆT (Linh hồn - Hồi sinh):
          - ĐÂY LÀ QUÁ TRÌNH HỒI SINH: Linh hồn + ${targetName} = ${targetName} (Thức tỉnh).
          - Nếu ${targetName} đang ở trạng thái "Xác" hoặc "Vô hồn", thực thể kết quả sẽ được hồi sinh hoàn toàn.
          - Tên nhân vật: Phải là "${targetName} (Hồi sinh)" hoặc "${targetName} (Thức tỉnh)".
          - Lực chiến (powerLevel): Tăng mạnh, vượt qua giới hạn cũ nhờ sự hòa quyện hoàn hảo giữa linh hồn và thể xác.
          - Ngoại hình: Hào quang rực rỡ, đôi mắt sáng rực năng lượng, cơ thể tràn đầy sức sống. Có thể có các ký tự cổ hoặc vòng tròn ma thuật xuất hiện khi linh hồn nhập thể.
          - Mô tả: Sự trở lại từ cõi chết, sức mạnh thần thánh được đánh thức, linh hồn và thể xác hợp nhất làm một.
          - visual_prompt: Phải mô tả một nhân vật tràn đầy sức sống, hào quang rực rỡ, mắt sáng rực, không còn dấu vết của cái chết.`;
    }
  }
  if (upgradeFusion) {
    specialInstructions += `
        ĐÂY LÀ MỘT BẢN NÂNG CẤP (UPGRADE):
        - Thực thể gốc là: ${upgradeFusion.name} (Lực chiến: ${upgradeFusion.powerLevel}, Cấp độ: ${upgradeFusion.level}, Rank: ${upgradeFusion.rank}).
        - Các item mới được thêm vào để nâng cấp thực thể này.
        - Hãy giữ nguyên các đặc điểm cốt lõi của ${upgradeFusion.name} nhưng thêm các tính năng từ các item mới.
        - Lực chiến và cấp độ PHẢI tăng tiến dựa trên thực thể gốc.`;
  }
  if (upgradeFusion)
    specialInstructions += `\nHồ sơ kế thừa: ${upgradeFusion.description}. Tính cách cần giữ: ${upgradeFusion.personality || "Chưa xác định"}.`;

  return specialInstructions;
}
