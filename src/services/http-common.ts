import { API_URL } from '@/config';
import { FetchData, QueryParams } from '@/interfaces/FetchData';

const stringifyParams = <T>(params?: QueryParams<T>) => {
  return params && Object.keys(params)
    ? Object.entries(params).reduce((str, [key, value], index) => {
        const isLastItem = index === Object.entries(params).length - 1;
        return `${str}${key}=${value}${isLastItem ? '' : '&'}`;
      }, '?')
    : '';
};

const defaultFetchOptions = {
  headers: { 'Content-Type': 'application/json' },
} as RequestInit;

export default async function fetchData<R>({ endpoint, params, options }: FetchData<R>) {
  const url = `${API_URL}${endpoint}${stringifyParams(params)}`;
  const response = await fetch(url, { ...defaultFetchOptions, ...options });

  // if (!response.ok) throw new Error(`ERROR ${response.status}: ${response.statusText}`);
  if (!response.ok) throw response;
  return response.json() as Promise<R>;
}
