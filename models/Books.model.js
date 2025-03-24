const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookId: String,
    title: String,
    author: String,
    description: String,
    category: String,
    stocks:Number,
    price:Number,
    image: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});



const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

