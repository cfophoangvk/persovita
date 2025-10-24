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
        Chúng tôi sẽ hỏi bạn một vài câu hỏi để có thể{" "}
        <strong>cung cấp cho bạn một số loại thực phẩm bổ sung</strong> phù hợp
        với nhu cầu của bạn.
      </p>
      <p className="md:text-lg text-base text-center leading-6 md:mt-8 mt-3">
        Mục đích của bài kiểm tra này không phải là đưa ra chẩn đoán mà là đưa
        ra cho bạn những khuyến nghị về cách giữ gìn sức khỏe tốt.
      </p>
      <p className="md:text-lg text-base text-center leading-6 md:mt-8 mt-3">
        Để thực hiện việc này, chúng tôi sẽ <strong>thu thập dữ liệu cá nhân</strong> về bạn.
      </p>

      <div className="md:mt-15 mt-3 flex gap-5 items-center">
        <input
          type="checkbox"
          id="personalData"
          className="scale-150"
          checked={acceptedPersonalData}
          onChange={handleAcceptPersonalData}
        />
        <label htmlFor="personalData">
          Bằng cách đánh dấu vào ô này, tôi chấp nhận rằng dữ liệu cá nhân tôi
          cung cấp cho Nouri sẽ được sử dụng để tạo ra thực phẩm bổ sung được cá
          nhân hóa của tôi.
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
