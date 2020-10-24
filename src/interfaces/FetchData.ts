// type Props<T> = T extends T[] ? T[0] : T;
// export type QueryParams<T> = Partial<Record<keyof Props<T>, string>>;

export interface QueryParams {
  /**
   * LIKE search on campaignName field
   */
  query?: string;
  id?: number | null;
  brandId?: number | null;
  start?: number;
  page?: number;
  limit?: number;
}

export interface FetchData {
  endpoint: Request['url'];
  params?: QueryParams;
  options?: RequestInit;
}
