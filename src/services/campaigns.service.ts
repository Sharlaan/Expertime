import { CAMPAIGNS_URL } from '@/config';
import { Campaign } from '@/interfaces/Campaign';
import { QueryParams } from '@/interfaces/FetchData';
import fetchData from './http-common';

export function getAll(params?: QueryParams<Campaign>) {
  // @ts-ignore
  return fetchData<Campaign[]>({ endpoint: CAMPAIGNS_URL, params });
}

export function get(id: Campaign['requestId']) {
  return fetchData<Campaign>({ endpoint: `${CAMPAIGNS_URL}/${id}` });
}

export function update(id: Campaign['requestId'], payload: Omit<Campaign, 'requestId'>) {
  return fetchData<void>({
    endpoint: `${CAMPAIGNS_URL}/${id}`,
    options: { method: 'PATCH', body: JSON.stringify(payload) },
  });
}
