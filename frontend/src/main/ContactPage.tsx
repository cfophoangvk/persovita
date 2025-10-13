import React from "react";
import FadeInSection from "../layouts/FadeInSection";

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <FadeInSection>
        <h1 className="text-3xl font-extrabold text-emerald-600 mb-6">
          Liên hệ
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  <strong>Địa chỉ:</strong> 123 Đường Sức Khỏe, Quận Thảo Điền,
                  Hà Nội
                </li>
                <li>
                  <strong>Điện thoại:</strong>{" "}
                  <a href="tel:+84123456789" className="text-emerald-600">
                    +84 123 456 789
                  </a>
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:info@nouri.example"
                    className="text-emerald-600"
                  >
                    info@nouri.example
                  </a>
                </li>
                <li>
                  <strong>Giờ mở cửa:</strong> Thứ 2 - Thứ 7: 08:00 - 18:00
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50 p-4 rounded text-sm text-gray-700">
              <p className="font-medium">Lưu ý về tư vấn y tế</p>
              <p>
                Thông tin trên trang chỉ nhằm mục đích tham khảo. Đối với tư vấn
                y tế cụ thể (thuốc kê đơn, tương tác thuốc, thai kỳ,...), vui
                lòng gặp trực tiếp dược sĩ hoặc bác sĩ có chứng chỉ.
              </p>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-semibold text-lg mb-4">
                Gửi tin nhắn cho chúng tôi
              </h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-200 rounded px-3 py-2"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full border border-gray-200 rounded px-3 py-2"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Số điện thoại (tuỳ chọn)
                  </label>
                  <input
                    type="tel"
                    className="mt-1 block w-full border border-gray-200 rounded px-3 py-2"
                    placeholder="+84 9xx xxx xxx"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Nội dung
                  </label>
                  <textarea
                    className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 h-28"
                    placeholder="Mô tả yêu cầu của bạn"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button className="px-5 py-3 bg-emerald-600 text-white rounded-full font-semibold">
                    Gửi liên hệ
                  </button>
                  <div className="text-xs text-gray-500">
                    Chúng tôi sẽ phản hồi trong vòng 24 giờ
                  </div>
                </div>
              </form>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p className="font-semibold">Kênh hỗ trợ khác</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="https://m.me/yourpage"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600"
                  >
                    Messenger
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/84123456789"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-emerald-600">
                    Câu hỏi thường gặp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default ContactPage;
