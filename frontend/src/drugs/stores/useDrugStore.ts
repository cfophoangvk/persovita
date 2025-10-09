import { create } from "zustand";
import type { DrugState } from "../interfaces/stores";

export const useDrugStore = create<DrugState>((set) => ({
  drugs: [],
  success: false,
  message: "",
  isLoading: false,
  filterDrugs: async (query: string) => {
    set({ isLoading: true, success: false });
    try {
      // NOTE: keep the same relative path as before; backend proxy or absolute url may be used by caller
      const response = await fetch(`/api/products/filter?${query}`);
      const data = await response.json();
      set({ drugs: data.products ?? [], success: true });
      // return full response to caller so UI can read meta
      return data;
    } catch (error) {
      console.error("Error filtering drugs:", error);
      set({ success: false, drugs: [] });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
}));
