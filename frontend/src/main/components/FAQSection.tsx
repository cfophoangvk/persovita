import React, { useState } from "react";

type QA = {
  q: string;
  a: string;
};

const faqs: QA[] = [
  {
    q: "Nouri là gì?",
    a: "Nouri là thương hiệu thực phẩm bổ sung cá nhân hóa đầu tiên tại Việt Nam, giúp bạn chăm sóc sức khỏe một cách khoa học và tiện lợi. Chúng tôi sử dụng thuật toán phân tích lối sống, thói quen và mục tiêu sức khỏe của từng người để đề xuất công thức vitamin phù hợp nhất – được các chuyên gia dinh dưỡng kiểm định và giao tận tay mỗi ngày.",
  },
  {
    q: "Tôi có thể tin tưởng Nouri không?",
    a: "Nouri hợp tác cùng đội ngũ chuyên gia dinh dưỡng và dược sĩ để đảm bảo mọi công thức đều được xây dựng dựa trên cơ sở khoa học và tiêu chuẩn chất lượng quốc tế. Hệ thống thuật toán của Nouri được huấn luyện trên hàng nghìn dữ liệu người dùng thực tế, giúp tối ưu lựa chọn vitamin cho từng cá nhân – an toàn, minh bạch và hiệu quả.",
  },
  {
    q: "Nouri đưa ra giải pháp như thế nào?",
    a: "Chúng tôi bắt đầu bằng bài kiểm tra sức khỏe cá nhân hóa – chỉ mất vài phút để phân tích nhu cầu dinh dưỡng, thói quen sinh hoạt và mục tiêu của bạn. Thuật toán của Nouri sẽ tổng hợp dữ liệu, kết hợp cùng đánh giá của chuyên gia để đưa ra tổ hợp vitamin và khoáng chất phù hợp riêng cho bạn, được đóng gói tiện lợi theo ngày.",
  },
  {
    q: "Khi nào tôi có thể thấy kết quả?",
    a: "Nhiều người dùng cảm nhận rõ năng lượng, giấc ngủ và sự tập trung cải thiện chỉ sau vài tuần sử dụng đều đặn. Tuy nhiên, để đạt hiệu quả bền vững, Nouri khuyến nghị bạn duy trì liệu trình tối thiểu 3 tháng – vì cơ thể cần thời gian để hấp thu và tái cân bằng vi chất.",
  },
  {
    q: "Tại sao tôi nên dùng thực phẩm bổ sung Nouri?",
    a: "Cuộc sống hiện đại khiến chúng ta khó có thể bổ sung đầy đủ dưỡng chất chỉ qua bữa ăn hàng ngày. Nouri giúp lấp đầy những khoảng trống đó – cá nhân hóa lượng vitamin cần thiết cho cơ thể bạn để duy trì năng lượng, giấc ngủ, làn da và sức khỏe tổng thể một cách tự nhiên, lâu dài.",
  },
  {
    q: "Nguyên liệu của Nouri đến từ đâu?",
    a: "Nouri chỉ sử dụng nguồn nguyên liệu nhập khẩu từ các nhà cung cấp uy tín tại Mỹ, Nhật Bản và châu Âu, được chứng nhận an toàn và hiệu quả sinh học cao. Mọi thành phần đều trải qua kiểm định nghiêm ngặt và được pha chế theo tiêu chuẩn GMP – để đảm bảo bạn nhận được vitamin tinh khiết, dễ hấp thu và phù hợp với cơ thể mình nhất.",
  },
  {
    q: "Nouri có cam kết chất lượng không?",
    a: "Chắc chắn rồi. Mỗi sản phẩm Nouri được sản xuất trong quy trình kiểm soát chặt chẽ, kiểm nghiệm độc lập và minh bạch về thành phần. Chúng tôi cam kết: Không hương liệu nhân tạo – Không chất bảo quản – Không liều lượng thừa. Chỉ những gì cơ thể bạn thật sự cần.",
  },
  {
    q: "Nếu tôi có bệnh nền hoặc đang dùng thuốc thì sao?",
    a: "Nouri khuyến nghị bạn nên tham khảo ý kiến bác sĩ hoặc chuyên gia dinh dưỡng trước khi sử dụng bất kỳ sản phẩm bổ sung nào. Đội ngũ của chúng tôi sẵn sàng hỗ trợ tư vấn để đảm bảo giải pháp vitamin phù hợp và an toàn nhất cho tình trạng của bạn.",
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-10 px-4 md:px-6 max-w-4xl mx-auto">
      <h2
        className="text-4xl font-bold text-center mb-8 sm:mb-10 tracking-tight"
        style={{ color: "#449286" }}
      >
        Câu hỏi thường gặp
      </h2>

      <div className="shadow-lg rounded-xl overflow-hidden bg-white border border-gray-100 divide-y divide-gray-200">
        {faqs.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => toggle(i)}
              className="w-full text-left p-5 flex justify-between items-center text-lg font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                color: openIndex === i ? "#387a6f" : "#1f2937",
                borderColor: openIndex === i ? "#449286" : "transparent",
                boxShadow: openIndex === i ? `0 1px 0 0 #449286 inset` : "none",
              }}
              aria-expanded={openIndex === i}
            >
              <span>{item.q}</span>

              <span
                className={`ml-4 text-2xl transition-transform duration-300 ease-in-out`}
                style={{
                  color: openIndex === i ? "#449286" : "#9ca3af",
                  transform:
                    openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                &#9660;
              </span>
            </button>

            {openIndex === i && (
              <div className="px-5 pb-6 text-gray-700 bg-gray-50 transition-all duration-300 ease-in-out">
                <p className="m-0 leading-relaxed whitespace-pre-line text-base">
                  {item.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
