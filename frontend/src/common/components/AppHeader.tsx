import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

// Hàm hỗ trợ định dạng tiền tệ sang Euro (do logic giá gốc là Euro)
const formatEuro = (value: number) => {
  // Giữ nguyên logic chia cho 28000 và định dạng ban đầu của bạn
  return (value / 28000).toFixed(2).replace(".", ",") + " €";
};

const AppHeader: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [showPreview, setShowPreview] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const fetchCount = async () => {
    try {
      const res = await fetch("http://localhost:6789/api/cart/");
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
      fetch("http://localhost:6789/api/cart/")
        .then((r) => r.json())
        .then((d) => setCartItems(d.cart || []))
        .catch(() => setCartItems([]));
    }
  }, [showPreview]);

  return (
    <header className="bg-white border-b">
      <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Trái: CTA và liên kết */}
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

          {/* Giữa: Logo */}
          <div className="flex-1 flex items-center justify-center">
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-widest text-gray-900 hover:text-amber-600 transition duration-150"
            >
              PERSOVITA
            </Link>
          </div>

          {/* Phải: Hành động */}
          <div className="flex items-center gap-4">
            {/* Biểu tượng tìm kiếm */}
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

            {/* Giỏ hàng */}
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
                              {formatEuro(it.price || 0)}
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
                    <div className="flex justify-between">
                      <span>Giá trị sản phẩm</span>
                      <span>
                        {(() => {
                          const v = (cartItems || []).reduce(
                            (s, a) => s + (a.price || 0) * (a.quantity || 1),
                            0
                          );
                          return formatEuro(v);
                        })()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Giảm giá</span>
                      <span>0,00 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vận chuyển</span>
                      <span>3,90 €</span>
                    </div>
                    <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-200 text-base text-gray-900">
                      <span>TỔNG CỘNG</span>
                      <span>
                        {(() => {
                          const v = (cartItems || []).reduce(
                            (s, a) => s + (a.price || 0) * (a.quantity || 1),
                            0
                          );
                          const total = v / 28000 + 3.9;
                          return total.toFixed(2).replace(".", ",") + " €";
                        })()}
                      </span>
                    </div>
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

            {/* Biểu tượng tài khoản + đăng nhập */}
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-gray-700 hover:text-amber-600 transition duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Đăng nhập</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
