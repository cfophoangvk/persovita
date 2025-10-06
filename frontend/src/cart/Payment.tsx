import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const Payment: React.FC<{
  productCount?: number;
  totalEur?: number;
  onBack?: () => void;
  shippingSummary?: {
    address?: string;
    city?: string;
    country?: string;
  } | null;
}> = ({ productCount = 0, totalEur = 0, onBack, shippingSummary = null }) => {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [payload, setPayload] = useState<string>("");

  const handleGenerateQr = () => {
    const data = JSON.stringify({
      merchant: "PERSOVITA",
      amount: Number(totalEur.toFixed(2)),
      currency: "EUR",
      items: productCount,
      ts: Date.now(),
    });
    setPayload(data);
    // use a public QR generation endpoint (returns an image)
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      data
    )}`;
    setQrUrl(url);
    // save a payment record to backend and clear cart
    fetch("http://localhost:6789/api/payment/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method: "qr",
        info: data,
        amount: Number(totalEur.toFixed(2)),
      }),
    })
      .then((r) => r.json())
      .then(() => {
        // clear server cart after payment created
        fetch("http://localhost:6789/api/cart/clear", { method: "POST" }).catch(
          () => {}
        );
      })
      .catch(() => {});
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
          <h1 className="text-2xl tracking-widest font-semibold">PERSOVITA</h1>
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
              {totalEur.toFixed(2).replace(".", ",")} €
            </div>
          </div>
        </div>

        <section>
          <div className="mt-2">
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
              style={{ backgroundColor: "#f28d3d" }}
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
                    Copy payload
                  </button>
                  <button
                    onClick={() => setQrUrl(null)}
                    className="px-4 py-2 rounded-full bg-white border"
                  >
                    Close
                  </button>
                </div>
                <div className="mt-3 text-xs text-gray-500 break-words">
                  {payload}
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
