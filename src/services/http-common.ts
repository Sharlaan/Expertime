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
const stringifyParams = (params?: QueryParams) => {
  if (params === undefined || !Object.keys(params).length) return '';

  let queryParams = '';
  if (params.query) queryParams += `&q=${params.query}`;
  if (params.brandId) queryParams += `&brand.brandId=${params.brandId}`;
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
  return response.json() as Promise<R>;
}
