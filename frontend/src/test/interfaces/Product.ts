export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  subscription: boolean;
  feature: string;
  image: string;
  // optional array of images used elsewhere in UI
  images?: string[];
  // months for subscription
  subscriptionMonths?: number;
}
