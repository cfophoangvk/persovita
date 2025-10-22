import React, { useEffect, useState } from "react";

const DEFAULT_IMAGES = [
  "/assets/banner1.jpg",
  "/assets/banner2.jpg",
  "/assets/banner3.png",
];

const Banner: React.FC = () => {
  const images = DEFAULT_IMAGES;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div
      className="relative w-full bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(52,211,163,0.12), rgba(52,211,163,0.02)), url('${images[idx]}')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-stone-300/80" />

      {/* Nội dung bên trái */}
      <div className="relative max-w-7xl mx-auto py-32 pl-8 md:pl-16 text-left">
        <strong className="mt-6 text-gray-700 max-w-2xl font-bold block">
          Sống khỏe hơn, dễ dàng hơn.
        </strong>
        <p className="mt-4 text-gray-700 max-w-3xl">
          Bắt đầu bằng một khảo sát ngắn để chúng tôi hiểu rõ hơn về cơ thể của
          bạn, từ đó mang đến giải pháp vitamin cá nhân hóa giúp việc chăm sóc
          sức khỏe trở nên đơn giản và chủ động mỗi ngày.
        </p>
        <div className="mt-8 flex justify-start gap-4">
          <a
            href="/test/page1"
            className="px-6 py-3 border border-teal-600 text-teal-600 rounded-full font-semibold transition duration-200 hover:bg-teal-50"
          >
            Làm bài kiểm tra
          </a>
        </div>
      </div>

      {/* Dấu chấm chỉ báo */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Chuyển đến Banner ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              i === idx ? "bg-teal-600" : "bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
