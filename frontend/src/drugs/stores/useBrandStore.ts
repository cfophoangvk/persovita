import { create } from "zustand";
import type { BrandState } from "../interfaces/stores";
import axiosInstance from "../../utils/axios";

export const useBrandStore = create<BrandState>((set) => ({
  brands: [],
  success: false,
  message: "",
  isLoading: false,
  fetchBrands: async () => {
    set({ isLoading: true, success: false });
    try {
      // NOTE: keep the same relative path as before; backend proxy or absolute url may be used by caller
      const res = axiosInstance.get(`/brands`);
      const data = (await res).data;
      set({ brands: data.brands ?? [], success: true });
    } catch (error) {
      console.error("Error fetching brands:", error);
      set({ success: false, brands: [] });
    } finally {
      set({ isLoading: false });
    }
  },
}));
