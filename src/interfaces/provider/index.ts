import { BillPaymentInterface } from 'interfaces/bill-payment';
import { RechargeInterface } from 'interfaces/recharge';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ProviderInterface {
  id?: string;
  description?: string;
  status?: string;
  contact_number?: string;
  address?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  bill_payment?: BillPaymentInterface[];
  recharge?: RechargeInterface[];
  user?: UserInterface;
  _count?: {
    bill_payment?: number;
    recharge?: number;
  };
}

export interface ProviderGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  status?: string;
  contact_number?: string;
  address?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
