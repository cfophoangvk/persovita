import React, { useEffect, useState } from "react";
import type { Product } from "../../cart/interfaces";
import { ProductService } from "../../drugs/services/ProductService";
import axiosInstance from "../../utils/axios";
import { toast } from "react-hot-toast";
import type { AxiosResponse } from "axios";

// Hàm định dạng giá VNĐ
const formatVND = (v: number) => {
  // Giả định giá đã là VNĐ và sử dụng logic định dạng của bạn
  return v.toLocaleString("vi-VN") + " VNĐ";
};

const setProductImages = async (productList: Product[]) => {
  const productService = new ProductService();
  for (let i = 0; i < productList.length; i++) {
    productList[i].images = await productService.getProductImages(
      productList[i].id
    );
  }
};

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Hằng số cho kiểu dáng chuyên nghiệp
  const BRAND_COLOR = "text-teal-700"; // Màu chính mới
  const BUTTON_BG = "bg-teal-600 hover:bg-teal-700"; // Màu nút mới

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/products")
      .then((response: AxiosResponse) => {
        const d = response.data;
        const list = (d.products || []).slice(0, 8).map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: p.price,
        }));

        setProductImages(list).then(() => {
          setProducts(list);
        });
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (p: Product) => {
    const payload = {
      productId: p.id,
      name: p.name,
      price: p.price,
      quantity: 1,
      image: p.images?.[0] ?? "",
      subscription: false,
      subscriptionMonths: 0,
    };
    try {
      const add = await import("../../cart/services/cartService").then((m) =>
        m.addToCart(payload)
      );
      if (add && add.status === 401) {
        window.location.href = "/login";
        return;
      }
      window.dispatchEvent(new CustomEvent("cart:updated"));
      toast.success(`Đã thêm "${p.name}" vào giỏ hàng!`);
    } catch (e) {
      toast.error("Thêm vào giỏ hàng thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* PHẦN TIÊU ĐỀ */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 border-b pb-4">
        <h2 className={`text-4xl font-extrabold tracking-tight ${BRAND_COLOR}`}>
          Sản Phẩm Nổi Bật
        </h2>
        <a
          href="/shop"
          className={`mt-4 sm:mt-0 text-md font-medium transition duration-200 ${BRAND_COLOR} hover:text-indigo-500`}
        >
          Xem tất cả sản phẩm &rarr;
        </a>
      </div>

      {/* TRẠNG THÁI ĐANG TẢI */}
      {loading ? (
        <div className="text-center py-10 text-xl text-gray-500">
          Đang tải các sản phẩm tuyệt vời...
        </div>
      ) : (
        /* LƯỚI SẢN PHẨM */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden group border border-gray-100"
            >
              {/* KHUNG ẢNH */}
              <a
                href={`/product/${p.id}`}
                className="block relative overflow-hidden h-64 bg-gray-50"
              >
                <img
                  src={p.images?.[0]}
                  alt={p.name}
                  className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                />
              </a>

              {/* CHI TIẾT SẢN PHẨM */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex-1">
                  <a
                    href={`/product/${p.id}`}
                    className="hover:text-indigo-700 transition duration-150"
                  >
                    <h3 className="font-bold text-xl mb-1 text-gray-900 line-clamp-2">
                      {p.name}
                    </h3>
                  </a>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
                    {p.description}
                  </p>
                </div>

                {/* GIÁ & NÚT */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  {/* GIÁ (Đã định dạng VNĐ) */}
                  <div className="font-extrabold text-xl text-gray-900">
                    {formatVND(p.price ?? 0)}
                  </div>

                  {/* NÚT THÊM VÀO GIỎ HÀNG */}
                  <button
                    onClick={() => handleAdd(p)}
                    className={`px-5 py-2 ${BUTTON_BG} text-white rounded-lg text-sm font-semibold shadow-md transition duration-300 transform hover:-translate-y-0.5`}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
