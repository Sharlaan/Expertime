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

  // Another idea would be to save totalItems and links in the Store, then retrieve it in any consuming page
  // this would prevent modifying the response interface to keep it simple (return response.json()) ?
  const totalItems = response.headers.get('X-Total-Count');

  /**
   * Header 'Link' format:
   * <http://localhost:3000/requests?_page=1&_limit=3>; rel="first", <http://localhost:3000/requests?_page=2&_limit=3>; rel="next", <http://localhost:3000/requests?_page=3&_limit=3>; rel="last"
   */
  const links = response.headers.get('Link');

  // =======  USELESS CODE thanks to v-pagination (but still nice to know)  =======

  // Extract url and pagination's name using regexp "named groups"
  // const results = links
  //   ? links.matchAll(/<(?<url>[\w:=\\/\d\\?&\\.]+)>; rel="(?<position>\w+)"(, |)/g)
  //   : null;

  // const paginationLinks = results
  //   ? Array.from(results).reduce(
  //       (pg, [fullmatch, url, position, comma]) => {
  //         pg[position as 'first' | 'prev' | 'next' | 'last'] = url;
  //         return pg;
  //       },
  //       { first: '', prev: '', next: '', last: '' },
  //     )
  //   : null;

  // Alternative implementation, more classic ...
  // const paginationLinks = links
  //   ? links.split(', ').reduce(
  //       (pl, l) => {
  //         const temp = l.split('; rel=');
  //         const lastWord = temp[1].replace(/"/g, '') as 'first' | 'prev' | 'next' | 'last';
  //         pl[lastWord] = temp[0].replace(/(<|>)/g, '');
  //         return pl;
  //       },
  //       { first: '', prev: '', next: '', last: '' },
  //     )
  // //   : null;

  // console.log('paginationLinks', paginationLinks);

  const items = (await response.json()) as R;
  return {
    items,
    ...(totalItems ? { totalItems: +totalItems } : {}),
    // ...(paginationLinks ? { paginationLinks } : {}),
  };
}
