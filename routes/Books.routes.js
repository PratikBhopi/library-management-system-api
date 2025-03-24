const express = require('express');
const { getBookById, getBooks, createBook, updateBook, deleteBook } = require('../controllers/Books.controllers');
const { authMiddleware } = require('../middlewares/auth.middlewares');
const router = express.Router();

router.get('/',getBooks);

router.get('/:id',getBookById)

router.post('/',authMiddleware,createBook)

router.put('/:id',authMiddleware,updateBook)

router.delete('/:id',authMiddleware,deleteBook)

module.exports = router;

