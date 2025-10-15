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
  // Dữ liệu Giá trị Cốt lõi của Nouri
  const coreValues = [
    {
      icon: Users,
      title: "User-centric (Khách hàng là trung tâm)",
      description:
        "Mọi quyết định đều bắt đầu từ góc nhìn của khách hàng, mang lại trải nghiệm đơn giản, rõ ràng và thuận tiện nhất.",
      color: "text-emerald-500",
    },
    {
      icon: CheckCircle,
      title: "Reliable (Đáng tin cậy)",
      description:
        "Cam kết sản phẩm có nguồn gốc rõ ràng, kiểm định chất lượng nghiêm ngặt và tuân thủ đầy đủ tiêu chuẩn pháp lý.",
      color: "text-blue-500",
    },
    {
      icon: Handshake,
      title: "Nurture (Nuôi dưỡng)",
      description:
        "Giúp khách hàng hình thành lối sống chủ động, khoa học và bền vững thông qua những thói quen nhỏ duy trì đều đặn.",
      color: "text-yellow-500",
    },
    {
      icon: TrendingUp,
      title: "Optimized (Tối ưu)",
      description:
        "Ứng dụng công nghệ phân tích dữ liệu để tối ưu hóa toàn bộ quy trình: từ khảo sát, đề xuất liệu trình đến đóng gói và giao hàng.",
      color: "text-red-500",
    },
    {
      icon: Lightbulb,
      title: "Innovative (Đổi mới)",
      description:
        "Ứng dụng công nghệ vào cá nhân hóa liệu trình, cách đóng gói và phương thức vận hành, mang lại giá trị thực tế hằng ngày.",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 mt-10">
      <FadeInSection>
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-emerald-700 mb-4">
            CÂU CHUYỆN VỀ NOURI
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tiên phong trong giải pháp <strong>Dinh dưỡng Cá nhân hóa</strong>{" "}
            tại Việt Nam.
          </p>
        </div>
      </FadeInSection>

      {/* Phần 1: Câu chuyện khởi nguồn & Cơ hội thị trường */}
      <FadeInSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-emerald-50 p-8 rounded-2xl shadow-lg mb-16">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold text-emerald-600 mb-4 border-b-2 border-emerald-300 pb-2">
              Bắt Nguồn Từ "Hội Chứng 10 Lọ Vitamin"
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Ý tưởng về Nouri bắt đầu từ một trải nghiệm rất thực tế của nhà
              sáng lập: <strong>sự bất tiện</strong> trong việc phải sử dụng
              cùng lúc nhiều loại vitamin và khoáng chất khác nhau. Quá trình bổ
              sung ban đầu mang lại cảm giác yên tâm, nhưng nhanh chóng trở nên
              rắc rối, dẫn đến việc {""}
              <strong>
                quên uống, uống sai liều và cuối cùng là gián đoạn
              </strong>
              {""} thói quen chăm sóc sức khỏe.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Nhà sáng lập nhận ra rằng vấn đề không nằm ở chất lượng sản phẩm,
              mà chính là {""}
              <strong>sự phức tạp trong trải nghiệm sử dụng</strong>. Đây là rào
              cản lớn nhất khiến người tiêu dùng thất bại trong việc duy trì sức
              khỏe lâu dài.
            </p>
          </div>

          <div className="lg:col-span-1 border-l-4 border-emerald-400 pl-6">
            <h2 className="text-3xl font-bold text-emerald-600 mb-4 border-b-2 border-emerald-300 pb-2">
              Cơ Hội Vàng: Cá Nhân Hóa Dinh Dưỡng
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Nhận thấy xu hướng dinh dưỡng cá nhân hóa đang phát triển mạnh mẽ
              trên toàn cầu, Nouri đã nhìn thấy một cơ hội tại thị trường Việt
              Nam. Tầng lớp lao động trí óc bận rộn ngày càng quan tâm đến sức
              khỏe nhưng <strong>thiếu giải pháp tối ưu</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Nouri tiên phong mang mô hình này về Việt Nam, kết hợp giữa {""}
              <strong>
                cơ sở khoa học dinh dưỡng và tính tiện lợi vượt trội
              </strong>
              , giúp người dùng vừa được chăm sóc khoa học, vừa duy trì thói
              quen lâu dài.
            </p>
          </div>
        </div>
      </FadeInSection>

      {/* Phần 2: Tầm nhìn & Sứ mệnh */}
      <FadeInSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center mb-16">
          {/* Tầm nhìn */}
          <div className="p-8 bg-white rounded-xl shadow-xl border-t-4 border-emerald-500 hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-bold text-emerald-700 mb-3 uppercase">
              Tầm Nhìn (Vision)
            </h3>
            <p className="text-lg text-gray-600">
              Đến năm <strong className="text-emerald-700">2030</strong>, trở
              thành công ty dẫn đầu về vitamin cá nhân hóa tại Việt Nam, mở rộng
              ra khu vực Đông Nam Á, mang đến trải nghiệm chăm sóc sức khỏe{" "}
              <strong className="text-emerald-700">
                khoa học, tiện lợi và bền vững
              </strong>{" "}
              cho hàng triệu người.
            </p>
          </div>

          {/* Sứ mệnh */}
          <div className="p-8 bg-white rounded-xl shadow-xl border-t-4 border-emerald-500 hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-bold text-emerald-700 mb-3 uppercase">
              Sứ Mệnh (Mission)
            </h3>
            <p className="text-lg text-gray-600">
              Cung cấp các giải pháp vitamin{" "}
              <strong className="text-emerald-700">
                cá nhân hóa, tiện lợi, an toàn và bền vững
              </strong>
              , giúp người tiêu dùng duy trì sức khỏe lâu dài và cải thiện chất
              lượng cuộc sống.
            </p>
          </div>
        </div>
      </FadeInSection>

      {/* Phần 3: Giá trị Cốt lõi */}
      <FadeInSection>
        <div className="bg-emerald-600 text-white p-12 rounded-2xl shadow-2xl">
          <h2 className="text-4xl font-extrabold text-center mb-10 border-b-4 border-white pb-3">
            <span className="bg-white text-emerald-600 px-4 py-1 rounded-full mr-2">
              N.O.U.R.I
            </span>{" "}
            - GIÁ TRỊ CỐT LÕI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg transform transition duration-300 hover:scale-[1.03]"
              >
                <div
                  className={`p-3 rounded-full bg-emerald-100 mb-4 ${value.color}`}
                >
                  <value.icon size={30} className="stroke-2" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-emerald-700 uppercase">
                  {value.title.split(" ")[0]}
                </h4>
                <p className="text-xs font-semibold text-gray-600 mb-3">
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
          <p className="text-2xl font-semibold text-gray-700 mb-6">
            Bắt đầu hành trình chăm sóc sức khỏe{" "}
            <strong className="text-emerald-700">Tối Ưu và Tiện Lợi</strong> của
            bạn ngay hôm nay.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/shop"
              className="px-8 py-4 bg-emerald-500 text-white text-lg rounded-full font-semibold transition duration-300 hover:bg-emerald-600 shadow-xl transform hover:scale-105"
            >
              Mua Sắm Ngay 🚀
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-emerald-600 text-emerald-700 text-lg rounded-full font-semibold transition duration-300 hover:bg-emerald-50 transform hover:scale-105"
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
