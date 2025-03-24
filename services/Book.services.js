const Book = require("../models/Book");

exports.createBookService = async (data) => {
    try {
        if(!data.title || !data.author || !data.category || !data.description || !data.price || !data.stock || !data.bookId){
            throw new Error("All fields are required");
        }
        const book = await Book.create(data);
        return book;
    } catch (error) {
        throw new Error(error.message);
    }
};



