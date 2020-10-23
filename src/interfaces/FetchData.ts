type Props<T> = T extends T[] ? T[0] : T;

export type QueryParams<T> = Partial<Record<keyof Props<T>, string>>;

export interface FetchData<T> {
  endpoint: Request['url'];
  params?: QueryParams<T>;
  options?: RequestInit;
}
