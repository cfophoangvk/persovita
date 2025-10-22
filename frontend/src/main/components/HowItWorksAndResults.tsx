import React from "react";

// Placeholder component cho hình ảnh (đã chuyển sang tiếng Việt trong alt)
const ImagePlaceholder: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => (
  <div className="mb-4 aspect-video overflow-hidden rounded-md bg-gray-100">
    {/* Trong ứng dụng thực tế, bạn sẽ thay thế bằng thẻ <img src={src} alt={alt} /> */}
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
      // Giả lập hình ảnh từ ảnh mẫu
      style={{
        filter: "grayscale(10%) brightness(0.95)",
        minHeight: "150px",
      }}
    />
  </div>
);

const HowItWorksAndResults: React.FC = () => {
  return (
    // Thêm nền xám nhạt cho toàn bộ section
    <section className="mx-auto max-w-7xl bg-gray-50 px-4 py-10 md:py-20 lg:px-8">
      {/* ------------------------------------- */}
      {/* PHẦN I: CÁCH THỨC HOẠT ĐỘNG (HOW IT WORKS) */}
      {/* ------------------------------------- */}
      {/* Khối nội dung chính màu trắng */}
      <div className="rounded-xl bg-white pt-10 pb-16 shadow-2xl shadow-gray-200/50">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-wide text-gray-700">
            Cách thức hoạt động
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-3 sm:gap-8 md:px-10 lg:px-20">
          {/* Bước 1 */}
          <div className="rounded-xl bg-white p-4 shadow-xl shadow-gray-100/50 transition duration-300 hover:shadow-2xl hover:shadow-gray-200/50">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              1/ Làm bài kiểm tra trực tuyến
            </h4>
            <ImagePlaceholder
              src="/assets/1.png"
              alt="Người dùng đang làm bài kiểm tra trực tuyến trên điện thoại"
            />
            <p className="text-base text-gray-600">
              Chỉ mất <strong>5 phút</strong> để cho chúng tôi biết về nhu cầu
              sức khỏe và mục tiêu của bạn.
            </p>
          </div>

          {/* Bước 2 */}
          <div className="rounded-xl bg-white p-4 shadow-xl shadow-gray-100/50 transition duration-300 hover:shadow-2xl hover:shadow-gray-200/50">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              2/ Nhận gợi ý cá nhân hóa
            </h4>
            <ImagePlaceholder
              src="/assets/2.png"
              alt="Hộp bổ sung cá nhân và ly nước"
            />
            <p className="text-base text-gray-600">
              Nhận đề xuất bổ sung cá nhân hóa từ{" "}
              <strong>Hội đồng Khoa học</strong> (Scientific Committee) của
              chúng tôi.
            </p>
          </div>

          {/* Bước 3 */}
          <div className="rounded-xl bg-white p-4 shadow-xl shadow-gray-100/50 transition duration-300 hover:shadow-2xl hover:shadow-gray-200/50">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              3/ Bắt đầu và theo dõi tiến trình
            </h4>
            <ImagePlaceholder
              src="/assets/3.png"
              alt="Người dùng đang uống nước"
            />
            <p className="text-base text-gray-600">
              Nhận hộp 30 gói bổ sung hàng ngày được cá nhân hóa và theo dõi{" "}
              <strong>tiến trình</strong> của bạn trong ứng dụng.
            </p>
          </div>
        </div>

        {/* Nút ở giữa */}
        <div className="mt-12 text-center">
          <a
            href="/test/page1"
            className="inline-block rounded-lg bg-teal-500 px-10 py-3 text-lg font-bold text-white shadow-xl transition duration-300 hover:bg-teal-600 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-teal-300"
          >
            Làm bài kiểm tra
          </a>
        </div>
      </div>

      {/* ------------------------------------- */}
      {/* PHẦN II: KẾT QUẢ ĐÃ ĐƯỢC CHỨNG MINH (PROVEN RESULTS) */}
      {/* ------------------------------------- */}
      <div className="mt-20 max-w-5xl mx-auto">
        <h3 className="text-5xl font-bold text-gray-700 tracking-wide mb-10">
          Kết quả đã được chứng minh
        </h3>

        <div className="divide-y divide-gray-200 rounded-xl bg-white p-8 shadow-2xl sm:p-10">
          {/* Kết quả 1 */}
          <div className="flex items-center justify-between py-6">
            <strong className="text-6xl font-extrabold text-teal-500">
              91%
            </strong>
            <div className="ml-6 text-right">
              <p className="text-sm font-bold uppercase text-gray-500">
                KHÁCH HÀNG CỦA CHÚNG TÔI
              </p>
              <p className="text-lg text-gray-700">
                Ghi nhận cải thiện ở <strong>lĩnh vực trọng tâm</strong> của họ
                sau 3 tháng.
              </p>
            </div>
          </div>

          {/* Kết quả 2 */}
          <div className="flex items-center justify-between py-6">
            <strong className="text-6xl font-extrabold text-teal-500">
              94%
            </strong>
            <div className="ml-6 text-right">
              <p className="text-sm font-bold uppercase text-gray-500">
                KHÁCH HÀNG CỦA CHÚNG TÔI
              </p>
              <p className="text-lg text-gray-700">
                Ghi nhận cải thiện chung về <strong>sức khỏe</strong> sau 3
                tháng.
              </p>
            </div>
          </div>

          {/* Kết quả 3 */}
          <div className="flex items-center justify-between py-6">
            <strong className="text-6xl font-extrabold text-teal-500">
              76
            </strong>
            <div className="ml-6 text-right">
              <p className="text-sm font-ebold uppercase text-gray-500">
                THỬ NGHIỆM LÂM SÀNG VÀ TIỀN LÂM SÀNG
              </p>
              <p className="text-lg text-gray-700">
                Thành phần đạt chuẩn khoa học, đã được{" "}
                <strong>thử nghiệm lâm sàng và chứng minh hiệu quả.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksAndResults;
