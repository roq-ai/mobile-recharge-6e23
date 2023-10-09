import queryString from 'query-string';
import { RechargeInterface, RechargeGetQueryInterface } from 'interfaces/recharge';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getRecharges = async (
  query?: RechargeGetQueryInterface,
): Promise<PaginatedInterface<RechargeInterface>> => {
  return fetcher('/api/recharges', {}, query);
};

export const createRecharge = async (recharge: RechargeInterface) => {
  return fetcher('/api/recharges', { method: 'POST', body: JSON.stringify(recharge) });
};

export const updateRechargeById = async (id: string, recharge: RechargeInterface) => {
  return fetcher(`/api/recharges/${id}`, { method: 'PUT', body: JSON.stringify(recharge) });
};

export const getRechargeById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/recharges/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteRechargeById = async (id: string) => {
  return fetcher(`/api/recharges/${id}`, { method: 'DELETE' });
};
