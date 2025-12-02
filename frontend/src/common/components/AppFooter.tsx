import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const AppFooter: React.FC = () => {
  return (
    <footer className="bg-[#f7f5f0] text-[#1f2937] mt-12">
      <div className="w-full mx-auto px-20 pt-12 pb-6">
        <div className="grid md:grid-cols-6 sm:grid-cols-1 gap-6">
          <div className="md:text-left text-center">
            <div className="font-semibold mb-4">VỀ NOURI</div>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>
                <a href="/about" className="hover:underline">
                  Câu chuyện của chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sứ mệnh của chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Đội ngũ dược sĩ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Giới thiệu bạn bè
                </a>
              </li>
            </ul>
          </div>

          <div className="md:text-left text-center">
            <div className="font-semibold mb-4">TÀI NGUYÊN</div>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Tin tức & bài viết
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Liên hệ hỗ trợ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Chính sách đổi trả
                </a>
              </li>
            </ul>
          </div>

          <div className="md:text-left text-center">
            <div className="font-semibold mb-4">PHÁP LÝ</div>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cam kết chất lượng
                </a>
              </li>
            </ul>
          </div>

          <div className="md:text-left text-center">
            <div className="font-semibold mb-4">LIÊN HỆ VỚI CHÚNG TÔI</div>
            <div className="flex justify-center md:justify-start gap-3">
              <a href="https://www.facebook.com/nourivitamin?mibextid=wwXIfr">
                <img
                  src="/assets/fb.png"
                  className="w-10 h-10"
                  title="Facebook"
                />
              </a>
              <a href="https://www.tiktok.com/@nourivitamin">
                <img
                  src="/assets/tt.png"
                  className="w-10 h-10"
                  title="Facebook"
                />
              </a>
            </div>
          </div>

          <div className="text-center md:col-span-2">
            <div className="font-semibold mb-4">BẠN CẦN HỖ TRỢ?</div>
            <ul className="text-sm text-gray-700 space-y-2 mb-4">
              <li>
                <div className="hover:underline flex items-center gap-3">
                  <div>
                    <Phone size={16} className="stroke-orange-400" />
                  </div>{" "}
                  Hotline: 0394 914 881
                </div>
              </li>
              <li>
                <div className="hover:underline flex items-center gap-3">
                  <div>
                    <Mail size={16} className="stroke-orange-400" />
                  </div>{" "}
                  Email: nourivitamin@gmail.com
                </div>
              </li>
              <li>
                <div className="hover:underline flex items-center gap-3">
                  <div>
                    <MapPin size={16} className="stroke-orange-400" />
                  </div>{" "}
                  <div className="text-left">
                    Địa chỉ: Số 26 KCN Trường An, xã An Khánh, huyện Hoài Đức,
                    Hà Nội, Việt Nam
                  </div>
                </div>
              </li>
              <li>
                <div className="italic">
                  Thời gian hỗ trợ: 8:00 - 17:00 (Thứ 2 - Thứ 7)
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="w-full md:w-3/4 border rounded p-4 text-center text-sm text-gray-600 bg-white">
            Các sản phẩm của chúng tôi không nhằm mục đích chẩn đoán, điều trị,
            chữa khỏi hoặc ngăn ngừa bất kỳ bệnh nào. Nếu bạn đang không khỏe,
            mang thai, hoặc cho con bú, vui lòng tham khảo ý kiến bác sĩ hoặc
            nhà cung cấp dịch vụ chăm sóc sức khỏe trước khi sử dụng bất kỳ thực
            phẩm bổ sung nào.
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-500 text-center w-full gap-4">
          © {new Date().getFullYear()} NOURI. Mọi quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
