import { CircleCheck } from "lucide-react";

const TestResult = () => {
  return (
    <div className="bg-stone-100 flex flex-col items-center p-8 rounded-md">
      <CircleCheck className="stroke-emerald-400" size={60} />
      <h1 className="text-3xl mt-6">Đề xuất thuốc của bạn đã sẵn sàng</h1>
      <button
        className="mt-6 rounded-full bg-emerald-400 text-white px-8 py-2 font-bold"
        onClick={() => window.location.href = '/test/recommendation'}
      >
        Xem đề xuất
      </button>
    </div>
  );
};

export default TestResult;
