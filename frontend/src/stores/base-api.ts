import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000',
});

export const TAGS = {
  PRODUCTS: 'Products',
  CUSTOMERS: 'Customers',
  CARTS: 'carts',
} as const;

export const baseAPI = createApi({
  reducerPath: 'baseAPI',
  baseQuery,
  tagTypes: Object.values(TAGS),
  endpoints: () => ({}),
});
