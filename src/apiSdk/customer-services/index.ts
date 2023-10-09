import queryString from 'query-string';
import { CustomerServiceInterface, CustomerServiceGetQueryInterface } from 'interfaces/customer-service';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCustomerServices = async (
  query?: CustomerServiceGetQueryInterface,
): Promise<PaginatedInterface<CustomerServiceInterface>> => {
  return fetcher('/api/customer-services', {}, query);
};

export const createCustomerService = async (customerService: CustomerServiceInterface) => {
  return fetcher('/api/customer-services', { method: 'POST', body: JSON.stringify(customerService) });
};

export const updateCustomerServiceById = async (id: string, customerService: CustomerServiceInterface) => {
  return fetcher(`/api/customer-services/${id}`, { method: 'PUT', body: JSON.stringify(customerService) });
};

export const getCustomerServiceById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/customer-services/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteCustomerServiceById = async (id: string) => {
  return fetcher(`/api/customer-services/${id}`, { method: 'DELETE' });
};
