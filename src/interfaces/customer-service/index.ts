import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CustomerServiceInterface {
  id?: string;
  user_id: string;
  issue_type: string;
  issue_description: string;
  issue_status: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface CustomerServiceGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  issue_type?: string;
  issue_description?: string;
  issue_status?: string;
}
