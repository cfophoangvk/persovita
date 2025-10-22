import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import type { ITestStorage } from "../interfaces/ITestStorage";
import type { Product } from "../interfaces/Product";
import Badge from "../components/Badge";
import { ScanSearch } from "lucide-react";
import { useAuthStore } from "../../auth/stores/useAuthStore";

const Recommendation = () => {
  const defaultTestData: ITestStorage = {
    name: "",
    email: "",
    selectedCategories: [],
    selectedProducts: [],
  };

  const [recommendProducts, setRecommendProducts] = useState<Product[]>([]);
  const [recommendObjectives, setRecommendObjectives] = useState<string[]>();
  const [testData] = useLocalStorage<ITestStorage>("testData", defaultTestData);

  useEffect(() => {
    setRecommendProducts(testData.selectedProducts);

    setRecommendObjectives(
      testData.selectedCategories.map(
        (category) => category[0] + category.substring(1).toLowerCase()
      )
    );
  }, []);

  // Inline AddToCartButton component (handles guest/local vs logged-in server behavior)
  const AddToCartButton = ({ product }: { product: Product }) => {
    const { user } = useAuthStore();

    const onAdd = async () => {
      const payload = {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image || "",
        subscription: false,
        subscriptionMonths: 0,
      };

      if (!user) {
        // save to localStorage 'persistCart'
        try {
          const key = "persistCart";
          const raw = localStorage.getItem(key) || "[]";
          const list = JSON.parse(raw || "[]");
          const existing = list.find(
            (i: any) => i.productId === payload.productId
          );
          if (existing) {
            existing.quantity = (Number(existing.quantity) || 0) + 1;
          } else {
            list.push({
              userId: null,
              productId: payload.productId,
              name: payload.name,
              price: payload.price,
              quantity: 1,
              subscription: false,
              subscriptionMonths: 0,
              image: payload.image,
            });
          }
          localStorage.setItem(key, JSON.stringify(list));
          window.dispatchEvent(new CustomEvent("cart:updated"));
          alert(`Đã thêm "${product.name}" vào giỏ hàng (lưu tạm)`);
        } catch (e) {
          alert("Lưu giỏ hàng thất bại");
        }
        return;
      }

      // logged in -> push to server
      try {
        const add = await import("../../cart/services/cartService").then((m) =>
          m.addToCart(payload)
        );
        if (add && add.status === 401) {
          window.location.href = "/login";
          return;
        }
        window.dispatchEvent(new CustomEvent("cart:updated"));
        alert(`Đã thêm "${product.name}" vào giỏ hàng`);
      } catch (e) {
        alert("Thêm vào giỏ hàng thất bại");
      }
    };

    return (
      <button
        onClick={onAdd}
        className="bg-teal-500 text-white py-2 px-4 rounded-md text-sm font-semibold flex items-center gap-3"
      >
        <ScanSearch />
        <span>Thêm vào giỏ</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Top Section */}
      <div className="bg-gray-50 p-8 pt-16 flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
        <div className="text-left md:w-1/2 p-4">
          <h1 className="text-5xl font-semibold mb-4">
            Đề xuất thuốc dành cho <br />
            <span className="font-bold">{testData.name}</span>
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Dựa trên nhu cầu của bạn:{" "}
            <span className="font-semibold">
              {recommendObjectives?.join(", ")}
            </span>
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center items-center relative z-0 mt-8 md:mt-0">
          <img
            src="/assets/recommendation.png"
            className="w-full max-w-lg object-contain"
          />
        </div>
      </div>

      {/* Main Recommendations Section */}
      <div className="p-8 md:p-16">
        <h2 className="text-4xl font-semibold mb-4 text-gray-800">
          {recommendProducts.length} loại thuốc đã được đề xuất
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Những yếu tố thiết yếu cho thói quen chăm sóc sức khỏe hàng ngày của
          bạn. Chúng nhắm đến những nhu cầu ưu tiên của bạn.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-start text-left border border-gray-100 relative"
            >
              <div className="absolute top-3 left-3">
                <Badge text={product.feature} />
              </div>

              <img
                src={product.image}
                alt={product.name}
                className="h-48 object-cover mx-auto mb-4"
              />

              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {product.name}
              </h3>
              <p className="text-gray-500 text-sm leading-tight mb-4 line-clamp-2">
                {product.description}
              </p>

              <div className="flex justify-between items-center w-full mt-auto pt-4 border-t border-gray-100">
                <p className="text-gray-800 text-base font-semibold">
                  {product.price.toLocaleString("vi-VN")} VND
                </p>
                <AddToCartButton product={product} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
