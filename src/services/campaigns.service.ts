import { CAMPAIGNS_URL } from '@/config';
import { Campaign } from '@/interfaces/Campaign';
import { QueryParams } from '@/interfaces/FetchData';
import fetchData from './http-common';

// Note: added 'page' query param by default to make sure to receive the 'X-Total-Count' header from json-server
export function getAllCampaigns(params?: QueryParams) {
  return fetchData<Campaign[]>({ endpoint: CAMPAIGNS_URL, params: { page: 1, ...params } });
}

export function getCampaign(id: Campaign['requestId']) {
  return fetchData<Campaign>({ endpoint: `${CAMPAIGNS_URL}/${id}` });
}

export function updateCampaign(id: Campaign['requestId'], payload: Omit<Campaign, 'requestId'>) {
  return fetchData<void>({
    endpoint: `${CAMPAIGNS_URL}/${id}`,
    options: { method: 'PATCH', body: JSON.stringify(payload) },
  });
}
