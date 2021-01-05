// type Props<T> = T extends T[] ? T[0] : T;
// export type QueryParams<T> = Partial<Record<keyof Props<T>, string>>;

export interface QueryParams {
  page: number; // required, so server returns the 'X-Total-Count' and 'Link' headers
  /**
   * LIKE search on campaignName field
   */
  query?: string;
  id?: number | null;
  brandId?: number | null;
  start?: number;
  limit?: number;
}

export interface FetchData {
  endpoint: Request['url'];
  params?: QueryParams;
  options?: RequestInit;
}

export interface PaginatedResults<T> {
  items: T[];
  totalItems: number;
  // paginationLinks: PaginationLinks;
}

// type PaginationLinks = {
//   [K in 'first' | 'prev' | 'next' | 'last']: string;
// };
