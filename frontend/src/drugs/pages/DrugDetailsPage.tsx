import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Drug } from "../interfaces/drug";
import { useDrugStore } from "../stores/useDrugStore";
import DOMPurify from "dompurify";
import ProductReviews from "../components/ProductReviews";
import { ProductService } from "../services/ProductService";

const ProductPlaceholder: Drug = {
  id: "1",
  name: "Sample product",
  description: "Product description goes here.",
  price: 45000,
  images: [
    "https://tse2.mm.bing.net/th/id/OIP.W7NNdONWEXM2_wQ8QvEhYwHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
  ],
  brands: [],
  features: [],
  amount: 60,
  activeIngredients: [],
  additiveIngredients: "",
  usage: "",
  contraindication: "",
  related: [],
};

const DrugDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    drug,
    getDrugById,
    related: relatedFromStore,
    isLoading,
  } = useDrugStore();

  const [index, setIndex] = useState(0);

  const [openDesc, setOpenDesc] = useState(true);
  const [openComp, setOpenComp] = useState(false);
  const [openDirections, setOpenDirections] = useState(false);
  const [openQuality, setOpenQuality] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const productService = new ProductService();

  useEffect(() => {
    if (!id) return;
    getDrugById(id);
    setIndex(0);

    productService.getProductImages(Number(id)).then((data) => setImages(data));
  }, [id]);

  const product = drug ?? (id ? { ...ProductPlaceholder, id } : null);
  const related =
    product && Array.isArray(product.related) && product.related.length
      ? product.related
      : Array.isArray(relatedFromStore) && relatedFromStore.length
      ? relatedFromStore
      : [];

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  const provenStats = useMemo(
    () => [
      {
        value: "91%",
        title: "TRONG SỐ KHÁCH HÀNG CỦA CHÚNG TÔI",
        desc: "Nhận thấy sự cải thiện trong lĩnh vực chính của họ.",
      },
      {
        value: "94%",
        title: "TRONG SỐ KHÁCH HÀNG CỦA CHÚNG TÔI",
        desc: "Nhận thấy sự cải thiện trong sức khỏe tổng thể của họ.",
      },
      {
        value: "76",
        title: "CÁC THỬ NGHIỆM LÂM SÀNG VÀ TIỀN LÂM SÀNG",
        desc: "đã được tiến hành trên các thành phần của chúng tôi, bao gồm các thử nghiệm có đối chứng với giả dược.",
      },
    ],
    []
  );

  if (isLoading && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Đang tải...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Sản phẩm không tồn tại.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white md:mt-18 mt-12 px-3">
      <div className="max-w-7xl mx-auto">
        <nav className="text-sm text-gray-500 mb-4">
          <span className="hover:text-teal-600 transition">
            <Link to="/">Trang chủ</Link>
          </span>{" "}
          <span>&gt; {product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: images */}
          <div className="lg:col-span-7">
            <div className="relative bg-gray-50 rounded overflow-hidden">
              <img
                src={images[index]}
                alt={product.name}
                className="w-full h-[560px] object-contain bg-white"
              />

              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 shadow hover:bg-white flex items-center justify-center"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 shadow hover:bg-white flex items-center justify-center"
              >
                ›
              </button>
            </div>

            {/* thumbnails */}
            <div className="mt-4 flex items-center gap-3 overflow-x-auto">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-20 h-20 rounded-md overflow-hidden border ${
                    i === index ? "border-teal-300" : "border-gray-200"
                  }`}
                >
                  <img
                    src={src}
                    alt={`thumb-${i}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: details */}
          <div className="lg:col-span-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-gray-500 uppercase mb-1">
                  {Array.isArray(product.brands)
                    ? product.brands.map((b: any) => b.name).join(" · ")
                    : ""}
                </div>
                <h1 className="text-3xl font-bold leading-tight mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <span className="text-teal-500 font-semibold">
                      {(product as any).rating ?? 4.5}
                    </span>
                    <span className="text-gray-400">★</span>
                    <span className="text-gray-400">
                      ({(product as any).reviewsCount ?? 43} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 mb-6">
              <div className="text-2xl font-extrabold">
                {product.price
                  ? `${product.price.toLocaleString()} VND`
                  : "Contact"}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Số viên: <b>{product.amount ?? 60} viên</b>
              </div>
            </div>

            {/* Accordions */}
            <div className="mt-8 space-y-4">
              <Accordion
                title="MÔ TẢ"
                open={openDesc}
                onToggle={() => setOpenDesc(!openDesc)}
              >
                <div className="text-sm text-gray-700">
                  {product.description}
                </div>
              </Accordion>

              <Accordion
                title="THÀNH PHẦN"
                open={openComp}
                onToggle={() => setOpenComp(!openComp)}
              >
                <div className="text-sm text-gray-700">
                  {/* Example composition table */}
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 text-left">Thành phần chính</th>
                        <th className="p-2 text-right">Trong 1 viên nang</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(product.activeIngredients) &&
                      product.activeIngredients.length ? (
                        product.activeIngredients.map((ing, i) => (
                          <tr key={i}>
                            <td className="p-2">{ing.name}</td>
                            <td className="p-2 text-right">{ing.amount}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={2} className="p-2 text-center">
                            Không xác định
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {product.additiveIngredients && (
                  <div
                    className="text-sm text-gray-700 mt-4"
                    // sanitize trước khi inject để tránh XSS
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        product.additiveIngredients || "Not specified"
                      ),
                    }}
                  />
                )}
              </Accordion>

              <Accordion
                title="CÔNG DỤNG"
                open={openDirections}
                onToggle={() => setOpenDirections(!openDirections)}
              >
                <div
                  className="text-sm text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      product.usage || "Not specified"
                    ),
                  }}
                />
              </Accordion>

              <Accordion
                title="CHỐNG CHỈ ĐỊNH"
                open={openQuality}
                onToggle={() => setOpenQuality(!openQuality)}
              >
                <div
                  className="text-sm text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      product.contraindication || "Not specified"
                    ),
                  }}
                />
              </Accordion>
            </div>
          </div>
        </div>

        <section className="mt-16 bg-[#f5f1ec] rounded p-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-4 text-center">
              <h2 className="md:text-4xl text-2xl font-bold">Kết quả đã được chứng minh</h2>
            </div>
            <div className="lg:col-span-8 space-y-6 border-l border-gray-200 pl-6">
              {provenStats.map((s, i) => (
                <div key={i}>
                  <div className="md:text-4xl text-2xl font-extrabold">{s.value}</div>
                  <div className="text-xs uppercase text-gray-500 mt-1">
                    {s.title}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">{s.desc}</div>
                  <div className="border-t border-gray-200 mt-4" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related products */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Sản phẩm cùng loại</h3>
            <Link to="/shop" className="text-sm text-teal-600">
              See all
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {related.map((r) => (
              <Link
                to={`/products/${r.id}`}
                key={r.id}
                className="block bg-white border rounded-lg p-3 hover:shadow transition"
              >
                <div className="h-36 bg-gray-50 rounded mb-3 flex items-center justify-center">
                  <img
                    src={r.images?.[0] ?? "/images/product-placeholder.png"}
                    alt={r.name}
                    className="object-contain h-full"
                  />
                </div>
                <div className="text-sm font-medium">{r.name}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {r.price ? `${r.price.toLocaleString()} VND` : "Contact"}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <ProductReviews productId={Number(id)} />
      </div>
    </div>
  );
};

export default DrugDetailsPage;

/* small Accordion component */
function Accordion({
  title,
  children,
  open = false,
  onToggle,
}: {
  title: string;
  children: React.ReactNode;
  open?: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-t border-gray-200 pt-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-sm font-medium text-gray-800"
      >
        <span>{title}</span>
        <span className="text-gray-400">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}
