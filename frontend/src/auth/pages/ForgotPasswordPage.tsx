import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email) {
      setError("Vui lòng nhập email");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Lỗi server");

      // In dev the API may return a resetUrl — show it for convenience
      setSuccessMessage(
        data?.resetUrl
          ? `Hướng dẫn đã được gửi. (DEV) Reset link: ${data.resetUrl}`
          : "Nếu email tồn tại, bạn sẽ nhận được hướng dẫn để đặt lại mật khẩu"
      );
      setEmail("");
    } catch (err: any) {
      setError(err.message || "Đã có lỗi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] flex items-start justify-center py-20">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="text-4xl font-extrabold tracking-widest text-black mb-4">
            cuure
          </div>
          <p className="text-sm text-gray-600 mb-8">
            Nhập email để nhận hướng dẫn đặt lại mật khẩu
          </p>

          <form
            onSubmit={onSubmit}
            className="w-full bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm"
          >
            {error && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 text-sm text-green-700 bg-green-50 p-2 rounded break-words">
                {successMessage}
              </div>
            )}

            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@gmail.com"
              required
              className="w-full px-3 py-2 rounded-md border border-gray-200 shadow-sm mb-4 focus:outline-none focus:ring-2 focus:ring-amber-200"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-full bg-[#f2c9ad] text-white font-medium shadow-md hover:brightness-95 mb-4 transition-colors disabled:opacity-60"
            >
              {loading ? "Đang gửi..." : "Gửi hướng dẫn"}
            </button>

            <div className="flex justify-between mt-4 text-sm">
              <Link to="/login" className="text-amber-400 hover:underline">
                Quay lại đăng nhập
              </Link>
              <Link to="/signup" className="text-amber-400 hover:underline">
                Tạo tài khoản
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
