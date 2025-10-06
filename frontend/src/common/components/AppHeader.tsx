import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

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
      // ignore
    }
  };

  useEffect(() => {
    fetchCount();
    const t = setInterval(fetchCount, 5000);
    const onUpdate = () => fetchCount();
    window.addEventListener("cart:updated", onUpdate as EventListener);
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
  }, []);

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
          {/* Left: CTA and links */}
          <div className="flex items-center gap-6">
            <Link
              to="/test"
              className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-full text-sm font-medium hover:bg-amber-600"
            >
              Take the test
            </Link>
            <nav className="hidden sm:flex items-center gap-4">
              <Link
                to="/shop"
                className="text-sm text-gray-700 hover:text-amber-600"
              >
                Our Products
              </Link>
              <Link
                to="/about"
                className="text-sm text-gray-700 hover:text-amber-600"
              >
                About us
              </Link>
            </nav>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 flex items-center justify-center">
            <Link to="/" className="text-2xl font-extrabold tracking-widest">
              PERSOVITA
            </Link>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-4">
            {/* search icon */}
            <button
              aria-label="Search"
              className="p-2 rounded-full hover:bg-gray-100"
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

            {/* cart */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPreview((s) => !s);
              }}
              className="relative inline-flex items-center p-2 rounded-full hover:bg-gray-100"
              aria-haspopup="true"
              aria-expanded={showPreview}
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
                className="fixed right-4 top-20 w-80 md:w-96 bg-white border shadow-lg rounded-md z-50"
              >
                <div className="px-4 py-3 border-b flex items-center justify-between">
                  <div className="text-sm font-semibold tracking-wider">
                    CART PREVIEW
                  </div>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    ›
                  </button>
                </div>

                <div className="p-4 max-h-[60vh] overflow-auto">
                  {!cartItems || cartItems.length === 0 ? (
                    <div className="text-center text-sm text-gray-500 py-8">
                      <div className="mb-6">
                        You have no supplements in your cart
                      </div>
                      <Link
                        to="/shop"
                        onClick={() => setShowPreview(false)}
                        className="inline-block px-4 py-2 border rounded-full text-sm"
                      >
                        see catalog
                      </Link>
                    </div>
                  ) : (
                    <>
                      <ul className="space-y-3">
                        {cartItems.map((it) => (
                          <li key={it.id} className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center overflow-hidden">
                              <img
                                src={
                                  it.image || "/images/product-placeholder.png"
                                }
                                alt={it.name}
                                className="object-contain w-full h-full"
                              />
                            </div>
                            <div className="flex-1 text-sm">
                              <div className="font-medium text-gray-800">
                                {it.name}
                              </div>
                              <div className="text-gray-500 text-xs">
                                Qty: {it.quantity || 1}
                              </div>
                            </div>
                            <div className="text-sm font-semibold">
                              {((it.price || 0) / 28000)
                                .toFixed(2)
                                .replace(".", ",")}{" "}
                              €
                            </div>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <div className="px-4 py-3 border-t">
                  <div className="text-sm font-semibold">Order summary</div>
                  <div className="mt-3 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Product value</span>
                      <span>
                        {(() => {
                          const v = (cartItems || []).reduce(
                            (s, a) => s + (a.price || 0) * (a.quantity || 1),
                            0
                          );
                          return (
                            (v / 28000).toFixed(2).replace(".", ",") + " €"
                          );
                        })()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discounts</span>
                      <span>0,00 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>3,90 €</span>
                    </div>
                    <div className="flex justify-between font-bold mt-2">
                      <span>TOTAL</span>
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
                    Promo code application and purchase option management are
                    done in the next step
                  </div>

                  <div className="mt-4">
                    <Link
                      to="/cart"
                      onClick={() => setShowPreview(false)}
                      className="block w-full text-center py-3 bg-amber-500 text-white rounded-full font-semibold"
                    >
                      Go to cart
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* account icon + login */}
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-amber-600"
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
              <span>Log in</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
