import { baseAPI, TAGS } from '../stores/base-api';
interface AddCartResponse {
  message?: string;
}
export const addCartAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    addCart: build.mutation<AddCartResponse, unknown>({
      invalidatesTags: [TAGS.PRODUCTS],
      query: (product) => ({
        url: '/cart',
        method: 'POST',
        body: product,
      }),
    }),
  }),
});

export const { useAddCartMutation } = addCartAPI;
