import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import type { ITestStorage } from "../interfaces/ITestStorage";
import type { Product } from "../interfaces/Product";
import { Check, Plus } from "lucide-react";
import { useAuthStore } from "../../auth/stores/useAuthStore";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import type { PersistCart } from "../../cart/interfaces/PersistCart";
import { useIsMobile } from "../../common/hooks/useIsMobile";

const Recommendation = (props: {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
}) => {
  const defaultTestData: ITestStorage = {
    name: "",
    email: "",
    selectedCategories: [],
    selectedProducts: [],
  };

  const [recommendProducts, setRecommendProducts] = useState<Product[]>([]);
  const [toCompleteProduct, setToCompleteProduct] = useState<Product>();
  const [recommendObjectives, setRecommendObjectives] = useState<string[]>();
  const [testData] = useLocalStorage<ITestStorage>("testData", defaultTestData);
  const [persistCart, setPersistCart] = useLocalStorage<PersistCart[]>(
    "persistCart",
    []
  );
  const { user } = useAuthStore();
  const isMobile = useIsMobile();

  useEffect(() => {
    let products = testData.selectedProducts;
    let productsRecommend = products.slice(0, products.length - 1);
    let productToComplete = products[products.length - 1];

    setRecommendProducts(productsRecommend);
    setToCompleteProduct(productToComplete);

    setRecommendObjectives(
      testData.selectedCategories.map(
        (category) => category[0] + category.substring(1).toLowerCase()
      )
    );

    setPersistCart([]);
  }, []);

  useEffect(() => {
    if (recommendProducts.length > 0) {
      const newItems = recommendProducts.map((product) => ({
        userId: null,
        productId: product.id.toString(),
        name: product.name,
        price: product.price,
        quantity: 1,
        subscription: false,
        subscriptionMonths: 0,
        image: product.image,
      }));

      if (newItems.length > 0) {
        setPersistCart((prevList) => [...prevList, ...newItems]);
      }

      recommendProducts.forEach(
        async (product) => await addToDatabaseCart(product)
      );
    }
  }, [recommendProducts]);

  const addToPersistCart = (product: Product) => {
    try {
      setPersistCart((prevList) => [
        ...prevList,
        {
          userId: null,
          productId: product.id.toString(),
          name: product.name,
          price: product.price,
          quantity: 1,
          subscription: false,
          subscriptionMonths: 0,
          image: product.image,
        },
      ]);
    } catch (e) {
      toast.error("Lưu giỏ hàng thất bại");
    }
    return;
  };

  const addToDatabaseCart = async (product: Product) => {
    try {
      const add = await import("../../cart/services/cartService").then((m) =>
        m.addToCart({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image || "",
          subscription: false,
          subscriptionMonths: 0,
        })
      );
      if (add && add.status === 401) {
        window.location.href = "/login";
        return;
      }
    } catch (e) {
      toast.error("Thêm vào giỏ hàng thất bại");
    }
  };

  const removeProductFromPersistCart = async (id: string) => {
    if (!user) {
      setPersistCart((prev) => prev.filter((item) => item.productId !== id));
      return;
    }

    // logged in -> remove from server
    try {
      const remove = await import("../../cart/services/cartService").then((m) =>
        m.removeFromCart(Number(id))
      );
      if (remove && remove.status === 401) {
        window.location.href = "/login";
        return;
      }
      setPersistCart((prev) => prev.filter((item) => item.productId !== id)); // Update local storage even for logged in users
    } catch (e) {
      toast.error("Xóa khỏi giỏ hàng thất bại");
    }
  };

  const AddToCartButton = ({ product }: { product: Product }) => {
    const isInCart = persistCart.some(
      (item) => item.productId === product.id.toString()
    );

    if (isInCart) {
      return (
        <button
          className="bg-teal-500 text-white py-2 px-4 lg:text-sm md:text-xs text-sm font-semibold flex items-center gap-3 rounded-full cursor-pointer"
          onClick={() => removeProductFromPersistCart(product.id.toString())}
        >
          <Check size={isMobile ? 16 : 24} />
          <span>Đã thêm vào giỏ</span>
        </button>
      );
    } else {
      return (
        <button
          className="border border-teal-500 text-teal-500 py-2 px-4 text-sm font-semibold flex items-center gap-3 rounded-full cursor-pointer"
          onClick={() => addToPersistCart(product)}
        >
          <Plus size={isMobile ? 16 : 24} />
          <span>Thêm</span>
        </button>
      );
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans relative">
      <div className="bg-gray-50 p-8 pt-16 flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
        <div className="text-left md:w-1/2 p-4">
          <h1 className="lg:text-5xl text-3xl md:text-left text-center font-semibold mb-4">
            Đề xuất thuốc dành cho{" "}
            <span className="font-bold">{testData.name}</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-left text-center leading-relaxed">
            Dựa trên nhu cầu của bạn:{" "}
            <span className="font-semibold">
              {recommendObjectives?.join(", ")}
            </span>
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center items-center relative z-0 mt-0 md:mt-8">
          <img
            src="/assets/recommendation.png"
            className="md:w-full w-40 max-w-lg object-contain"
          />
        </div>
      </div>

      <div className="p-8 md:p-16">
        <h2 className="md:text-4xl text-2xl font-semibold mb-4 text-gray-800">
          {recommendProducts.length} loại thuốc đã được đề xuất
        </h2>
        <p className="text-gray-600 md:text-lg text-md mb-8">
          Những yếu tố thiết yếu cho thói quen chăm sóc sức khỏe hàng ngày của
          bạn. Chúng nhắm đến những nhu cầu ưu tiên của bạn.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {recommendProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-start text-left border border-gray-100 relative"
            >
              <div className="absolute top-3 left-3 lg:right-auto md:right-3 right-auto">
                <div className="px-2 py-1 border border-black bg-white lg:rounded-full rounded-md lg:text-base text-sm flex items-center justify-center gap-1">
                  <div>{product.feature}</div>
                </div>
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
              <a
                className="text-sm text-gray-500 underline cursor-pointer"
                onClick={() => {
                  props.setIsPopupOpen(true);
                  props.setProduct(product);
                }}
              >
                Tìm hiểu thêm
              </a>

              <div className="flex lg:flex-row md:flex-col flex-row justify-between items-center gap-2 w-full mt-auto pt-4 border-t border-gray-100">
                <p className="text-gray-800 font-semibold">
                  {product.price.toLocaleString("vi-VN")} VND
                </p>
                <AddToCartButton product={product} />
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-4xl font-semibold mb-4 text-gray-800 mt-15">
          Để hoàn thiện
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          đây là những gợi ý khác của chúng tôi để bổ sung cho thói quen của
          bạn. Chúng cũng được điều chỉnh theo nhu cầu cụ thể của bạn.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {toCompleteProduct && (
            <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-start text-left border border-gray-100 relative">
              <div className="absolute top-3 left-3 lg:right-auto md:right-3 right-auto">
                <div className="px-2 py-1 border border-black bg-white lg:rounded-full rounded-md lg:text-base text-sm flex items-center justify-center gap-1">
                  <div>{toCompleteProduct.feature}</div>
                </div>
              </div>

              <img
                src={toCompleteProduct.image}
                alt={toCompleteProduct.name}
                className="h-48 object-cover mx-auto mb-4"
              />

              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {toCompleteProduct.name}
              </h3>
              <p className="text-gray-500 text-sm leading-tight mb-4 line-clamp-2">
                {toCompleteProduct.description}
              </p>
              <a
                className="text-sm text-gray-500 underline cursor-pointer"
                onClick={() => {
                  props.setIsPopupOpen(true);
                  props.setProduct(toCompleteProduct);
                }}
              >
                Tìm hiểu thêm
              </a>

              <div className="flex lg:flex-row md:flex-col flex-row justify-between items-center w-full mt-auto gap-3 pt-4 border-t border-gray-100">
                <p className="text-gray-800 text-base font-semibold">
                  {toCompleteProduct.price.toLocaleString("vi-VN")} VND
                </p>
                <AddToCartButton product={toCompleteProduct} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
        <Link to={"/cart"}>
          <button className="bg-teal-500 hover:bg-teal-700 text-white py-3 px-6 text-sm font-semibold flex items-center gap-3 rounded-full cursor-pointer">
            <span>Đi đến thanh toán ({persistCart.length} sản phẩm)</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Recommendation;
