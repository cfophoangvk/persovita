import React, { useEffect, useState } from "react";

type Review = {
  productId?: number;
  reviewBy: string;
  reviewDate?: string;
  stars?: number;
  description: string;
};

const FeaturedReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:6789/file")
      .then((r) => r.json())
      .then((d) => {
        const list = (d.productReviews || []).slice(3, 6).map((r: any) => ({
          productId: r.productId,
          reviewBy: r.reviewBy || "Khách hàng",
          reviewDate: r.reviewDate,
          stars: r.stars,
          description: r.description,
        }));
        setReviews(list);
      })
      .catch(() => setReviews(null))
      .finally(() => setLoading(false));
  }, []);

  // Fallback static testimonials if fetch fails
  const fallback: Review[] = [
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

  const toRender = reviews && reviews.length > 0 ? reviews : fallback;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-emerald-800">
          Khách hàng nói gì về chúng tôi
        </h2>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-8">
          Đang tải lời chứng thực...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toRender.map((rev, idx) => (
            <div
              key={idx}
              className="bg-blue-50 p-7 rounded-lg shadow-md border border-blue-100 transform hover:scale-105 transition duration-300"
            >
              <div className="text-yellow-500 text-xl mb-3">
                {Array(rev.stars || 5)
                  .fill("★")
                  .join("")}
              </div>
              <p className="text-gray-800 leading-relaxed">{rev.description}</p>
              <div className="text-sm text-gray-600 font-semibold mt-4">
                — {rev.reviewBy}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedReviews;
