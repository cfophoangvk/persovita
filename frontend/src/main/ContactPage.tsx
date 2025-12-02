import React, { useEffect, useState } from "react";
import FadeInSection from "./components/FadeInSection";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
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
              <h3 className="font-semibold text-xl mb-4">Thông Tin Cơ Bản</h3>

              <ul className="text-gray-800 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-teal-500 mt-1">
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
                    <div className="text-sm text-black-500 font-bold">
                      Giờ mở cửa
                    </div>
                    <div className="text-sm font-medium">
                      8:00 - 17:00 (Thứ 2 - Thứ 7)
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-teal-500 mt-1">
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
                        d="M3 5h2l2 7-1 2a11 11 0 005 5l2-1 7 2v2H3V5z"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="text-sm text-black-500 font-bold">
                      Hotline
                    </div>
                    <div className="text-sm font-medium">
                      <a href="tel:0394914881" className="text-teal-600">
                        0394 914 881
                      </a>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-teal-500 mt-1">
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
                        d="M16 12a4 4 0 01-8 0 4 4 0 018 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="text-sm text-black-500 font-bold">
                      Email
                    </div>
                    <div className="text-sm font-medium">
                      <a
                        href="mailto:nourivitamin@gmail.com"
                        className="text-teal-600"
                      >
                        nourivitamin@gmail.com
                      </a>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-teal-500 mt-1">
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
                        d="M17.657 16.657L13.414 12l4.243-4.243M6.343 7.343L10.586 12l-4.243 4.243"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="text-sm text-black-500 font-bold">
                      Địa chỉ
                    </div>
                    <div className="text-sm font-medium">
                      Số 26 KCN Trường An, xã An Khánh, huyện Hoài Đức, Hà Nội,
                      Việt Nam
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-teal-500 mt-1">
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
                        d="M12 2a10 10 0 100 20 10 10 0 000-20z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2 12h20"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="text-sm text-black-500 font-bold">
                      Website
                    </div>
                    <div className="text-sm font-medium">
                      <a
                        href="https://nourivitamin.com/"
                        className="text-teal-600"
                      >
                        www.nourivitamin.com
                      </a>
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                <span className="text-sm text-black-500 font-bold">
                  Kết nối với chúng tôi
                </span>
                <div className="flex gap-3 ml-2">
                  <a
                    href="https://www.facebook.com/nourivitamin?mibextid=wwXIfr"
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600"
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
                    className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                    >
                      <path d="M168.1 32c3.8 22.4 18.8 36.9 39.9 39V96c-14.5.2-27.4-3.9-39-12v60.6c0 39.3-27.3 74.4-73 74.4C60.5 219 32 184.2 32 142.8 32 101.4 60.4 66.6 96 66.6c6.9 0 13.5 1 19.7 3v36.3c-5.8-2.9-12.3-4.5-19.1-4.5-22.4 0-40 19-40 41.7 0 22.6 17.5 41.6 40 41.6 24.1 0 38.4-16.9 38.4-37.8V32h33.1z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: CONTACT FORM */}
          <div className="bg-white rounded-lg p-6 shadow-md w-full h-full">
            <h3 className="font-semibold text-xl mb-3 ">
              Gửi tin nhắn cho NOURI
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 ">
              <div>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-4 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
                  placeholder="Họ và tên"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-4 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
                  placeholder="Email"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
                  placeholder="Nội dung"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition"
              >
                Gửi tin nhắn
              </button>
            </form>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default ContactPage;
