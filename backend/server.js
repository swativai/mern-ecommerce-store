const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Products = require('./models/products');
const Customer = require('./models/customer');
const Cart = require('./models/addToCart');

const app = express();
app.use(cors());
app.use(express.json());

// connect data base to the server
mongoose
  .connect(
    'mongodb+srv://swativaidya55:mukul2910@cluster0.bn6su8q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  )
  .then(() => console.log('MongoDb is connected'))
  .catch((err) => console.log('MongoDb Error:', err));

// get the product data from the data base
app.get('/products', async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// get the product data from the data base by id
app.get('/products/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Products.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// delete product by id
app.delete('/deleteProduct/:id', async (req, res) => {
  try {
    const deletedProduct = await Products.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting product', error: error.message });
  }
});

// create a new product in the database
app.post('/addProducts', async (req, res) => {
  try {
    const { name, company, price, description, image, category, quantity } =
      req.body;

    await Products.create({
      name,
      company,
      price: Number(price),
      description,
      category,
      image,
      quantity,
    });
    res.status(201).json({
      message: 'Customer created successfully',
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// create new  customer in the database
app.post('/customers', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await Customer.create({
      name,
      email,
      password,
    });
    res.status(201).json({
      message: 'Customer created successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Edit product by id
app.put('/editProduct/:id', async (req, res) => {
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    console.log('Error in product edit', error);
    res
      .status(500)
      .json({ message: 'Error in product edit', error: error.message });
  }
});

// app.post('/cart', async (req, res) => {
//   try {
//     const cartItem = new Cart(req.body);
//     await cartItem.save();
//     res.status(201).json({ message: 'Product added to cart', cartItem });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to add to cart', error });
//   }
// });

app.post('/cart', async (req, res) => {
  try {
    const { productId, name, price, image, company } = req.body;

    // Step 1: Check product stock
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingItem = await Cart.findOne({ productId });

    if (existingItem) {
      if (existingItem.quantity < product.quantity) {
        existingItem.quantity += 1;
        await existingItem.save();
        return res
          .status(200)
          .json({ message: 'Cart updated', cartItem: existingItem });
      } else {
        return res.status(400).json({ message: 'Quantity limit reached' });
      }
    } else {
      const newItem = new Cart({
        productId,
        name,
        price,
        image,
        company,
        quantity: 1,
      });
      await newItem.save();
      return res
        .status(201)
        .json({ message: 'Product added to cart', cartItem: newItem });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Failed to add to cart', error });
  }
});

app.get('/cart', async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart', error });
  }
});

app.delete('/deleteCart/:id', async (req, res) => {
  const { id } = req.params;
  await Cart.findByIdAndDelete(id);
  res.status(200).json({ message: 'Item deleted from cart' });
});

app.put('/incrementQuantity/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }
    const updateCartItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: { quantity } },
      { new: true, runValidators: true },
    );

    if (!updateCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({
      message: 'Cart quantity updated successfully',
      data: updateCartItem,
    });
  } catch (error) {
    console.log('Error updating cart quantity', error);
    res.status(500).json({
      message: 'Error updating cart quantity',
      error: error.message,
    });
  }
});
app.put('/decrementQuantity/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }
    const updateCartItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: { quantity } },
      { new: true, runValidators: true },
    );

    if (!updateCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({
      message: 'Cart quantity updated successfully',
      data: updateCartItem,
    });
  } catch (error) {
    console.log('Error updating cart quantity', error);
    res.status(500).json({
      message: 'Error updating cart quantity',
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log('Server is Started at Port : 5000');
});
