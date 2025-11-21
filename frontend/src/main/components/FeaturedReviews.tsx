import React from "react";
type Review = {
  productId?: number;
  reviewBy: string;
  reviewDate?: string;
  description: string;
};

const FeaturedReviews: React.FC = () => {
  const reviews: Review[] = [
    {
      reviewBy: "Phương Linh, 34 tuổi - HR",
      description: "“Làm test xong nhận được gói vitamin riêng cho mình thấy rất wow. Mọi thứ được đóng gói cẩn thận, giao nhanh và cảm giác tin tưởng ngay từ cách Nouri trình bày thông tin. Đây đúng là kiểu chăm sóc sức khỏe thông minh mà mình cần.”",
    },
    {
      reviewBy: "Trọng Khang, 38 tuổi - lập trình viên.",
      description: "“Mình không nghĩ chỉ 5 phút làm bài đánh giá mà Nouri có thể hiểu rõ thói quen ăn uống và tình trạng cơ thể của mình đến vậy. Khi mở hộp vitamin ra, từng viên đều được để trong gói nhỏ tiện lợi và có hướng dẫn cụ thể. Mình cảm giác cực kỳ chỉn chu và uy tín.”",
    },
    {
      reviewBy: "Bảo Nam, 28 tuổi - freelancer",
      description:
        "“Không cần phải ra hiệu thuốc hỏi từng loại vitamin nữa. Mình chỉ cần 5 phút làm test và Nouri lo hết cho mình phần còn lại. Giao hàng tận nơi, đóng gói sản phẩm đẹp, thông tin rõ ràng.”",
    },
    {
      reviewBy: "Vũ Hòa, 28 tuổi - chuyên viên marketing.",
      description:
        "“Mình từng lo vì đây là dịch vụ online, nhưng khi nhận hộp đầu tiên thì mọi thứ vượt mong đợi. Cảm giác yên tâm như mua ở cửa hàng cao cấp.”",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white">
      <h2 className="md:text-3xl text-xl md:mb-8 mb-3 md:text-left text-center font-extrabold text-teal-700">
        Khách hàng nói gì về chúng tôi
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-blue-50 md:p-7 p-3 rounded-lg shadow-md border border-blue-100 transform hover:scale-105 transition duration-300"
          >
            <div className="text-yellow-500 text-xl mb-3">
              ★★★★★
            </div>
            <p className="text-gray-800 leading-relaxed text-sm">{review.description}</p>
            <div className="text-sm text-gray-600 font-semibold mt-4">
              — {review.reviewBy}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedReviews;
