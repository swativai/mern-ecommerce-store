import { baseAPI, TAGS } from '../stores/base-api';
import type { ProductType } from '../types/products';

export const getAllProductsAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query<ProductType[], unknown>({
      providesTags: [TAGS.PRODUCTS],
      query: () => ({
        url: '/products',
      }),
    }),
  }),
});

export const { useGetAllProductsQuery } = getAllProductsAPI;
