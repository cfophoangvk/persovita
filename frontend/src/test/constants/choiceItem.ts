import type { ChoiceItem } from "../interfaces/ChoiceItem";
import { ICON } from "./icon";

export const CHOICE_ITEMS: ChoiceItem[][] = [
  [//1
    {
      value: 1,
      text: "CÓ NHIỀU THÔNG TIN",
      description: "Tôi biết nhiều hơn mức trung bình",
      image: ICON.GLASSES,
    },
    {
      value: 2,
      text: "TÒ MÒ",
      description: "Tôi muốn biết nhiều hơn",
      image: ICON.MAGNIFYING_GLASS,
    },
    {
      value: 3,
      text: "HOÀI NGHI",
      description: "Tôi vẫn chưa tin",
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
      text: "CHƯA BAO GIỜ",
    },
    {
      value: 2,
      text: "HẦU HẾT LÀ HÀNG NGÀY",
    },
    {
      value: 3,
      text: "HÀNG NGÀY",
    },
  ],
  [//5
    {
      value: 1,
      text: "MỘT THỜI GIAN TRƯỚC ĐÂY",
    },
    {
      value: 2,
      text: "THỈNH THOẢNG",
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
      text: "NHU CẦU CỤ THỂ",
      description: "Tôi có một mục tiêu đã xác định",
      image: ICON.TARGET,
    },
    {
      value: 2,
      text: "CHỈ MUỐN CẢM THẤY TỐT",
      description: "Tôi muốn chăm sóc bản thân",
      image: ICON.LOTUS,
    },
    {
      value: 3,
      text: "TÌM KIẾM MỘT ĐIỀU GÌ ĐÓ MỚI",
      description: "Tôi muốn khám phá những điều mới mẻ",
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
      text: "TÔI CẦN MỘT SỰ HỖ TRỢ.",
    },
    {
      value: 2,
      text: "TÔI CẢM THẤY MỆT MỎI ĐƯỢC MỘT LÚC.",
    },
    {
      value: 3,
      text: "TÔI QUÁ MỆT MỎI, GẦN NHƯ KIỆT SỨC.",
    },
  ],
  [//11
    {
      value: 1,
      text: "KHI TÔI THỨC DẬY",
    },
    {
      value: 2,
      text: "VÀO BUỔI CHIỀU",
    },
    {
      value: 3,
      text: "CẢ NGÀY",
    },
  ],
  [//12
    {
      value: 1,
      text: "CHOLESTEROL",
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
      text: "DA CỦA TÔI BỊ MẤT NƯỚC",
      description: "Khô tạm thời (mùa hè/mùa đông)",
    },
    {
      value: 2,
      text: "DA CỦA TÔI BỊ KHÔ",
      description: "Da căng, thô ráp",
    },
    {
      value: 3,
      text: "TÔI MUỐN NGĂN NGỪA HOẶC CHỐNG LẠI NẾP NHĂN",
    },
    {
      value: 4,
      text: "DA CỦA TÔI CÓ KHUYẾT ĐIỂM",
      description: "Da dầu, v.v.",
    },
    {
      value: 0,
      text: "KHÔNG CÓ VẤN ĐỀ CỤ THỂ",
    },
  ],
  [//16
    {
      value: 1,
      text: "TÓC KHÔ VÀ/HOẶC HƯ HỎNG",
    },
    {
      value: 2,
      text: "TÓC CỦA TÔI BỊ THƯA",
    },
    {
      value: 0,
      text: "KHÔNG CÓ VẤN ĐỀ CỤ THỂ",
    },
  ],
  [//17
    {
      value: 1,
      text: "BỤNG",
      description: "cảm giác quá no sau bữa ăn",
    },
    {
      value: 2,
      text: "TRONG RUỘT",
      description: "Cảm giác đầy hơi",
    },
    {
      value: 3,
      text: "ĐẠI TRÀNG",
      description: "rối loạn vận chuyển và đầy hơi",
    },
  ],
  [//18
    {
      value: 1,
      text: "BÌNH THƯỜNG",
    },
    {
      value: 2,
      text: "KHÔNG THƯỜNG XUYÊN ĐỦ",
    },
    {
      value: 3,
      text: "QUÁ THƯỜNG XUYÊN",
    },
  ],
  [//19
    {
      value: 1,
      text: "CẢM THẤY MỆT MỎI",
      description: "Làm việc xuyên đêm dài",
      image: ICON.TIRED,
    },
    {
      value: 2,
      text: "CẢM THẤY KIỆT SỨC",
      description: "Lo lắng liên tục",
      image: ICON.NEUTRAL,
    },
    {
      value: 3,
      text: "ĂN UỐNG KHÔNG KIỂM SOÁT",
      description: "Thèm đường...",
      image: ICON.COMPULSIVE,
    },
    {
      value: 4,
      text: "KHÔNG CÓ",
      description: "Tôi muốn được thư giãn",
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
      text: "THI THOẢNG",
      image: ICON.CALENDAR_XX,
    },
    {
      value: 3,
      text: "HẦU HẾT MỌI LÚC",
      image: ICON.CALENDAR_XXX,
    },
  ],
  [//21
    {
      value: 1,
      text: "TỚI XƯƠNG",
    },
    {
      value: 2,
      text: "TỚI KHỚP",
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
      text: "CẢI THIỆN VÓC DÁNG",
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
      text: "CÓ ĐÔI CHÂN NẶNG NỀ",
    },
    {
      value: 2,
      text: "ĂN VẶT KHI CĂNG THẲNG HOẶC BUỒN RỖI",
    },
    {
      value: 3,
      text: "ĂN UỐNG QUÁ ĐỘ (BỮA ĂN NẶNG NỀ, RƯỢU BIA, V.V.)",
    },
    {
      value: 4,
      text: "DỄ DÀNG TÍCH TRỮ MỠ",
    },
    {
      value: 5,
      text: "LUÔN CẢM THẤY ĐÓI (NGAY CẢ SAU BỮA ĂN) VÀ/HOẶC THÈM ĐỒ NGỌT MỘT CÁCH ÁM ẢNH?",
    },
  ],
  [//26
    {
      value: 1,
      text: "CÓ ĐÔI CHÂN NẶNG NỀ",
    },
    {
      value: 2,
      text: "ĐẦY HƠI SAU BỮA ĂN",
    },
    {
      value: 3,
      text: "CẢM THẤY SƯNG TẤY VÀ GIỮ NƯỚC",
    },
  ],
  [//27
    {
      value: 1,
      text: "Mọi thứ đều ổn",
      image: ICON.CALENDAR_V,
    },
    {
      value: 2,
      text: "Khó chịu nhẹ thỉnh thoảng",
      image: ICON.CALENDAR_XX,
    },
    {
      value: 3,
      text: "Một số khó khăn",
      image: ICON.CALENDAR_XXXXX,
    },
  ],
  [//28
    {
      value: 1,
      text: "Nhiều hơn một lần một tháng",
    },
    {
      value: 2,
      text: "Hàng tháng",
    },
    {
      value: 3,
      text: "Ít hơn một lần một tháng",
    },
    {
      value: 4,
      text: "Tôi không có kinh nguyệt",
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
      text: "GIẢM HAM MUỐN TÌNH DỤC",
    },
    {
      value: 2,
      text: "KHẢ NĂNG SINH SẢN",
    },
    {
      value: 0,
      text: "KHÔNG CÓ GÌ",
    },
  ],
  [//31
    {
      value: 1,
      text: "GIẢM HAM MUỐN TÌNH DỤC",
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
      text: "KHÔNG CÓ GÌ",
    },
  ],
  [//32
    {
      value: 1,
      text: "Ít hơn 1 lần",
      image: ICON.SPORT_BAN,
    },
    {
      value: 2,
      text: "1 đến 3 lần",
      image: ICON.SPORT,
    },
    {
      value: 3,
      text: "Nhiều hơn 3 lần",
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
      text: "NHẸ (ĐI BỘ, KÉO DÃN)",
    },
    {
      value: 2,
      text: "TẬP SỨC MẠNH",
    },
    {
      value: 3,
      text: "BỀN BỈ (CHẠY BỘ, BƠI LỘI)",
    },
    {
      value: 4,
      text: "KHÁC",
    },
    {
      value: 0,
      text: "KHÔNG CÓ",
    },
  ],
  [//35
    {
      value: 1,
      text: "HIỆU SUẤT",
    },
    {
      value: 2,
      text: "PHỤC HỒI",
    },
    {
      value: 3,
      text: "KHẢ NĂNG VẬN ĐỘNG KHỚP",
    },
    {
      value: 4,
      text: "CHUỘT RÚT CƠ BẮP",
    },
    {
      value: 5,
      text: "TĂNG CÂN",
    },
    {
      value: 6,
      text: "HỒI PHỤC NƯỚC",
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
      text: "TÔI SẼ BẮT ĐẦU TỪ BÂY GIỜ",
      image: ICON.PUNCH,
    },
    {
      value: 2,
      text: "VÂNG, TẤT NHIÊN",
      image: ICON.MEDAL,
    },
    {
      value: 3,
      text: "CÓ, KHÔNG TỆ",
      image: ICON.GOOD,
    },
  ],
  [//38
    {
      value: 0,
      text: "KHÔNG CÓ",
      image: ICON.FISH_NONE,
    },
    {
      value: 1,
      text: "1-2 LẦN",
      image: ICON.FISH_ONE,
    },
    {
      value: 2,
      text: "3 LẦN TRỞ LÊN",
      image: ICON.FISH_THREE,
    },
  ],
  [//39
    {
      value: 0,
      text: "KHÔNG CÓ",
      image: ICON.MEAT_NONE,
    },
    {
      value: 1,
      text: "1-2 LẦN",
      image: ICON.MEAT_ONE,
    },
    {
      value: 2,
      text: "3 LẦN TRỞ LÊN",
      image: ICON.MEAT_THREE,
    },
  ],
  [//40
    {
      value: 0,
      text: "KHÔNG CÓ",
      image: ICON.CARROT_NONE,
    },
    {
      value: 1,
      text: "1-2 LẦN",
      image: ICON.CARROT_ONE,
    },
    {
      value: 2,
      text: "3 LẦN TRỞ LÊN",
      image: ICON.CARROT_THREE,
    },
  ],
  [//41
    {
      value: 0,
      text: "KHÔNG CÓ",
      image: ICON.MILK_NONE,
    },
    {
      value: 1,
      text: "1-2 LẦN",
      image: ICON.MILK_ONE,
    },
    {
      value: 2,
      text: "3 LẦN TRỞ LÊN",
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
  [
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
      text: "MỘT SỐ KHÓ KHĂN",
    },
    {
      value: 2,
      text: "THỈNH THOẢNG HƠI KHÓ CHỊU",
    },
    {
      value: 3,
      text: "MỌI THỨ ĐỀU ỔN",
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
      value: 0,
      text: "KHÔNG CÓ",
    },
    {
      value: 1,
      text: "SỮA",
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
      text: "ĐỘNG VẬT CÓ VỎ",
    },
    {
      value: 5,
      text: "ĐẬU PHỘNG",
    },
    {
      value: 6,
      text: "ĐẬU NÀNH",
    },
    {
      value: 7,
      text: "GLUTEN",
    },
    {
      value: 8,
      text: "CÁC LOẠI HẠT",
    },
    {
      value: 9,
      text: "MÙ TẠT",
    },
    {
      value: 10,
      text: "HẠT VỪNG",
    },
    {
      value: 11,
      text: "LƯU HUỲNH DIOXIT VÀ SULPHIT",
    },
    {
      value: 12,
      text: "ĐẬU LUPIN",
    },
    {
      value: 13,
      text: "ĐỘNG VẬT THÂN MỀM",
    },
  ],
  [//48
    {
      value: 0,
      text: "KHÔNG CÓ",
    },
    {
      value: 1,
      text: "KHÔNG CHỨA GLUTEN",
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
      text: "KHÔNG DÙNG SỮA",
    },
    {
      value: 6,
      text: "KETOGENIC (CHẾ ĐỘ ĂN KETO)",
    },
    {
      value: 7,
      text: "FLEXITARIAN (THUẦN CHAY LINH HOẠT)",
    },
    {
      value: 8,
      text: "PESCETARIAN (ĂN CHAY CÓ CÁ)",
    },
  ],
  [//49
    {
      value: 1,
      text: "TÔI LÀ MỘT NGƯỜI HÂM MỘ",
      description: "Đó là tiếng nói của sự khôn ngoan",
      image: ICON.RELAXED,
    },
    {
      value: 2,
      text: "TÔI MỞ LÒNG ĐÓN NHẬN",
      description: "Tôi không biết đủ",
      image: ICON.RELAXED,
    },
    {
      value: 3,
      text: "TÔI HOÀI NGHI",
      description: "Nó không phải là một phần của văn hóa tôi",
      image: ICON.QUESTION,
    },
  ],
  [//50
    { value: 1, text: "TRUYỀN MIỆNG" },
    { value: 2, text: "TV" },
    { value: 3, text: "YOUTUBE" },
    { value: 4, text: "NGƯỜI CÓ TẦM ẢNH HƯỞNG" },
    { value: 5, text: "ƯU ĐÃI ĐỐI TÁC" },
    { value: 6, text: "FACEBOOK" },
    { value: 7, text: "TIKTOK" },
    { value: 8, text: "PINTEREST" },
    { value: 9, text: "TÌM KIẾM TRỰC TUYẾN" },
    { value: 10, text: "AMAZON" },
    { value: 11, text: "PODCAST" },
    { value: 12, text: "BÁO CHÍ HOẶC BLOG" },
    { value: 13, text: "CHUYÊN GIA Y TẾ" },
    { value: 14, text: "KHÁC" },
    { value: 15, text: "INSTAGRAM" },
    { value: 16, text: "SNAPCHAT" },
  ],
];
