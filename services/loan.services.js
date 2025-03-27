const Loan = require("../models/loan.model");
const Book = require('../models/Books.model')

exports.createLoanService = async (loanData) => {
    try {
        const { bookId } = loanData;
        const findBook = await Book.findOne({ bookId: bookId });
        if (!findBook) throw new Error('Book Does not Exist');
        
        if (findBook.stock <= 0) {
            throw new Error('Book is out of stock');
        }

        const loan = new Loan({
            ...loanData,
            book: findBook._id, 
            status: 'borrowed'
        });
        await loan.save();
        await Book.findOneAndUpdate({ bookId: bookId }, { $inc: { stock: -1 } });
        return loan;
    } catch (error) {
        throw error;
    }
};
