import type { ChoiceItem } from "../interfaces/ChoiceItem";
import { ICON } from "./icon";

export const CHOICE_ITEMS: ChoiceItem[][] = [
  [//1
    {
      value: 1,
      text: "HIỂU BIẾT",
      description: "Tôi biết nhiều hơn mức cơ bản",
      image: ICON.GLASSES,
    },
    {
      value: 2,
      text: "TÒ MÒ",
      description: "Tôi chưa biết nhiều và muốn biết rõ hơn.",
      image: ICON.MAGNIFYING_GLASS,
    },
    {
      value: 3,
      text: "HOÀI NGHI",
      description: "Tôi chưa thực sự tin tưởng về hiệu quả.",
      image: ICON.QUESTION,
    },
  ],
  [//2
    {
      value: 1,
      text: "CÓ",
    },
    {
      value: 2,
      text: "KHÔNG",
    },
  ],
  [//3
    {
      value: 1,
      text: "1-4",
      image: ICON.PILLS_LITTLE,
    },
    {
      value: 2,
      text: "5+",
      image: ICON.PILLS_MANY,
    },
  ],
  [//4
    {
      value: 1,
      text: "KHÔNG LẦN NÀO",
    },
    {
      value: 2,
      text: "GẦN NHƯ MỖI NGÀY",
    },
    {
      value: 3,
      text: "MỖI NGÀY",
    },
  ],
  [//5
    {
      value: 1,
      text: "CÓ, NHƯNG ĐÃ LÂU RỒI",
    },
    {
      value: 2,
      text: "CÓ, THỈNH THOẢNG",
    },
    {
      value: 3,
      text: "CHƯA BAO GIỜ",
    },
  ],
  [//6
    {
      value: 1,
      text: "NAM",
    },
    {
      value: 2,
      text: "NỮ",
    },
  ],
  [//7
    {
      value: 1,
      text: "MỤC TIÊU CỤ THỂ",
      description: "Tôi đang muốn cải thiện rõ ràng một vấn đề",
      image: ICON.TARGET,
    },
    {
      value: 2,
      text: "CHĂM SÓC BẢN THÂN",
      description: "Tôi muốn giữ sức khỏe tốt hơn",
      image: ICON.LOTUS,
    },
    {
      value: 3,
      text: "THỬ ĐIỀU MỚI",
      description: "Tôi muốn tìm hiểu thêm các lựa chọn phù hợp",
      image: ICON.MAGNIFYING_GLASS,
    },
  ],
  [//8
    {
      value: 1,
      text: "CÓ",
    },
    {
      value: 2,
      text: "KHÔNG",
    },
  ],
  [//9
    {
      value: 1,
      text: "CÓ",
    },
    {
      value: 2,
      text: "KHÔNG",
    },
  ],
  [//10
    {
      value: 1,
      text: "TÔI ĐANG HƠI MỆT, CẦN THÊM NĂNG LƯỢNG",
    },
    {
      value: 2,
      text: "TÔI THẤY MỆT KÉO DÀI ĐÃ MỘT THỜI GIAN",
    },
    {
      value: 3,
      text: "TÔI KIỆT SỨC, CẢM GIÁC BỊ QUÁ TẢI",
    },
  ],
  [//11
    {
      value: 1,
      text: "LÚC MỚI THỨC DẬY",
    },
    {
      value: 2,
      text: "CUỐI BUỔI CHIỀU",
    },
    {
      value: 3,
      text: "CẢ NGÀY",
    },
  ],
  [//12
    {
      value: 1,
      text: "MỠ MÁU (CHOLESTEROL)",
    },
    {
      value: 2,
      text: "HUYẾT ÁP",
    },
    {
      value: 3,
      text: "ĐƯỜNG HUYẾT",
    },
    {
      value: 0,
      text: "KHÔNG CÓ",
    },
  ],
  [//13
    {
      value: 1,
      text: "CÓ",
    },
    {
      value: 2,
      text: "KHÔNG",
    },
  ],
  [//14
    {
      value: 1,
      text: "CÓ",
    },
    {
      value: 2,
      text: "KHÔNG",
    },
  ],
  [//15
    {
      value: 1,
      text: "DA MẤT NƯỚC",
      description: "Khô căng theo mùa (hè/đông)",
    },
    {
      value: 2,
      text: "DA KHÔ",
      description: "Thô ráp, dễ bong tróc",
    },
    {
      value: 3,
      text: "TÔI MUỐN NGĂN NGỪA HOẶC GIẢM NẾP NHĂN",
    },
    {
      value: 4,
      text: "DA CÓ KHUYẾT ĐIỂM",
      description: "Lỗ chân lông to, da dầu, dễ nổi mụn,...",
    },
    {
      value: 0,
      text: "KHÔNG CÓ VẤN ĐỀ CỤ THỂ",
    },
  ],
  [//16
    {
      value: 1,
      text: "TÓC KHÔ HOẶC HƯ TỔN",
    },
    {
      value: 2,
      text: "TÓC THƯA",
    },
    {
      value: 0,
      text: "KHÔNG CÓ VẤN ĐỀ CỤ THỂ",
    },
  ],
  [//17
    {
      value: 1,
      text: "DẠ DÀY",
      description: "Cảm giác đầy bụng sau khi ăn",
    },
    {
      value: 2,
      text: "ĐƯỜNG RUỘT",
      description: "Cảm giác chướng bụng, khó chịu",
    },
    {
      value: 3,
      text: "ĐẠI TRÀNG",
      description: "Rối loạn tiêu hoá, đầy hơi",
    },
  ],
  [//18
    {
      value: 1,
      text: "BÌNH THƯỜNG (1 LẦN/NGÀY)",
    },
    {
      value: 2,
      text: "ÍT HƠN BÌNH THƯỜNG",
    },
    {
      value: 3,
      text: "NHIỀU HƠN BÌNH THƯỜNG",
    },
  ],
  [//19
    {
      value: 1,
      text: "MỆT MỎI",
      description: "Làm việc kéo dài nhiều giờ",
      image: ICON.TIRED,
    },
    {
      value: 2,
      text: "KIỆT SỨC",
      description: "Căng thẳng liên tục",
      image: ICON.NEUTRAL,
    },
    {
      value: 3,
      text: "ĂN MẤT KIỂM SOÁT",
      description: "Hay thèm đồ ngọt, muốn ăn vặt",
      image: ICON.COMPULSIVE,
    },
    {
      value: 4,
      text: "KHÔNG CÓ VẤN ĐỀ GÌ",
      description: "Tôi muốn giữ tinh thần thoải mái, thư giãn",
      image: ICON.RELAXED,
    },
  ],
  [//20
    {
      value: 1,
      text: "HIẾM KHI",
      image: ICON.CALENDAR_X,
    },
    {
      value: 2,
      text: "THỈNH THOẢNG",
      image: ICON.CALENDAR_XX,
    },
    {
      value: 3,
      text: "PHẦN LỚN THỜI GIAN",
      image: ICON.CALENDAR_XXX,
    },
  ],
  [//21
    {
      value: 1,
      text: "XƯƠNG",
    },
    {
      value: 2,
      text: "KHỚP",
    },
    {
      value: 3,
      text: "KHÔNG",
    },
  ],
  [//22
    {
      value: 1,
      text: "CÓ",
    },
    {
      value: 2,
      text: "KHÔNG",
    },
  ],
  [//23
    {
      value: 1,
      text: "CÓ",
    },
    {
      value: 2,
      text: "KHÔNG",
    },
  ],
  [//24
    {
      value: 1,
      text: "GIẢM CÂN",
      image: ICON.SCALE_LEFT,
    },
    {
      value: 2,
      text: "THON GỌN VÓC DÁNG",
      image: ICON.FIT,
    },
    {
      value: 3,
      text: "TĂNG CÂN",
      image: ICON.SCALE_RIGHT,
    },
  ],
  [//25
    {
      value: 1,
      text: "HAY BỊ NẶNG CHÂN",
    },
    {
      value: 2,
      text: "ĂN VẶT KHI CĂNG THẲNG HOẶC BUỒN",
    },
    {
      value: 3,
      text: "ĂN UỐNG QUÁ ĐỘ (ĂN NHIỀU, BIA RƯỢU, V.V.)",
    },
    {
      value: 4,
      text: "DỄ TÍCH MỠ",
    },
    {
      value: 5,
      text: "LUÔN ĐÓI (NGAY CẢ SAU BỮA ĂN) VÀ/HOẶC RẤT THÈM ĐỒ NGỌT",
    },
  ],
  [//26
    {
      value: 1,
      text: "HAY BỊ NẶNG CHÂN",
    },
    {
      value: 2,
      text: "BỊ ĐẦY BỤNG SAU KHI ĂN",
    },
    {
      value: 3,
      text: "CẢM GIÁC CHƯỚNG BỤNG VÀ TÍCH NƯỚC",
    },
  ],
  [//27
    {
      value: 1,
      text: "MỌI THỨ VẪN BÌNH THƯỜNG",
      image: ICON.CALENDAR_V,
    },
    {
      value: 2,
      text: "THỈNH THOẢNG HƠI KHÓ CHỊU",
      image: ICON.CALENDAR_XX,
    },
    {
      value: 3,
      text: "CÓ VÀI VẤN ĐỀ",
      image: ICON.CALENDAR_XXXXX,
    },
  ],
  [//28
    {
      value: 1,
      text: "NHIỀU HƠN 1 LẦN/THÁNG",
    },
    {
      value: 2,
      text: "ĐỀU ĐẶN MỖI THÁNG",
    },
    {
      value: 3,
      text: "ÍT HƠN 1 LẦN/THÁNG",
    },
    {
      value: 4,
      text: "KHÔNG CÓ KINH NGUYỆT",
    },
  ],
  [//29
    {
      value: 1,
      text: "CÓ",
    },
    {
      value: 2,
      text: "KHÔNG",
    },
  ],
  [//30
    {
      value: 1,
      text: "GIẢM HAM MUỐN",
    },
    {
      value: 2,
      text: "HỖ TRỢ KHẢ NĂNG THỤ THAIN",
    },
    {
      value: 0,
      text: "KHÔNG",
    },
  ],
  [//31
    {
      value: 1,
      text: "GIẢM HAM MUỐN",
    },
    {
      value: 2,
      text: "KHẢ NĂNG SINH SẢN",
    },
    {
      value: 3,
      text: "RỐI LOẠN CƯƠNG DƯƠNG",
    },
    {
      value: 0,
      text: "KHÔNG",
    },
  ],
  [//32
    {
      value: 1,
      text: "ÍT HƠN 1 LẦN",
      image: ICON.SPORT_BAN,
    },
    {
      value: 2,
      text: "TỪ 1 ĐẾN 3 LẦN",
      image: ICON.SPORT,
    },
    {
      value: 3,
      text: "HƠN 3 LẦN",
      image: ICON.SPORT_3,
    },
  ],
  [//33
    {
      value: 1,
      text: "CÓ",
    },
    {
      value: 2,
      text: "KHÔNG",
    },
  ],
  [//34
    {
      value: 1,
      text: "NHẸ NHÀNG (ĐI BỘ, GIÃN CƠ)",
    },
    {
      value: 2,
      text: "TẬP TẠ/TĂNG CƠ",
    },
    {
      value: 3,
      text: "SỨC BỀN (CHẠY BỘ, BƠI LỘI)",
    },
    {
      value: 4,
      text: "KHÁC",
    },
    {
      value: 0,
      text: "KHÔNG TẬP THỂ THAO",
    },
  ],
  [//35
    {
      value: 1,
      text: "HIỆU SUẤT",
    },
    {
      value: 2,
      text: "KHẢ NĂNG PHỤC HỒI",
    },
    {
      value: 3,
      text: "ĐỘ LINH HOẠT/DẺO KHỚP",
    },
    {
      value: 4,
      text: "CHUỘT RÚT CƠ",
    },
    {
      value: 5,
      text: "TĂNG CÂN/TĂNG CƠ",
    },
    {
      value: 6,
      text: "TÌNH TRẠNG MẤT NƯỚC",
    },
    {
      value: 0,
      text: "KHÔNG CÓ",
    },
  ],
  [//36
    {
      value: 1,
      text: "TÔI MUỐN CÓ THAI",
      image: ICON.PREGANACY_TEST,
    },
    {
      value: 2,
      text: "TÔI ĐANG MANG THAI",
      image: ICON.PREGNANT_LOVE,
    },
    {
      value: 3,
      text: "TÔI ĐANG CHO CON BÚ",
      image: ICON.BABY_BOTTLE,
    },
  ],
  [//37
    {
      value: 1,
      text: "KHÔNG, TÔI MUỐN BẮT ĐẦU SỐNG LÀNH MẠNH HƠN",
      image: ICON.PUNCH,
    },
    {
      value: 2,
      text: "CÓ, LỐI SỐNG CỦA TÔI RẤT TỐT",
      image: ICON.MEDAL,
    },
    {
      value: 3,
      text: "CÓ, NHÌN CHUNG KHÁ TỐT",
      image: ICON.GOOD,
    },
  ],
  [//38
    {
      value: 0,
      text: "KHÔNG LẦN NÀO",
      image: ICON.FISH_NONE,
    },
    {
      value: 1,
      text: "1-2 LẦN",
      image: ICON.FISH_ONE,
    },
    {
      value: 2,
      text: "TỪ 3 LẦN TRỞ LÊN",
      image: ICON.FISH_THREE,
    },
  ],
  [//39
    {
      value: 0,
      text: "KHÔNG LẦN NÀO",
      image: ICON.MEAT_NONE,
    },
    {
      value: 1,
      text: "1-2 LẦN",
      image: ICON.MEAT_ONE,
    },
    {
      value: 2,
      text: "TỪ 3 LẦN TRỞ LÊN",
      image: ICON.MEAT_THREE,
    },
  ],
  [//40
    {
      value: 0,
      text: "KHÔNG LẦN NÀO",
      image: ICON.CARROT_NONE,
    },
    {
      value: 1,
      text: "1-2 LẦN",
      image: ICON.CARROT_ONE,
    },
    {
      value: 2,
      text: "TỪ 3 LẦN TRỞ LÊN",
      image: ICON.CARROT_THREE,
    },
  ],
  [//41
    {
      value: 0,
      text: "KHÔNG LẦN NÀO",
      image: ICON.MILK_NONE,
    },
    {
      value: 1,
      text: "1-2 LẦN",
      image: ICON.MILK_ONE,
    },
    {
      value: 2,
      text: "TỪ 3 LẦN TRỞ LÊN",
      image: ICON.MILK_THREE,
    },
  ],
  [//42
    {
      value: 1,
      text: "CÓ",
    },
    {
      value: 2,
      text: "KHÔNG",
    },
  ],
  [//43
    {
      value: 1,
      text: "CÓ",
    },
    {
      value: 2,
      text: "KHÔNG",
    },
  ],
  [//44
    {
      value: 1,
      text: "CÓ",
    },
    {
      value: 2,
      text: "KHÔNG",
    },
  ],
  [//45
    {
      value: 1,
      text: "CÓ",
    },
    {
      value: 2,
      text: "KHÔNG",
    },
  ],
  [//46
    {
      value: 1,
      text: "CÓ",
    },
    {
      value: 2,
      text: "KHÔNG",
    },
  ],
  [//47
    {
      value: 1,
      text: "HAY BỊ MỎI / KHÓ CHỊU",
    },
    {
      value: 2,
      text: "THỈNH THOẢNG HƠI KHÓ CHỊU NHẸ",
    },
    {
      value: 3,
      text: "MẮT HOÀN TOÀN BÌNH THƯỜNG",
    },
  ],
  [//48
    {
      value: 1,
      text: "CÓ",
    },
    {
      value: 2,
      text: "KHÔNG",
    },
  ],
  [//49
    {
      value: 0,
      text: "KHÔNG CÓ",
    },
    {
      value: 1,
      text: "SỮA / CÁC SẢN PHẨM TỪ SỮA",
    },
    {
      value: 2,
      text: "TRỨNG",
    },
    {
      value: 3,
      text: "CÁ",
    },
    {
      value: 4,
      text: "HẢI SẢN CÓ VỎ (TÔM, CUA,...)",
    },
    {
      value: 5,
      text: "LẠC (ĐẬU PHỘNG)",
    },
    {
      value: 6,
      text: "ĐẬU NÀNH",
    },
    {
      value: 7,
      text: "THỰC PHẨM CÓ GLUTEN (MÌ, BÁNH MÌ,...)",
    },
    {
      value: 8,
      text: "HẠNH NHÂN",
    },
    {
      value: 9,
      text: "MÈ (VỪNG, HẠT MÈ)",
    },
    {
      value: 10,
      text: "ĐỘNG VẬT THÂN MỀM (NGAO, ỐC,...)",
    },
  ],
  [//50
    {
      value: 0,
      text: "KHÔNG",
    },
    {
      value: 1,
      text: "KHÔNG GLUTEN",
    },
    {
      value: 2,
      text: "THUẦN CHAY",
    },
    {
      value: 3,
      text: "ĂN CHAY",
    },
    {
      value: 4,
      text: "PALEO",
    },
    {
      value: 5,
      text: "KHÔNG SỮA",
    },
    {
      value: 6,
      text: "KETO",
    },
    {
      value: 7,
      text: "ĂN KIÊNG LINH HOẠT",
    },
    {
      value: 8,
      text: "CHỈ ĂN CÁ",
    },
  ],
  [//51
    { value: 1, text: "INSTAGRAM" },
    { value: 2, text: "TÌM KIẾM TRÊN MẠNG" },
    { value: 3, text: "KHÁC" },
    { value: 4, text: "KOL / NGƯỜI ẢNH HƯỞNG" },
    { value: 5, text: "FACEBOOK" },
    { value: 6, text: "TV" },
    { value: 7, text: "BÁO CHÍ / BLOG" },
    { value: 8, text: "YOUTUBE" },
    { value: 9, text: "TIKTOK" },
    { value: 11, text: "BÁC SĨ / NHÂN VIÊN Y TẾ" },
    { value: 12, text: "BẠN BÈ, NGƯỜI QUEN GIỚI THIỆU" }
  ],
  [//52
    {
      value: 0,
      text: "KHÔNG THUỘC TRƯỜNG HỢP NÀO",
    },
    {
      value: 1,
      text: "ĐANG DÙNG THUỐC ỨC CHẾ MIỄN DỊCH"
    }, {
      value: 2,
      text: "ĐANG ĐIỀU TRỊ UNG THƯ"
    }, {
      value: 3,
      text: "ĐANG DÙNG THUỐC CHỐNG ĐÔNG MÁU"
    }, {
      value: 4,
      text: "VẤN ĐỀ VỀ ĐƯỜNG MẬT"
    }, {
      value: 5,
      text: "BỆNH LÝ TUYẾN GIÁP"
    }, {
      value: 6,
      text: "VẤN ĐỀ VỀ GAN"
    }, {
      value: 7,
      text: "ĐANG DÙNG THUỐC CHỐNG TRẦM CẢM"
    }, {
      value: 8,
      text: "ĐANG DÙNG THUỐC GIẢM MỠ MÁU"
    }, {
      value: 9,
      text: "ĐANG MANG THAI HOẶC CHO CON BÚ"
    }
  ]
];
