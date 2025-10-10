import type { Brand } from "./brand";
import type { Drug } from "./drug";
import type { Feature } from "./feature";

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface FilterResponse {
  success: boolean;
  products: Drug[];
  meta?: Meta;
}

interface DrugState {
  drugs: Drug[];
  related: Drug[];
  drug: Drug | undefined;
  success: boolean;
  message: string;
  isLoading: boolean;
  // now returns the API response (or null on error)
  filterDrugs: (query: string) => Promise<FilterResponse | null>;
  getDrugById: (id: string) => Promise<void | undefined>;
}

interface BrandState {
  brands: Brand[];
  success: boolean;
  message: string;
  isLoading: boolean;
  // now returns the API response (or null on error)
  fetchBrands: () => Promise<void>;
}

interface FeatureState {
  features: Feature[];
  success: boolean;
  message: string;
  isLoading: boolean;
  // now returns the API response (or null on error)
  fetchFeatures: () => Promise<void>;
}
export type { DrugState, BrandState, FeatureState };
