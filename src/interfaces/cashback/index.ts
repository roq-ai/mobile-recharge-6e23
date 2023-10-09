import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CashbackInterface {
  id?: string;
  user_id: string;
  amount: number;
  cashback_date?: any;
  status: string;
  source: string;
  transaction_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface CashbackGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  status?: string;
  source?: string;
  transaction_id?: string;
}
