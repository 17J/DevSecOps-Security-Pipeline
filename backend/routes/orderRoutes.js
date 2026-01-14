
const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getOrderById, 
  updateOrderToPaid, 
  getMyOrders 
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// Routes
router.route('/')
  .post(protect, createOrder);
router.route('/myorders')
  .get(protect, getMyOrders);
router.route('/:id')
  .get(protect, getOrderById);
router.route('/:id/pay')
  .put(protect, updateOrderToPaid);

module.exports = router;
