import { create } from "zustand";
import type { DrugState } from "../interfaces/stores";
import axiosInstance from "../../utils/axios";
import type { Drug } from "../interfaces/drug";
import { ProductService } from "../services/ProductService";

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
      const products = data.products as Drug[];
      const productService = new ProductService();
      for (let i = 0; i < products.length; i++) {
        products[i].images = await productService.getProductImages(Number(products[i].id));
      }
      set({ drugs: products, success: true });
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
      const product = data.product as Drug;
      const productService = new ProductService();
      product.images = await productService.getProductImages(Number(product.id));
      set({ drug: product ?? undefined, success: true });
      if (Array.isArray(data.related)) {
        const relatedProducts = data.related as Drug[];
        for (let i = 0; i < relatedProducts.length; i++) {
          relatedProducts[i].images = await productService.getProductImages(Number(relatedProducts[i].id));
        }
        set({ related: relatedProducts });
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
