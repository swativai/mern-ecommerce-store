export interface CartItemType {
  _id: string;
  productId: string;
  name: string;
  company: string;
  price: string; // Assuming price is stored as a string in DB
  image: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
