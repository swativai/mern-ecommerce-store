import { baseAPI, TAGS } from '../stores/base-api';
import type { ProductType } from '../types/products';

export const getSingleProductAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getSingleProduct: build.query<ProductType, string>({
      providesTags: (_result, _error, id) => [{ type: TAGS.PRODUCTS, id }],
      query: (id) => ({
        url: `/products/${id}`,
      }),
    }),
  }),
});

export const { useGetSingleProductQuery } = getSingleProductAPI;
