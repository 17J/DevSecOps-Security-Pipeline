
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Since cart is managed on the frontend for now, just provide a simple endpoint
router.get('/', protect, (req, res) => {
  res.json({ message: "Cart API is working" });
});

module.exports = router;
