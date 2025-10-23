import React from "react";

const Banner: React.FC = () => {
  const video = "/assets/banner.mp4";

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* === Video nền === */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={video}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* === Overlay làm mờ === */}
      <div className="absolute inset-0 bg-black/40" />

      {/* === Nội dung === */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center pl-8 md:pl-16 text-left">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl">
          Sống khỏe hơn, <br className="hidden md:block" /> dễ dàng hơn.
        </h1>

        <p className="mt-8 text-lg md:text-2xl text-gray-100 max-w-3xl leading-relaxed drop-shadow-md">
          Bắt đầu bằng một khảo sát ngắn để chúng tôi hiểu rõ hơn về cơ thể của
          bạn, từ đó mang đến giải pháp vitamin cá nhân hóa giúp việc chăm sóc
          sức khỏe trở nên đơn giản và chủ động mỗi ngày.
        </p>

        <div className="mt-10">
          <a
            href="/test/page1"
            className="px-10 py-4 border border-teal-400 text-white bg-teal-600/80 rounded-full font-semibold text-lg shadow-md hover:bg-teal-600 transition-all duration-300"
          >
            Làm bài kiểm tra
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
