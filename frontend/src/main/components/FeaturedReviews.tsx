import React from "react";
type Review = {
  productId?: number;
  reviewBy: string;
  reviewDate?: string;
  stars?: number;
  description: string;
};

const FeaturedReviews: React.FC = () => {
  const reviews: Review[] = [
    {
      reviewBy: "Nguyễn Thị Mai",
      stars: 5,
      description: "Dịch vụ rất chuyên nghiệp, bác sĩ tận tâm.",
    },
    {
      reviewBy: "Trần Văn Hùng",
      stars: 5,
      description: "Phòng khám sạch sẽ, trang thiết bị hiện đại.",
    },
    {
      reviewBy: "Lê Thanh Trúc",
      stars: 5,
      description:
        "Tôi đã sử dụng thuốc này và tình trạng sức khỏe cải thiện đáng kể.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white">
      <h2 className="md:text-3xl text-xl md:mb-8 mb-3 md:text-left text-center font-extrabold text-teal-700">
        Khách hàng nói gì về chúng tôi
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-blue-50 md:p-7 p-3 rounded-lg shadow-md border border-blue-100 transform hover:scale-105 transition duration-300"
          >
            <div className="text-yellow-500 text-xl mb-3">
              {Array(review.stars || 5)
                .fill("★")
                .join("")}
            </div>
            <p className="text-gray-800 leading-relaxed">{review.description}</p>
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
