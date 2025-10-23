import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDrugStore } from "../stores/useDrugStore";
import { useDebounce } from "../hooks/useDebounce";
import type { Drug } from "../interfaces/drug";
import { useFeatureStore } from "../stores/useFeatureStore";
import { useAuthStore } from "../../auth/stores/useAuthStore";
import { useBrandStore } from "../stores/useBrandStore";
import { Loader2 } from "lucide-react";

const PAGE_SIZES = [9, 12, 24, 48];

const ShopPage: React.FC = () => {
  // local UI state
  const [search, setSearch] = useState("");
  // ids stored as strings for UI checkbox keys
  const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>([]);
  const [selectedFeatureIds, setSelectedFeatureIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    "name-asc" | "name-desc" | "price-asc" | "price-desc"
  >("name-asc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_SIZES[0]);

  // debounced inputs
  const debouncedSearch = useDebounce(search, 400);
  const debouncedBrandIds = useDebounce(selectedBrandIds, 300);
  const debouncedFeatureIds = useDebounce(selectedFeatureIds, 300);

  // store
  const { drugs, filterDrugs, isLoading: isLoadingDrugs } = useDrugStore();
  const { user } = useAuthStore();
  const {
    features,
    fetchFeatures,
    isLoading: isLoadingFeatures,
  } = useFeatureStore();
  const { brands, fetchBrands, isLoading: isLoadingBrands } = useBrandStore();

  // meta from API
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // ensure brands/features loaded for sidebar
  useEffect(() => {
    if (typeof fetchBrands === "function") fetchBrands();
    if (typeof fetchFeatures === "function") fetchFeatures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // available lists for sidebar (ids as strings)
  const brandsAvailable = useMemo(() => {
    if (!Array.isArray(brands)) return [];
    return brands.map((b: any) => ({ id: String(b.id), name: b.name }));
  }, [brands]);

  const topicsAvailable = useMemo(() => {
    if (!Array.isArray(features)) return [];
    return features.map((t: any) => ({ id: String(t.id), title: t.title }));
  }, [features]);

  // helper toggles (string ids)
  const toggleBrand = (id: string) =>
    setSelectedBrandIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  const toggleFeature = (id: string) =>
    setSelectedFeatureIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  // build query string for backend
  const buildQuery = () => {
    const params = new URLSearchParams();
    if (debouncedBrandIds && debouncedBrandIds.length) {
      // backend accepts brandId or brandIds; use brandIds for multiples
      params.set("brandIds", debouncedBrandIds.join(","));
    }
    if (debouncedFeatureIds && debouncedFeatureIds.length) {
      params.set("featureIds", debouncedFeatureIds.join(","));
    }
    if (debouncedSearch && debouncedSearch.trim()) {
      params.set("q", debouncedSearch.trim());
    }
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (sortBy && sortBy !== "name-asc") params.set("sort", sortBy);
    return params.toString();
  };

  // fetch when debounced inputs change or page/limit change
  useEffect(() => {
    const q = buildQuery();
    let mounted = true;

    (async () => {
      const data = await filterDrugs(q);
      if (!mounted) return;

      if (data) {
        const totalResp = data.meta?.total ?? data.products?.length ?? 0;
        const totalPagesResp = Math.max(1, data.meta?.totalPages ?? 1);

        // If current page out of range, reset page to 1 and exit (next effect will fetch)
        if (page > totalPagesResp) {
          setTotal(totalResp);
          setTotalPages(totalPagesResp);
          if (page !== 1) setPage(1);
          return;
        }

        setTotal(totalResp);
        setTotalPages(totalPagesResp);
      } else {
        setTotal(0);
        setTotalPages(1);
      }
    })();

    return () => {
      mounted = false;
    };
    // include debounced arrays and pagination/sort
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debouncedSearch,
    debouncedBrandIds,
    debouncedFeatureIds,
    page,
    limit,
    sortBy,
  ]);

  // derived values for UI
  const totalItems = total;
  const start = (page - 1) * limit;

  return (
    <div className="min-h-screen bg-white">
      <div className="relative w-full bg-center bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />
        <div className="relative max-w-7xl py-8"></div>
      </div>
      {/* Hero */}
      <div
        className="relative w-full bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage:
            "url('https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/cdn-cgi/image/w=,h=,f=auto,dpr=1,fit=contain/d75/f1740073833085x562625109128317000/BANNER%2016%20%283%29.jpg')",
        }}
      >
        {/* subtle overlay to ensure text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sản phẩm</h1>
            <p className="text-gray-600 max-w-xl">
              Khoa học. Hiệu quả. Đơn giản. Khám phá các dòng sản phẩm đa dạng
              của chúng tôi được các nhà khoa học sáng tạo, đáp ứng mọi nhu cầu
              của bạn.
            </p>
          </div>
          <div className="hidden md:block flex-1" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="col-span-12 md:col-span-3">
            <div className="md:sticky md:top-20 space-y-6">
              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sắp xếp theo
                </label>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as
                        | "name-asc"
                        | "name-desc"
                        | "price-asc"
                        | "price-desc"
                    )
                  }
                  className="w-full rounded border border-gray-200 p-2 text-sm bg-white"
                >
                  <option value="name-asc">Từ A-Z</option>
                  <option value="name-desc">Từ Z-A</option>
                  <option value="price-asc">Giá thấp nhất</option>
                  <option value="price-desc">Giá cao nhất</option>
                </select>
              </div>

              {/* Formats (kept simple) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Danh mục thương hiệu
                </label>
                <div className="space-y-2 text-sm text-gray-700 max-h-56 overflow-auto pr-2">
                  {isLoadingBrands ? (
                    <Loader2 />
                  ) : brandsAvailable.length ? (
                    brandsAvailable.map((c) => (
                      <label key={c.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedBrandIds.includes(c.id)}
                          onChange={() => toggleBrand(c.id)}
                          className="w-4 h-4"
                        />
                        <span>{c.name}</span>
                      </label>
                    ))
                  ) : (
                    <div className="text-xs text-gray-400">
                      Không có danh mục
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Danh mục chức năng
                </label>
                <div className="space-y-2 text-sm text-gray-700 max-h-56 overflow-auto pr-2">
                  {isLoadingFeatures ? (
                    <Loader2 />
                  ) : topicsAvailable.length ? (
                    topicsAvailable.map((t) => (
                      <label key={t.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedFeatureIds.includes(t.id)}
                          onChange={() => toggleFeature(t.id)}
                          className="w-4 h-4"
                        />
                        <span>{t.title}</span>
                      </label>
                    ))
                  ) : (
                    <div className="text-xs text-gray-400">
                      Không có chức năng
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 w-3/4 m-auto">
                <button
                  onClick={() => {
                    setSelectedFeatureIds([]);
                    setSelectedBrandIds([]);
                    setSearch("");
                    setPage(1);
                    setSortBy("name-asc");
                  }}
                  className="flex-1 py-2 rounded-full border border-gray-300 bg-teal-300 text-sm hover:bg-teal-400 transition"
                >
                  Reset
                </button>
              </div>
            </div>
          </aside>

          {/* Products */}
          <main className="col-span-12 md:col-span-9">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">{totalItems} sản phẩm</div>

              <div className="flex items-center gap-3">
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Tìm tên sản phẩm..."
                  className="px-3 py-2 border border-gray-200 rounded text-sm"
                />
                <select
                  value={limit}
                  onChange={(e) => {
                    setLimit(parseInt(e.target.value, 10));
                    setPage(1);
                  }}
                  className="px-2 py-2 border border-gray-200 rounded text-sm"
                >
                  {PAGE_SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s} / trang
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingDrugs ? (
                <div className="col-span-full text-center py-10 text-gray-500">
                  Đang chờ...
                </div>
              ) : (drugs ?? []).length ? (
                (drugs ?? []).map((p: Drug) => (
                  <div
                    key={p.id}
                    className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                  >
                    <div className="relative h-44 mb-4 rounded overflow-hidden flex items-center justify-center">
                      <img
                        src={p.images?.[0] ?? "/images/product-placeholder.png"}
                        alt={p.name}
                        className="object-contain h-full w-full"
                      />
                      {/* {p.brands?.length ? (
                        <div className="absolute top-3 right-3 space-y-1">
                          {p.brands.map((c: any) => (
                            <span
                              key={c.id}
                              className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded"
                            >
                              {c.name}
                            </span>
                          ))}
                        </div>
                      ) : null} */}
                    </div>

                    <h3 className="font-semibold mb-1">
                      <Link
                        to={`/products/${p.id}`}
                        className="hover:text-teal-600 transition"
                      >
                        {p.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                      {p.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold">
                        {p.price
                          ? `${p.price.toLocaleString()} VND`
                          : "Contact"}
                      </div>
                      <button
                        onClick={async () => {
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
                            if (!user) {
                              // guest: save to localStorage persistCart (merge by productId)
                              const key = "persistCart";
                              const raw = localStorage.getItem(key) || "[]";
                              const list = JSON.parse(raw || "[]");
                              const existing = list.find(
                                (i: any) => i.productId === payload.productId
                              );
                              if (existing) {
                                existing.quantity =
                                  (Number(existing.quantity) || 0) + 1;
                              } else {
                                list.push({
                                  userId: null,
                                  productId: payload.productId,
                                  name: payload.name,
                                  price: payload.price,
                                  quantity: 1,
                                  subscription: false,
                                  subscriptionMonths: 0,
                                  image: payload.image || "",
                                });
                              }
                              localStorage.setItem(key, JSON.stringify(list));
                              window.dispatchEvent(
                                new CustomEvent("cart:updated")
                              );
                              alert("Added to cart");
                              return;
                            }

                            // logged-in: call server addToCart
                            const { addToCart } = await import(
                              "../../cart/services/cartService"
                            );
                            const res: any = await addToCart(payload);
                            if (res && res.status === 401) {
                              window.location.href = "/login";
                              return;
                            }
                            window.dispatchEvent(
                              new CustomEvent("cart:updated")
                            );
                            alert("Added to cart");
                          } catch (e) {
                            console.error(e);
                            alert("Failed to add to cart");
                          }
                        }}
                        className="w-9 h-9 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center hover:bg-teal-200 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-10">
                  Không tìm thấy sản phẩm nào
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Hiển thị {start + 1}–
                {Math.min(start + (drugs?.length ?? 0), totalItems)} trong số{" "}
                {totalItems} sản phẩm
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-2 rounded border border-gray-200 bg-white text-sm disabled:opacity-50 hover:bg-gray-50"
                >
                  Trước
                </button>

                {/* paginated buttons with ellipsis */}
                <div className="hidden md:flex items-center gap-1">
                  {(() => {
                    if (totalPages <= 1) return null;
                    // build set of pages to show: first block, current block, last block
                    const pages = new Set<number>();
                    const blockSize = 3;
                    // first block
                    for (let i = 1; i <= Math.min(blockSize, totalPages); i++)
                      pages.add(i);
                    // current block (centered on current page, size 3)
                    for (
                      let i = Math.max(1, page - 1);
                      i <= Math.min(totalPages, page + 1);
                      i++
                    )
                      pages.add(i);
                    // last block
                    for (
                      let i = Math.max(1, totalPages - (blockSize - 1));
                      i <= totalPages;
                      i++
                    )
                      pages.add(i);

                    const sorted = Array.from(pages).sort((a, b) => a - b);
                    const nodes: React.ReactNode[] = [];
                    let last = 0;
                    sorted.forEach((pNum) => {
                      if (last && pNum - last > 1) {
                        // gap -> ellipsis
                        nodes.push(
                          <span
                            key={`dots-${last}-${pNum}`}
                            className="px-2 text-sm text-gray-500"
                          >
                            …
                          </span>
                        );
                      }
                      nodes.push(
                        <button
                          key={pNum}
                          onClick={() => setPage(pNum)}
                          className={`px-3 py-2 rounded text-sm border ${
                            page === pNum
                              ? "bg-teal-200 border-teal-300 font-medium"
                              : "bg-white border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {pNum}
                        </button>
                      );
                      last = pNum;
                    });
                    return nodes;
                  })()}
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-2 rounded border border-gray-200 bg-white text-sm disabled:opacity-50 hover:bg-gray-50"
                >
                  Tiếp
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
