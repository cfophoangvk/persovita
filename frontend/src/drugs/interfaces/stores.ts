import type { Drug } from "./drug";

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
  success: boolean;
  message: string;
  isLoading: boolean;
  // now returns the API response (or null on error)
  filterDrugs: (query: string) => Promise<FilterResponse | null>;
}
export type { DrugState };
