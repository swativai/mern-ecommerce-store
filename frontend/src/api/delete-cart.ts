import { baseAPI } from '../stores/base-api';

export const deleteCartAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    deleteCartItem: build.mutation({
      query: (id) => ({
        url: `/deleteCart/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useDeleteCartItemMutation } = deleteCartAPI;
