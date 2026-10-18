export const CHARACTER_DATA: Record<
  string,
  { eras: string[]; states: Record<string, string[]> }
> = {
  Goku: {
    eras: [
      "Dragon Ball (Kid)",
      "Dragon Ball Z",
      "Dragon Ball GT",
      "Dragon Ball Super",
      "Xeno (Multiverse)",
    ],
    states: {
      "Dragon Ball (Kid)": ["Base", "Great Ape"],
      "Dragon Ball Z": [
        "Base",
        "Super Saiyan",
        "Super Saiyan 2",
        "Super Saiyan 3",
      ],
      "Dragon Ball GT": [
        "Base",
        "Super Saiyan",
        "Super Saiyan 2",
        "Super Saiyan 3",
        "Super Saiyan 4",
      ],
      "Dragon Ball Super": [
        "Base",
        "Super Saiyan",
        "Super Saiyan God",
        "Super Saiyan Blue",
        "Ultra Instinct",
      ],
      "Xeno (Multiverse)": [
        "Base",
        "Super Saiyan",
        "Super Saiyan 3",
        "Super Saiyan 4",
      ],
    },
  },
  Vegeta: {
    eras: [
      "Dragon Ball Z",
      "Dragon Ball GT",
      "Dragon Ball Super",
      "Xeno (Multiverse)",
    ],
    states: {
      "Dragon Ball Z": ["Base", "Super Saiyan", "Super Saiyan 2", "Majin"],
      "Dragon Ball GT": [
        "Base",
        "Super Saiyan",
        "Super Saiyan 2",
        "Super Saiyan 4",
      ],
      "Dragon Ball Super": [
        "Base",
        "Super Saiyan",
        "Super Saiyan God",
        "Super Saiyan Blue",
        "Blue Evolution",
        "Ultra Ego",
      ],
      "Xeno (Multiverse)": ["Base", "Super Saiyan", "Super Saiyan 4"],
    },
  },
  Gohan: {
    eras: [
      "Dragon Ball Z (Kid)",
      "Dragon Ball Z (Teen)",
      "Dragon Ball Z (Adult)",
      "Dragon Ball Super",
      "Future Timeline",
    ],
    states: {
      "Dragon Ball Z (Kid)": ["Base", "Great Ape"],
      "Dragon Ball Z (Teen)": ["Base", "Super Saiyan", "Super Saiyan 2"],
      "Dragon Ball Z (Adult)": [
        "Base",
        "Super Saiyan",
        "Super Saiyan 2",
        "Ultimate",
      ],
      "Dragon Ball Super": ["Base", "Super Saiyan", "Ultimate", "Beast Mode"],
      "Future Timeline": ["Base", "Super Saiyan"],
    },
  },
  Trunks: {
    eras: [
      "Dragon Ball Z (Kid)",
      "Future Timeline",
      "Dragon Ball Super",
      "Xeno (Multiverse)",
    ],
    states: {
      "Dragon Ball Z (Kid)": ["Base", "Super Saiyan"],
      "Future Timeline": ["Base", "Super Saiyan", "Super Saiyan 2"],
      "Dragon Ball Super": [
        "Base",
        "Super Saiyan",
        "Super Saiyan 2",
        "Super Saiyan Rage",
      ],
      "Xeno (Multiverse)": ["Base", "Super Saiyan", "Super Saiyan 3", "God"],
    },
  },
  Piccolo: {
    eras: ["Dragon Ball Z", "Dragon Ball Super"],
    states: {
      "Dragon Ball Z": ["Base", "Fused with Nail", "Fused with Kami"],
      "Dragon Ball Super": ["Base", "Potential Unleashed", "Orange Form"],
    },
  },
  Frieza: {
    eras: ["Dragon Ball Z", "Dragon Ball Super"],
    states: {
      "Dragon Ball Z": [
        "1st Form",
        "2nd Form",
        "3rd Form",
        "Final Form",
        "Full Power",
      ],
      "Dragon Ball Super": ["Final Form", "Golden Form", "Black Form"],
    },
  },
  Broly: {
    eras: ["Dragon Ball Z (Movie)", "Dragon Ball Super", "Dragon Ball GT"],
    states: {
      "Dragon Ball Z (Movie)": [
        "Base",
        "Super Saiyan",
        "Legendary Super Saiyan",
      ],
      "Dragon Ball Super": [
        "Base",
        "Wrathful",
        "Super Saiyan",
        "Full Power Super Saiyan",
      ],
      "Dragon Ball GT": ["Base", "Super Saiyan 4"],
    },
  },
  "Omega Shenron": {
    eras: ["Dragon Ball GT"],
    states: {
      "Dragon Ball GT": ["Syn Shenron", "Omega Shenron (7 Dragons Absorbed)"],
    },
  },
  Beerus: {
    eras: ["Dragon Ball Super"],
    states: { "Dragon Ball Super": ["Base", "Suppressed", "Hakai Mode"] },
  },
  Whis: {
    eras: ["Dragon Ball Super"],
    states: { "Dragon Ball Super": ["Base", "Serious"] },
  },
  "Android 17": {
    eras: ["Dragon Ball Z", "Dragon Ball Super"],
    states: {
      "Dragon Ball Z": ["Base"],
      "Dragon Ball Super": ["Base", "Ranger Mode"],
    },
  },
  "Android 18": {
    eras: ["Dragon Ball Z", "Dragon Ball Super"],
    states: {
      "Dragon Ball Z": ["Base"],
      "Dragon Ball Super": ["Base"],
    },
  },
  Krillin: {
    eras: ["Dragon Ball Z", "Dragon Ball Super"],
    states: {
      "Dragon Ball Z": ["Base", "Potential Unlocked"],
      "Dragon Ball Super": ["Base", "No Ego Zone"],
    },
  },
  "Majin Buu": {
    eras: ["Dragon Ball Z"],
    states: {
      "Dragon Ball Z": [
        "Fat Buu",
        "Super Buu",
        "Kid Buu",
        "Buu (Gohan Absorbed)",
      ],
    },
  },
  Cell: {
    eras: ["Dragon Ball Z"],
    states: {
      "Dragon Ball Z": [
        "First Form",
        "Semi-Perfect",
        "Perfect Form",
        "Super Perfect",
      ],
    },
  },
  Hit: {
    eras: ["Dragon Ball Super"],
    states: {
      "Dragon Ball Super": ["Base", "Full Power", "Time Skip Mastery"],
    },
  },
  Cabba: {
    eras: ["Dragon Ball Super"],
    states: { "Dragon Ball Super": ["Base", "Super Saiyan", "Super Saiyan 2"] },
  },
  Caulifla: {
    eras: ["Dragon Ball Super"],
    states: { "Dragon Ball Super": ["Base", "Super Saiyan", "Super Saiyan 2"] },
  },
  Kale: {
    eras: ["Dragon Ball Super"],
    states: {
      "Dragon Ball Super": [
        "Base",
        "Super Saiyan (Berserk)",
        "Super Saiyan (Controlled)",
        "Super Saiyan 2",
      ],
    },
  },
  Champa: {
    eras: ["Dragon Ball Super"],
    states: { "Dragon Ball Super": ["Base"] },
  },
  Vados: {
    eras: ["Dragon Ball Super"],
    states: { "Dragon Ball Super": ["Base"] },
  },
  Frost: {
    eras: ["Dragon Ball Super"],
    states: {
      "Dragon Ball Super": ["1st Form", "3rd Form", "Final Form", "Full Power"],
    },
  },
  Jiren: {
    eras: ["Dragon Ball Super"],
    states: { "Dragon Ball Super": ["Base", "Full Power"] },
  },
  Toppo: {
    eras: ["Dragon Ball Super"],
    states: { "Dragon Ball Super": ["Base", "God of Destruction Mode"] },
  },
  Dyspo: {
    eras: ["Dragon Ball Super"],
    states: { "Dragon Ball Super": ["Base", "Super Maximum Light Speed Mode"] },
  },
  Belmod: {
    eras: ["Dragon Ball Super"],
    states: { "Dragon Ball Super": ["Base"] },
  },
  Marcarita: {
    eras: ["Dragon Ball Super"],
    states: { "Dragon Ball Super": ["Base"] },
  },
  "Đại Thiên Sứ": {
    eras: ["Dragon Ball Super"],
    states: {
      "Dragon Ball Super": [
        "Base (Gấp 3.000 lần Whis)",
        "Serious (Xuất thủ nghiêm túc)",
      ],
    },
  },
  Zeno: {
    eras: ["Dragon Ball Super"],
    states: {
      "Dragon Ball Super": [
        "Base (Gấp 100 lần Đại Thiên Sứ)",
        "Angry (Toàn Năng - Xóa Sổ Vạn Vật)",
      ],
    },
  },
  "Khởi Nguyên Thần": {
    eras: ["Cảnh Giới Tối Cao"],
    states: {
      "Cảnh Giới Tối Cao": [
        "Base (Gấp 1 Triệu lần Zeno)",
        "Thức Tỉnh (1 Ý Nghĩ Xóa Sổ Vạn Thế Giới)",
      ],
    },
  },
  "Hỗn Độn Thần": {
    eras: ["Cảnh Giới Tối Cao"],
    states: {
      "Cảnh Giới Tối Cao": [
        "1 Ngôi Sao ⭐",
        "2 Ngôi Sao ⭐⭐",
        "3 Ngôi Sao ⭐⭐⭐",
        "5 Ngôi Sao ⭐⭐⭐⭐⭐",
        "Tối Thượng Hư Vô ⭐ x10",
      ],
    },
  },
  Zamasu: {
    eras: ["Dragon Ball Super"],
    states: {
      "Dragon Ball Super": ["Base", "Fused Zamasu", "Fused Zamasu (Corrupted)"],
    },
  },
  "Goku Black": {
    eras: ["Dragon Ball Super"],
    states: {
      "Dragon Ball Super": ["Base", "Super Saiyan", "Super Saiyan Rosé"],
    },
  },
  "Baby (Kí sinh trùng)": {
    eras: ["Dragon Ball GT"],
    states: {
      "Dragon Ball GT": [
        "Baby Form",
        "Baby Vegeta",
        "Super Baby 1",
        "Super Baby 2",
        "Golden Great Ape Baby",
      ],
    },
  },
  "Virus Zombie": {
    eras: ["Đại Dịch (Apocalypse)"],
    states: {
      "Đại Dịch (Apocalypse)": [
        "Dạng lây nhiễm cơ bản",
        "Dạng đột biến DNA",
        "Dạng cộng sinh hoàn hảo",
      ],
    },
  },
  "Pin Infinity": {
    eras: ["Vật phẩm (Items)"],
    states: {
      "Vật phẩm (Items)": [
        "Nguồn năng lượng vô hạn",
        "Hút 99.9% năng lượng của vật chủ",
      ],
    },
  },
  "DNA Saiyan": {
    eras: ["DNA"],
    states: {
      DNA: [
        "Base",
        "Super Saiyan 1",
        "Super Saiyan 2",
        "Super Saiyan 3",
        "Super Saiyan God",
        "Super Saiyan Blue",
      ],
    },
  },
  "DNA Hakai": {
    eras: ["DNA"],
    states: { DNA: ["Base", "Năng lượng Hủy Diệt", "Hakai Mode"] },
  },
  "DNA Thiên sứ": {
    eras: ["DNA"],
    states: { DNA: ["Base", "Ultra Instinct", "Angel Power"] },
  },
  "DNA Kaioshin": {
    eras: ["DNA"],
    states: { DNA: ["Base", "Potara Magic", "Creation Power"] },
  },
  "Nữ thần quyến rũ": {
    eras: ["NSFW"],
    states: { NSFW: ["Dạng cơ bản", "Dạng mê hoặc", "Dạng tối thượng"] },
  },
  "Huyết mạch dâm đãng": {
    eras: ["NSFW"],
    states: { NSFW: ["Kích hoạt", "Bùng nổ ham muốn"] },
  },
  "Trang phục thiếu vải": {
    eras: ["Vật phẩm (Items)"],
    states: { "Vật phẩm (Items)": ["Mặc vào", "Rách rưới"] },
  },
  "Hào quang mê hoặc": {
    eras: ["Vật phẩm (Items)"],
    states: { "Vật phẩm (Items)": ["Kích hoạt", "Tỏa sáng"] },
  },
  "Nụ hôn tử thần": {
    eras: ["Vật phẩm (Items)"],
    states: { "Vật phẩm (Items)": ["Kích hoạt", "Hút hồn"] },
  },
  "DNA Mabu": {
    eras: ["DNA"],
    states: { DNA: ["Base", "Hấp thụ", "Tái tạo vô hạn", "Ma thuật Buu"] },
  },
  "DNA Kaioken x1000000000": {
    eras: ["DNA"],
    states: {
      DNA: ["Kích hoạt", "Quá tải năng lượng", "Vượt giới hạn tuyệt đối"],
    },
  },
  "Người Phàm": {
    eras: ["Trái Đất"],
    states: { "Trái Đất": ["Base", "Võ sư", "Thiên tài công nghệ"] },
  },
  "Găng tay vô cực": {
    eras: ["Vật phẩm (Items)"],
    states: {
      "Vật phẩm (Items)": ["Quyền năng 6 viên đá", "Búng tay xóa sổ"],
    },
  },
  "DNA 10 quả tim": {
    eras: ["DNA"],
    states: { DNA: ["Kích hoạt 10 quả tim", "Bùng nổ sức sống"] },
  },
  "Sợi xích infinity": {
    eras: ["Vật phẩm (Items)"],
    states: {
      "Vật phẩm (Items)": ["Phong ấn 10000% sức mạnh", "Giải phóng xiềng xích"],
    },
  },
  "Kamen Rider Decade": {
    eras: ["Heisei Era", "Neo Heisei Era"],
    states: {
      "Heisei Era": ["Base Form", "Complete Form", "Violent Emotion"],
      "Neo Heisei Era": ["Neo Decade Form"],
    },
  },
  "Đai lưng decade": {
    eras: ["Vật phẩm (Items)"],
    states: {
      "Vật phẩm (Items)": [
        "Kamen Ride: Decade",
        "Complete Form",
        "Violent Emotion",
      ],
    },
  },
  "DNA sao chép": {
    eras: ["DNA"],
    states: { DNA: ["Sao chép 99% sức mạnh", "Phân tích đối thủ"] },
  },
  "Đóng băng vĩnh viễn": {
    eras: ["Vật phẩm (Items)"],
    states: {
      "Vật phẩm (Items)": ["Nhốt trong khối băng", "Mất ý thức vĩnh cửu"],
    },
  },
  "Dơi hút máu": {
    eras: ["Vật phẩm (Items)"],
    states: { "Vật phẩm (Items)": ["Hút cạn máu", "Kí sinh năng lượng"] },
  },
  "Bộ não siêu máy tính": {
    eras: ["Vật phẩm (Items)"],
    states: {
      "Vật phẩm (Items)": ["Kích hoạt trí tuệ nhân tạo", "Phân tích đa vũ trụ"],
    },
  },
  "Máy Triệu Hồi (Summon Machine)": {
    eras: ["Vật phẩm (Items)"],
    states: {
      "Vật phẩm (Items)": ["Kích hoạt triệu hồi", "Phân tích bản gốc"],
    },
  },
  "Sinh mệnh vô hạn": {
    eras: ["Vật phẩm (Items)"],
    states: { "Vật phẩm (Items)": ["Bất tử bất diệt", "Hồi phục tuyệt đối"] },
  },
  "Thánh kiếm vô cực": {
    eras: ["Vật phẩm (Items)"],
    states: { "Vật phẩm (Items)": ["Chém đứt không gian", "Sát thần"] },
  },
  "Thanh tẩy debuff": {
    eras: ["Vật phẩm (Items)"],
    states: {
      "Vật phẩm (Items)": [
        "Xóa bỏ mọi trạng thái xấu",
        "Khôi phục trạng thái hoàn hảo",
      ],
    },
  },
  "Máy Hút DNA": {
    eras: ["Vật phẩm (Items)"],
    states: {
      "Vật phẩm (Items)": [
        "Kích hoạt chế độ hút DNA",
        "Phân tích cấu trúc gen",
      ],
    },
  },
  "Bàn tay phải của Daishinkan (bị chặt đứt)": {
    eras: ["Vật phẩm (Items)"],
    states: {
      "Vật phẩm (Items)": ["Nguồn sức mạnh tối cao", "Lời nguyền của Thiên Sứ"],
    },
  },
  "Thiện Ác": {
    eras: ["Vật phẩm (Items)"],
    states: {
      "Vật phẩm (Items)": [
        "Chuyển đổi Thiện sang Ác",
        "Chuyển đổi Ác sang Thiện",
      ],
    },
  },
  "Dragon Ball Super": {
    eras: ["Vật phẩm (Items)"],
    states: { "Vật phẩm (Items)": ["Kích hoạt điều ước"] },
  },
  "Đoạt linh hồn": {
    eras: ["Vật phẩm (Items)"],
    states: { "Vật phẩm (Items)": ["Kích hoạt"] },
  },
  "Đoạt xác": {
    eras: ["Vật phẩm (Items)"],
    states: { "Vật phẩm (Items)": ["Hút hồn", "Đoạt xác"] },
  },
  "Linh hồn": {
    eras: ["Vật phẩm (Items)"],
    states: { "Vật phẩm (Items)": ["Nhập hồn", "Hồi sinh"] },
  },
  "Tước đoạt": {
    eras: ["Vật phẩm (Items)"],
    states: {
      "Vật phẩm (Items)": [
        "Cướp huyết mạch",
        "Tước đoạt sức mạnh",
        "Hấp thụ linh hồn",
      ],
    },
  },
  Cumber: {
    eras: ["Dragon Ball Heroes"],
    states: {
      "Dragon Ball Heroes": [
        "Base",
        "Evil Saiyan",
        "Super Saiyan",
        "Super Saiyan 3",
        "Golden Great Ape",
      ],
    },
  },
  Fu: {
    eras: ["Dragon Ball Heroes"],
    states: {
      "Dragon Ball Heroes": ["Base", "Super Fu", "Dark King Fu"],
    },
  },
  Hearts: {
    eras: ["Dragon Ball Heroes"],
    states: {
      "Dragon Ball Heroes": ["Base", "Super Hearts", "Ultimate Hearts"],
    },
  },
  Mechikabura: {
    eras: ["Dragon Ball Heroes"],
    states: {
      "Dragon Ball Heroes": ["Dạng già", "Dạng trẻ", "Dark King Mechikabura"],
    },
  },
  Sealas: {
    eras: ["Dragon Ball Heroes"],
    states: {
      "Dragon Ball Heroes": ["Base", "Dung hợp với Ahms"],
    },
  },
  Chronoa: {
    eras: ["Dragon Ball Heroes"],
    states: {
      "Dragon Ball Heroes": ["Base", "Giải phóng sức mạnh thời gian"],
    },
  },
};

export const UNIVERSES: Record<string, string[]> = {
  "Vũ trụ 7": [
    "Goku",
    "Vegeta",
    "Gohan",
    "Trunks",
    "Piccolo",
    "Frieza",
    "Broly",
    "Beerus",
    "Whis",
    "Android 17",
    "Android 18",
    "Krillin",
    "Majin Buu",
    "Cell",
    "Omega Shenron",
  ],
  "Vũ trụ 6": ["Hit", "Cabba", "Caulifla", "Kale", "Champa", "Vados", "Frost"],
  "Vũ trụ 11": ["Jiren", "Toppo", "Dyspo", "Belmod", "Marcarita"],
  "Thần Thánh Tối Cao": [
    "Đại Thiên Sứ",
    "Zeno",
    "Khởi Nguyên Thần",
    "Hỗn Độn Thần",
  ],
  "Dragon Ball Heroes": [
    "Cumber",
    "Fu",
    "Hearts",
    "Mechikabura",
    "Sealas",
    "Chronoa",
  ],
  "Trang bị": [
    "Pin Infinity",
    "Sợi xích infinity",
    "Găng tay vô cực",
    "Thánh kiếm vô cực",
    "Máy Hút DNA",
    "Máy Triệu Hồi (Summon Machine)",
    "Bộ não siêu máy tính",
    "Bàn tay phải của Daishinkan (bị chặt đứt)",
  ],
  "Vật phẩm (Items)": [
    "Đóng băng vĩnh viễn",
    "Dơi hút máu",
    "Sinh mệnh vô hạn",
    "Thanh tẩy debuff",
    "Tước đoạt",
    "Đoạt linh hồn",
    "Đoạt xác",
    "Linh hồn",
    "Thiện Ác",
    "Dragon Ball Super",
  ],
  DNA: [
    "DNA Saiyan",
    "DNA Hakai",
    "DNA Thiên sứ",
    "DNA Kaioshin",
    "DNA Mabu",
    "DNA Kaioken x1000000000",
    "DNA 10 quả tim",
    "DNA sao chép",
  ],
  "NSFW 18+": [
    "Nữ thần quyến rũ",
    "Huyết mạch dâm đãng",
    "Trang phục thiếu vải",
    "Hào quang mê hoặc",
    "Nụ hôn tử thần",
  ],
  Khác: [
    "Goku Black",
    "Zamasu",
    "Baby (Kí sinh trùng)",
    "Virus Zombie",
    "Người Phàm",
  ],
};

export const PRESET_CHARACTERS = Object.keys(CHARACTER_DATA);
