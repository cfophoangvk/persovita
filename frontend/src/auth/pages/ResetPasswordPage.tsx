import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!token) {
      setError("Token không hợp lệ hoặc thiếu.");
      return;
    }
    if (
      !newPassword ||
      typeof newPassword !== "string" ||
      newPassword.length < 6
    ) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }
    if (newPassword !== confirm) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Lỗi server");

      setSuccess(
        "Đặt lại mật khẩu thành công. Đang chuyển đến trang đăng nhập..."
      );
      setNewPassword("");
      setConfirm("");

      setTimeout(() => navigate("/login"), 1500);
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
          <p className="text-sm text-gray-600 mb-8">Đặt lại mật khẩu của bạn</p>

          <form
            onSubmit={onSubmit}
            className="w-full bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm"
          >
            {error && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 text-sm text-green-700 bg-green-50 p-2 rounded">
                {success}
              </div>
            )}

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
              disabled={loading}
              className="w-full py-2 rounded-full bg-[#f2c9ad] text-white font-medium shadow-md hover:brightness-95 mb-4 transition-colors disabled:opacity-60"
            >
              {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
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
