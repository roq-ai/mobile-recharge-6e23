import { UserInterface } from 'interfaces/user';
import { ProviderInterface } from 'interfaces/provider';
import { GetQueryInterface } from 'interfaces';

export interface RechargeInterface {
  id?: string;
  user_id: string;
  provider_id: string;
  amount: number;
  recharge_date?: any;
  recharge_status: string;
  recharge_type: string;
  transaction_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  provider?: ProviderInterface;
  _count?: {};
}

export interface RechargeGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  provider_id?: string;
  recharge_status?: string;
  recharge_type?: string;
  transaction_id?: string;
}
