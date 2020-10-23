// type Props<T> = T extends T[] ? T[0] : T;
// export type QueryParams<T> = Partial<Record<keyof Props<T>, string>>;

export interface QueryParams {
  query?: string; // fulltext search
  brandId?: number | null;
  page?: number;
  limit?: number;
}

export interface FetchData {
  endpoint: Request['url'];
  params?: QueryParams;
  options?: RequestInit;
}
