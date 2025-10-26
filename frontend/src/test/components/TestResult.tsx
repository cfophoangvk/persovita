import { CircleCheck } from "lucide-react";
import { useIsMobile } from "../../common/hooks/useIsMobile";

const TestResult = () => {
  const isMobile = useIsMobile();
  return (
    <div className="md:p-0 p-5">
      <div className="bg-stone-100 flex flex-col items-center p-8 rounded-md">
        <CircleCheck className="stroke-teal-400" size={isMobile ? 40 : 60} />
        <h1 className="md:text-3xl text-xl mt-6 text-center">Đề xuất thuốc của bạn đã sẵn sàng</h1>
        <button
          className="mt-6 rounded-full bg-teal-400 text-white md:px-8 px-4 py-2 font-bold cursor-pointer"
          onClick={() => (window.location.href = "/test/recommendation")}
        >
          Xem đề xuất
        </button>
      </div>
    </div>
  );
};

export default TestResult;
