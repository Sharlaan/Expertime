import { CAMPAIGNS_URL } from '@/config';
import { Campaign } from '@/interfaces/Campaign';
import { PaginatedResults, QueryParams } from '@/interfaces/FetchData';
import fetchData from './http-common';

// Note: added 'page' query param by default to make sure to receive the 'X-Total-Count' header from json-server
export function getAllCampaigns(params?: QueryParams) {
  return fetchData<PaginatedResults<Campaign>>({
    endpoint: CAMPAIGNS_URL,
    params: { page: 1, ...params },
  });
}

export function getCampaign(id: Campaign['requestId']) {
  return fetchData<Campaign>({ endpoint: `${CAMPAIGNS_URL}/${id}` });
}

export function updateCampaign(
  id: Campaign['requestId'],
  payload: Partial<Omit<Campaign, 'requestId'>>,
) {
  // added '/edit' to prevent the custom-route proxyfying used for GET
  // also needed to prepend to each 'requests' data an 'id' property mirroring 'requestId', or else json-server would not find the item to modify
  return fetchData<void>({
    endpoint: `${CAMPAIGNS_URL}/${id}/edit`,
    options: { method: 'PATCH', body: JSON.stringify(payload) },
  });
}
