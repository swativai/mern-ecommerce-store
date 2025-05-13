import { useNavigate, useParams } from 'react-router-dom';
import { useGetSingleProductQuery } from './api/get-single-product';

export const ProductDetails = () => {
  const { id } = useParams();
  // console.log(id, 'id');
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const { data: product } = useGetSingleProductQuery(id ?? '');
  // console.log(product, 'product');
  return (
    <div>
      <button
        onClick={handleBackClick}
        className='bg-white text-blue-500 px-4 py-2 rounded'
      >
        Back
      </button>
      <button
        onClick={() => navigate(`/edit/${product?._id}`)}
        className='bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600'
      >
        Edit
      </button>
      <div
        key={product?._id}
        className='flex flex-1/2 gap-10 items-center justify-center'
      >
        <div className='flex space-y-4 flex-col items-center justify-center'>
          <img
            src={product?.image}
            alt={product?.name}
            className='w-full rounded-2xl shadow-xl drop-shadow-amber-50'
          />
          <h1 className='text-2xl font-bold'>{product?.name}</h1>
        </div>
        <div className='flex flex-col space-y-4'>
          <p className='text-lg'>{product?.description}</p>
          <p className='text-lg'>Price: INR {product?.price}</p>
          <p className='text-lg'>Company: {product?.company}</p>
          <p className='text-lg'>Category: {product?.category}</p>
          {/* <p className='text-lg'>Quantity: {product?.quantity}</p> */}
        </div>
      </div>
    </div>
  );
};
