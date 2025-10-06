import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

type ShippingMethod = {
  id: string;
  title: string;
  subtitle?: string;
  price: number | "Free";
};

const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "pickup",
    title: "Pick-up point delivery Chronopost",
    subtitle: "Cliquez pour choisir un point de retrait",
    price: "Free",
  },
  {
    id: "home_priv",
    title: "Home delivery Colis Privé",
    subtitle: "Colis Privé 48h",
    price: 1.0,
  },
  {
    id: "home_colis",
    title: "Home delivery Colissimo",
    subtitle: "Colissimo 48h",
    price: 2.0,
  },
];

const Shipping: React.FC<{
  productCount?: number;
  totalEur?: number;
  onBack?: () => void;
  onProceed?: (summary: {
    address?: string;
    city?: string;
    country?: string;
  }) => void;
}> = ({ productCount = 0, totalEur = 0, onBack, onProceed }) => {
  const [email, setEmail] = useState("mary@email.com");
  const [firstName, setFirstName] = useState("Mary");
  const [lastName, setLastName] = useState("Smith");
  const [address1, setAddress1] = useState("64, Hello Street");
  const [address2, setAddress2] = useState("Apt 2");
  const [zipcode, setZipcode] = useState("E1 6AN");
  const [city, setCity] = useState("London");
  const [country, setCountry] = useState("France");
  const [phone, setPhone] = useState("+33 601234567");
  const [method, setMethod] = useState<string>("pickup");

  const handleProceed = () => {
    // basic validation
    if (!email || !firstName || !lastName || !address1 || !zipcode || !city) {
      alert("Please fill required fields");
      return;
    }
    // validation passed — send a small summary back and move to payment step
    const summary = {
      address: `${address1}${address2 ? ", " + address2 : ""}`,
      city,
      country,
    };
    if (onProceed) onProceed(summary);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <button
        onClick={onBack}
        aria-label="Back to cart"
        className="absolute left-0 top-0 mt-1 mr-0 p-2 text-gray-600 hover:text-gray-800"
      >
        <ArrowLeftIcon className="w-6 h-6" />
      </button>
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-center mb-6 relative">
          <h1 className="text-2xl tracking-widest font-semibold">PERSOVITA</h1>
        </header>
        <div className="mb-6 border-b pb-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700">
              1. Your Cart{" "}
              <span className="text-gray-400">
                {productCount} Product{productCount !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="text-base font-semibold">
              {totalEur.toFixed(2).replace(".", ",")} €
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-lg font-bold mb-4">2. Shipping</h2>

          <div className="mb-6">
            <h3 className="text-sm font-bold text-orange-600 mb-3">
              CONTACT INFORMATION
            </h3>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 rounded-full bg-[#fbf7f5] border-none mb-2"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-bold text-orange-600 mb-3">
              SHIPPING ADDRESS
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="p-3 rounded-full bg-[#fbf7f5]"
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="p-3 rounded-full bg-[#fbf7f5]"
              />
            </div>
            <input
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              placeholder="Address"
              className="w-full p-3 rounded-full bg-[#fbf7f5] mb-3"
            />
            <input
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              placeholder="Address Line 2"
              className="w-full p-3 rounded-full bg-[#fbf7f5] mb-3"
            />

            <div className="grid grid-cols-3 gap-3 mb-3">
              <input
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                placeholder="Zipcode"
                className="p-3 rounded-full bg-[#fbf7f5] col-span-1"
              />
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="p-3 rounded-full bg-[#fbf7f5] col-span-2"
              />
            </div>

            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-3 rounded-full bg-[#fbf7f5] mb-3"
            >
              <option>France</option>
              <option>Germany</option>
              <option>United Kingdom</option>
            </select>

            <div className="flex gap-3 items-center">
              <div className="text-sm">Mobile Phone</div>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+33 601234567"
                className="flex-1 p-3 rounded-full bg-[#fbf7f5]"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-bold text-orange-600 mb-3">
              SHIPPING METHOD
            </h3>
            <div className="space-y-3">
              {SHIPPING_METHODS.map((m) => (
                <label
                  key={m.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <div className="flex items-center gap-2 font-semibold">
                      {m.title}
                    </div>
                    {m.subtitle && (
                      <div className="text-xs text-gray-500">{m.subtitle}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-700">
                      {m.price === "Free" ? "Free" : `${m.price.toFixed(2)} €`}
                    </div>
                    <input
                      type="radio"
                      name="shipping"
                      checked={method === m.id}
                      onChange={() => setMethod(m.id)}
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleProceed}
              className="w-full py-4 text-white font-bold rounded-full shadow-lg"
              style={{ backgroundColor: "#f28d3d" }}
            >
              Proceed to secured payment
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Shipping;
