import { UserInterface } from 'interfaces/user';
import { ProviderInterface } from 'interfaces/provider';
import { GetQueryInterface } from 'interfaces';

export interface BillPaymentInterface {
  id?: string;
  user_id: string;
  provider_id: string;
  amount: number;
  payment_date?: any;
  payment_status: string;
  bill_type: string;
  transaction_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  provider?: ProviderInterface;
  _count?: {};
}

export interface BillPaymentGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  provider_id?: string;
  payment_status?: string;
  bill_type?: string;
  transaction_id?: string;
}
