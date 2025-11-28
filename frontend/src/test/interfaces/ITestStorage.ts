import type { Product } from "./Product";

export interface ITestStorage {
  name: string;
  email: string;
  selectedCategories: string[];
  selectedProducts: Product[];
  hasMultiVitamins: boolean;
}