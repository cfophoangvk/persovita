import React, { useEffect, useState } from "react";

const DEFAULT_IMAGES = [
  "/src/cart/assets/banner1.jpg",
  "/src/cart/assets/banner2.jpg",
  "/src/cart/assets/banner3.png",
];

const Banner: React.FC = () => {
  const images = DEFAULT_IMAGES;
  const [idx, setIdx] = useState(0);

  // Logic tự động chuyển banner sau mỗi 4 giây
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, [idx]);

  return (
    <div
      className="relative w-full bg-center bg-no-repeat bg-cover"
      style={{
        // Thiết lập ảnh nền cho banner
        backgroundImage: `linear-gradient(90deg, rgba(242,141,61,0.12), rgba(242,141,61,0.02)), url('${images[idx]}')`,
      }}
    >
      {/* Lớp phủ (overlay) gradient màu trắng để tăng độ tương phản của chữ */}
      <div className="absolute inset-0 bg-stone-300/80" />

      {/* Nội dung chính của banner */}
      <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#f28d3d]">
          PERSOVITA
        </h1>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          Thực phẩm bổ sung được hỗ trợ bởi khoa học, giao tận nhà bạn — tự
          nhiên, hiệu quả và được đóng gói đẹp mắt.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/shop"
            className="px-6 py-3 bg-[#f28d3d] text-white rounded-full font-semibold shadow-md hover:shadow-lg transition duration-200 hover:bg-orange-600"
          >
            Mua ngay
          </a>
          <a
            href="/test"
            className="px-6 py-3 border border-[#f28d3d] text-[#f28d3d] rounded-full font-semibold transition duration-200 hover:bg-orange-50"
          >
            Làm bài kiểm tra
          </a>
        </div>
      </div>

      {/* Các dấu chấm chỉ báo banner */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Chuyển đến Banner ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              i === idx ? "bg-[#f28d3d]" : "bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
