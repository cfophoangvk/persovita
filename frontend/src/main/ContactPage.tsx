import React, { useEffect } from "react";
import FadeInSection from "../layouts/FadeInSection";

const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div className="max-w-4xl mx-auto mt-10 px-6 py-16">
      <FadeInSection>
        <h1 className="text-3xl font-extrabold text-teal-600 mb-6">Liên hệ</h1>

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

          <div>
            <div className="mt-4 text-sm text-gray-600">
              <p className="font-semibold">Kênh hỗ trợ khác</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="https://www.facebook.com/nourivitamin?mibextid=wwXIfr&rdid=m52VXaWSXFqD3Yfp&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DCgNiC9HG%2F%3Fmibextid%3DwwXIfr#"
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-600"
                  >
                    Fanpage
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@nourivitamin"
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-600"
                  >
                    Tiktok
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
