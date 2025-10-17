import React from "react";

const Benefits: React.FC = () => (
  <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
      <div className="text-teal-500 text-3xl font-bold mb-2">🌿</div>
      <h3 className="font-semibold text-lg">Thành phần tự nhiên</h3>
      <p className="text-sm text-gray-500 mt-2">
        Chỉ những điều tốt nhất cho cơ thể bạn
      </p>
    </div>
    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
      <div className="text-teal-500 text-3xl font-bold mb-2">✅</div>
      <h3 className="font-semibold text-lg">Chất lượng cao</h3>
      <p className="text-sm text-gray-500 mt-2">
        Được kiểm nghiệm độ tinh khiết trong phòng thí nghiệm
      </p>
    </div>
    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
      <div className="text-teal-500 text-3xl font-bold mb-2">🚚</div>
      <h3 className="font-semibold text-lg">Giao hàng nhanh</h3>
      <p className="text-sm text-gray-500 mt-2">Từ kho đến tận cửa nhà bạn</p>
    </div>
  </div>
);

export default Benefits;
