import { create } from "zustand";
import type { FeatureState } from "../interfaces/stores";
import axiosInstance from "../../utils/axios";

export const useFeatureStore = create<FeatureState>((set) => ({
  features: [],
  success: false,
  message: "",
  isLoading: false,

  fetchFeatures: async () => {
    set({ isLoading: true, success: false });
    try {
      // NOTE: keep the same relative path as before; backend proxy or absolute url may be used by caller
      const res = axiosInstance.get(`/features`);
      const data = (await res).data;
      set({ features: data.features ?? [], success: true });
    } catch (error) {
      console.error("Error fetching features:", error);
      set({ success: false, features: [] });
    } finally {
      set({ isLoading: false });
    }
  },
}));
