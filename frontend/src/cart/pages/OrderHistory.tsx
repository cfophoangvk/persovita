import { useEffect, useState } from "react";

type Order = {
  id: number;
  createdAt: string;
  status: string;
  items: Array<{
    productId: number;
    name: string;
    price: number;
    quantity: number;
    subscription?: boolean;
    subscriptionMonths?: number;
  }>;
  total: number;
};

// 🔹 Định dạng tiền tệ VNĐ
const formatVND = (v: number) => v.toLocaleString("vi-VN") + " VNĐ";

// 🔹 Định dạng ngày (ví dụ: "22/10/2025 14:30")
const formatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

// 🔹 Định dạng chỉ ngày (ví dụ: "22/10/2025")
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.nourivitamin.com/api/orders/", {
      credentials: "include",
    })
      .then((r) => r.json() as Promise<{ success: boolean; orders: Order[] }>)
      .then((res) => {
        if (res && res.success) setOrders(res.orders || []);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Tính danh sách gói đăng ký còn hoạt động
  const activeSubscriptions = orders
    .flatMap((o) =>
      (o.items || []).map((it) => ({
        orderId: o.id,
        createdAt: o.createdAt,
        ...it,
      }))
    )
    .filter((it) => it.subscription && (it.subscriptionMonths || 0) > 0)
    .map((it) => {
      const start = new Date(it.createdAt).getTime();
      const months = it.subscriptionMonths || 1;
      const end = new Date(start);
      end.setMonth(end.getMonth() + months);
      return { ...it, endDate: end };
    })
    .filter((it) => new Date(it.endDate) > new Date());

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">
        🛍️ Lịch sử đơn hàng
      </h2>

      {loading ? (
        <div className="text-center text-gray-500">Đang tải dữ liệu...</div>
      ) : (
        <>
          {/* Section: Order History */}
          <section className="mb-10">
            <h3 className="text-lg font-semibold text-teal-600 mb-3 border-b-2 border-teal-200 pb-1">
              Đơn hàng đã mua
            </h3>

            {orders.length === 0 ? (
              <div className="text-gray-500 text-center bg-white py-6 rounded-lg shadow-sm">
                Chưa có đơn hàng nào.
              </div>
            ) : (
              <ul className="space-y-5">
                {orders.map((o) => (
                  <li
                    key={o.id}
                    className="p-5 bg-white rounded-xl shadow hover:shadow-md transition-shadow border border-teal-100"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-gray-800">
                          Đơn #{o.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDateTime(new Date(o.createdAt))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-teal-700">
                          {formatVND(o.total)}
                        </div>
                        <div className="text-sm text-gray-500">{o.status}</div>
                      </div>
                    </div>

                    <div className="mt-3 text-sm divide-y divide-gray-100">
                      {o.items.map((it, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between py-2 text-gray-700"
                        >
                          <div>
                            {it.name}
                            {it.subscription && (
                              <span className="ml-2 text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
                                Gói {it.subscriptionMonths || 1} tháng
                              </span>
                            )}
                          </div>
                          <div className="font-medium">
                            {formatVND((it.price || 0) * (it.quantity || 1))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Section: Active Subscriptions */}
          <section>
            <h3 className="text-lg font-semibold text-teal-600 mb-3 border-b-2 border-teal-200 pb-1">
              Gói đăng ký đang hoạt động
            </h3>

            {activeSubscriptions.length === 0 ? (
              <div className="text-gray-500 text-center bg-white py-6 rounded-lg shadow-sm">
                Không có gói đăng ký đang hoạt động.
              </div>
            ) : (
              <ul className="space-y-4">
                {activeSubscriptions.map((a, idx) => (
                  <li
                    key={idx}
                    className="p-4 bg-white rounded-xl shadow hover:shadow-md transition-shadow flex justify-between items-start border border-teal-100"
                  >
                    <div>
                      <div className="font-semibold text-gray-800">
                        {a.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Bắt đầu:{" "}
                        <span className="text-teal-700">
                          {formatDate(new Date(a.createdAt))}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Kết thúc:{" "}
                        <span className="text-teal-700">
                          {formatDate(new Date(a.endDate))}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-teal-700">
                        {formatVND((a.price || 0) * (a.quantity || 1))}
                      </div>
                      <div className="text-sm text-gray-500">
                        {a.subscriptionMonths} tháng
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default OrderHistory;
