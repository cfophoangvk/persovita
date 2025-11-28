import React, { useEffect, useState } from "react";
import FadeInSection from "./components/FadeInSection";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form gửi:", form);
    toast.success("Đã gửi thông tin liên hệ!");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-6 py-16">
      <FadeInSection>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-extrabold text-teal-600 mb-6">Liên Hệ Với Chúng Tôi</h1>
          <p>Bạn có câu hỏi? Xem ngay mục</p>
          <Link
            to="/"
            onClick={() => {
              setTimeout(() => location.hash = "faq", 100);
            }}
            className="md:px-8 px-4 py-2 my-2 bg-teal-500 text-white md:text-lg text-md rounded-full font-semibold transition duration-300 hover:bg-teal-600 shadow-xl transform hover:scale-105 cursor-pointer"
          >
            Câu hỏi thường gặp
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT CONTENT */}
          <div className="space-y-4">
            <p className="text-gray-700">
              Nếu bạn cần hỗ trợ, tư vấn dược phẩm, hay có câu hỏi về đơn hàng,
              vui lòng liên hệ với chúng tôi bằng một trong các cách dưới đây.
              Đội ngũ dược sĩ và chăm sóc khách hàng của chúng tôi luôn sẵn sàng
              hỗ trợ bạn.
            </p>

            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-semibold text-lg mb-3">Thông tin cửa hàng</h3>
              <ul className="text-gray-800 space-y-2 text-sm">
                <li>
                  <strong>Tên:</strong> Nhà Thuốc NOURI
                </li>
                <li>
                  <strong>Địa chỉ:</strong> 197 Trần Phú, Hà Đông, Hanoi,
                  Vietnam
                </li>
                <li>
                  <strong>Điện thoại:</strong>{" "}
                  <a href="tel:+84123456789" className="text-teal-600">
                    039 491 4881
                  </a>
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:info@nouri.example" className="text-teal-600">
                    nourivitamin@gmail.com
                  </a>
                </li>
                <li>
                  <strong>Giờ mở cửa:</strong> Thứ 2 - Thứ 7: 08:00 - 18:00
                </li>
              </ul>
            </div>

            <div className="bg-teal-50 p-4 rounded text-sm text-gray-700">
              <p className="font-medium">Lưu ý về tư vấn y tế</p>
              <p>
                Thông tin trên trang chỉ nhằm mục đích tham khảo. Đối với tư vấn
                y tế cụ thể (thuốc kê đơn, tương tác thuốc, thai kỳ,...), vui
                lòng gặp trực tiếp dược sĩ hoặc bác sĩ có chứng chỉ.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: CONTACT FORM */}
          <div>
            <h3 className="font-semibold text-lg mb-3">
              Gửi tin nhắn cho chúng tôi
            </h3>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 bg-white p-6 rounded-lg shadow"
            >
              <div>
                <label className="text-sm font-medium">Tên của bạn</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Nhập tên..."
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Email của bạn..."
                />
              </div>

              <div>
                <label className="text-sm font-medium">Nội dung</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Bạn muốn nhắn gì?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition"
              >
                Gửi liên hệ
              </button>
            </form>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default ContactPage;
