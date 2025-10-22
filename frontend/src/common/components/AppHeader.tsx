import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "../../auth/stores/useAuthStore";
import { LogIn } from "lucide-react";
import useScrollHeaderEffect from "../hooks/useScrollHeaderEffect";
import { motion } from "framer-motion";
import { ProductService } from "../../drugs/services/ProductService";

// Định dạng sang VNĐ (dùng cho hiển thị trong header và preview)
const formatVND = (value: number) => {
  return value.toLocaleString("vi-VN") + " VNĐ";
};

const AppHeader: React.FC = () => {
  // search state
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const debounceRef = useRef<any>(null);
  const [count, setCount] = useState<number>(0);
  const [showPreview, setShowPreview] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const fetchCount = async () => {
    try {
      const res = await fetch("https://api.nourivitamin.com/api/cart/", {
        credentials: "include",
      });
      const data = await res.json();
      setCount((data.cart || []).length || 0);
    } catch (e) {
      // Bỏ qua lỗi
    }
  };

  useEffect(() => {
    // fetch once on mount and listen for cart:updated events. Removing aggressive polling to avoid repeated calls.
    fetchCount();
    const onUpdate = () => fetchCount();
    window.addEventListener("cart:updated", onUpdate as EventListener);

    // Xử lý đóng xem trước giỏ hàng khi click bên ngoài
    const onDocClick = (e: MouseEvent) => {
      if (!showPreview && !showProfileMenu) return;
      const target = e.target as Node;
      if (panelRef.current && panelRef.current.contains(target)) {
        // click inside cart panel - ignore
      } else if (profileRef.current && profileRef.current.contains(target)) {
        // click inside profile menu - ignore
      } else {
        setShowPreview(false);
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("click", onDocClick);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowPreview(false);
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("cart:updated", onUpdate as EventListener);
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [showPreview, showProfileMenu]);

  // Lấy chi tiết giỏ hàng khi mở xem trước
  useEffect(() => {
    if (showPreview) {
      fetch("https://api.nourivitamin.com/api/cart/", {
        credentials: "include",
      })
        .then((r) => r.json())
        .then((d) => setCartItems(d.cart || []))
        .catch(() => setCartItems([]));
    }
  }, [showPreview]);

  const { show } = useScrollHeaderEffect();

  // handle outside click to close suggestions
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (searchRef.current && !searchRef.current.contains(t)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const fetchSuggestions = (q: string) => {
    if (!q || q.trim().length < 2) {
      setSuggestions([]);
      setSuggestLoading(false);
      return;
    }
    setSuggestLoading(true);
    fetch(
      `https://api.nourivitamin.com/api/products/filter?q=${encodeURIComponent(
        q
      )}&limit=5`
    )
      .then((r) => r.json())
      .then(async (d) => {
        const list = (d.products || []).slice(0, 5);
        try {
          await setProductImages(list);
        } catch (e) {
          // ignore image load errors
        }
        setSuggestions(list);
      })
      .catch(() => setSuggestions([]))
      .finally(() => setSuggestLoading(false));
  };

  const setProductImages = async (productList: any[]) => {
    const productService = new ProductService();
    for (let i = 0; i < productList.length; i++) {
      // ensure numeric id if necessary
      const id = Number((productList[i].id as any) || productList[i]._id);
      try {
        productList[i].images = await productService.getProductImages(id);
      } catch (e) {
        productList[i].images = [];
      }
    }
  };
  const onQueryChange = (v: string) => {
    setQuery(v);
    setShowSuggestions(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(v), 250);
  };

  const onSubmitSearch = (q?: string) => {
    const value = (q ?? query).trim();
    if (!value) return;
    setShowSuggestions(false);
    navigate(`/shop?q=${encodeURIComponent(value)}`);
  };

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
          <Link to="/" className="inline-flex items-center" aria-label="NOURI">
            <img src="/assets/logo.png" alt="NOURI" className="h-8" />
          </Link>
        </div>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link
              to="/test/page1"
              className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-full text-sm font-medium hover:bg-teal-600 transition duration-150"
            >
              Làm bài kiểm tra
            </Link>
            <nav className="hidden sm:flex items-center gap-4">
              <Link
                to="/shop"
                className="text-sm text-gray-700 hover:text-teal-600 transition duration-150"
              >
                Sản phẩm của chúng tôi
              </Link>
              <Link
                to="/about"
                className="text-sm text-gray-700 hover:text-teal-600 transition duration-150"
              >
                Về chúng tôi
              </Link>
            </nav>

            {/* (search moved to right area) */}
          </div>

          <div className="flex items-center gap-4">
            {/* search icon toggles the compact search box */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSearchBox((s) => {
                    const next = !s;
                    if (!next) setShowSuggestions(false);
                    return next;
                  });
                  // focus next tick
                  setTimeout(() => inputRef.current?.focus(), 50);
                }}
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

              {showSearchBox && (
                <div className="absolute right-0 top-10 w-80 bg-white border rounded-md shadow-lg z-50 p-2">
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(e) => onQueryChange(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") onSubmitSearch();
                        if (e.key === "Escape") {
                          setShowSuggestions(false);
                          setShowSearchBox(false);
                        }
                      }}
                      placeholder="Tìm sản phẩm..."
                      className="flex-1 px-3 py-2 border rounded focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        setShowSearchBox(false);
                        setShowSuggestions(false);
                      }}
                      className="px-2 text-gray-600"
                      aria-label="Đóng"
                    >
                      ✖
                    </button>
                  </div>

                  {showSuggestions &&
                    (suggestions.length > 0 || suggestLoading) && (
                      <div className="mt-2 max-h-56 overflow-auto">
                        {suggestLoading && (
                          <div className="px-3 py-2 text-sm text-gray-500">
                            Đang tải...
                          </div>
                        )}
                        {suggestions.map((p) => (
                          <div
                            key={p._id || p.id || p.slug || p.title}
                            onClick={() => {
                              setShowSearchBox(false);
                              setShowSuggestions(false);
                              const pid = p.id || p._id;
                              if (pid) navigate(`/products/${pid}`);
                              else onSubmitSearch(p.title || p.name || p.slug);
                            }}
                            className="px-3 py-2 hover:bg-teal-50 cursor-pointer flex items-center gap-3"
                          >
                            <img
                              src={p.images?.[0]}
                              alt={p.title || p.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-800">
                                {p.title || p.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatVND(Number(p.price) || 0)}
                              </div>
                            </div>
                          </div>
                        ))}
                        {!suggestLoading && suggestions.length === 0 && (
                          <div className="px-3 py-2 text-sm text-gray-500">
                            Không có kết quả
                          </div>
                        )}
                      </div>
                    )}
                </div>
              )}
            </div>

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
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium leading-none text-white bg-teal-600 rounded-full">
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
                        className="inline-block px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 hover:border-teal-500 hover:text-teal-600 transition duration-150"
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
                  <div className="mt-3 text-xs text-gray-500 bg-teal-50 p-3 rounded">
                    Việc áp dụng mã khuyến mãi và quản lý tùy chọn mua hàng được
                    thực hiện ở bước tiếp theo
                  </div>

                  <div className="mt-4">
                    <Link
                      to="/cart"
                      onClick={() => setShowPreview(false)}
                      className="block w-full text-center py-3 bg-teal-500 text-white rounded-full font-semibold hover:bg-teal-600 transition duration-150"
                    >
                      Đi đến giỏ hàng
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="relative" ref={profileRef}>
              {user && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowProfileMenu((s) => !s);
                  }}
                  className="inline-flex items-center gap-2 focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={showProfileMenu}
                  title={user?.fullName || user?.email || "Tài khoản"}
                >
                  {user ? (
                    user.picture ? (
                      <img
                        src={user.picture}
                        alt={user.fullName || user.email}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-teal-400 text-white font-semibold flex items-center justify-center">
                        {(user.fullName || user.email || "U")
                          .split(" ")
                          .map((s: string) => s[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                    )
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" />
                        <path d="M4 20v-1c0-2.761 3.134-5 8-5s8 2.239 8 5v1" />
                      </svg>
                    </div>
                  )}
                </button>
              )}
              {user && showProfileMenu && (
                <div
                  className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-50"
                  role="menu"
                  aria-label="Profile menu"
                >
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      if (user) navigate("/profile");
                      else navigate("/login");
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    role="menuitem"
                  >
                    Xem hồ sơ
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      if (user) navigate("/orders");
                      else navigate("/login");
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    role="menuitem"
                  >
                    Xem lịch sử mua hàng
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout(() => navigate("/login"));
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
              {!user && (
                <button
                  onClick={() => navigate("/login")}
                  className="inline-flex items-center gap-2 px-3 py-1 border border-zinc-400 text-zinc-600 rounded-3xl hover:bg-zinc-100 transition duration-150"
                  title="Đăng nhập"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Đăng nhập</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default AppHeader;
