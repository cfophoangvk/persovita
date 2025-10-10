import React from "react";
import { Link } from "react-router-dom";
import FadeInSection from "../layouts/FadeInSection";

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <FadeInSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Nội dung chính */}
          <div>
            <h1 className="text-4xl font-extrabold text-[#f28d3d] mb-4">
              Về Nhà Thuốc Của Chúng Tôi
            </h1>
            <p className="text-gray-700 mb-4 text-lg">
              Chúng tôi là một nhà thuốc gia đình được cấp phép, cam kết cung
              cấp các loại thuốc và thực phẩm bổ sung{" "}
              <b>chính hãng, chất lượng cao</b>. Đội ngũ{" "}
              <b>dược sĩ chuyên nghiệp </b>của chúng tôi đảm bảo mọi sản phẩm
              đều đáp ứng các tiêu chuẩn nghiêm ngặt về chất lượng và an toàn.
            </p>
            <p className="text-gray-700 mb-4">
              Chúng tôi tìm nguồn sản phẩm từ các nhà sản xuất uy tín, thực hiện
              kiểm tra lô hàng cẩn thận và lưu trữ hàng hóa trong điều kiện tối
              ưu. Dù bạn cần thuốc kê đơn, thực phẩm bổ sung đáng tin cậy hay
              lời khuyên chuyên môn, đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ.
            </p>
            <p className="text-gray-700 mb-6">
              Vận chuyển nhanh, giá cả minh bạch và chăm sóc khách hàng tận tâm
              là những trụ cột trong dịch vụ của chúng tôi. Nếu bạn có bất kỳ lo
              lắng nào về tương tác thuốc, thai kỳ hoặc các bệnh lý có sẵn, vui
              lòng tham khảo ý kiến dược sĩ của chúng tôi hoặc nhà cung cấp dịch
              vụ chăm sóc sức khỏe trước khi dùng bất kỳ loại thuốc hay thực
              phẩm bổ sung nào.
            </p>
            <div className="flex gap-3">
              <Link
                to="/shop"
                className="px-5 py-3 bg-[#f28d3d] text-white rounded-full font-semibold transition duration-150 hover:bg-orange-600"
              >
                Xem Sản Phẩm
              </Link>
              <Link
                to="/contact"
                className="px-5 py-3 border border-gray-300 rounded-full text-gray-700 transition duration-150 hover:border-orange-500 hover:text-orange-500"
              >
                Liên Hệ Với Chúng Tôi
              </Link>
            </div>
          </div>

          {/* Cam kết */}
          <div className="bg-[#f7efe6] rounded-xl p-8 shadow-md">
            <h3 className="font-bold text-xl text-orange-700 mb-4">
              Cam Kết Của Chúng Tôi
            </h3>
            <ul className="list-disc pl-5 text-gray-800 space-y-3">
              <li>
                Chỉ hợp tác với các nhà cung cấp được cấp phép, đạt chuẩn GMP
                (Thực hành sản xuất tốt).
              </li>
              <li>
                Có sẵn dịch vụ tư vấn dược sĩ về đơn thuốc và tương tác thuốc.
              </li>
              <li>Đóng gói an toàn và giao hàng nhanh chóng.</li>
              <li>Hướng dẫn dán nhãn và bảo quản rõ ràng, chi tiết.</li>
            </ul>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default AboutPage;
