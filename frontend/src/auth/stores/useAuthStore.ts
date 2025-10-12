import { create } from "zustand";
import { toast } from "react-hot-toast";
import type { AuthState } from "../interfaces/stores";
import axiosInstance from "../../utils/axios";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  success: false,
  message: "",
  resetUrl: "",
  isLoading: false,
  checkingAuth: true,

  signup: async ({ fullName, email, password, role }) => {
    set({ success: false, isLoading: true });

    try {
      const res = await axiosInstance.post("/auth/signup", {
        fullName,
        email,
        password,
        role,
      });
      set({ success: true, user: res.data.user, message: res.data.message });
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "An error occurred during signup"
      );
      console.log(error);
      set({ success: false });
    } finally {
      set({ isLoading: false });
    }
  },
  login: async ({ email, password }) => {
    set({ isLoading: true, success: false });

    try {
      const res = await axiosInstance.post("/auth/login", { email, password });

      set({ success: true, user: res.data.user, message: res.data.message });
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "An error occurred during login"
      );
      console.log(error);
      set({ success: false });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async (onSuccess?: () => void) => {
    set({ success: false });
    try {
      await axiosInstance.post("/auth/logout");
      set({ success: true, user: null });
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "An error occurred during logout"
      );
      console.log(error);
      set({ success: false });
    }
  },
  forgotPassword: async (email: string) => {
    set({ success: false, isLoading: true, message: "", resetUrl: "" });
    try {
      const res = await axiosInstance.post("/auth/forgot-password", { email });
      set({
        success: true,
        message: res.data.message,
        resetUrl: res.data.resetUrl,
      });
    } catch (error: any) {
      set({
        success: false,
        message: error.response?.data?.message,
        resetUrl: "",
      });
      console.log(error);
    } finally {
      set({ isLoading: false }); // Clear message after displaying it
    }
  },

  resetPassword: async (token: string, newPassword: string) => {
    set({ success: false, isLoading: true, message: "" });
    try {
      const res = await axiosInstance.post(`/auth/reset-password/${token}`, {
        newPassword,
      });
      set({ success: true, user: res.data.user, message: res.data.message });
      toast.success(res.data.message);
    } catch (error: any) {
      set({
        success: false,
      });
      toast.error(
        error.response?.data?.message ||
          "An error occurred during reset password"
      );
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check-auth");
      set({ success: true, user: res.data.user });
    } catch (error: any) {
      console.log(error.message);
      set({ success: false, user: null });
    } finally {
      set({ checkingAuth: false });
    }
  },
  updateProfile: async (data: {
    fullName?: string;
    phone?: string;
    address?: string;
  }) => {
    try {
      const res = await axiosInstance.post("/auth/update-profile", data);
      set({ success: true, user: res.data.user, message: res.data.message });
      toast.success(res.data.message || "Cập nhật hồ sơ thành công");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Cập nhật thất bại");
      console.log(error);
      set({ success: false });
    }
  },
}));
