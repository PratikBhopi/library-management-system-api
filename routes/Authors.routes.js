const express = require('express');
const { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require('../controllers/Authors.controllers');
const { authMiddleware } = require('../middlewares/auth.middlewares');
const router = express.Router();

// Public routes
router.get('/', getAuthors);
router.get('/:id', getAuthorById);

// Protected routes (require authentication)
router.post('/', authMiddleware, createAuthor);
router.put('/:id', authMiddleware, updateAuthor);
router.delete('/:id', authMiddleware, deleteAuthor);

module.exports = router;
