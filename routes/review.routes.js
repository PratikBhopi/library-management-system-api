const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.middlewares');
const reviewController = require('../controllers/review.controllers');

// Get all reviews for a book with pagination and filters
router.get('/books/:id/reviews', reviewController.getReviews);

// Get a specific review for a book
router.get('/books/:id/reviews/:reviewId', reviewController.getReviewById);

// Create a new review for a book (requires authentication)
router.post('/books/:id/reviews', authMiddleware, reviewController.createReview);

// Update a review (requires authentication)
router.put('/books/:id/reviews/:reviewId', authMiddleware, reviewController.updateReview);

// Delete a review (requires authentication)
router.delete('/books/:id/reviews/:reviewId', authMiddleware, reviewController.deleteReview);

module.exports = router; 