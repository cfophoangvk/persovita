import React from "react";
import { Link } from "react-router-dom";
import FadeInSection from "../layouts/FadeInSection";
import {
  Lightbulb,
  Users,
  CheckCircle,
  Handshake,
  TrendingUp,
} from "lucide-react"; // Import các icon từ lucide-react

const AboutPage: React.FC = () => {
  // Dữ liệu Giá trị Cốt lõi của Nouri (Đã được sắp xếp lại và cập nhật theo yêu cầu)
  const coreValues = [
    {
      // N - Nurture
      icon: Handshake,
      title: "Nurture (Nuôi dưỡng)",
      description:
        "Nouri tin rằng sức khỏe cần được nuôi dưỡng mỗi ngày, thông qua những thói quen nhỏ nhưng duy trì đều đặn. Giúp khách hàng hình thành lối sống chủ động, khoa học và bền vững.",
      color: "text-yellow-500", // Giữ màu vàng cho Nurture
    },
    {
      // O - Optimized
      icon: TrendingUp,
      title: "Optimized (Tối ưu)",
      description:
        "Ứng dụng công nghệ phân tích dữ liệu để tối ưu hóa toàn bộ quy trình: từ khảo sát, đề xuất liệu trình đến đóng gói và giao hàng.",
      color: "text-red-500", // Giữ màu đỏ cho Optimized
    },
    {
      // U - User-centric
      icon: Users,
      title: "User-centric (Khách hàng là trung tâm)",
      description:
        "Mọi quyết định đều bắt đầu từ góc nhìn của khách hàng, mang lại trải nghiệm đơn giản, rõ ràng và thuận tiện nhất (như daily packs, giao hàng định kỳ...).",
      color: "text-teal-500", // Giữ màu xanh lá cho User-centric
    },
    {
      // R - Reliable
      icon: CheckCircle,
      title: "Reliable (Đáng tin cậy)",
      description:
        "Cam kết sản phẩm có nguồn gốc rõ ràng, kiểm định chất lượng nghiêm ngặt và tuân thủ đầy đủ tiêu chuẩn pháp lý. Thể hiện sự nhất quán và trách nhiệm cao.",
      color: "text-blue-500", // Giữ màu xanh dương cho Reliable
    },
    {
      // I - Innovative
      icon: Lightbulb,
      title: "Innovative (Đổi mới)",
      description:
        "Đổi mới là yếu tố cốt lõi: ứng dụng công nghệ vào cá nhân hóa liệu trình, cách đóng gói và phương thức vận hành, mang lại giá trị thực tế hằng ngày.",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 mt-10">
      <FadeInSection>
        <div className="text-center mb-16">
          <h1 className="md:text-5xl text-2xl font-extrabold text-teal-700 mb-4">
            CÂU CHUYỆN VỀ NOURI
          </h1>
          <p className="md:text-xl text-base text-gray-600 max-w-3xl mx-auto">
            Tiên phong trong giải pháp <strong>Dinh dưỡng Cá nhân hóa</strong>{" "}
            tại Việt Nam.
          </p>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="grid grid-cols-1 gap-8 items-start bg-teal-50 p-8 rounded-2xl shadow-lg mb-16">
          <div className="col-span-1">
            <h2 className="md:text-3xl text-xl font-bold text-teal-600 mb-4 border-b-2 border-teal-300 pb-2">
              Bắt nguồn từ thực tế "khó duy trì thói quen sức khỏe"
            </h2>
            <p className="md:text-base text-sm text-gray-700 mb-4 leading-relaxed">
              Câu chuyện của Nouri bắt đầu từ một thực tế quen thuộc trong cuộc
              sống hiện đại: khi nhịp sống đô thị ngày càng gấp gáp, việc chăm
              sóc sức khỏe cá nhân lại dễ bị xem nhẹ. Đặc biệt, với nhóm người
              trong độ tuổi lao động, việc xây dựng một thói quen dinh dưỡng
              lành mạnh trở nên <strong>khó duy trì</strong>.
            </p>
            <p className="md:text-base text-sm text-gray-700 mb-6 leading-relaxed">
              Phần lớn người tiêu dùng hiện nay lựa chọn thực phẩm bổ sung theo
              cảm tính, nghe theo lời khuyên nhanh của dược sĩ, bạn bè hoặc
              quảng cáo trên mạng mà chưa hiểu rõ nhu cầu thực tế của bản thân.
              Việc sử dụng <strong>thiếu nhất quán</strong> dẫn đến nhiều hệ quả
              như dùng sản phẩm không phù hợp, quên liều, hoặc bỏ dở sau một
              thời gian ngắn.
            </p>
            <h2 className="md:text-3xl text-xl font-bold text-teal-600 mb-4 border-b-2 border-teal-400 pb-2">
              Giải pháp: Cá nhân hóa, chính xác và bền vững
            </h2>
            <p className="md:text-base text-sm text-gray-700 leading-relaxed">
              Từ thực tế này, Nouri ra đời với mong muốn mang đến một cách tiếp
              cận mới cho việc chăm sóc sức khỏe{" "}
              <strong>đơn giản, chính xác và cá nhân hóa</strong>. Thay vì để
              người dùng tự tìm hiểu giữa vô số lựa chọn, Nouri giúp họ hiểu rõ
              nhu cầu cơ thể mình thông qua khảo sát sức khỏe, nhận được liệu
              trình vitamin phù hợp và được đồng hành trong suốt quá trình sử
              dụng.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Câu chuyện của Nouri không chỉ dừng lại ở việc cung cấp vitamin,
              mà còn hướng đến mục tiêu{" "}
              <strong>
                hình thành thói quen chăm sóc sức khỏe khoa học, bền vững và dễ
                duy trì
              </strong>{" "}
              cho người tiêu dùng hiện đại.
            </p>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center mb-16">
          <div className="p-8 bg-white rounded-xl shadow-xl border-t-4 border-teal-500 hover:shadow-2xl transition duration-300">
            <h3 className="md:text-2xl text-xl font-bold text-teal-700 mb-3 uppercase">
              Tầm Nhìn
            </h3>
            <p className="md:text-lg text-base text-gray-600">
              Đến năm <strong className="text-teal-700">2030</strong>, trở thành công ty dẫn đầu về vitamin cá nhân hóa tại Việt Nam, mở rộng ra khu vực Đông Nam Á, mang đến trải nghiệm chăm sóc sức khỏe <strong className="text-teal-700">khoa học, tiện lợi và bền vững </strong>cho hàng triệu người.
            </p>
          </div>

          {/* Sứ mệnh */}
          <div className="p-8 bg-white rounded-xl shadow-xl border-t-4 border-teal-500 hover:shadow-2xl transition duration-300">
            <h3 className="md:text-2xl text-xl font-bold text-teal-700 mb-3 uppercase">
              Sứ Mệnh
            </h3>
            <p className="md:text-lg text-base text-gray-600">
              Cung cấp các giải pháp vitamin <strong className="text-teal-700"> cá nhân hóa, tiện lợi, an toàn và bền vững
              </strong>, giúp người tiêu dùng duy trì sức khỏe lâu dài và cải thiện chất
              lượng cuộc sống.
            </p>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="bg-teal-600 text-white md:p-12 p-5 rounded-2xl shadow-2xl">
          <h2 className="md:text-4xl text-xl font-extrabold text-center mb-10 border-b-4 border-white pb-6">
            <span className="bg-white text-teal-600 px-4 py-1 rounded-full mr-2">
              N.O.U.R.I
            </span>- GIÁ TRỊ CỐT LÕI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center md:p-6 p-3 bg-white rounded-xl shadow-lg transform transition duration-300 hover:scale-[1.03]"
              >
                <div
                  className={`p-3 rounded-full bg-teal-100 mb-4 ${value.color}`}
                >
                  <value.icon size={30} className="stroke-2" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-teal-700 uppercase">
                  {value.title.split(" ")[0]}
                </h4>
                <p className="text-base font-semibold text-gray-600 mb-3">
                  {value.title.substring(
                    value.title.indexOf("(") + 1,
                    value.title.indexOf(")")
                  )}
                </p>
                <p className="text-gray-700 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Call to Action */}
      <FadeInSection>
        <div className="mt-16 text-center">
          <p className="md:text-2xl text-lg font-semibold text-gray-700 mb-6">
            Bắt đầu hành trình chăm sóc sức khỏe <strong className="text-teal-700">Tối Ưu và Tiện Lợi</strong> của bạn ngay hôm nay.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/test/page1"
              className="md:px-8 md:py-4 px-4 py-2 bg-teal-500 text-white md:text-lg text-md rounded-full font-semibold transition duration-300 hover:bg-teal-600 shadow-xl transform hover:scale-105"
            >
              Làm bài kiểm tra ngay 🚀
            </Link>
            <Link
              to="/contact"
              className="md:px-8 md:py-4 px-4 py-2 border-2 border-teal-600 text-teal-700 md:text-lg text-md rounded-full font-semibold transition duration-300 hover:bg-teal-50 transform hover:scale-105"
            >
              Liên Hệ
            </Link>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default AboutPage;
