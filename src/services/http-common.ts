import { API_URL } from '@/config';
import { FetchData, QueryParams } from '@/interfaces/FetchData';

// This would be used for EXACT search, instead of fulltext search using 'q='
// const stringifyParams = <T>(params?: QueryParams<T>) => {
//   return params && Object.keys(params).length
//     ? Object.entries(params).reduce((str, [key, value], index) => {
//         const isLastItem = index === Object.entries(params).length - 1;
//         return `${str}${key}=${value}${isLastItem ? '' : '&'}`;
//       }, '?')
//     : '';
// };

// json-server docs: https://github.com/typicode/json-server#filter
// Note: fulltext search seems to search using each character individually, instead of using all characters as a substring
// so changed for LIKE search on 'campaignName' field, since can't modify the server-side filtering logic
const stringifyParams = (params?: QueryParams) => {
  if (params === undefined || !Object.keys(params).length) return '';

  let queryParams = '';
  if (params.query) queryParams += `&campaignName_like=${params.query}`;
  // if (params.query) queryParams += `&q=${params.query}`;
  if (params.id) queryParams += `&requestId_like=${params.id}`;
  if (params.brandId) queryParams += `&brand.brandId=${params.brandId}`;
  if (params.start) queryParams += `&_start=${params.start}`;
  if (params.page) queryParams += `&_page=${params.page}`;
  if (params.limit) queryParams += `&_limit=${params.limit}`;

  return queryParams.replace(/^&/, '?');
};

const defaultFetchOptions = {
  headers: { 'Content-Type': 'application/json' },
} as RequestInit;

export default async function fetchData<R>({ endpoint, params, options }: FetchData) {
  const url = `${API_URL}${endpoint}${stringifyParams(params)}`;
  const response = await fetch(url, { ...defaultFetchOptions, ...options });

  // if (!response.ok) throw new Error(`ERROR ${response.status}: ${response.statusText}`);
  if (!response.ok) throw response;

  // Another idea would be to save totalItems in the Store, then retrieve it in any consuming page
  // this would prevent modifying the response interface to keep it simple (return response.json()) ?
  const totalItems = +(response.headers.get('X-Total-Count') || 0);
  const items = (await response.json()) as R;
  return { items, totalItems };
}
