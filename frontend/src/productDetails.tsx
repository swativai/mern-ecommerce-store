import { useNavigate, useParams } from 'react-router-dom';
import { useGetSingleProductQuery } from './api/get-single-product';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const { data: product } = useGetSingleProductQuery(id ?? '');

  return (
    <div className='min-h-screen bg-gray-100 px-6 py-10'>
      <button
        onClick={handleBackClick}
        className='text-white absolute top-6 left-6 bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2 rounded-full shadow-md hover:scale-105 transition'
      >
        ⬅ Back
      </button>

      <div
        key={product?._id}
        className='max-w-6xl mx-auto mt-20 bg-white rounded-3xl shadow-2xl p-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center'
      >
        <div className='flex flex-col items-center space-y-6'>
          <img
            src={product?.image}
            alt={product?.name}
            className='w-full max-w-sm rounded-2xl shadow-xl border border-gray-200'
          />
          <h1 className='text-3xl font-extrabold text-gray-800'>
            {product?.name}
          </h1>
        </div>

        <div className='space-y-5'>
          <p className='text-lg text-gray-700 leading-relaxed'>
            {product?.description}
          </p>
          <p className='text-xl font-semibold text-green-600'>
            Price: ₹{product?.price}
          </p>
          <p className='text-lg text-gray-700'>
            Company: <span className='font-medium'>{product?.company}</span>
          </p>
          <p className='text-lg text-gray-700'>
            Category: <span className='font-medium'>{product?.category}</span>
          </p>
          {/* <p className='text-lg'>Quantity: {product?.quantity}</p> */}
        </div>
      </div>

      <div className='flex justify-center mt-10'>
        <button
          onClick={() => navigate(`/edit/${product?._id}`)}
          className='bg-yellow-500 text-white px-6 py-3 rounded-full font-medium hover:bg-yellow-600 hover:scale-105 transition shadow-lg'
        >
          ✏️ Edit Product
        </button>
      </div>
    </div>
  );
};
