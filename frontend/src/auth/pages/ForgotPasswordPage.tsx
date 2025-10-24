import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { ArrowLeft } from "lucide-react";
import { useIsMobile } from "../../common/hooks/useIsMobile";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const { message, success, isLoading, forgotPassword } = useAuthStore();
  const isMobile = useIsMobile();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return (
    <div className="h-screen bg-[#fbf9f6] flex items-start justify-center py-20">
      <a
        className="absolute left-5 top-5 px-3 py-3 bg-stone-500 rounded-full hover:bg-stone-700 text-white"
        onClick={() => history.back()}
      >
        <ArrowLeft />
      </a>
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="text-4xl font-extrabold tracking-widest text-teal-400 mb-4">
            <Link to="/" className="inline-flex items-center">
              <img src="/assets/logo.png" alt="NOURI" className={isMobile ? 'w-20' : 'h-8'} />
            </Link>
          </div>
          <p className="text-sm text-gray-600 mb-8 px-4 text-center">
            Nhập email để nhận hướng dẫn đặt lại mật khẩu
          </p>

          <form
            onSubmit={onSubmit}
            className="w-full bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm"
          >
            {message.length > 0 && (
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
              className="w-full px-3 py-2 rounded-md border border-gray-200 shadow-sm mb-4 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 rounded-full bg-teal-600 text-white font-medium shadow-md hover:brightness-95 mb-2 transition-colors disabled:opacity-60"
            >
              {isLoading ? "Đang gửi..." : "Gửi hướng dẫn"}
            </button>

            <div className="flex justify-between mt-4 text-sm">
              <Link to="/login" className="text-teal-400 hover:underline">
                Quay lại đăng nhập
              </Link>
              <Link to="/signup" className="text-teal-400 hover:underline">
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
