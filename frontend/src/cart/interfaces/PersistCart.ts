export type PersistCart = {
  userId: number | null;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subscription: boolean;
  subscriptionMonths: number;
  image: string;
};
