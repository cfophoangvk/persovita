import React from "react";
import { useIsMobile } from "../../common/hooks/useIsMobile";

const Banner: React.FC = () => {
  const video = "/assets/banner.mp4";
  const isMobile = useIsMobile();

  return (
    <div className={`relative w-full h-[90vh] overflow-hidden md:mt-16 mt-10`}>
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={video}
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center lg:px-16 md:px-8 px-4 text-left">
        <h1 className="lg:text-7xl md:text-5xl text-3xl font-extrabold text-white leading-tight drop-shadow-2xl">
          Sống khỏe hơn, <br className="hidden md:block" /> dễ dàng hơn.
        </h1>

        <p className="mt-8 lg:text-xl md:text-lg text-base text-gray-100 max-w-3xl leading-relaxed drop-shadow-md">
          Bắt đầu bằng một khảo sát ngắn để chúng tôi hiểu rõ hơn về cơ thể của
          bạn, từ đó mang đến giải pháp vitamin cá nhân hóa giúp việc chăm sóc
          sức khỏe trở nên đơn giản và chủ động mỗi ngày.
        </p>

        <div className="mt-10">
          <a
            href="/test/page1"
            className="md:px-10 md:py-4 px-5 py-2 border border-teal-400 text-white bg-teal-600/80 rounded-full font-semibold md:text-lg text-md shadow-md hover:bg-teal-600 transition-all duration-300"
          >
            Làm bài kiểm tra
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
