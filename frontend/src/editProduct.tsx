import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useGetSingleProductQuery } from './api/get-single-product';
import { useEditProductMutation } from './api/edit-product';
import { type ProductType } from './types/products';

// Define the shape of your product data

export const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data } = useGetSingleProductQuery(id ?? '');
  const [updateProduct] = useEditProductMutation();
  const [formData, setFormData] = useState<ProductType>({
    _id: '',
    name: '',
    company: '',
    price: '',
    image: '',
    description: '',
    category: '',
    quantity: 0,
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!id) return;
    await updateProduct({ id, data: formData });
  };
  return (
    <div className='p-10 max-w-2xl mx-auto space-y-5'>
      <h1 className='text-2xl font-bold'>Edit Product</h1>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        Back
      </button>
      <input
        name='name'
        value={formData.name}
        onChange={handleChange}
        placeholder='Name'
        className='border p-2 w-full'
      />
      <input
        name='company'
        value={formData.company}
        onChange={handleChange}
        placeholder='Company'
        className='border p-2 w-full'
      />
      <input
        name='price'
        value={formData.price}
        onChange={handleChange}
        placeholder='Price'
        className='border p-2 w-full'
      />
      <input
        name='image'
        value={formData.image}
        onChange={handleChange}
        placeholder='Image URL'
        className='border p-2 w-full'
      />
      <input
        name='quantity'
        type='number'
        placeholder='Quantity'
        value={formData.quantity}
        className='w-full px-4 py-2 border border-gray-300 rounded-md'
        onChange={handleChange}
        required
      />
      <input
        name='category'
        value={formData.category}
        onChange={handleChange}
        placeholder='Category'
        className='border p-2 w-full'
      />
      <textarea
        name='description'
        value={formData.description}
        onChange={handleChange}
        placeholder='Description'
        className='border p-2 w-full'
      />

      <button
        onClick={handleUpdate}
        className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
      >
        Update
      </button>
    </div>
  );
};
