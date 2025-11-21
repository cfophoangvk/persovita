import React, { useState } from "react";

type QA = {
  q: string;
  a: string;
};

const faqs: QA[] = [
  {
    q: "Nouri là gì?",
    a: "Nouri là thương hiệu thực phẩm bổ sung cá nhân hóa đầu tiên tại Việt Nam, giúp bạn chăm sóc sức khỏe một cách khoa học và tiện lợi. Dựa trên bài đánh giá về lối sống, thói quen và mục tiêu sức khỏe, Nouri sử dụng thuật toán phân tích để gợi ý liệu trình vitamin phù hợp nhất cho từng người. Tất cả công thức đều được dược sĩ thẩm định trước khi đóng gói và được giao đến tận nhà.",
  },
  {
    q: "Tôi có thể tin tưởng Nouri không?",
    a: "Nouri phát triển các công thức dựa trên cơ sở khoa học, tiêu chuẩn chất lượng nghiêm ngặt và được dược sĩ thẩm định trước khi đưa vào sử dụng. Thuật toán phân tích của Nouri được xây dựng từ dữ liệu thực tế và các tiêu chí sức khỏe đã được kiểm chứng, giúp đưa ra gợi ý vitamin phù hợp với từng cá nhân – minh bạch, an toàn và hiệu quả.",
  },
  {
    q: "Nouri đưa ra giải pháp như thế nào?",
    a: "Chúng tôi bắt đầu bằng một bài đánh giá sức khỏe cá nhân hóa, chỉ mất vài phút để phân tích thói quen sinh hoạt, tình trạng cơ bản và mục tiêu sức khỏe của bạn. Thuật toán của Nouri sẽ tổng hợp toàn bộ dữ liệu và đối chiếu với tiêu chuẩn dinh dưỡng được dược sĩ thẩm định, từ đó đề xuất thực phẩm bổ sung phù hợp riêng cho bạn, được đóng gói tiện lợi theo ngày.",
  },
  {
    q: "Khi nào tôi có thể thấy kết quả?",
    a: "Nhiều người dùng cảm nhận rõ năng lượng, giấc ngủ và sự tập trung cải thiện chỉ sau vài tuần sử dụng đều đặn. Tuy nhiên, để đạt hiệu quả bền vững, Nouri khuyến nghị bạn duy trì liệu trình tối thiểu 3 tháng - vì cơ thể cần thời gian để hấp thu và tái cân bằng vi chất.",
  },
  {
    q: "Tại sao tôi nên dùng thực phẩm bổ sung Nouri?",
    a: "Cuộc sống bận rộn khiến chúng ta khó đảm bảo đủ dưỡng chất chỉ từ bữa ăn hằng ngày. Nouri giúp cung cấp những vitamin và khoáng chất mà cơ thể bạn còn thiếu, được cá nhân hóa theo nhu cầu riêng để hỗ trợ năng lượng, giấc ngủ, làn da và sức khỏe tổng thể một cách tự nhiên và lâu dài.",
  },
  {
    q: "Nguyên liệu của Nouri đến từ đâu?",
    a: "Nouri sử dụng nguyên liệu nhập khẩu từ các nhà cung cấp uy tín tại Mỹ, Nhật Bản và châu Âu, đáp ứng các tiêu chuẩn an toàn và chất lượng nghiêm ngặt. Mỗi lô nguyên liệu đều được kiểm tra trước khi đưa vào sản xuất và đóng gói theo tiêu chuẩn GMP, giúp sản phẩm an toàn, dễ hấp thu và phù hợp với cơ thể.",
  },
  {
    q: "Nouri có cam kết chất lượng không?",
    a: "Tất cả sản phẩm mà Nouri sử dụng đều là thực phẩm bổ sung đã được cấp phép lưu hành và kiểm nghiệm theo quy định của Bộ Y tế. Quy trình đóng gói tại Nouri được thực hiện trong khu vực đảm bảo vệ sinh, kiểm tra chặt chẽ. Chúng tôi cam kết minh bạch về nguyên liệu, liều lượng, hạn sử dụng và chỉ đề xuất những gì phù hợp với nhu cầu của bạn.",
  },
  {
    q: "Nếu tôi có bệnh nền hoặc đang dùng thuốc thì sao?",
    a: "Nouri luôn khuyến nghị bạn tham khảo ý kiến bác sĩ điều trị trước khi dùng bất kỳ thực phẩm bổ sung nào nếu bạn có bệnh nền hoặc đang dùng thuốc. Dược sĩ của Nouri có thể hỗ trợ giải đáp thắc mắc về thành phần và cách dùng, nhưng không thay thế cho tư vấn y khoa. Mục tiêu của chúng tôi là đảm bảo bạn sử dụng sản phẩm một cách phù hợp và an toàn nhất.",
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
        className="md:text-4xl text-xl font-bold text-center mb-8 sm:mb-10 tracking-tight"
        style={{ color: "#449286" }}
      >
        Câu hỏi thường gặp
      </h2>

      <div className="shadow-lg rounded-xl overflow-hidden bg-white border border-gray-100 divide-y divide-gray-200">
        {faqs.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => toggle(i)}
              className="w-full text-left p-5 flex justify-between items-center md:text-lg text-base font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                color: openIndex === i ? "#387a6f" : "#1f2937",
                borderColor: openIndex === i ? "#449286" : "transparent",
                boxShadow: openIndex === i ? `0 1px 0 0 #449286 inset` : "none",
              }}
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
