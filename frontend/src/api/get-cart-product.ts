import { baseAPI, TAGS } from '../stores/base-api';
import type { ProductType } from '../types/products';

export const getCartProductsAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getCartProducts: build.query<ProductType[], unknown>({
      providesTags: [TAGS.PRODUCTS],
      query: () => ({
        url: '/cart',
      }),
    }),
  }),
});

export const { useGetCartProductsQuery } = getCartProductsAPI;
