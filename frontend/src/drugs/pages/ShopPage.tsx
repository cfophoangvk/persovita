import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDrugStore } from "../stores/useDrugStore";
import { useDebounce } from "../hooks/useDebounce";
import type { Drug } from "../interfaces/drug";

const PAGE_SIZES = [12, 24, 48];

const ShopPage: React.FC = () => {
  // local UI state
  const [search, setSearch] = useState("");
  // NOTE: ids are strings (follow /interfaces/drug.ts)
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    "relevance" | "price-asc" | "price-desc"
  >("relevance");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  // debounced inputs
  const debouncedSearch = useDebounce(search, 400);
  const debouncedCategoryIds = useDebounce(selectedCategoryIds, 300);
  const debouncedTopicIds = useDebounce(selectedTopicIds, 300);

  // store
  const { drugs, filterDrugs, isLoading } = useDrugStore();

  // meta from API
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // build available categories/topics from returned products
  const categoriesAvailable = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of (drugs as Drug[]) || []) {
      (p.categories || []).forEach((c: any) => {
        if (typeof c === "string") return;
        map.set(String(c.id), c.name);
      });
    }
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [drugs]);

  const topicsAvailable = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of (drugs as Drug[]) || []) {
      (p.topics || []).forEach((t: any) => {
        if (typeof t === "string") return;
        map.set(String(t.id), t.title);
      });
    }
    return Array.from(map.entries()).map(([id, title]) => ({ id, title }));
  }, [drugs]);

  // helper toggles (string ids)
  const toggleCategory = (id: string) =>
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  const toggleTopic = (id: string) =>
    setSelectedTopicIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  // build query string for backend
  const buildQuery = () => {
    const params = new URLSearchParams();
    if (debouncedCategoryIds && debouncedCategoryIds.length) {
      params.set("categoryIds", debouncedCategoryIds.join(","));
    }
    if (debouncedTopicIds && debouncedTopicIds.length) {
      params.set("topicIds", debouncedTopicIds.join(","));
    }
    if (debouncedSearch && debouncedSearch.trim()) {
      params.set("q", debouncedSearch.trim());
    }
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (sortBy && sortBy !== "relevance") params.set("sort", sortBy);
    return params.toString();
  };

  // fetch when debounced inputs change or page/limit change
  useEffect(() => {
    const q = buildQuery();
    let mounted = true;
    (async () => {
      // use store method which now returns parsed response
      const data = await filterDrugs(q);
      if (!mounted) return;
      if (data) {
        setTotal(data.meta?.total ?? data.products?.length ?? 0);
        setTotalPages(data.meta?.totalPages ?? 1);
        // page might be out of range after filter change
        if (page > (data.meta?.totalPages ?? 1)) setPage(1);
      } else {
        setTotal(0);
        setTotalPages(1);
      }
    })();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debouncedSearch,
    debouncedCategoryIds,
    debouncedTopicIds,
    page,
    limit,
    sortBy,
  ]);

  // derived values for UI
  const totalItems = total;
  const start = (page - 1) * limit;
  // const paged = (drugs ?? []).slice(0, limit); // store already returns page-limited items

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div
        className="relative w-full bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage:
            "url('https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/cdn-cgi/image/w=,h=,f=auto,dpr=1,fit=contain/d75/f1740073833085x562625109128317000/BANNER%2016%20%283%29.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 flex items-center">
          <div className="max-w-2xl z-10">
            <nav className="text-sm text-gray-500 mb-4">
              <span className="hover:text-amber-600 transition">
                <Link to="/">Home</Link>
              </span>{" "}
              <span>&gt; Our products</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our products
            </h1>
            <p className="text-gray-600 max-w-xl">
              Science. Efficiency. Simplicity. Discover our different ranges of
              products created by Scientists, to meet all your needs.
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as "relevance" | "price-asc" | "price-desc"
                    )
                  }
                  className="w-full rounded border border-gray-200 p-2 text-sm bg-white"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Categories
                </label>
                <div className="space-y-2 text-sm text-gray-700 max-h-56 overflow-auto pr-2">
                  {categoriesAvailable.length ? (
                    categoriesAvailable.map((c) => (
                      <label key={c.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategoryIds.includes(c.id)}
                          onChange={() => toggleCategory(c.id)}
                          className="w-4 h-4"
                        />
                        <span>{c.name}</span>
                      </label>
                    ))
                  ) : (
                    <div className="text-xs text-gray-400">No categories</div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Topics
                </label>
                <div className="space-y-2 text-sm text-gray-700 max-h-56 overflow-auto pr-2">
                  {topicsAvailable.length ? (
                    topicsAvailable.map((t) => (
                      <label key={t.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedTopicIds.includes(t.id)}
                          onChange={() => toggleTopic(t.id)}
                          className="w-4 h-4"
                        />
                        <span>{t.title}</span>
                      </label>
                    ))
                  ) : (
                    <div className="text-xs text-gray-400">No topics</div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedCategoryIds([]);
                    setSelectedTopicIds([]);
                    setSearch("");
                    setPage(1);
                  }}
                  className="flex-1 py-2 rounded-full border border-gray-300 bg-white text-sm hover:bg-gray-50 transition"
                >
                  Reset
                </button>
                <button
                  onClick={() => setPage(1)}
                  className="flex-1 py-2 rounded-full bg-amber-200 text-amber-900 text-sm font-medium hover:bg-amber-300 transition"
                >
                  Apply
                </button>
              </div>
            </div>
          </aside>

          {/* Products */}
          <main className="col-span-12 md:col-span-9">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">{totalItems} products</div>

              <div className="flex items-center gap-3">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
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
                      {s} / page
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="col-span-full text-center py-10 text-gray-500">
                  Loading...
                </div>
              ) : (drugs ?? []).length ? (
                (drugs ?? []).map((p: Drug) => (
                  <div
                    key={p.id}
                    className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                  >
                    <div className="relative h-44 mb-4 bg-gray-50 rounded overflow-hidden flex items-center justify-center">
                      <img
                        src={p.images?.[0] ?? "/images/product-placeholder.png"}
                        alt={p.name}
                        className="object-contain h-full w-full"
                      />
                      {p.categories?.length ? (
                        <div className="absolute top-3 right-3 space-y-1">
                          {p.categories.map((c) => (
                            <span
                              key={c.id}
                              className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded"
                            >
                              {c.name}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <h3 className="font-semibold mb-1">
                      <Link
                        to={`/products/${p.id}`}
                        className="hover:text-amber-600 transition"
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
                          ? `${p.price.toLocaleString()} ${p.currency ?? "VND"}`
                          : "Contact"}
                      </div>
                      <button
                        onClick={() => {
                          const payload = {
                            id: p.id,
                            name: p.name,
                            price: p.price,
                            quantity: 1,
                            image: p.images?.[0] ?? "",
                            subscription: false,
                          };
                          fetch("http://localhost:6789/api/cart/add", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(payload),
                          })
                            .then(() => {
                              window.dispatchEvent(
                                new CustomEvent("cart:updated")
                              );
                              alert("Added to cart");
                            })
                            .catch(() => alert("Failed to add to cart"));
                        }}
                        className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center hover:bg-amber-200 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-10">
                  No products found
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {start + 1}–
                {Math.min(start + (drugs?.length ?? 0), totalItems)} of{" "}
                {totalItems} products
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-2 rounded border border-gray-200 bg-white text-sm disabled:opacity-50 hover:bg-gray-50"
                >
                  Prev
                </button>

                <div className="hidden md:flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`px-3 py-2 rounded text-sm border ${
                          page === pageNum
                            ? "bg-amber-200 border-amber-300 font-medium"
                            : "bg-white border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-2 rounded border border-gray-200 bg-white text-sm disabled:opacity-50 hover:bg-gray-50"
                >
                  Next
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
