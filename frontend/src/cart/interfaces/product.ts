export type Product = {
  id: number;
  name: string;
  description?: string;
  price?: number;
  quantity?: number;
  subscription?: boolean;
  // subscriptionMonths: number of months for subscription (1,3,6,9,12). If absent or 0 -> not a subscription
  subscriptionMonths?: number;
  images?: string[];
};
