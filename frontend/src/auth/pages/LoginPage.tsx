import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { Loader2 } from "lucide-react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const { login, isLoading } = useAuthStore();

  const onSubmit = (e: React.FormEvent) => {
    login({ email, password });
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] flex items-start justify-center py-20 relative">
      <a
        className="absolute left-5 top-5 px-3 py-3 bg-stone-500 rounded-full hover:bg-stone-700 text-white"
        href="/"
      >
        <ArrowLeft />
      </a>
      <div className="w-full max-w-md bg-transparent">
        <div className="flex flex-col items-center">
          <div className="text-4xl font-extrabold tracking-widest text-teal-400 mb-4">
            <Link to="/">NOURI</Link>
          </div>
          <p className="text-sm text-gray-600 mb-8">
            Đăng nhập tài khoản Nouri
          </p>

          <form
            onSubmit={onSubmit}
            className="w-full bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm"
          >
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              required
              className="w-full px-3 py-2 rounded-md border border-gray-200 shadow-sm mb-4 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />

            <label className="block text-xs font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 rounded-md border border-gray-200 shadow-sm mb-4 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />

            <div className="flex items-center gap-3 mb-6">
              <label className="flex items-center gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span>Ghi nhớ đăng nhập</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-full bg-teal-600 text-white font-medium shadow-md hover:brightness-95 mb-4"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 mx-auto animate-spin" />
              ) : (
                "Đăng nhập"
              )}
            </button>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-grow h-px bg-gray-200" />
              <div className="text-xs text-gray-400">or</div>
              <div className="flex-grow h-px bg-gray-200" />
            </div>

            <button
              type="button"
              onClick={() =>
                (window.location.href = "https://api.nourivitamin.com/api/auth/google")
              }
              className="w-full py-2 rounded-full border border-gray-300 bg-white flex items-center justify-center gap-3 text-sm text-black font-medium
                         hover:bg-teal-50 active:bg-teal-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal-200"
            >
              <img
                className="w-5 h-5"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEkUlEQVR4nO2Zb0wbZRzHn3taesUtRpOJYbo/DoQM5c/GMgryzxkYxbGBiQsbNBCEFGaIY8zCCuaUMSiQAQMGQWAgcSY2GeuNuzpc8NqNvRoCItE3841Dthj3ToNzbX+mVRBI197Zo2VJv8n3XZ+nn89dn6dPrwj5448/HgcoJIWqgGIoxywU4HuQTfwJSsIKBxBAKgJIQzbIJhZBhX+BE/g6VAUU2ccgXwc0UgWU4tvwNmGBJASCqiQsoMa3QRsQ433wOlk4qPEsvCkQ2llTEUAxnoEaFOIdeA3RCumEzWPwtT2IrHCK0K0f+HkUCMX4B9HBk9b0PTwNFJKJC9+NngcVfrDu8En/toJoFw9+EMnhOPGr1+DLCE40eIeAGn/vPXgsMvyHRIfgrbEMT0IlroUmaQpQaAtQKAjOSN6C05hy7Db21zgbW4pN4sI3kyGQQVh5g5+W9PJZfEChZ+ADydAqkVKR4R1vVIHv8IIvwPNwDr0oeP4aFAJ5+P76wJvl22CcfAQaCUCyC/gSPAV6JEEbLWAmdWAmwdHeAIB0wvmV35DweiQBs2x+WcDeURmACv8Hn0lYoAK9hDZiwCSPXwW/VI4E0En/ObuclPSjjRowybROBZY6FPAAyhGJNmrATF5xKWCSdQiZL1gzC2I0XDthO9rUd9e9gImccynAkRm+EAjWzMIbddcW+Qg8dCMQ6iuB3TW3rHwEHrkWQJt9JbCjehKeaoHtVd+C5x+hm7IwXwns1t60Pd2L+JNRHovYTI642UY7fSVwRDc8z0NAduZJ8A+5Z6Geif/jvF4RiEROy3D+puiPvrG4Eii/0DjqXoALVDiDnx0PBhWthENXs6HDGHtJbIGTnfX97u6Arq/iuHsBQBjMsntL4DYzCfRYOGQbDjvg7c2jlZaL11/bJhZ8W496Z2SNyeoK/vVas4XiKH5P88BENtrhfzdthrNMwjL4ylaPJi9wXIrHjwcpjpIeafxswd3VL2lrm+A9KXCBL98df+GvEjrdKfxSP2YTZjyRoDhKmt/SM+d2/6+egsbuylhBkzcwihlX8CvvRP/X4VuFwvfeiNhe1lX3E5/d51hz75zQ+RE9FvZKPq208pHIp5WWzq/2DlCDKXJ38w6PRW1qZ/b15RmU1pyRHDja2uH2FEp9ekrQl+dyutmY1iweAitFGljFdJdxL6VnIw5cGdsVdJkL2zJgjEq8aNxTV8ckTNpfs3JM1kgOFPZQsLXqO6cC77c3dSNPomPjpvkKeNKiwXLYWX1nFfy7TQM/Ik+j10fINHTqfW9IFH5RCJG1Jgd8ev2Xv53o6hJ0cHxiOG7HczVM4oI3JI7pc0HVemGeGq4MEgV+hYT8LBM/K2RN/J+eYxXTRmPo+v3m7jNGNecaMq2iX3lDprWXjWlG3sgwvSe0gY2beseQ5TF4ztXDjqt++caru5C3MzQWGdvM7L9VZDj4WCh4AZ3xuJGJm/icifb+n3xrowck6WeiC1uN+0a1TOLPajptUWVQWu13yH4IzDVk2tSGtMWqa8nzLex+ts8YU2Afg/zxxx/kaf4GzSVnCicBYF0AAAAASUVORK5CYII="
                alt="google-logo"
              />
              <span>Đăng nhập bằng Google</span>
            </button>

            <div className="flex justify-between mt-6 text-sm">
              <Link
                to="/forgot-password"
                className="text-teal-400 hover:underline"
              >
                Quên mật khẩu?
              </Link>
              <Link to="/signup" className="text-teal-400 hover:underline">
                Đăng ký tài khoản
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
