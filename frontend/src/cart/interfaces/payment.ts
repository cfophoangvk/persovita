export interface PaymentProps {
  productCount?: number;
  totalEur?: number;
  onBack?: () => void;
  shippingSummary?: {
    address?: string;
    city?: string;
    country?: string;
  } | null;
}
