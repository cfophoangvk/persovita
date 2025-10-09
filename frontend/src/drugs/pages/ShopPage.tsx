import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  price?: number;
  currency?: string;
  images?: string[];
  categories?: string[]; // optional, may be names or slugs
  badges?: string[];
  description?: string;
};

const PAGE_SIZES = [12, 24, 48];

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters / sort / pagination
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    "relevance" | "price-asc" | "price-desc"
  >("relevance");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Fetch products failed");
        const data = await res.json();
        // expect data.products or data
        const list: Product[] = data?.products ?? data ?? [];
        setProducts(list);
      } catch (err: any) {
        // fallback sample if API not available
        // Example of image links: "/images/products/amoxicillin-500-14.jpg"
        setProducts([
          {
            id: 1,
            name: "Paracetamol 500mg",
            price: 45000,
            currency: "VND",
            images: [
              "https://tse2.mm.bing.net/th/id/OIP.W7NNdONWEXM2_wQ8QvEhYwHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
            ],
            categories: ["Analgesic", "OTC"],
            badges: ["NEW"],
            description: "Giảm đau, hạ sốt. 20 viên/hộp.",
          },
          {
            id: 2,
            name: "Amoxicillin 500mg",
            price: 120000,
            currency: "VND",
            images: [
              "https://tse1.mm.bing.net/th/id/OIP.sKb67xJHoAk7ecSQmE0KaQHaEJ?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
            ],
            categories: ["Antibiotic", "Prescription"],
            badges: ["BEST-SELLER"],
            description: "Kháng sinh phổ rộng.",
          },
          {
            id: 3,
            name: "Cough Syrup - Honey & Herbs",
            price: 89000,
            currency: "VND",
            images: [
              "https://5.imimg.com/data5/SELLER/Default/2022/5/ZD/QP/KK/101626867/herbal-honey-cough-syrup-1000x1000.jpg",
            ],
            categories: ["Cough & Cold", "OTC"],
            badges: [],
            description: "Si rô ho, dịu cổ họng. 120ml/chai.",
          },
        ]);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // reset page when filters change
    setPage(1);
  }, [search, selectedCategories, sortBy, limit]);

  const categoriesAvailable = useMemo(() => {
    const setC = new Set<string>();
    for (const p of products) {
      (p.categories || []).forEach((c) => setC.add(c));
    }
    return Array.from(setC);
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.slice();

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q)
      );
    }

    if (selectedCategories.length) {
      list = list.filter((p) =>
        (p.categories || []).some((c) => selectedCategories.includes(c))
      );
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }

    return list;
  }, [products, search, selectedCategories, sortBy]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const paged = filtered.slice(start, start + limit);

  const toggleCategory = (c: string) => {
    setSelectedCategories((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero (banner background with text overlay) */}
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
          {/* right side is part of background image; keep empty spacer for layout */}
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

              {/* Formats (kept simple) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Formats
                </label>
                <div className="space-y-2 text-sm text-gray-700">
                  {["Bottles", "Packs", "Powders", "Liquids", "Tubes"].map(
                    (f) => (
                      <label key={f} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>{f}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Categories */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Categories
                  </label>
                  <span className="text-xs text-gray-500">
                    {selectedCategories.length > 0
                      ? `${selectedCategories.length} selected`
                      : ""}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-700 max-h-56 overflow-auto pr-2">
                  {categoriesAvailable.length ? (
                    categoriesAvailable.map((c) => (
                      <label key={c} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(c)}
                          onChange={() => toggleCategory(c)}
                          className="w-4 h-4"
                        />
                        <span>{c}</span>
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
                  {(() => {
                    const topicsSet = new Set<string>();
                    products.forEach((p: any) => {
                      (p.topics || []).forEach((t: string) => topicsSet.add(t));
                    });
                    const topics = Array.from(topicsSet);
                    if (!topics.length) {
                      return (
                        <div className="text-xs text-gray-400">No topics</div>
                      );
                    }
                    return topics.map((t) => (
                      <label key={t} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>{t}</span>
                      </label>
                    ));
                  })()}
                </div>
              </div>

              {/* Actions */}
              <div className="flex m-auto items-center w-3/4 gap-3">
                <button
                  onClick={() => setPage(1)}
                  className="flex-1 py-2 rounded-full bg-amber-200 text-amber-900 text-sm font-medium hover:bg-amber-300 transition"
                >
                  Reset
                </button>
              </div>
            </div>
          </aside>

          {/* Products */}
          <main className="col-span-12 md:col-span-9">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">{total} products</div>

              <div className="flex items-center gap-3">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="px-3 py-2 border border-gray-200 rounded text-sm"
                />
                <select
                  value={limit}
                  onChange={(e) => setLimit(parseInt(e.target.value, 10))}
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
              {loading ? (
                <div className="col-span-full text-center py-10 text-gray-500">
                  Loading...
                </div>
              ) : paged.length ? (
                paged.map((p) => (
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
                      {p.badges?.length ? (
                        <div className="absolute top-3 right-3 space-y-1">
                          {p.badges!.map((b, i) => (
                            <span
                              key={i}
                              className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded"
                            >
                              {b}
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
                              // dispatch event so header can refresh count
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
                Showing {start + 1}–{Math.min(start + paged.length, total)} of{" "}
                {total} products
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-2 rounded border border-gray-200 bg-white text-sm disabled:opacity-50 hover:bg-gray-50"
                >
                  Prev
                </button>

                {/* simple page numbers */}
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
