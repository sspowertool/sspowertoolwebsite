const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.post('/categories', async (req, res) => {
  const { name, color, subcategories } = req.body;
  const newCategory = new Category({ name, color, subcategories });
  await newCategory.save();
  res.json(newCategory);
});

router.get('/categories', async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

router.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  res.json({ message: 'Category deleted' });
});

router.put('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const { name, color, subcategories } = req.body;
  const updatedCategory = await Category.findByIdAndUpdate(id, { name, color, subcategories }, { new: true });
  res.json(updatedCategory);
});

module.exports = router;
