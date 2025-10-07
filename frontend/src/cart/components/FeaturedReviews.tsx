import React from "react";

const FeaturedReviews: React.FC = () => (
  <div className="max-w-7xl mx-auto px-6 py-12 bg-white">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-extrabold text-orange-800">
        Khách Hàng Nói Gì Về Chúng Tôi
      </h2>
      <a
        href="/testimonials"
        className="text-md text-orange-600 hover:underline font-medium"
      >
        Xem tất cả lời chứng thực
      </a>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Lời chứng thực 1 */}
      <div className="bg-blue-50 p-7 rounded-lg shadow-md border border-blue-100 transform hover:scale-105 transition duration-300">
        <div className="text-yellow-500 text-xl mb-3">★★★★★</div>
        <p className="text-gray-800 leading-relaxed">
          "Dịch vụ khám bệnh rất **chuyên nghiệp**, bác sĩ tận tâm. Tôi rất hài
          lòng với kết quả điều trị."
        </p>
        <div className="text-sm text-gray-600 font-semibold mt-4">
          — Nguyễn Thị Mai
        </div>
      </div>

      {/* Lời chứng thực 2 */}
      <div className="bg-blue-50 p-7 rounded-lg shadow-md border border-blue-100 transform hover:scale-105 transition duration-300">
        <div className="text-yellow-500 text-xl mb-3">★★★★★</div>
        <p className="text-gray-800 leading-relaxed">
          "Phòng khám sạch sẽ, trang thiết bị **hiện đại**. Quy trình tư vấn
          nhanh chóng và hiệu quả. Rất khuyến khích!"
        </p>
        <div className="text-sm text-gray-600 font-semibold mt-4">
          — Trần Văn Hùng
        </div>
      </div>

      {/* Lời chứng thực 3 */}
      <div className="bg-blue-50 p-7 rounded-lg shadow-md border border-blue-100 transform hover:scale-105 transition duration-300">
        <div className="text-yellow-500 text-xl mb-3">★★★★★</div>
        <p className="text-gray-800 leading-relaxed">
          "Tôi đã sử dụng thuốc này theo lời khuyên của bác sĩ và tình trạng sức
          khỏe của tôi đã **cải thiện đáng kể**."
        </p>
        <div className="text-sm text-gray-600 font-semibold mt-4">
          — Lê Thanh Trúc
        </div>
      </div>
    </div>
  </div>
);

export default FeaturedReviews;
