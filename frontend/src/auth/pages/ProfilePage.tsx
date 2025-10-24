import React, { useEffect, useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";

const ProfilePage: React.FC = () => {
  const { user, checkAuth, updateProfile } = useAuthStore();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    if (!user) checkAuth();
  }, [user, checkAuth]);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [user]);

  const initials = (fullName || user?.email || "User")
    .split(" ")
    .map((s: string) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const onSave = async () => {
    setSaving(true);
    try {
      if (updateProfile) await updateProfile({ fullName, phone, address });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[90vw] w-4xl mx-auto bg-white shadow-md mt-10 rounded-lg overflow-hidden">
        <div className="flex p-6 items-center gap-6">
          <div className="md:w-28 md:h-28 w-16 h-16 aspect-square rounded-full bg-teal-400 flex items-center justify-center text-white text-3xl font-bold">
            {initials}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">
              {user?.fullName || user?.email || "Khách"}
            </h2>
            <p className="text-sm text-gray-500">
              Thành viên từ {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
            </p>
            <div className="mt-4 flex md:flex-row flex-col md:w-auto w-40 gap-3">
              <button
                onClick={() => setEditing((s) => !s)}
                className="md:px-4 md:py-3 px-3 py-2 bg-teal-500 text-white md:text-base text-sm rounded-full font-semibold"
              >
                {editing ? "Hủy" : "Chỉnh sửa hồ sơ"}
              </button>
              <button
                onClick={onSave}
                disabled={!editing || saving}
                className="md:px-4 md:py-3 px-3 py-2 bg-gray-100 text-gray-800 md:text-base text-sm rounded-full font-semibold disabled:opacity-50"
              >
                {saving ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-600">
                Họ và tên
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={!editing}
                className="mt-2 w-full p-3 border rounded-md bg-white"
                placeholder="Nhập họ và tên"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600">
                Email
              </label>
              <input
                value={user?.email || ""}
                disabled
                className="mt-2 w-full p-3 border rounded-md bg-gray-50 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600">
                Số điện thoại
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!editing}
                className="mt-2 w-full p-3 border rounded-md bg-white"
                placeholder="Ví dụ: +84 9xxxxxxx"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600">
                Địa chỉ
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={!editing}
                className="mt-2 w-full p-3 border rounded-md bg-white resize-none"
                rows={3}
                placeholder="Nhập địa chỉ giao hàng mặc định"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
