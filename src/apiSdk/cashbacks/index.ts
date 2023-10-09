import queryString from 'query-string';
import { CashbackInterface, CashbackGetQueryInterface } from 'interfaces/cashback';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCashbacks = async (
  query?: CashbackGetQueryInterface,
): Promise<PaginatedInterface<CashbackInterface>> => {
  return fetcher('/api/cashbacks', {}, query);
};

export const createCashback = async (cashback: CashbackInterface) => {
  return fetcher('/api/cashbacks', { method: 'POST', body: JSON.stringify(cashback) });
};

export const updateCashbackById = async (id: string, cashback: CashbackInterface) => {
  return fetcher(`/api/cashbacks/${id}`, { method: 'PUT', body: JSON.stringify(cashback) });
};

export const getCashbackById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/cashbacks/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteCashbackById = async (id: string) => {
  return fetcher(`/api/cashbacks/${id}`, { method: 'DELETE' });
};
