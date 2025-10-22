import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { PaymentProps } from "../interfaces";
import { Link } from "react-router-dom";
import qrImg from "/assets/qr.jpg";

const Payment: React.FC<PaymentProps> = ({
  productCount = 0,
  totalVND = 0,
  onBack,
  shippingSummary = null,
}) => {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [payload, setPayload] = useState<string>("");

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
    setQrUrl(qrImg);
    // create order on backend (order creation will persist shipping/payment)
    Promise.all([
      import("../services/orderService"),
      import("../services/paymentService"),
    ])
      .then(([{ createOrder }, { clearCartServer }]) => {
        createOrder({
          shipping: shippingSummary,
          payment: { method: "qr", info: data },
        })
          .then((res) => {
            // expect { success: true, order }
            if (res && res.success) {
              clearCartServer().catch(() => {});
            }
          })
          .catch((err) => {
            console.error("createOrder error", err);
            alert("Order creation failed");
          });
      })
      .catch((err) => {
        console.error("import services failed", err);
      });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(payload || "");
      alert("Payload copied to clipboard");
    } catch (e) {
      alert("Copy failed");
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <button
        onClick={onBack}
        aria-label="Back to shipping"
        className="absolute left-0 top-0 mt-1 ml-0 p-2 text-gray-600 hover:text-gray-800"
      >
        <ArrowLeftIcon className="w-6 h-6" />
      </button>

      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-center mb-6 relative">
          <h1 className="text-2xl tracking-widest font-semibold">NOURI</h1>
        </header>

        <div className="mb-6 border-b pb-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700">
              1. Your Cart{" "}
              <span className="text-gray-400">
                {productCount} Product{productCount !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="text-base font-semibold">
              {Number(totalVND).toLocaleString("vi-VN")} ₫
            </div>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <div className="text-sm text-gray-700">Phí vận chuyển</div>
            <div className="text-base font-semibold">
              {Number(
                (shippingSummary as any) && (shippingSummary as any).price
                  ? (shippingSummary as any).price
                  : 0
              ).toLocaleString("vi-VN")}{" "}
              ₫
            </div>
          </div>
          <div className="mt-3 flex justify-between items-center font-bold">
            <div>Tổng cộng</div>
            <div>
              {Number(
                Number(totalVND) +
                  ((shippingSummary as any) && (shippingSummary as any).price
                    ? (shippingSummary as any).price
                    : 0)
              ).toLocaleString("vi-VN")}{" "}
              ₫
            </div>
          </div>
        </div>

        <section>
          <div className="mb-6 border-b pb-6">
            <div className="flex justify-between items-center text-sm text-gray-700">
              <div>2. Shipping</div>
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
          <h2 className="text-lg font-bold mb-4">3. Payment method</h2>

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
                <img src={qrUrl} alt="QR code" className="mx-auto mb-4" />
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
