export class PaymentEntity {
  id: number;
  subscriber_id: number;
  card_number: string;
  amount: number;
  status: 'success' | 'failed';
  error_message?: string;
  created_at: number;
}
