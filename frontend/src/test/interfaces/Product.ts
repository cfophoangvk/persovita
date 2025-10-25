export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  subscription: boolean;
  feature: string;
  image: string;
  subscriptionMonths?: number;
  amount: number;
  activeIngredients: {
    name: string,
    amount: string
  }[],
  additiveIngredients: string,
  usage: string,
  contraindication: string
}
