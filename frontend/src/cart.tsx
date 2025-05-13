import { useGetCartProductsQuery } from './api/get-cart-product';
import type { ProductType } from './types/products';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const { data: cartItems, isLoading, isError } = useGetCartProductsQuery({});
  const navigate = useNavigate();
  const totalPrice = cartItems?.reduce(
    (sum, item) => sum + parseFloat(item.price) * (item.quantity || 1),
    0,
  );

  if (isLoading) return <p className='text-center mt-10'>Loading cart...</p>;
  if (isError)
    return (
      <p className='text-center mt-10 text-red-500'>
        Failed to load cart items.
      </p>
    );

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className='max-w-6xl mx-auto p-5'>
      <h1 className='text-4xl font-bold mb-6 text-center'> Your Cart</h1>
      <button
        onClick={handleBackClick}
        className='bg-white text-blue-500 px-4 py-2 rounded'
      >
        Back
      </button>
      {cartItems?.length === 0 ? (
        <p className='text-center text-gray-500'>Your cart is empty.</p>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {cartItems?.map((item: ProductType) => (
              <div
                key={item._id}
                className='bg-white rounded-lg shadow-md p-4 flex flex-col items-center'
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-32 h-32 object-cover rounded-md mb-3'
                />
                <h2 className='text-xl font-semibold mb-1'>{item.name}</h2>
                <p className='text-sm text-gray-600 mb-1'>
                  Company: {item.company}
                </p>
                <p className='text-sm text-gray-600 mb-1'>
                  Category: {item.category}
                </p>
                <p className='text-lg font-bold mb-1 text-green-600'>
                  ₹ {item.price}
                </p>
                <div>
                  <p className='text-sm text-gray-600'>
                    Quantity: {item.quantity || 1}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-10 p-4 bg-gray-100 rounded-lg text-right'>
            <h2 className='text-2xl font-bold'>
              Total Price:{' '}
              <span className='text-green-700'>₹ {totalPrice?.toFixed(2)}</span>
            </h2>
          </div>
        </>
      )}
    </div>
  );
};
