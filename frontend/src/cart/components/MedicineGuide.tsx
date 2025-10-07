import React from "react";

const MedicineGuide: React.FC = () => (
  // Giữ nguyên gradient nền và bố cục
  <div className="max-w-7xl mx-auto px-6 py-12 bg-gradient-to-r from-white to-white/90 rounded-lg shadow-xl">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* --- Cột Nội dung Chính --- */}
      <div>
        <h2 className="text-3xl font-extrabold text-orange-700">
          Cẩm Nang Hướng Dẫn Sử Dụng Thuốc An Toàn
        </h2>
        <p className="text-gray-600 mt-4 text-lg">
          Lời khuyên thiết yếu về liều lượng, thời điểm và cách bảo quản thuốc.
          Đảm bảo **hiệu quả điều trị tối ưu** và **giảm thiểu rủi ro**.
        </p>
        <div className="mt-8">
          <a
            href="/consultation" // Giữ nguyên link
            className="inline-block px-7 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-semibold transition duration-300 shadow-md"
          >
            Tìm hiểu thêm về sức khỏe
          </a>
        </div>
      </div>

      {/* --- Cột Mẹo Nhanh --- */}
      <div className="bg-blue-50 rounded-xl p-8 shadow-inner">
        <h3 className="text-xl font-bold text-orange-800 mb-4">
          3 Quy Tắc Vàng Khi Dùng Thuốc
        </h3>
        <ul className="space-y-4 text-gray-700">
          <li className="flex items-start">
            <span className="text-orange-600 font-extrabold mr-3 text-lg">
              •
            </span>
            <p>
              **Đúng Liều Lượng:** Luôn tuân thủ liều lượng và tần suất đã được
              bác sĩ hoặc dược sĩ kê đơn.
            </p>
          </li>
          <li className="flex items-start">
            <span className="text-orange-600 font-extrabold mr-3 text-lg">
              •
            </span>
            <p>
              **Đúng Thời Điểm:** Uống thuốc đúng thời điểm (trước/sau bữa ăn)
              theo hướng dẫn để đạt hiệu quả tốt nhất.
            </p>
          </li>
          <li className="flex items-start">
            <span className="text-orange-600 font-extrabold mr-3 text-lg">
              •
            </span>
            <p>
              **Kiểm Tra Hạn Sử Dụng:** Không sử dụng thuốc đã hết hạn hoặc có
              dấu hiệu hư hỏng.
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default MedicineGuide;
