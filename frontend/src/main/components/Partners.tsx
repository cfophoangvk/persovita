const logos = [
  {
    src: "/assets/partners/ARKOPHARMA.png",
    alt: "ARKOPHARMA",
  },
  {
    src: "/assets/partners/Nature_s Bounty.png",
    alt: "Nature_s Bounty",
  },
  {
    src: "/assets/partners/Nature_s Way.png",
    alt: "Nature_s Way",
  },
  {
    src: "/assets/partners/Now Foods.png",
    alt: "Now Foods",
  },
  {
    src: "/assets/partners/Nutri&Co Clear.png",
    alt: "Nutri&Co Clear",
  },
  {
    src: "/assets/partners/solgar.png",
    alt: "solgar",
  },
  {
    src: "/assets/partners/Sunday Natural.png",
    alt: "Sunday Natural",
  },
  {
    src: "/assets/partners/SuperSmart.png",
    alt: "SuperSmart",
  },
  {
    src: "/assets/partners/Swanson.png",
    alt: "Swanson",
  },
  {
    src: "/assets/partners/Swisse.png",
    alt: "Swisse",
  },
  {
    src: "/assets/partners/Viridian.png",
    alt: "Viridian",
  },
  {
    src: "/assets/partners/Vitabiotics.png",
    alt: "Vitabiotics",
  },
  {
    src: "/assets/partners/Webber Naturals.png",
    alt: "Webber Naturals",
  },
  {
    src: "/assets/partners/Weightworld.png",
    alt: "Weightworld",
  }
];

export const Partners = () => {
  const allLogos = [...logos, ...logos];

  return (
    <div className="bg-white py-10">
      <div className="text-center mb-8">
        <h1 className="lg:text-5xl md:text-3xl text-xl font-bold tracking-wide text-gray-700">
          Đối tác của chúng tôi
        </h1>
      </div>
      <div className="overflow-hidden relative">
        <div
          className="flex w-max animate-slide"
          style={{ animationDuration: "30s" }}
        >
          {allLogos.map((logo, idx) => (
            <div key={idx} className="flex-shrink-0 flex items-center justify-center h-20 md:w-80 w-30">
              <img src={logo.src} alt={logo.alt} className="max-h-20 max-w-full mx-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}