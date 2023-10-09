import queryString from 'query-string';
import { BillPaymentInterface, BillPaymentGetQueryInterface } from 'interfaces/bill-payment';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBillPayments = async (
  query?: BillPaymentGetQueryInterface,
): Promise<PaginatedInterface<BillPaymentInterface>> => {
  return fetcher('/api/bill-payments', {}, query);
};

export const createBillPayment = async (billPayment: BillPaymentInterface) => {
  return fetcher('/api/bill-payments', { method: 'POST', body: JSON.stringify(billPayment) });
};

export const updateBillPaymentById = async (id: string, billPayment: BillPaymentInterface) => {
  return fetcher(`/api/bill-payments/${id}`, { method: 'PUT', body: JSON.stringify(billPayment) });
};

export const getBillPaymentById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/bill-payments/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteBillPaymentById = async (id: string) => {
  return fetcher(`/api/bill-payments/${id}`, { method: 'DELETE' });
};
