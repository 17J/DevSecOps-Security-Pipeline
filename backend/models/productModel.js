
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Ladies', 'Men', 'Unisex'],
    required: true
  },
  occasion: {
    type: String,
    enum: ['Casual', 'Wedding', 'Special Occasion', 'Daily Use', 'Party', 'Date'],
    required: true
  },
  type: {
    type: String,
    enum: ['Body mist', 'Eau de Parfum', 'Eau de Toilette'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
