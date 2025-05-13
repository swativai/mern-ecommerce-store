import { Provider } from 'react-redux';
import './App.css';
import { store } from './stores/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './home';
import { ProductDetails } from './productDetails';
import { AddProduct } from './addProduct';
import { EditProduct } from './editProduct';
import { Cart } from './cart';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/addProduct' element={<AddProduct />} />
            <Route path='/edit/:id' element={<EditProduct />} />
            <Route path='/cartProduct' element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
