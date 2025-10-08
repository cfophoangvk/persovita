import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const { message, success, isLoading, forgotPassword } = useAuthStore();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] flex items-start justify-center py-20">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="text-4xl font-extrabold tracking-widest text-amber-400 mb-4">
            <Link to="/">PERSOVITA</Link>
          </div>
          <p className="text-sm text-gray-600 mb-8">
            Nhập email để nhận hướng dẫn đặt lại mật khẩu
          </p>

          <form
            onSubmit={onSubmit}
            className="w-full bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm"
          >
            {!success && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
                {message}
              </div>
            )}
            {success && (
              <div className="mb-4 text-sm text-green-700 bg-green-50 p-2 rounded break-words">
                {message}
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
              disabled={isLoading}
              className="w-full py-2 rounded-full bg-amber-600 text-white font-medium shadow-md hover:brightness-95 mb-4 transition-colors disabled:opacity-60"
            >
              {isLoading ? "Đang gửi..." : "Gửi hướng dẫn"}
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
