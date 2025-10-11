import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "../../auth/stores/useAuthStore";
import { LogIn, LogOut } from "lucide-react";
import useScrollHeaderEffect from "../hooks/useScrollHeaderEffect";
import { motion } from "framer-motion";

// Định dạng sang VNĐ (dùng cho hiển thị trong header và preview)
const formatVND = (value: number) => {
  return value.toLocaleString("vi-VN") + " VNĐ";
};

const AppHeader: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [showPreview, setShowPreview] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const fetchCount = async () => {
    try {
      const res = await fetch("http://localhost:6789/api/cart/", {
        credentials: "include",
      });
      const data = await res.json();
      setCount((data.cart || []).length || 0);
    } catch (e) {
      // Bỏ qua lỗi
    }
  };

  useEffect(() => {
    fetchCount();
    const t = setInterval(fetchCount, 5000);
    const onUpdate = () => fetchCount();
    window.addEventListener("cart:updated", onUpdate as EventListener);

    // Xử lý đóng xem trước giỏ hàng khi click bên ngoài
    const onDocClick = (e: MouseEvent) => {
      if (!showPreview) return;
      const target = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(target)) {
        setShowPreview(false);
      }
    };
    document.addEventListener("click", onDocClick);

    return () => {
      clearInterval(t);
      window.removeEventListener("cart:updated", onUpdate as EventListener);
      document.removeEventListener("click", onDocClick);
    };
  }, [showPreview]);

  // Lấy chi tiết giỏ hàng khi mở xem trước
  useEffect(() => {
    if (showPreview) {
      fetch("http://localhost:6789/api/cart/", { credentials: "include" })
        .then((r) => r.json())
        .then((d) => setCartItems(d.cart || []))
        .catch(() => setCartItems([]));
    }
  }, [showPreview]);

  const { show } = useScrollHeaderEffect();

  return (
    <motion.header
      className="bg-white border-b fixed top-0 left-0 right-0 z-1"
      initial={{ y: 0, opacity: 1 }}
      animate={
        show
          ? {
              y: 0,
              opacity: 1,
              transition: {
                y: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.8 },
              },
            }
          : {
              y: "-110%",
              opacity: 0,
              transition: {
                y: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 1.2 },
              },
            }
      }
    >
      <div className="max-w-full mx-auto px-2 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-widest text-amber-400 hover:text-amber-600 transition duration-150"
          >
            PERSOVITA
          </Link>
        </div>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link
              to="/test/page1"
              className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-full text-sm font-medium hover:bg-amber-600 transition duration-150"
            >
              Làm bài kiểm tra
            </Link>
            <nav className="hidden sm:flex items-center gap-4">
              <Link
                to="/shop"
                className="text-sm text-gray-700 hover:text-amber-600 transition duration-150"
              >
                Sản phẩm của chúng tôi
              </Link>
              <Link
                to="/about"
                className="text-sm text-gray-700 hover:text-amber-600 transition duration-150"
              >
                Về chúng tôi
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              aria-label="Tìm kiếm"
              className="p-2 rounded-full hover:bg-gray-100 transition duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPreview((s) => !s);
              }}
              className="relative inline-flex items-center p-2 rounded-full hover:bg-gray-100 transition duration-150"
              aria-haspopup="true"
              aria-expanded={showPreview}
              aria-label="Giỏ hàng"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 6h15l-1.5 9h-12z" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="19" cy="20" r="1" />
              </svg>
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium leading-none text-white bg-amber-600 rounded-full">
                {count}
              </span>
            </button>
            {showPreview && (
              <div
                ref={panelRef}
                className="fixed right-4 top-20 w-80 md:w-96 bg-white border shadow-xl rounded-md z-50 animate-in fade-in slide-in-from-top-4"
                style={{ transitionDuration: "150ms" }}
              >
                <div className="px-4 py-3 border-b flex items-center justify-between">
                  <div className="text-sm font-semibold tracking-wider">
                    XEM TRƯỚC GIỎ HÀNG
                  </div>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                    aria-label="Đóng xem trước giỏ hàng"
                  >
                    &times;
                  </button>
                </div>

                <div className="p-4 max-h-[60vh] overflow-auto">
                  {!cartItems || cartItems.length === 0 ? (
                    <div className="text-center text-sm text-gray-500 py-8">
                      <div className="mb-6">
                        Bạn chưa có sản phẩm bổ sung nào trong giỏ hàng
                      </div>
                      <Link
                        to="/shop"
                        onClick={() => setShowPreview(false)}
                        className="inline-block px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 hover:border-amber-500 hover:text-amber-600 transition duration-150"
                      >
                        xem danh mục
                      </Link>
                    </div>
                  ) : (
                    <>
                      <ul className="space-y-3">
                        {cartItems.map((it) => (
                          <li key={it.id} className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center overflow-hidden border border-gray-200">
                              <img
                                src={
                                  it.image || "/images/product-placeholder.png"
                                }
                                alt={it.name}
                                className="object-contain w-full h-full p-1"
                              />
                            </div>
                            <div className="flex-1 text-sm">
                              <div className="font-medium text-gray-800 line-clamp-1">
                                {it.name}
                              </div>
                              <div className="text-gray-500 text-xs">
                                SL: {it.quantity || 1}
                              </div>
                            </div>
                            <div className="text-sm font-semibold text-gray-900">
                              {formatVND(it.price || 0)}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <div className="px-4 py-3 border-t">
                  <div className="text-sm font-semibold">Tóm tắt đơn hàng</div>
                  <div className="mt-3 text-sm text-gray-700 space-y-1">
                    {(() => {
                      const v = (cartItems || []).reduce(
                        (s, a) => s + (a.price || 0) * (a.quantity || 1),
                        0
                      );
                      const shippingVND = v > 0 ? 30000 : 0;
                      const totalVND = v + shippingVND;

                      return (
                        <>
                          <div className="flex justify-between">
                            <span>Giá trị sản phẩm</span>
                            <span>{formatVND(v)}</span>
                          </div>

                          <div className="flex justify-between">
                            <span>Giảm giá</span>
                            <span>{formatVND(0)}</span>
                          </div>

                          {/* Hiển thị vận chuyển chỉ khi có sản phẩm trong giỏ */}
                          {cartItems && cartItems.length > 0 && (
                            <div className="flex justify-between">
                              <span>Vận chuyển</span>
                              <span>{formatVND(shippingVND)}</span>
                            </div>
                          )}

                          <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-200 text-base text-gray-900">
                            <span>TỔNG CỘNG</span>
                            <span>{formatVND(totalVND)}</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  <div className="mt-3 text-xs text-gray-500 bg-amber-50 p-3 rounded">
                    Việc áp dụng mã khuyến mãi và quản lý tùy chọn mua hàng được
                    thực hiện ở bước tiếp theo
                  </div>

                  <div className="mt-4">
                    <Link
                      to="/cart"
                      onClick={() => setShowPreview(false)}
                      className="block w-full text-center py-3 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-600 transition duration-150"
                    >
                      Đi đến giỏ hàng
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Profile avatar: visible when logged in */}
            {user && (
              <Link to="/profile" title={user.fullName || user.email}>
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.fullName || user.email}
                    className="hidden sm:inline-flex w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full bg-amber-400 text-white font-semibold">
                    {(user.fullName || user.email || "U")
                      .split(" ")
                      .map((s: string) => s[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                )}
              </Link>
            )}

            {!user && (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-2 text-sm text-gray-700 hover:text-amber-600 transition duration-150"
              >
                <LogIn className="w-5 h-5 mr-1" />
                <span>Đăng nhập</span>
              </Link>
            )}
            {user && (
              <button
                onClick={() => logout(() => navigate("/login"))}
                className="hidden sm:inline-flex items-center gap-2 text-sm text-gray-700 hover:text-amber-600 transition duration-150"
              >
                <LogOut className="w-5 h-5 mr-1" />
                <span>Đăng xuất</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default AppHeader;
