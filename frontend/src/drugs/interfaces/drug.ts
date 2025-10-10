import type { Brand } from "./brand";
import type { Feature } from "./feature";
import type { Ingredient } from "./ingredient";

interface Drug {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  brands: Brand[];
  features: Feature[];
  amount: number;
  activeIngredients: Ingredient[];
  additiveIngredients: string;
  usage: string;
  contraindication: string;
  related: Drug[];
}

export type { Drug };
