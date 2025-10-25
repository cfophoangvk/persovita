import React, { useEffect, useState } from "react";
import type { ShippingMethod } from "../interfaces/shipping";
import { Home } from "lucide-react";

// Hàm định dạng VNĐ
const formatVND = (v: number) => v.toLocaleString("vi-VN") + " VNĐ";

// Phương thức vận chuyển (Giữ giá gốc Euro để chuyển đổi)
const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "pickup",
    title: "Nhận hàng tại điểm thu hộ",
    subtitle: "Nhấn để chọn điểm nhận hàng",
    price: "Free",
  },
  {
    id: "home_priv",
    title: "Giao hàng tận nhà",
    subtitle: "Giao hàng trong 48 giờ",
    price: 10000,
  },
  {
    id: "home_colis",
    title: "Giao hàng tận nhà",
    subtitle: "Giao hàng trong 24 giờ",
    price: 20000, // 2.0 €
  },
];

const Shipping: React.FC<{
  productCount?: number;
  totalVND?: number;
  onBack?: () => void;
  onProceed?: (summary: {
    address?: string;
    city?: string;
    country?: string;
  }) => void;
}> = ({ productCount = 0, totalVND = 0, onBack, onProceed }) => {
  // Thông tin mặc định đã chuyển sang Hà Nội
  const [email, setEmail] = useState("vanan123@email.com");
  const [firstName, setFirstName] = useState("Nguyễn");
  const [lastName, setLastName] = useState("Văn An");
  const [address1, setAddress1] = useState("64, Ngõ Chùa Liên Phái");
  const [address2, setAddress2] = useState("Tầng 2, căn hộ 201");
  const [zipcode, setZipcode] = useState("10000"); // Mã bưu chính Hà Nội
  const [city, setCity] = useState("Hà Nội");
  const [country, setCountry] = useState("Việt Nam");
  const [phone, setPhone] = useState("+84 901234567");
  const [method, setMethod] = useState<string>("pickup");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const handleProceed = () => {
    if (!email || !firstName || !lastName || !address1 || !zipcode || !city) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc.");
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
    const price = sel && sel.price !== "Free" ? (sel.price as number) : 0;
    // attach price in VND
    summary["price"] = price;

    // Gọi API (giữ nguyên logic gốc)
    import("../services/shippingService").then(({ addShipping }) => {
      addShipping({
        address: summary.address,
        email,
        phone,
        method,
        price,
      })
        .then(() => {
          if (onProceed) onProceed(summary);
        })
        .catch(() => {
          // Xử lý lỗi hoặc tiếp tục
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
          <img src="assets/logo.png" alt="Nouri" className="w-32 cursor-pointer" onClick={() => location.href = '/'} />
        </header>

        <div className="mb-6 border-b pb-6">
          <div className="flex sm:flex-row flex-col justify-between">
            <div className="text-lg font-bold">
              1. Giỏ hàng của bạn <span className="text-gray-400">({productCount} sản phẩm)</span>
            </div>
            <div className="sm:text-base text-lg font-semibold">{formatVND(totalVND)}</div>
          </div>
        </div>

        <section>
          <h2 className="text-lg font-bold mb-4">2. Vận chuyển</h2>

          <div className="mb-6">
            <h3 className="text-sm font-bold text-teal-600 mb-3">
              THÔNG TIN LIÊN HỆ
            </h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 rounded-full bg-[#fbf7f5] border-none mb-2"
              required
            />
          </div>

          {/* Địa chỉ giao hàng */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-teal-600 mb-3">
              ĐỊA CHỈ GIAO HÀNG
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Tên"
                className="p-3 rounded-full bg-[#fbf7f5]"
                required
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Họ"
                className="p-3 rounded-full bg-[#fbf7f5]"
                required
              />
            </div>
            <input
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              placeholder="Địa chỉ (Số nhà, đường...)"
              className="w-full p-3 rounded-full bg-[#fbf7f5] mb-3"
              required
            />
            <input
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              placeholder="Địa chỉ Dòng 2 (Tên tòa nhà, căn hộ...)"
              className="w-full p-3 rounded-full bg-[#fbf7f5] mb-3"
            />

            <div className="grid grid-cols-3 gap-3 mb-3">
              <input
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                placeholder="Mã bưu chính"
                className="p-3 rounded-full bg-[#fbf7f5] col-span-1"
                required
              />
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Thành phố/Tỉnh"
                className="p-3 rounded-full bg-[#fbf7f5] col-span-2"
                required
              />
            </div>

            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-3 rounded-full bg-[#fbf7f5] mb-3 appearance-none"
            >
              <option>Việt Nam</option>
              <option>Pháp</option>
              <option>Đức</option>
              <option>Vương quốc Anh</option>
            </select>

            <div className="flex gap-3 items-center">
              <div className="text-sm min-w-[100px]">Số điện thoại di động</div>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+84 901234567"
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
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition ${method === m.id
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
