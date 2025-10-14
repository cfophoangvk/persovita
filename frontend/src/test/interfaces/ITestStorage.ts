import type { Product } from "./Product";

export interface ITestStorage {
  name: string;
  email: string;
  selectedProducts: Product[];
}