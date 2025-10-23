import { useEffect, useState } from "react";
import { useAuthStore } from "../../auth/stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import {
  XMarkIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Shipping from "./Shipping.tsx";
import type { Product } from "../interfaces";
import Payment from "./Payment.tsx";
import {
  fetchCartSmart,
  updateCart,
  removeFromCart as svcRemoveFromCart,
} from "../services/cartService";

// Component Modal chung
const Modal = ({
  children,
  onClose,
  customClasses = "",
}: {
  children: React.ReactNode;
  onClose: () => void;
  customClasses?: string;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div
      className={`bg-white rounded-2xl shadow-2xl max-w-lg w-full ${customClasses}`}
    >
      <button
        onClick={onClose}
        aria-label="Đóng"
        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
      {children}
    </div>
  </div>
);

// Modal ưu đãi đăng ký (Subscription)
const SubscriptionOfferModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex flex-col justify-end">
    <div className="absolute inset-0 bg-black/40" onClick={onClose} />
    <div className="bg-teal-400 text-white w-full rounded-t-2xl p-10 text-center z-1">
      <div className="flex justify-end">
        <button onClick={onClose} className="text-white cursor-pointer">
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="max-w-3xl mx-auto">
        <p className="text-xl font-semibold">Giảm 10% cho mọi đơn hàng</p>
        <p className="mt-3 font-semibold">Cá nhân hóa miễn phí</p>
        <p className="mt-3 font-semibold">
          Chương trình khách hàng thân thiết hấp dẫn
        </p>
        <div className="mt-6">***</div>
        <p className="mt-6 text-sm">
          Gói đăng ký của chúng tôi linh hoạt 100% và không ràng buộc. Bạn có
          thể hoãn, sửa đổi hoặc tạm dừng bất cứ lúc nào từ tài khoản trực tuyến
          của bạn.
        </p>
      </div>
    </div>
  </div>
);

// Modal thông tin vận chuyển
const ShippingInfoModal = ({ onClose }: { onClose: () => void }) => (
  <Modal onClose={onClose} customClasses="p-6">
    <div className="p-4 text-center">
      <h3 className="text-xl font-bold mb-3">Vận chuyển</h3>
      <p className="text-sm text-gray-700 mb-3">
        Đơn hàng được chuẩn bị và vận chuyển trong vòng
        <strong> 2 ngày làm việc</strong>. Thời gian giao hàng phụ thuộc vào gói
        bạn chọn
      </p>
      <div className="text-left space-y-4 text-sm text-gray-700">
        <p>
          <strong>Giao hàng miễn phí cho các đơn hàng trên 500.000 VNĐ</strong>
        </p>
        <p>
          <strong>Phí vận chuyển trong 1 ngày là thêm 10.000 VNĐ</strong>
        </p>
        <p>
          <strong>Phí vận chuyển trong 1 ngày là thêm 20.000 VNĐ</strong>
        </p>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={onClose}
          className="px-8 py-3 bg-teal-500 text-white rounded-full font-semibold"
        >
          Đồng ý, tôi đã hiểu
        </button>
      </div>
    </div>
  </Modal>
);

// Component Giỏ hàng chính (Cart)
const Cart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [removingIds, setRemovingIds] = useState<number[]>([]);
  const [flashIds, setFlashIds] = useState<number[]>([]);
  const [showShippingPage, setShowShippingPage] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [shippingSummary, setShippingSummary] = useState<{
    address?: string;
    city?: string;
    country?: string;
  } | null>(null);

  useEffect(() => {
    // ưu tiên giỏ hàng từ máy chủ nếu có; nếu chưa đăng nhập -> dùng persistCart
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
    // optimistic UI remove
    setCartItems((prev) => prev.filter((p) => p.id !== id));
    // call server to remove; if fails, ignore (could re-fetch on failure)
    svcRemoveFromCart(id).catch(() => { });
    setTimeout(() => setRemovingIds((s) => s.filter((x) => x !== id)), 300);
    // notify header to refresh
    window.dispatchEvent(new CustomEvent("cart:updated"));
  };

  const handleSetQuantity = (id: number, qty: number) => {
    setCartItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
    );
    updateCart({ id, quantity: qty }).catch(() => { });
  };

  const handleSetSubscriptionMonths = (id: number, months: number) => {
    const isSub = months > 0;
    setCartItems((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, subscription: isSub, subscriptionMonths: months }
          : p
      )
    );
    setFlashIds((s) => [...s, id]);
    setTimeout(() => setFlashIds((s) => s.filter((x) => x !== id)), 300);
    updateCart({ id, subscription: isSub, subscriptionMonths: months }).catch(
      () => { }
    );
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
      localStorage.setItem("persistCart", JSON.stringify(cartItems));
    } catch (e) {
      console.warn("Lưu giỏ hàng thất bại", e);
    }
  }, [cartItems]);

  const navigate = useNavigate();
  const { user } = useAuthStore();

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
          {showSubscriptionModal && (
            <SubscriptionOfferModal
              onClose={() => setShowSubscriptionModal(false)}
            />
          )}
          {showShippingModal && (
            <ShippingInfoModal onClose={() => setShowShippingModal(false)} />
          )}

          <button
            onClick={() => navigate(-1)}
            aria-label="Quay lại"
            className="absolute left-4 top-4 p-2 text-gray-600 hover:text-gray-800 z-40 cursor-pointer"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>

          <div className="max-w-6xl mx-auto px-6 py-5">
            <header className="flex items-center justify-center mb-8">
              <img src="assets/logo.png" alt="Nouri" className="w-32 cursor-pointer" onClick={() => location.href = '/'} />
            </header>

            <div className="flex gap-8">
              <main className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold uppercase tracking-wider">
                    GIỎ HÀNG CỦA BẠN
                  </h2>
                </div>

                <div className="bg-[#FFF4DB] px-4 py-3 rounded-lg flex items-center justify-between mb-6">
                  <div className="text-[#7a5b2a] font-medium">
                    Tiết kiệm 10%. Không ràng buộc.
                  </div>
                  <button
                    onClick={() => setShowSubscriptionModal(true)}
                    className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-[#f6e6c7] text-[#7a5b2a]"
                  >
                    <QuestionMarkCircleIcon className="w-5 h-5" />
                  </button>
                </div>

                {loading ? (
                  <div className="text-center py-12 text-gray-500">
                    Đang tải sản phẩm...
                  </div>
                ) : cartItems.length === 0 ? (
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
                            } ${flashIds.includes(item.id)
                              ? "ring-2 ring-teal-200"
                              : ""
                            }`}
                        >
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="absolute right-4 top-4 bg-white rounded-full w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 shadow"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>

                          <div className="w-24 h-24 bg-[#fbf7f5] rounded-md p-3 flex items-center justify-center mr-6">
                            <img
                              src={item.images?.[0]}
                              alt={item.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between">
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

                              {/* HIỂN THỊ GIÁ BẰNG VNĐ */}
                              <div className="absolute right-4 top-12 flex items-center gap-4">
                                {(() => {
                                  const t = computeItemTotals(item);
                                  return (
                                    <>
                                      <div className="text-sm text-gray-400 line-through">
                                        {formatVND(
                                          (item.price ?? 0) *
                                          (item.quantity ?? 1) *
                                          (t.months || 1)
                                        )}
                                      </div>
                                      <div className="font-semibold text-gray-900">
                                        {formatVND(t.net)}
                                      </div>
                                    </>
                                  );
                                })()}
                              </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                              <div>
                                <label className="text-xs text-gray-500 block mb-1">
                                  Số lượng
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

                              <label className="flex items-center text-sm text-gray-600 gap-2">
                                <select
                                  value={item.subscriptionMonths ?? 0}
                                  onChange={(e) =>
                                    handleSetSubscriptionMonths(
                                      item.id,
                                      Number(e.target.value)
                                    )
                                  }
                                  className="px-3 py-1 border border-gray-200 rounded-full text-sm w-36"
                                >
                                  <option value={0}>Không đăng ký</option>
                                  <option value={1}>1 tháng</option>
                                  <option value={3}>3 tháng</option>
                                  <option value={6}>6 tháng</option>
                                  <option value={9}>9 tháng</option>
                                  <option value={12}>1 năm</option>
                                </select>
                              </label>
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
                className="w-96 rounded-xl p-6"
                style={{ backgroundColor: "#f7efe6" }}
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-teal-600">
                  TỔNG KẾT ĐƠN HÀNG
                </h3>

                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center text-xs font-semibold uppercase text-gray-600 pb-3 border-b border-gray-200">
                    <span>SẢN PHẨM</span>
                    <span>GIÁ</span>
                  </div>

                  <div className="py-3">
                    {cartItems.map((it) => {
                      const t = computeItemTotals(it);
                      return (
                        <div
                          key={it.id}
                          className="flex justify-between items-center py-2 border-b border-gray-100"
                        >
                          <div className="text-sm text-gray-800">
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
                    <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-2">
                      <span className="font-semibold">TỔNG PHỤ</span>
                      <span className="font-bold text-gray-900">
                        {formatVND(subtotalVND)}
                      </span>
                    </div>

                    <div
                      className="flex justify-between items-center text-sm text-gray-600 mt-3 cursor-pointer"
                      onClick={() => setShowShippingModal(true)}
                    >
                      <span className="flex items-center gap-2">
                        Vận chuyển{" "}
                        <InformationCircleIcon className="w-4 h-4 text-gray-500" />
                      </span>
                      <span className="font-bold text-gray-800">
                        {shippingVND === 0
                          ? "Miễn phí"
                          : formatVND(shippingVND)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
                      <span className="font-bold text-gray-800">TỔNG CỘNG</span>
                      <span className="text-xl font-extrabold">
                        {formatVND(totalVND_Final)}
                      </span>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <input
                        type="text"
                        placeholder="Mã giảm giá"
                        className="flex-1 p-3 border border-gray-200 rounded-full text-sm"
                      />
                      <button className="px-4 py-2 rounded-full bg-white border border-teal-300 text-teal-600">
                        Thêm
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        if (user) setShowShippingPage(true);
                        else navigate("/login");
                      }}
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
