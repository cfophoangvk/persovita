import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import toast from "react-hot-toast";

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { isLoading, resetPassword } = useAuthStore();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Token không hợp lệ hoặc thiếu.");
      return;
    }
    if (newPassword !== confirm) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }
    await resetPassword(token, newPassword);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] flex items-start justify-center py-20">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="text-4xl font-extrabold tracking-widest text-amber-400 mb-4">
            <Link to="/">PERSOVITA</Link>
          </div>
          <p className="text-sm text-gray-600 mb-8">Đặt lại mật khẩu của bạn</p>

          <form
            onSubmit={onSubmit}
            className="w-full bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm"
          >
            <label className="block text-xs font-medium text-gray-700 mb-1">
              New password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 rounded-md border border-gray-200 shadow-sm mb-4 focus:outline-none focus:ring-2 focus:ring-amber-200"
            />

            <label className="block text-xs font-medium text-gray-700 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 rounded-md border border-gray-200 shadow-sm mb-4 focus:outline-none focus:ring-2 focus:ring-amber-200"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 rounded-full bg-amber-600 text-white font-medium shadow-md hover:brightness-95 mb-4 transition-colors disabled:opacity-60"
            >
              {isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
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

export default ResetPasswordPage;
