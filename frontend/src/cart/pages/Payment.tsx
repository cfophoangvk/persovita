import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../auth/stores/useAuthStore";
import type { PaymentProps } from "../interfaces";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

const Payment: React.FC<PaymentProps> = ({
  productCount = 0,
  totalVND = 0,
  onBack,
  shippingSummary = null,
}) => {
  // format helper
  const formatVND = (v: number) => v.toLocaleString("vi-VN") + " VNĐ";
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [payload, setPayload] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGenerateQr = () => {
    const methodCost =
      (shippingSummary as any) && (shippingSummary as any).price
        ? Number((shippingSummary as any).price)
        : 0;
    const totalWithShipping = Number(totalVND) + methodCost;
    const data = JSON.stringify({
      merchant: "NOURI",
      amount: Number(totalWithShipping.toFixed(2)),
      items: productCount,
      shippingMethod: (shippingSummary as any)?.method || null,
      shippingMethodCost: methodCost,
      ts: Date.now(),
    });
    setPayload(data);
    // use local placeholder QR image from assets
    setQrUrl("/assets/qr.jpg");
    // create order on backend (order creation will persist shipping/payment)
    Promise.all([
      import("../services/orderService"),
      import("../services/paymentService"),
    ])
      .then(([{ createOrder }, { clearCartServer }]) => {
        // prepare payload: include items from localStorage for guest users
        const { user } = useAuthStore.getState();
        let payload: any = {
          shipping: shippingSummary,
          payment: { method: "qr", info: data },
        };

        if (!user) {
          const raw = localStorage.getItem("persistCart") || "[]";
          try {
            const list = JSON.parse(raw || "[]");
            // map to server-expected shape
            payload.items = (list || []).map((item: any) => ({
              productId: item.productId,
              name: item.name,
              price: item.price,
              quantity: item.quantity || 1,
              image: item.image || "",
              subscription: item.subscription || false,
              subscriptionMonths: item.subscriptionMonths || 0,
            }));
          } catch (e) {
            payload.items = [];
          }
        }

        createOrder(payload)
          .then((res) => {
            // expect { success: true, order }
            if (res && res.success) {
              if (user) {
                clearCartServer().catch(() => {});
              } else {
                // guest: clear local persistCart and notify app
                localStorage.removeItem("persistCart");
                window.dispatchEvent(new CustomEvent("cart:updated"));
              }
            }
          })
          .catch((err) => {
            console.error("createOrder error", err);
            toast.error("Order creation failed");
          });
      })
      .catch((err) => {
        console.error("import services failed", err);
      });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(payload || "");
      toast.success("Payload copied to clipboard");
    } catch (e) {
      toast.error("Copy failed");
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <button
        onClick={onBack}
        className="absolute left-4 top-4 mt-1 ml-0 p-2 text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-center mb-6 relative">
          <img
            src="assets/logo.png"
            alt="Nouri"
            className="w-32 cursor-pointer"
            onClick={() => (location.href = "/")}
          />
        </header>

        <div className="mb-6 border-b pb-6">
          <div className="flex sm:flex-row flex-col justify-between">
            <div className="text-lg font-bold">
              1. Giỏ hàng của bạn{" "}
              <span className="text-gray-400">(1 sản phẩm)</span>
            </div>
            <div className="sm:text-base text-lg font-semibold">
              {formatVND(
                Number(totalVND) +
                  (shippingSummary && (shippingSummary as any).price
                    ? Number((shippingSummary as any).price)
                    : 0)
              )}
            </div>
          </div>
        </div>

        <section>
          <div className="mb-6 border-b pb-6">
            <div className="flex justify-between items-center">
              <div className="text-lg font-bold">2. Vận chuyển</div>
              <div className="text-gray-600">
                {shippingSummary
                  ? `${
                      shippingSummary.address
                        ? shippingSummary.address + ", "
                        : ""
                    }${shippingSummary.city || ""}${
                      shippingSummary.country
                        ? ", " + shippingSummary.country
                        : ""
                    }`
                  : "-"}
              </div>
            </div>
          </div>
          <h2 className="text-lg font-bold mb-4">3. Phương thức thanh toán</h2>

          <div className="space-y-6">
            <div className="text-sm text-gray-700">
              Chọn phương thức thanh toán nhanh bằng QR
            </div>

            <button
              onClick={handleGenerateQr}
              className="w-full py-4 text-white font-bold rounded-full shadow-lg"
              style={{ backgroundColor: "#449286" }}
            >
              Tạo QR thanh toán
            </button>

            {qrUrl && (
              <div className="mt-6 text-center">
                <img
                  src={qrUrl}
                  alt="QR code"
                  className="mx-auto w-100 h-100 mb-4"
                />
                <div className="flex justify-center gap-3">
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 rounded-full bg-gray-100"
                  >
                    Sao chép mã QR
                  </button>
                  <button
                    onClick={() => setQrUrl(null)}
                    className="px-4 py-2 rounded-full bg-white border"
                  >
                    Đóng
                  </button>
                </div>
                <div className="mt-4 flex justify-center">
                  {" "}
                  {/* Thêm 'flex justify-center' để căn giữa Link */}
                  <Link
                    to="/"
                    className="block w-1/2 text-center py-2 bg-teal-500 text-white rounded-full font-semibold hover:bg-teal-600 transition duration-150"
                  >
                    Thanh toán thành công, quay về trang chủ
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Payment;
