import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { useAddProductMutation } from './api/create-product';
import { useNavigate } from 'react-router-dom';

interface ProductFormData {
  name: string;
  company: string;
  price: string;
  image: string;
  description: string;
  category: string;
  quantity: number;
}

export const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    company: '',
    price: '',
    image: '',
    description: '',
    category: '',
    quantity: 0,
  });
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };
  const [addProduct] = useAddProductMutation();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await addProduct(formData).unwrap();
      alert('Product added successfully!');
      console.log(res);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <>
      <button
        onClick={handleBackClick}
        className='text-white absolute top-14 left-20  bg-blue-600  px-4 py-2 rounded'
      >
        Back
      </button>
      <h1 className='text-4xl font-bold mb-6 text-center'>Add New Product</h1>
      <form
        onSubmit={handleSubmit}
        className='space-y-4 p-4 max-w-md mx-auto bg-white rounded-xl shadow-md'
      >
        <input
          name='name'
          placeholder='Product Name'
          className='w-full px-4 py-2 border border-gray-300 rounded-md'
          onChange={handleChange}
          required
        />
        <input
          name='company'
          placeholder='Company'
          className='w-full px-4 py-2 border border-gray-300 rounded-md'
          onChange={handleChange}
          required
        />
        <input
          name='price'
          type='number'
          placeholder='Price'
          className='w-full px-4 py-2 border border-gray-300 rounded-md'
          onChange={handleChange}
          required
        />
        <input
          name='image'
          type='text'
          placeholder='Image URL'
          className='w-full px-4 py-2 border border-gray-300 rounded-md'
          onChange={handleChange}
          required
        />
        <input
          name='quantity'
          type='number'
          placeholder='Quantity'
          className='w-full px-4 py-2 border border-gray-300 rounded-md'
          onChange={handleChange}
          required
        />

        <input
          name='category'
          placeholder='Category'
          className='w-full px-4 py-2 border border-gray-300 rounded-md'
          onChange={handleChange}
          required
        />
        <textarea
          name='description'
          placeholder='Description'
          className='w-full px-4 py-2 border border-gray-300 rounded-md'
          onChange={handleChange}
          required
        />
        <button
          type='submit'
          className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md'
        >
          Add Product
        </button>
      </form>
    </>
  );
};
