import { useEffect, useState } from "react";
import { useAuthStore } from "../../auth/stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import Shipping from "./Shipping.tsx";
import type { Product } from "../interfaces";
import Payment from "./Payment.tsx";
import {
  fetchCartSmart,
  updateCart,
  removeFromCart as svcRemoveFromCart,
  updateSubscriptionMonths,
} from "../services/cartService";
import type { PersistCart } from "../interfaces/PersistCart.ts";
import { CircleQuestionMark, Home, X } from "lucide-react";
import { useLoading } from "../../common/hooks/useLoading.tsx";

const SubscriptionOfferModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <div className={`fixed inset-0 z-50 flex flex-col justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
    <div className="absolute inset-0 bg-black/40" onClick={onClose} />
    <div className={`bg-teal-400 text-white w-full rounded-t-2xl md:p-10 p-5 text-center z-1 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="flex justify-end">
        <button onClick={onClose} className="text-white cursor-pointer">
          <X size={24} />
        </button>
      </div>
      <div className="max-w-3xl mx-auto">
        <p className="text-xl font-semibold">Tiết kiệm 10% cho mỗi đơn hàng</p>
        <p className="mt-3 font-semibold">Cá nhân hóa miễn phí</p>
        <p className="mt-3 font-semibold">
          Chương trình khách hàng thân thiết nhiều ưu đãi
        </p>
      </div>
    </div>
  </div>
);

// Component Giỏ hàng chính (Cart)
const Cart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { setLoading } = useLoading();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [removingIds, setRemovingIds] = useState<number[]>([]);
  const [showShippingPage, setShowShippingPage] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [shippingSummary, setShippingSummary] = useState<{
    address?: string;
    city?: string;
    country?: string;
  } | null>(null);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetchCartSmart()
      .then((res) => {
        if (res && res.success) {
          setCartItems(
            (res.cart || []).map((p: any) => ({
              id: p.productId,
              name: p.name,
              description: p.description,
              price: p.price ?? 35000,
              quantity: p.quantity ?? 1,
              subscription: p.subscription ?? false,
              subscriptionMonths:
                p.subscriptionMonths ?? (p.subscription ? 1 : 0),
              images: [p.image],
            }))
          );
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const computeItemTotals = (it: Product) => {
    const price = it.price ?? 0;
    const qty = it.quantity ?? 1;
    const months =
      it.subscriptionMonths && it.subscriptionMonths > 0
        ? it.subscriptionMonths
        : 0;
    if (months === 0) {
      return {
        gross: price * qty,
        net: price * qty,
        multiplier: 1,
        months: 0,
      };
    }
    const gross = price * qty * months;
    const multiplier = months === 1 ? 0.9 : 0.8; // 1 month => 0.9, 3/6/9/12 => 0.8
    const net = gross * multiplier;
    return { gross, net, multiplier, months };
  };

  const totalVND = cartItems.reduce(
    (s, it) => s + computeItemTotals(it).net,
    0
  );

  const handleRemove = (id: number) => {
    setRemovingIds((s) => [...s, id]);
    setCartItems((prev) => prev.filter((p) => p.id !== id));

    if (user) {
      svcRemoveFromCart(id);
    } else {
      const persistCart = localStorage.getItem("persistCart");
      if (persistCart) {
        let persistCartItems: PersistCart[] = JSON.parse(persistCart);
        persistCartItems = persistCartItems.filter(item => item.productId !== id.toString());

        localStorage.setItem("persistCart", JSON.stringify(persistCartItems));
      }
    }
    setTimeout(() => setRemovingIds((s) => s.filter((x) => x !== id)), 300);
    window.dispatchEvent(new CustomEvent("cart:updated"));
  };

  const handleSetQuantity = (id: number, qty: number) => {
    setCartItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
    );

    if (user) {
      updateCart({ id, quantity: qty });
    } else {
      const persistCart = localStorage.getItem("persistCart");
      if (persistCart) {
        let persistCartItems: PersistCart[] = JSON.parse(persistCart);
        persistCartItems = persistCartItems.map(item => {
          return {
            ...item,
            quantity: qty
          }
        })

        localStorage.setItem("persistCart", JSON.stringify(persistCartItems));
      }
    }
  };

  const handleSetSubscriptionMonths = (months: number) => {
    const isSub = months > 0;
    setCartItems((prev) =>
      prev.map((p) => {
        return { ...p, subscription: isSub, subscriptionMonths: months }
      })
    );

    if (user) {
      updateSubscriptionMonths({ subscription: isSub, subscriptionMonths: months })
    } else {
      const persistCart = localStorage.getItem("persistCart");
      if (persistCart) {
        let persistCartItems: PersistCart[] = JSON.parse(persistCart);
        persistCartItems = persistCartItems.map(item => {
          return {
            ...item,
            subscription: isSub,
            subscriptionMonths: months
          }
        })

        localStorage.setItem("persistCart", JSON.stringify(persistCartItems));
      }
    }
    window.dispatchEvent(new CustomEvent("cart:updated"));
  };

  const formatVND = (v: number) => v.toLocaleString("vi-VN") + " VNĐ";

  const productValueVND = cartItems.length > 0 ? totalVND : 0;

  // Tính chi phí vận chuyển bằng VNĐ
  const shippingVND = productValueVND > 0 ? 30000 : 0;

  const totalVND_Final = productValueVND + shippingVND;

  // tính toán giá trị gộp (chưa giảm giá đăng ký) và chiết khấu (bằng VNĐ)
  const grossVND = cartItems.reduce(
    (s, it) => s + computeItemTotals(it).gross,
    0
  );
  const discountsVND = grossVND - totalVND; // dương khi có chiết khấu
  const subtotalVND = totalVND;

  useEffect(() => {
    try {
      const persistCartItems: PersistCart[] = cartItems.map(item => {
        return {
          userId: null,
          productId: item.id.toString(),
          name: item.name,
          price: item.price ?? 0,
          quantity: item.quantity ?? 1,
          subscription: item.subscription ?? false,
          image: item.images?.[0] ?? '',
          subscriptionMonths: item.subscriptionMonths ?? 0
        }
      });

      if (cartItems.length > 0) {
        localStorage.setItem("persistCart", JSON.stringify(persistCartItems));
      }
    } catch (e) {
      console.warn("Lưu giỏ hàng thất bại", e);
    }
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-white relative">
      {showPaymentPage ? (
        <Payment
          productCount={cartItems.length}
          totalVND={totalVND_Final}
          onBack={() => setShowPaymentPage(false)}
          shippingSummary={shippingSummary}
        />
      ) : showShippingPage ? (
        <Shipping
          productCount={cartItems.length}
          totalVND={totalVND_Final}
          onBack={() => setShowShippingPage(false)}
          onProceed={(summary: {
            address?: string;
            city?: string;
            country?: string;
          }) => {
            setShippingSummary(summary || null);
            setShowPaymentPage(true);
          }}
        />
      ) : (
        <>
          <SubscriptionOfferModal
            isOpen={showSubscriptionModal}
            onClose={() => setShowSubscriptionModal(false)}
          />

          <button
            onClick={() => navigate('/')}
            className="absolute left-4 top-4 p-2 text-gray-600 hover:text-gray-800 z-40 cursor-pointer"
          >
            <Home />
          </button>

          <div className="md:w-[95vw] w-[85vw] mx-auto py-5">
            <header className="flex items-center justify-center mb-8">
              <img src="assets/logo.png" alt="Nouri" className="w-32 cursor-pointer" onClick={() => location.href = '/'} />
            </header>

            <div className="flex lg:flex-row flex-col gap-8">
              <main className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold uppercase tracking-wider">
                    GIỎ HÀNG CỦA BẠN
                  </h2>
                </div>

                <div className="bg-[#FFF4DB] px-4 py-3 rounded-lg flex items-center justify-between mb-6">
                  <div className="text-[#7a5b2a] font-medium">
                    Tiết kiệm 10%.
                  </div>
                  <button
                    onClick={() => setShowSubscriptionModal(true)}
                    className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-amber-200 text-stone-600 cursor-pointer"
                  >
                    <CircleQuestionMark size={16} />
                  </button>
                </div>

                <div className="flex gap-3 md:flex-row flex-col md:justify-center items-center">
                  <label htmlFor="subscription" className="md:text-lg">Tần suất đăng ký:</label>
                  <select id="subscription" className="px-3 py-1 border border-gray-200 rounded-full text-sm w-36 disabled:opacity-50"
                    value={cartItems.length > 0 ? cartItems[0].subscriptionMonths : 0}
                    disabled={cartItems.length === 0}
                    onChange={e => handleSetSubscriptionMonths(Number(e.target.value))}>
                    <option value={0}>Không đăng ký</option>
                    <option value={1}>1 tháng</option>
                    <option value={3}>3 tháng</option>
                    <option value={6}>6 tháng</option>
                    <option value={9}>9 tháng</option>
                    <option value={12}>1 năm</option>
                  </select>
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-20 text-gray-400">
                    <p className="text-lg">Giỏ hàng của bạn đang trống.</p>
                    <p className="mt-4 text-sm text-gray-500">
                      Thêm sản phẩm để bắt đầu — đăng ký giúp tiết kiệm 10%.
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-6">
                    {cartItems.map((item) => (
                      <li key={item.id}>
                        <div
                          className={`bg-white rounded-xl p-6 shadow-sm flex items-center relative transition-transform duration-200 ${removingIds.includes(item.id)
                            ? "opacity-0 scale-95"
                            : ""
                            }`}
                        >
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="absolute right-4 top-4 bg-white rounded-full w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 shadow"
                          >
                            <X size={16} />
                          </button>

                          <div className="w-24 h-24 bg-[#fbf7f5] rounded-md p-3 flex items-center justify-center mr-6">
                            <img
                              src={item.images?.[0]}
                              alt={item.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex sm:flex-row flex-col justify-between sm:items-end items-start">
                              <div>
                                <p className="font-semibold text-gray-800 text-lg">
                                  {item.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {item.description ?? "Dùng trong 30 ngày"}
                                </p>
                                {item.subscription && (
                                  <div className="inline-block mt-2 px-2 py-1 text-xs bg-teal-100 text-teal-700 rounded">
                                    Đăng ký hàng tháng
                                  </div>
                                )}
                              </div>

                              <div className="flex sm:flex-row flex-col items-center md:gap-4">
                                {(() => {
                                  const t = computeItemTotals(item);
                                  return (
                                    <div className="flex sm:flex-row flex-col space-x-2">
                                      <div className="text-gray-400 line-through">
                                        {formatVND(
                                          (item.price ?? 0) *
                                          (item.quantity ?? 1) *
                                          (t.months || 1)
                                        )}
                                      </div>
                                      <div className="font-semibold text-gray-900">
                                        {formatVND(t.net)}
                                      </div>
                                    </div>
                                  );
                                })()}
                              </div>
                            </div>

                            <div className="mt-4 flex sm:flex-row flex-col sm:items-center items-start justify-between gap-2">
                              <div className="flex items-center space-x-3">
                                <label className="text-gray-500 block mb-1">
                                  Số lượng:
                                </label>
                                <select
                                  value={item.quantity}
                                  onChange={(e) =>
                                    handleSetQuantity(
                                      item.id,
                                      Number(e.target.value)
                                    )
                                  }
                                  className="px-3 py-1 border border-gray-200 rounded-full text-sm w-20 text-center"
                                >
                                  {Array.from(
                                    { length: 10 },
                                    (_, i) => i + 1
                                  ).map((n) => (
                                    <option key={n} value={n}>
                                      {n}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}

                    <li>
                      <div className="mt-6 flex justify-center">
                        <button
                          onClick={() => navigate("/shop")}
                          className="px-6 py-3 w-3/4 border-2 border-teal-300 text-teal-600 rounded-full font-semibold hover:bg-teal-50"
                        >
                          + Thêm sản phẩm
                        </button>
                      </div>
                    </li>
                  </ul>
                )}
              </main>

              <aside
                className="lg:w-1/3 rounded-xl lg:p-6 p-3"
                style={{ backgroundColor: "#f7efe6" }}
              >
                <h3 className="text-lg font-bold text-center tracking-wider text-teal-600">
                  TÓM TẮT ĐƠN HÀNG
                </h3>

                <div className="mt-4 border-t border-gray-300 pt-4">
                  <div className="flex justify-between items-center lg:text-xs text-base font-semibold text-gray-600 pb-3 border-b border-gray-300">
                    <span>TỔNG GIÁ SẢN PHẨM</span>
                    <span>GIÁ</span>
                  </div>

                  <div className="py-3">
                    {cartItems.map((it) => {
                      const t = computeItemTotals(it);
                      return (
                        <div
                          key={it.id}
                          className="flex justify-between items-center py-2 border-b border-gray-300"
                        >
                          <div className="lg:text-sm text-base text-gray-800">
                            {it.name}
                            {it.subscription && (
                              <div className="inline-block ml-2 px-2 py-0.5 text-xs bg-teal-100 text-teal-700 rounded">
                                Đăng ký {t.months} tháng
                              </div>
                            )}
                          </div>
                          <div className="text-right text-sm">
                            <div className="text-gray-400 text-sm line-through">
                              {formatVND(t.gross)}
                            </div>
                            <div className="font-semibold text-gray-900">
                              {t.net === 0 ? "Miễn phí" : formatVND(t.net)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4">
                    <div className="flex justify-between items-center text-sm text-gray-700 mb-2">
                      <span className="font-semibold">GIÁ TRỊ SẢN PHẨM</span>
                      <span className="font-bold">{formatVND(grossVND)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-700 mb-2">
                      <span>Giảm giá</span>
                      <span className="text-sm text-gray-700">
                        -{formatVND(discountsVND)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-300 pt-3 mt-2">
                      <span className="font-semibold">TỔNG PHỤ</span>
                      <span className="font-bold text-gray-900">
                        {formatVND(subtotalVND)}
                      </span>
                    </div>

                    <div
                      className="flex justify-between items-center text-sm text-gray-600 mt-3 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        Vận chuyển{" "}
                      </span>
                      <span className="font-bold text-gray-800">
                        {shippingVND === 0
                          ? "Miễn phí"
                          : formatVND(shippingVND)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-300 pt-4 mt-4">
                      <span className="font-bold text-gray-800">TỔNG CỘNG</span>
                      <span className="text-xl font-extrabold">
                        {formatVND(totalVND_Final)}
                      </span>
                    </div>

                    <div className="mt-6 flex justify-between gap-3">
                      <input
                        type="text"
                        placeholder="Mã giảm giá"
                        className="flex-1 p-2 border border-gray-300 rounded-full text-sm"
                      />
                      <button className="px-4 lg:py-2 py-1 rounded-full bg-white border border-teal-300 text-teal-600">
                        Thêm
                      </button>
                    </div>
                    <button
                      onClick={() => setShowShippingPage(true)}
                      className="w-full mt-6 py-4 text-white font-bold rounded-full shadow-lg"
                      style={{ backgroundColor: "#449286" }}
                    >
                      Tiến hành thanh toán
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
