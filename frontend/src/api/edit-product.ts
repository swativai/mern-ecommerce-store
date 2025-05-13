import { baseAPI, TAGS } from '../stores/base-api';
import type { ProductType } from '../types/products';

export const editProductApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    editProduct: builder.mutation<unknown, { id: string; data: ProductType }>({
      invalidatesTags: (_result, _error, { id }) => [
        { type: TAGS.PRODUCTS, id },
        TAGS.PRODUCTS,
      ],
      query: ({ id, data }) => ({
        url: `/editProduct/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const { useEditProductMutation } = editProductApi;
