import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  description?: string;
  price?: number;
  currency?: string;
  images?: string[];
  badges?: string[];
  categories?: string[];
  topics?: string[];
  duration?: string;
  servings?: string;
  rating?: number;
  reviewsCount?: number;
  highlights?: string[];
};

const ProductPlaceholder: Product = {
  id: 1,
  name: "Sample product",
  description: "Product description goes here.",
  price: 45000,
  currency: "VND",
  images: [
    "https://tse2.mm.bing.net/th/id/OIP.W7NNdONWEXM2_wQ8QvEhYwHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
  ],
  badges: ["NEW"],
  categories: ["OTC"],
  topics: ["Digestion"],
  duration: "30 days",
  servings: "2 capsules per day",
  rating: 4.5,
  reviewsCount: 43,
  highlights: [
    "Green tea helps boost metabolism and promotes fat oxidation.",
    "Green tea is traditionally used to support the body's drainage functions.",
  ],
};

const DrugDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // carousel
  const [index, setIndex] = useState(0);

  // accordions
  const [openDesc, setOpenDesc] = useState(true);
  const [openComp, setOpenComp] = useState(false);
  const [openDirections, setOpenDirections] = useState(false);
  const [openQuality, setOpenQuality] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (mounted) setProduct(data.product ?? data);
        } else {
          // fallback sample when API not available
          if (mounted)
            setProduct({ ...ProductPlaceholder, id: Number(id || 1) });
        }
      } catch {
        if (mounted) setProduct({ ...ProductPlaceholder, id: Number(id || 1) });
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, [id]);

  // fetch related by topic (simple)
  useEffect(() => {
    if (!product) return;
    const fetchRelated = async () => {
      try {
        // attempt API by topic
        const topics = product.topics || [];
        if (topics.length) {
          const q = encodeURIComponent(topics[0]);
          const res = await fetch(`/api/products?topic=${q}`);
          if (res.ok) {
            const data = await res.json();
            const items: Product[] = data.products ?? data ?? [];
            // exclude current
            setRelated(items.filter((p) => p.id !== product.id).slice(0, 6));
            return;
          }
        }
      } catch (e) {
        // ignore
        console.error(e);
      }
      // fallback sample
      setRelated([
        {
          ...ProductPlaceholder,
          id: 101,
          name: "Related A",
          price: 45000,
          images: [
            "https://tse2.mm.bing.net/th/id/OIP.W7NNdONWEXM2_wQ8QvEhYwHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
          ],
          topics: product.topics,
        },
        {
          ...ProductPlaceholder,
          id: 102,
          name: "Related B",
          price: 45000,
          images: [
            "https://tse2.mm.bing.net/th/id/OIP.W7NNdONWEXM2_wQ8QvEhYwHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
          ],
          topics: product.topics,
        },
        {
          ...ProductPlaceholder,
          id: 103,
          name: "Related C",
          price: 45000,
          images: [
            "https://tse2.mm.bing.net/th/id/OIP.W7NNdONWEXM2_wQ8QvEhYwHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
          ],
          topics: product.topics,
        },
        {
          ...ProductPlaceholder,
          id: 103,
          name: "Related C",
          price: 45000,
          images: [
            "https://tse2.mm.bing.net/th/id/OIP.W7NNdONWEXM2_wQ8QvEhYwHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
          ],
          topics: product.topics,
        },
        {
          ...ProductPlaceholder,
          id: 103,
          name: "Related C",
          price: 45000,
          images: [
            "https://tse2.mm.bing.net/th/id/OIP.W7NNdONWEXM2_wQ8QvEhYwHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
          ],
          topics: product.topics,
        },
      ]);
    };
    fetchRelated();
  }, [product]);

  const images =
    product?.images && product.images.length
      ? product.images
      : ["/images/product-placeholder.png"];

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  const provenStats = useMemo(
    () => [
      {
        value: "91%",
        title: "OF OUR CUSTOMERS",
        desc: "Noticed an improvement in their key area after 3 months.",
      },
      {
        value: "94%",
        title: "OF OUR CUSTOMERS",
        desc: "Noticed an improvement in their overall health after 3 months.",
      },
      {
        value: "76",
        title: "CLINICAL AND PRECLINICAL TRIALS",
        desc: "conducted on our ingredients, including placebo-controlled trials.",
      },
    ],
    []
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <nav className="text-sm text-gray-500 mb-4">
          <span className="hover:text-amber-600 transition">
            <Link to="/">Home</Link>
          </span>{" "}
          <span>&gt; {product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: images */}
          <div className="lg:col-span-7">
            <div className="relative bg-gray-50 rounded overflow-hidden">
              <img
                src={images[index]}
                alt={product.name}
                className="w-full h-[560px] object-contain bg-white"
              />

              {/* prev / next arrows */}
              <button
                onClick={prev}
                aria-label="prev"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 shadow hover:bg-white flex items-center justify-center"
              >
                ‹
              </button>
              <button
                onClick={next}
                aria-label="next"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 shadow hover:bg-white flex items-center justify-center"
              >
                ›
              </button>
            </div>

            {/* thumbnails */}
            <div className="mt-4 flex items-center gap-3 overflow-x-auto">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-20 h-20 rounded-md overflow-hidden border ${
                    i === index ? "border-amber-300" : "border-gray-200"
                  }`}
                >
                  <img
                    src={src}
                    alt={`thumb-${i}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: details */}
          <div className="lg:col-span-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-gray-500 uppercase mb-1">
                  {product.categories?.join(" · ")}
                </div>
                <h1 className="text-3xl font-bold leading-tight mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <span className="text-amber-500 font-semibold">
                      {product.rating ?? 4.5}
                    </span>
                    <span className="text-gray-400">★</span>
                    <span className="text-gray-400">
                      ({product.reviewsCount ?? 43} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 mb-6">
              <div className="text-2xl font-extrabold">
                {product.price
                  ? `${product.price.toLocaleString()} ${
                      product.currency ?? "VND"
                    }`
                  : "Contact"}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {product.duration ?? "30 days"} |{" "}
                {product.servings ?? "2 capsules per day"}
              </div>
            </div>

            {/* availability / format buttons */}
            <div className="space-y-3">
              <div className="text-sm text-gray-500">Available in:</div>
              <div className="flex gap-3 mt-2">
                <button className="flex-1 py-3 border rounded-lg text-sm border-amber-300 text-amber-800 bg-white">
                  Personalized Box ✓
                </button>
                <button className="flex-1 py-3 border rounded-lg text-sm border-gray-200 bg-white">
                  Bottle
                </button>
              </div>

              <button className="w-full mt-4 py-3 rounded-full bg-amber-500 text-white font-medium hover:bg-amber-600 transition">
                Add to my personalized box
              </button>

              <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded">
                Is this product <strong>right for you?</strong> Take our{" "}
                <Link to="/test" className="underline text-amber-600">
                  online test
                </Link>{" "}
                to find out.
              </div>
            </div>

            {/* highlights */}
            <ul className="mt-6 space-y-3">
              {(product.highlights || []).map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-gray-700"
                >
                  <span className="w-6 h-6 rounded-full border border-amber-200 flex items-center justify-center text-amber-600">
                    ✓
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {/* Accordions */}
            <div className="mt-8 space-y-4">
              <Accordion
                title="DESCRIPTION"
                open={openDesc}
                onToggle={() => setOpenDesc(!openDesc)}
              >
                <div className="text-sm text-gray-700">
                  {product.description}
                </div>
              </Accordion>

              <Accordion
                title="COMPOSITION"
                open={openComp}
                onToggle={() => setOpenComp(!openComp)}
              >
                <div className="text-sm text-gray-700">
                  {/* Example composition table */}
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 text-left">Active ingredients</th>
                        <th className="p-2 text-right">
                          For 2 capsules per day
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2">Green tea extract</td>
                        <td className="p-2 text-right">250 mg</td>
                      </tr>
                      <tr>
                        <td className="p-2">Vitamin C</td>
                        <td className="p-2 text-right">17.2 mg</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Accordion>

              <Accordion
                title="DIRECTIONS FOR USE"
                open={openDirections}
                onToggle={() => setOpenDirections(!openDirections)}
              >
                <div className="text-sm text-gray-700">
                  Take 2 capsules per day with a glass of water, or as directed
                  by your healthcare professional.
                </div>
              </Accordion>

              <Accordion
                title="QUALITY AND TRACEABILITY"
                open={openQuality}
                onToggle={() => setOpenQuality(!openQuality)}
              >
                <div className="text-sm text-gray-700">
                  Manufactured in certified facilities. Traceability information
                  available on request.
                </div>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Proven results section */}
        <section className="mt-16 bg-[#f5f1ec] rounded p-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-4 text-center">
              <h2 className="text-4xl font-bold">
                Proven
                <br />
                results
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6 border-l border-gray-200 pl-6">
              {provenStats.map((s, i) => (
                <div key={i}>
                  <div className="text-4xl font-extrabold">{s.value}</div>
                  <div className="text-xs uppercase text-gray-500 mt-1">
                    {s.title}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">{s.desc}</div>
                  <div className="border-t border-gray-200 mt-4" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related products */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Products with same topic</h3>
            <Link to="/shop" className="text-sm text-amber-600">
              See all
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {related.map((r) => (
              <Link
                to={`/products/${r.id}`}
                key={r.id}
                className="block bg-white border rounded-lg p-3 hover:shadow transition"
              >
                <div className="h-36 bg-gray-50 rounded mb-3 flex items-center justify-center">
                  <img
                    src={r.images?.[0] ?? "/images/product-placeholder.png"}
                    alt={r.name}
                    className="object-contain h-full"
                  />
                </div>
                <div className="text-sm font-medium">{r.name}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {r.price
                    ? `${r.price.toLocaleString()} ${r.currency ?? "VND"}`
                    : "Contact"}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DrugDetailsPage;

/* small Accordion component */
function Accordion({
  title,
  children,
  open = false,
  onToggle,
}: {
  title: string;
  children: React.ReactNode;
  open?: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-t border-gray-200 pt-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-sm font-medium text-gray-800"
      >
        <span>{title}</span>
        <span className="text-gray-400">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}
