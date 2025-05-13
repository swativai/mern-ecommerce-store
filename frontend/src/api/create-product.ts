import { baseAPI, TAGS } from '../stores/base-api';
interface ProductFormData {
  name: string;
  company: string;
  price: string;
  image: string;
  description: string;
  category: string;
}
export const addProductAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    addProduct: build.mutation<unknown, ProductFormData>({
      invalidatesTags: [TAGS.PRODUCTS],
      query: (newProduct) => ({
        url: '/addProducts',
        method: 'POST',
        body: newProduct,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useAddProductMutation } = addProductAPI;
