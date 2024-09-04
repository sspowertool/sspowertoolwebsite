const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB Models
const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  categoryId: mongoose.ObjectId,
  subCategoryId: mongoose.ObjectId,
}));

const Category = mongoose.model('Category', new mongoose.Schema({
  name: String,
  color: String,
}));

const Item = mongoose.model('Item', new mongoose.Schema({
  brand: String,
  category: String,
  subCategory: String,
  size: String,
  pieces: Number,
  itemCode: String,
  photo: String,
  description: String,
  price: Number,
  discount: Number,
}));

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/api/test', (req, res) => {
  res.send('Test route is working');
});

// Fetch all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).send('Failed to fetch categories');
  }
});

// Fetch products based on category
app.get('/api/products', async (req, res) => {
  const { category } = req.query;
  try {
    const products = await Product.find({ categoryId: category });
    res.json(products);
  } catch (err) {
    res.status(500).send('Failed to fetch products');
  }
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
