import { baseAPI } from '../stores/base-api';
import type { CartItemType } from '../types/cart';

export const incrementQuantity = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    incrementCartQuantity: build.mutation<
      { message: string; data: CartItemType },
      { id: string; quantity: number }
    >({
      query: ({ id, quantity }) => ({
        url: `/incrementQuantity/${id}`,
        method: 'PUT',
        body: { quantity },
      }),
    }),
  }),
});

export const { useIncrementCartQuantityMutation } = incrementQuantity;
