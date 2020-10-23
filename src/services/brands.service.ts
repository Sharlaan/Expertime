import { BRANDS_URL } from '@/config';
import { QueryParams } from '@/interfaces/FetchData';
import { Brand } from '../interfaces/Brand';
import fetchData from './http-common';

export function getAllBrands(params?: QueryParams) {
  return fetchData<Brand[]>({ endpoint: BRANDS_URL, params });
}
