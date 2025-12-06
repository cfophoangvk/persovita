import React, { useEffect, useState } from "react";
import FadeInSection from "./components/FadeInSection";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form gửi:", form);
    toast.success("Đã gửi thông tin liên hệ!");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-10 px-6 py-16">
      <FadeInSection>
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl font-extrabold text-teal-600 mb-6">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p>Bạn có câu hỏi? Xem ngay mục</p>
          <Link
            to="/"
            onClick={() => {
              setTimeout(() => (location.hash = "faq"), 100);
            }}
            className="md:px-8 px-4 py-2 my-2 bg-teal-500 text-white md:text-lg text-md rounded-full font-semibold transition duration-300 hover:bg-teal-600 shadow-xl transform hover:scale-105 cursor-pointer"
          >
            Câu hỏi thường gặp
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
          {/* LEFT CONTENT */}
          <div>
            <div className="bg-white rounded-lg p-6 shadow-md h-full">
              <h3 className="font-bold text-xl mb-6 text-gray-900">
                Thông Tin Liên Hệ
              </h3>

              <ul className="text-gray-700 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-teal-400 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 2a10 10 0 100 20 10 10 0 000-20z"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="font-bold text-gray-900 mb-0.5">
                      Giờ làm việc:{" "}
                      <span className="font-normal">
                        8:00 - 17:00 (Thứ 2 - Thứ 7)
                      </span>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-teal-400 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="font-bold text-gray-900 mb-0.5">
                      Hotline: <span className="font-normal">0394 914 881</span>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-teal-400 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="font-bold text-gray-900 mb-0.5">
                      Email:{" "}
                      <span className="font-normal">
                        nourivitamin@gmail.com
                      </span>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-teal-400 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="font-bold text-gray-900 mb-0.5">
                      Địa chỉ:{" "}
                      <span className="font-normal">
                        Số 26 KCN Trường An, xã An Khánh, huyện Hoài Đức, Hà
                        Nội, Việt Nam
                      </span>
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="font-bold text-gray-900 mb-3">
                  Kết nối với chúng tôi
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/nourivitamin?mibextid=wwXIfr"
                    aria-label="Facebook"
                    className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center text-teal-500 hover:bg-teal-100 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.1c0-2.2 1.3-3.4 3.3-3.4.96 0 1.97.17 1.97.17v2.1h-1.08c-1.06 0-1.39.66-1.39 1.34v1.6h2.36l-.38 2.9h-1.98v7A10 10 0 0022 12z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@nourivitamin"
                    aria-label="TikTok"
                    className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center text-teal-500 hover:bg-teal-100 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: CONTACT FORM */}
          <div className="bg-white rounded-lg p-6 shadow-md w-full h-full">
            <h3 className="font-semibold text-2xl mb-6 text-gray-700">
              Gửi Tin Nhắn
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    placeholder="Nhập địa chỉ email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chủ đề
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  placeholder="Chủ đề tin nhắn"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tin nhắn <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none"
                  placeholder="Nhập nội dung tin nhắn của bạn..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                Gửi Tin Nhắn
              </button>
            </form>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default ContactPage;
