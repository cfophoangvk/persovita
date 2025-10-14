import React from "react";

const AppFooter: React.FC = () => {
  return (
    <footer className="bg-[#f7f5f0] text-[#1f2937] mt-12">
      <div className="max-w-full mx-auto px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Trái: Giới thiệu (cột rộng) */}
          <div className="md:col-span-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 border rounded-sm flex items-center justify-center text-lg font-bold">
                P
              </div>
              <div>
                <div className="font-semibold mb-4">VỀ NOURI</div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>
                    <a href="/about" className="hover:underline">
                      Giới thiệu
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Sứ mệnh của chúng tôi
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Nghiên cứu & Phát triển
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Khoa học & Công nghệ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Các cam kết của chúng tôi
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Sức khỏe Toàn diện (Integrative Health)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Tại sao cần bổ sung
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Vận động viên của chúng tôi
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cột giữa: Sản phẩm + Hỗ trợ */}
          <div className="md:col-span-2">
            <div className="font-semibold mb-4">SẢN PHẨM CỦA CHÚNG TÔI</div>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Trải nghiệm
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Các sản phẩm
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Ứng dụng Nouri (Nouri App)
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="font-semibold mb-4">CẦN HỖ TRỢ</div>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Dịch vụ khách hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Truyền thông và Đối tác
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Dành cho Chuyên gia
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Chương trình Đại sứ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Trung tâm Tuyển dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Phải: Điều khoản + Thanh toán */}
          <div className="md:col-span-3">
            <div className="font-semibold mb-4">ĐIỀU KHOẢN</div>
            <ul className="text-sm text-gray-700 space-y-2 mb-4">
              <li>
                <a href="#" className="hover:underline">
                  Điều khoản và Điều kiện
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Quyền riêng tư Dữ liệu
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Tùy chọn Cookie
                </a>
              </li>
            </ul>

            <div className="font-semibold text-sm mb-3">THANH TOÁN AN TOÀN</div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-white flex items-center justify-center text-xs rounded shadow">
                VISA
              </div>
              <div className="w-10 h-6 bg-white flex items-center justify-center text-xs rounded shadow">
                MC
              </div>
              <div className="w-10 h-6 bg-white flex items-center justify-center text-xs rounded shadow">
                AMEX
              </div>
              <div className="w-14 h-6 bg-white flex items-center justify-center text-xs rounded shadow">
                PayPal
              </div>
            </div>
          </div>
        </div>

        {/* Khung cảnh báo (Disclaimer) */}
        <div className="mt-8 flex justify-center">
          <div className="w-full md:w-3/4 border rounded p-4 text-center text-sm text-gray-600 bg-white">
            Các sản phẩm của chúng tôi không nhằm mục đích chẩn đoán, điều trị,
            chữa khỏi hoặc ngăn ngừa bất kỳ bệnh nào. Nếu bạn đang không khỏe,
            mang thai, hoặc cho con bú, vui lòng tham khảo ý kiến bác sĩ hoặc
            nhà cung cấp dịch vụ chăm sóc sức khỏe trước khi sử dụng bất kỳ thực
            phẩm bổ sung nào.
          </div>
        </div>

        {/* Thông tin bản quyền và in nhỏ */}
        <div className="mt-6 text-xs text-gray-500 text-center w-full gap-4">
          © {new Date().getFullYear()} NOURI. Mọi quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
