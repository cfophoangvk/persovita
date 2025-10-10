import { create } from "zustand";
import type { DrugState } from "../interfaces/stores";
import axiosInstance from "../../utils/axios";

export const useDrugStore = create<DrugState>((set) => ({
  drugs: [],
  related: [],
  drug: undefined,
  success: false,
  message: "",
  isLoading: false,
  filterDrugs: async (query: string) => {
    set({ isLoading: true, success: false });
    try {
      const res = await axiosInstance.get(`/products/filter?${query}`);
      const data = res.data;
      set({ drugs: data.products ?? [], success: true });
      return data;
    } catch (error) {
      console.error("Error filtering drugs:", error);
      set({ success: false, drugs: [] });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  getDrugById: async (id: string) => {
    set({ isLoading: true, success: false });
    try {
      const res = await axiosInstance.get(`/products/${id}`);
      const data = res.data;
      set({ drug: data.product ?? undefined, success: true });
      if (Array.isArray(data.related)) {
        set({ related: data.related });
      }
      return data;
    } catch (error) {
      console.error("Error fetching drug by ID:", error);
      set({ success: false, drug: undefined });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
}));
