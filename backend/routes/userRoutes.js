
const express = require('express');
const router = express.Router();
const { 
  authUser, 
  registerUser, 
  getUserProfile 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Routes
router.post('/login', authUser);
router.post('/', registerUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
