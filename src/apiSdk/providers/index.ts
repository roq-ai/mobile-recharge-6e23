import queryString from 'query-string';
import { ProviderInterface, ProviderGetQueryInterface } from 'interfaces/provider';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getProviders = async (
  query?: ProviderGetQueryInterface,
): Promise<PaginatedInterface<ProviderInterface>> => {
  return fetcher('/api/providers', {}, query);
};

export const createProvider = async (provider: ProviderInterface) => {
  return fetcher('/api/providers', { method: 'POST', body: JSON.stringify(provider) });
};

export const updateProviderById = async (id: string, provider: ProviderInterface) => {
  return fetcher(`/api/providers/${id}`, { method: 'PUT', body: JSON.stringify(provider) });
};

export const getProviderById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/providers/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteProviderById = async (id: string) => {
  return fetcher(`/api/providers/${id}`, { method: 'DELETE' });
};
