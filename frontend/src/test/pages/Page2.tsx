import { useState } from "react";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Title from "../components/Title";

const Page2 = (props: {
  title: string;
  name: string;
  onNext: () => void;
}) => {

  const [acceptedPersonalData, setAcceptedPersonalData] = useState<boolean>(false);

  const handleAcceptPersonalData = () => {
    setAcceptedPersonalData(!acceptedPersonalData);
  };

  return (
    <div className="flex flex-col items-center max-w-[600px] p-6">
      <Badge text={props.title} />
      <Title text={`Xin chào ${props.name}!`} />
      <p className="md:text-lg text-base text-center leading-6">
        Chúng tôi sẽ hỏi bạn một vài câu để có thể <strong>đề xuất những loại thực phẩm bổ sung</strong> phù hợp với nhu cầu của bạn.
      </p>
      <p className="md:text-lg text-base text-center leading-6 md:mt-8 mt-3">
        Những câu hỏi này <strong>không dùng để chẩn đoán bệnh, mà nhằm đưa ra khuyến nghị</strong> giúp bạn chăm sóc sức khỏe tốt hơn.
      </p>
      <p className="md:text-lg text-base text-center leading-6 md:mt-8 mt-3">
        Để thực hiện việc này, chúng tôi cần <strong>thu thập một số dữ liệu cá nhân</strong> của bạn.
      </p>

      <div className="md:mt-15 mt-3 flex gap-5 items-center p-4 rounded-lg border border-gray-600">
        <input
          type="checkbox"
          id="personalData"
          className="scale-150"
          checked={acceptedPersonalData}
          onChange={handleAcceptPersonalData}
        />
        <label htmlFor="personalData">
          Khi đánh dấu vào ô này, tôi đồng ý để Nouri sử dụng dữ liệu cá nhân để tạo gói thực phẩm bổ sung phù hợp với nhu cầu của tôi.
        </label>
      </div>

      <Button
        onClick={props.onNext}
        disabled={!acceptedPersonalData}
        text="Tiếp tục"
      />
    </div>
  );
};

export default Page2;
