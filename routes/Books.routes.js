const express = require('express');
const { getBookById, getBooks, createBook, updateBook, deleteBook, bookCoverUpload } = require('../controllers/Books.controllers');
const { authMiddleware } = require('../middlewares/auth.middlewares');
const upload= require('../middlewares/upload.middleware');
const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', authMiddleware, createBook);
router.put('/:id', authMiddleware, updateBook);
router.delete('/:id', authMiddleware, deleteBook);
router.post('/:id/upload-cover', authMiddleware, upload.single('image'), bookCoverUpload);

module.exports = router;

