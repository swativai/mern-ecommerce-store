import { Link } from 'react-router-dom';
import { useGetAllProductsQuery } from './api/get-all-products';
import { useDeleteProductMutation } from './api/delete-product';
import { useAddCartMutation } from './api/Add-cart';
import { type ProductType } from './types/products';
import { useGetCartProductsQuery } from './api/get-cart-product';
import { IoCartOutline } from 'react-icons/io5';

export const Home = () => {
  const { data: backendData, isLoading, error } = useGetAllProductsQuery({});
  console.log(backendData, 'backendData');
  const [addToCart] = useAddCartMutation();
  const { data, isLoading: cartLoading } = useGetCartProductsQuery({});

  const [deleteProduct] = useDeleteProductMutation();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products</p>;
  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };
  const totalItems = data?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleAddToCart = async (product: ProductType) => {
    try {
      const response = await addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        company: product.company,
      }).unwrap();

      if (response?.message === 'Quantity limit reached') {
        alert('Stock limit reached!');
      } else {
        alert('Product added to cart!');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      alert('Failed to add to cart');
    }
  };
  return (
    <div>
      <div className='flex justify-between items-center px-10 py-6 bg-white shadow-md sticky top-0 z-50'>
        <h1 className='text-5xl font-extrabold text-purple-700 tracking-wide'>
          Products
        </h1>
        <div className='flex items-center gap-6'>
          <div className='flex bg-amber-400 rounded-full px-4 py-2 text-white shadow-lg'>
            <Link
              to={'/cartProduct'}
              className='flex justify-center items-center gap-2 font-medium'
            >
              <IoCartOutline className='size-6' />
              <p>{cartLoading ? 'Loading...' : totalItems}</p>
            </Link>
          </div>

          <Link to='/addProduct'>
            <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition duration-300'>
              Add Product
            </button>
          </Link>
        </div>
      </div>

      <div className='flex flex-wrap justify-center gap-8 p-10'>
        {backendData?.map((product) => (
          <div
            key={product._id}
            className='bg-purple-100 flex flex-col w-72 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300'
          >
            <Link to={`/product/${product._id}`}>
              <div className='flex flex-col items-center gap-4'>
                <h2 className='text-xl font-bold text-center text-purple-800'>
                  {product.name}
                </h2>
                <img
                  src={product.image}
                  alt={product.name}
                  className='w-40 h-40 rounded-xl object-cover shadow-md'
                />
                <p className='text-sm text-gray-700'>
                  Company: {product.company}
                </p>
                <p className='text-lg font-semibold text-green-700'>
                  Price: ₹{product.price}
                </p>
              </div>
            </Link>
            <div className='mt-4 flex flex-col gap-3'>
              <button
                className='bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                onClick={() => handleAddToCart(product)}
              >
                Add To Cart
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition duration-300'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
