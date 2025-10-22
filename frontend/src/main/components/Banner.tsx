import React, { useEffect, useState } from "react";

const DEFAULT_IMAGES = [
  "/assets/banner1.jpg",
  "/assets/banner2.jpg",
  "/assets/banner3.png",
];

const Banner: React.FC = () => {
  const images = DEFAULT_IMAGES;
  const [idx, setIdx] = useState(0);

  // Logic tự động chuyển banner sau mỗi 4 giây
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, [images.length]); // Đã sửa dependency array cho chính xác hơn

  return (
    <div
      className="relative w-full bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(52,211,163,0.12), rgba(52,211,163,0.02)), url('${images[idx]}')`,
      }}
    >
      {/* Lớp phủ (overlay) gradient màu trắng để tăng độ tương phản của chữ */}
      <div className="absolute inset-0 bg-stone-300/80" />

      {/* Nội dung chính của banner */}
      <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
        {/* ĐÃ THAY MÀU TEXT sang teal-600 */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-teal-600">
          NOURI
        </h1>
        <strong className="mt-6 text-gray-700 max-w-2xl font-bold mx-auto">
          Sống khỏe hơn, dễ dàng hơn.
        </strong>
        <p className="mt-4 text-gray-700 max-w-3xl mx-auto">
          Bắt đầu bằng một khảo sát ngắn để chúng tôi hiểu rõ hơn về cơ thể của
          bạn, từ đó mang đến giải pháp vitamin cá nhân hóa giúp việc chăm sóc
          sức khỏe trở nên đơn giản và chủ động mỗi ngày.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/test/page1"
            className="px-6 py-3 border border-teal-600 text-teal-600 rounded-full font-semibold transition duration-200 hover:bg-teal-50"
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
              // ĐÃ THAY MÀU ACTIVE DOT sang teal-600
              i === idx ? "bg-teal-600" : "bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
