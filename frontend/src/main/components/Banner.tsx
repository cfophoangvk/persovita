import React, { useEffect, useState } from "react";

const DEFAULT_IMAGES = [
  "/public/image/banner1.jpg",
  "/public/image/banner2.jpg",
  "/public/image/banner3.png",
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
        backgroundImage: `linear-gradient(90deg, rgba(242,141,61,0.12), rgba(242,141,61,0.02)), url('${images[idx]}')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#f28d3d]">
          PERSOVITA
        </h1>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          Science-backed supplements delivered to your door — natural, effective
          and beautifully packaged.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/shop"
            className="px-6 py-3 bg-[#f28d3d] text-white rounded-full font-semibold shadow-md hover:shadow-lg"
          >
            Shop now
          </a>
          <a
            href="/test"
            className="px-6 py-3 border border-[#f28d3d] text-[#f28d3d] rounded-full font-semibold"
          >
            Take the test
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-2.5 h-2.5 rounded-full ${
              i === idx ? "bg-[#f28d3d]" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
