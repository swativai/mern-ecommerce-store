import { useDecrementCartQuantityMutation } from './api/decrement-cart-quantity';
import { useDeleteCartItemMutation } from './api/delete-cart';
import { useGetCartProductsQuery } from './api/get-cart-product';
import { useIncrementCartQuantityMutation } from './api/increment-cart-quantity';

import type { ProductType } from './types/products';
import { useNavigate } from 'react-router-dom';
import { useGetAllProductsQuery } from './api/get-all-products';

export const Cart = () => {
  const {
    data: cartItems,
    isLoading,
    isError,
    refetch,
  } = useGetCartProductsQuery({});
  // console.log('CartItem', cartItems);
  const { data: backendData } = useGetAllProductsQuery({});
  // console.log('allProductData', backendData);

  const [incrementQuantity] = useIncrementCartQuantityMutation();
  const [decrementQuantity] = useDecrementCartQuantityMutation();
  const [deleteProduct] = useDeleteCartItemMutation();
  const navigate = useNavigate();
  const totalPrice = cartItems?.reduce(
    (sum, item) => sum + parseFloat(item.price) * (item.quantity || 1),
    0,
  );
  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };
  const handleIncrement = async (item: ProductType) => {
    try {
      await incrementQuantity({
        id: item._id,
        quantity: item.quantity + 1,
      }).unwrap();
      refetch();
    } catch (error) {
      console.error('Error increasing quantity', error);
    }
  };

  const handleDecrement = async (item: ProductType) => {
    try {
      await decrementQuantity({
        id: item._id,
        quantity: item.quantity - 1,
      }).unwrap();
      refetch();
    } catch (error) {
      console.error('Error decreasing quantity', error);
    }
  };

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
        className='text-white absolute top-14 left-20  bg-blue-600  px-4 py-2 rounded'
      >
        Back
      </button>
      {cartItems?.length === 0 ? (
        <p className='text-center text-gray-500'>Your cart is empty.</p>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {cartItems?.map((item: ProductType) => {
              const product = backendData?.find(
                (p) => p._id === item.productId,
              );

              // console.log('product quantity', product);

              return (
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
                  <span className='text-lg font-medium'>
                    Quantity: {item.quantity}
                  </span>
                  {/* <div>
                  <p className='text-sm text-gray-600'>
                    Quantity: {item.quantity || 1}
                  </p>
                </div> */}
                  <div className='flex items-center gap-3 mb-2'>
                    <button
                      className='bg-gray-300 px-3 py-1 rounded text-lg font-bold'
                      onClick={() => {
                        handleDecrement(item);
                      }}
                    >
                      -
                    </button>

                    <span className='text-lg font-medium'>{item.quantity}</span>

                    <button
                      className={`px-3 py-1 rounded text-lg font-bold ${
                        item.quantity === product?.quantity
                          ? 'bg-gray-300 cursor-not-allowed opacity-40'
                          : 'bg-gray-300 '
                      }`}
                      onClick={() => {
                        handleIncrement(item);
                      }}
                      disabled={item.quantity === product?.quantity}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition duration-300'
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>

          <div className='mt-10 p-4 bg-gray-100 rounded-lg text-right'>
            <h2 className='text-2xl font-bold'>
              Total Price:
              <span className='text-green-700'>₹ {totalPrice?.toFixed(2)}</span>
            </h2>
          </div>
        </>
      )}
    </div>
  );
};
