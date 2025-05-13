import { baseAPI, TAGS } from '../stores/base-api';

export const deleteProductApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    deleteProduct: builder.mutation<unknown, string>({
      invalidatesTags: (_result, _error, id) => [{ type: TAGS.PRODUCTS, id }],
      query: (id) => ({
        url: `/deleteProduct/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useDeleteProductMutation } = deleteProductApi;
