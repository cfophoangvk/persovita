export interface PaymentProps {
  productCount?: number;
  totalVND?: number;
  onBack?: () => void;
  shippingSummary?: {
    address?: string;
    city?: string;
    country?: string;
  } | null;
}
