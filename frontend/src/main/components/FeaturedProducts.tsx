import React, { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  description?: string;
  price?: number;
  image?: string;
};

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Constants for professional styling
  const BRAND_COLOR = "text-indigo-700"; // New primary color
  const BUTTON_BG = "bg-indigo-600 hover:bg-indigo-700"; // New button color

  useEffect(() => {
    setLoading(true);
    // Keeping your original fetch logic
    fetch("http://localhost:6789/file")
      .then((r) => r.json())
      .then((d) => {
        const list = (d.products || []).map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: p.price ?? 35000,
          image: p.image ?? "/public/image/product1.jpg",
        }));
        setProducts(list);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = (p: Product) => {
    const payload = {
      id: p.id,
      name: p.name,
      price: p.price,
      quantity: 1,
      image: p.image,
    };
    // Keeping your original cart logic
    fetch("http://localhost:6789/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(() => {
        window.dispatchEvent(new CustomEvent("cart:updated"));
        alert(`"${p.name}" added to cart!`);
      })
      .catch(() => alert("Failed to add to cart. Please try again."));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 border-b pb-4">
        <h2 className={`text-4xl font-extrabold tracking-tight ${BRAND_COLOR}`}>
          Featured Products
        </h2>
        <a
          href="/shop"
          className={`mt-4 sm:mt-0 text-md font-medium transition duration-200 ${BRAND_COLOR} hover:text-indigo-500`}
        >
          View all products &rarr;
        </a>
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <div className="text-center py-10 text-xl text-gray-500">
          Loading amazing products...
        </div>
      ) : (
        /* PRODUCT GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden group border border-gray-100"
            >
              {/* IMAGE CONTAINER */}
              <a
                href={`/product/${p.id}`}
                className="block relative overflow-hidden h-64 bg-gray-50"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                />
              </a>

              {/* PRODUCT DETAILS */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex-1">
                  <a
                    href={`/product/${p.id}`}
                    className="hover:text-indigo-700 transition duration-150"
                  >
                    <h3 className="font-bold text-xl mb-1 text-gray-900 line-clamp-2">
                      {p.name}
                    </h3>
                  </a>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
                    {p.description}
                  </p>
                </div>

                {/* PRICE & BUTTONS */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  {/* PRICE (Formatted) */}
                  <div className="font-extrabold text-xl text-gray-900">
                    {((p.price ?? 0) / 1000).toLocaleString()} ₫{" "}
                    {/* Keeping the currency format as is */}
                  </div>

                  {/* ADD TO CART BUTTON */}
                  <button
                    onClick={() => handleAdd(p)}
                    className={`px-5 py-2 ${BUTTON_BG} text-white rounded-lg text-sm font-semibold shadow-md transition duration-300 transform hover:-translate-y-0.5`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
