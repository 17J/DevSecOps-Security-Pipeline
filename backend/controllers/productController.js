
const Product = require('../models/productModel');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    // Get query parameters for filtering
    const { gender, occasion, type, brand, minPrice, maxPrice } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (gender) filter.gender = gender;
    if (occasion) filter.occasion = occasion;
    if (type) filter.type = type;
    if (brand) filter.brand = brand;
    
    // Price filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const { 
      name, 
      brand, 
      description, 
      category, 
      gender, 
      occasion, 
      type, 
      price, 
      image, 
      countInStock 
    } = req.body;

    const product = new Product({
      name,
      brand,
      description,
      category,
      gender,
      occasion,
      type,
      price,
      image,
      countInStock,
      rating: 0,
      numReviews: 0
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct };
