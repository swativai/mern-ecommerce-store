import { baseAPI } from '../stores/base-api';
import type { CartItemType } from '../types/cart';

export const decrementQuantity = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    decrementCartQuantity: build.mutation<
      { message: string; data: CartItemType },
      { id: string; quantity: number }
    >({
      query: ({ id, quantity }) => ({
        url: `/decrementQuantity/${id}`,
        method: 'PUT',
        body: { quantity },
      }),
    }),
  }),
});

export const { useDecrementCartQuantityMutation } = decrementQuantity;
