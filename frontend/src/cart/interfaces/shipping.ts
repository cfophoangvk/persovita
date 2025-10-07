export type ShippingMethod = {
  id: string;
  title: string;
  subtitle?: string;
  price: number | "Free";
};
