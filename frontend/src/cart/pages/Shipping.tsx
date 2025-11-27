import React, { useEffect, useState } from "react";
import type { ShippingMethod } from "../interfaces/shipping";
import { Home } from "lucide-react";
import { toast } from "react-hot-toast";

// Hàm định dạng VNĐ
const formatVND = (v: number) => v.toLocaleString("vi-VN") + " VNĐ";

// Phương thức vận chuyển theo yêu cầu
const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "hn_std",
    title: "Giao hàng tiêu chuẩn (Nội thành Hà Nội)",
    subtitle: "Giao trong 2–3 ngày làm việc",
    price: 30000,
  },
  {
    id: "prov_std",
    title: "Giao hàng tiêu chuẩn (Các tỉnh thành khác)",
    subtitle: "Giao trong 3–5 ngày làm việc",
    price: 40000,
  },
  {
    id: "hn_fast",
    title: "Giao hàng nhanh (Nội thành Hà Nội)",
    subtitle: "Giao trong 24 giờ",
    price: 40000,
  },
];

const Shipping: React.FC<{
  totalVND?: number;
  onBack?: () => void;
  onProceed?: (summary: {
    address?: string;
    city?: string;
    country?: string;
  }) => void;
}> = ({ totalVND = 0, onBack, onProceed }) => {
  // Personalization (from survey) — try to load from localStorage key `testData`
  const loadPersonalFromStorage = () => {
    try {
      const raw = localStorage.getItem("testData");
      if (!raw) return { name: "", email: "" };
      const parsed = JSON.parse(raw);
      return {
        name: (parsed && parsed.name) || "",
        email: (parsed && parsed.email) || "",
      };
    } catch (e) {
      return { name: "", email: "" };
    }
  };

  const initialPersonal = loadPersonalFromStorage();
  const [personalName, setPersonalName] = useState(initialPersonal.name);
  const [personalEmail, setPersonalEmail] = useState(initialPersonal.email);

  // Shipping address fields — intentionally empty and use placeholders
  const [addrFirstName, setAddrFirstName] = useState("");
  const [addrLastName, setAddrLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Việt Nam");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<string>("hn_std");

  console.log(setPersonalEmail);
  console.log(setPersonalName);
  console.log(setCountry);

  // compute selected shipping price and total including shipping for display
  const selectedMethod = SHIPPING_METHODS.find((m) => m.id === method);
  const selectedShippingPrice = selectedMethod
    ? (selectedMethod.price as number)
    : 0;
  const totalWithShipping = (totalVND || 0) + (selectedShippingPrice || 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleProceed = () => {
    // require basic shipping fields
    if (!addrFirstName || !addrLastName || !address1 || !zipcode || !city) {
      toast.error("Vui lòng điền đầy đủ các trường bắt buộc.");
      return;
    }

    const summary: any = {
      address: `${address1}${address2 ? ", " + address2 : ""}`,
      city,
      country,
      method,
    };

    // find selected method's price
    const sel = SHIPPING_METHODS.find((m) => m.id === method);
    const price = sel ? (sel.price as number) : 0;
    summary["price"] = price;

    // phone: prefix +84 when sending if user provided number
    const phoneToSend = phone ? `+84${phone}` : "";

    import("../services/shippingService").then(({ addShipping }) => {
      addShipping({
        address: summary.address,
        name: personalName,
        email: personalEmail,
        alternativeName: addrFirstName + " " + addrLastName,
        phone: phoneToSend,
        method,
        price,
      })
        .then(() => {
          if (onProceed) onProceed(summary);
        })
        .catch(() => {
          if (onProceed) onProceed(summary);
        });
    });
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <button
        onClick={onBack}
        className="absolute left-4 top-4 mt-1 mr-0 p-2 text-gray-600 hover:text-gray-800"
      >
        <Home className="w-6 h-6" />
      </button>
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-center mb-6 relative">
          <img
            src="assets/logo.png"
            alt="Nouri"
            className="w-32 cursor-pointer"
            onClick={() => (location.href = "/")}
          />
        </header>

        <div className="mb-6 border-b pb-6">
          <div className="flex sm:flex-row flex-col justify-between">
            <div className="text-lg font-bold">
              1. Giỏ hàng của bạn{" "}
              <span className="text-gray-400">(1 sản phẩm)</span>
            </div>
            <div className="sm:text-base text-lg font-semibold">
              {formatVND(totalWithShipping)}
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-lg font-bold mb-4">2. Vận chuyển</h2>

          <div className="mb-6">
            <h3 className="text-sm font-bold text-teal-600 mb-3">
              CÁ NHÂN HÓA GÓI DÙNG HÀNG NGÀY
            </h3>
            <input
              value={personalName}
              readOnly
              className="w-full p-3 rounded-full bg-[#fbf7f5] border-none mb-2 text-gray-700"
            />
            <input
              value={personalEmail}
              readOnly
              className="w-full p-3 rounded-full bg-[#fbf7f5] border-none mb-2 text-gray-700"
            />
          </div>

          {/* Địa chỉ giao hàng (trống, placeholder) */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-teal-600 mb-3">
              ĐỊA CHỈ GIAO HÀNG
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                value={addrFirstName}
                onChange={(e) => setAddrFirstName(e.target.value)}
                placeholder="Tên"
                className="p-3 rounded-full bg-[#fbf7f5]"
              />
              <input
                value={addrLastName}
                onChange={(e) => setAddrLastName(e.target.value)}
                placeholder="Họ"
                className="p-3 rounded-full bg-[#fbf7f5]"
              />
            </div>
            <input
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              placeholder="Địa chỉ (Số nhà, đường...)"
              className="w-full p-3 rounded-full bg-[#fbf7f5] mb-3"
            />
            <input
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              placeholder="Thông tin bổ sung (Tầng, căn hộ...)"
              className="w-full p-3 rounded-full bg-[#fbf7f5] mb-3"
            />

            <div className="grid grid-cols-3 gap-3 mb-3">
              <input
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                placeholder="Mã bưu chính"
                className="p-3 rounded-full bg-[#fbf7f5] col-span-1"
              />
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Thành phố/Tỉnh"
                className="p-3 rounded-full bg-[#fbf7f5] col-span-2"
              />
            </div>

            <input
              value={"Việt Nam"}
              readOnly
              className="w-full p-3 rounded-full bg-[#fbf7f5] mb-3"
            />

            <div className="flex gap-3 items-center">
              <div className="text-sm min-w-[48px] text-right">+84</div>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="901234567"
                className="flex-1 p-3 rounded-full bg-[#fbf7f5]"
              />
            </div>
          </div>

          {/* Phương thức vận chuyển */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-teal-600 mb-3">
              PHƯƠNG THỨC VẬN CHUYỂN
            </h3>
            <div className="space-y-3">
              {SHIPPING_METHODS.map((m) => {
                // Chuyển đổi giá từ Euro sang VNĐ
                const priceVND = m.price === "Free" ? 0 : (m.price as number);
                const priceDisplay =
                  m.price === "Free" ? "Miễn phí" : formatVND(priceVND);

                return (
                  <label
                    key={m.id}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition ${
                      method === m.id
                        ? "border-teal-500 ring-1 ring-teal-500 bg-teal-50"
                        : "border-gray-200 hover:border-teal-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 font-semibold">
                        {m.title}
                      </div>
                      {m.subtitle && (
                        <div className="text-xs text-gray-500">
                          {m.subtitle}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-700 font-bold">
                        {priceDisplay}
                      </div>
                      <input
                        type="radio"
                        name="shipping"
                        checked={method === m.id}
                        onChange={() => setMethod(m.id)}
                        className="h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                      />
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Nút thanh toán */}
          <div className="mt-6">
            <button
              onClick={handleProceed}
              className="w-full py-4 text-white font-bold rounded-full shadow-lg transition-colors duration-200 hover:bg-teal-600"
              style={{ backgroundColor: "#449286" }}
            >
              Tiến hành thanh toán bảo mật
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Shipping;
