const Loan = require("../models/loan.model");
const { createLoanService } = require("../services/loan.services");
const Book = require("../models/Books.model");
const User = require("../models/Users.model");

exports.getLoans = async (req, res) => {
    try {
        let page = (req.query.page > 0) ? req.query.page : 1;
        let limit = req.query.limit || 10;
        let skip = (page - 1) * limit;
        let query = {};

        // Build filters
        if (req.query.status) {
            query.status = req.query.status;
        }
        if (req.query.user) {
            query.user = req.query.user;
        }
        if (req.query.book) {
            query.book = req.query.book;
        }

        const totalLoans = await Loan.countDocuments(query);
        if (totalLoans < skip) {
            throw new Error("No loans found");
        }

        const loans = await Loan.find(query)
            .populate('user', 'fullName email')
            .populate('book', 'title author')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, loans, totalLoans });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.getLoanById = async (req, res) => {
    try {
        const { id } = req.params;
        const loan = await Loan.findById(id)
            .populate('user', 'fullName email')
            .populate('book', 'title author');

        if (!loan) {
            return res.status(404).json({ success: false, message: "Loan not found" });
        }
        return res.status(200).json({ success: true, loan });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.createLoan = async (req, res) => {
    const { bookId } = req.body;
    try {
        const findBook = await Book.findOne({ bookId: bookId });
        if (!findBook) throw new Error('Book Does not Exist');
        
        if (findBook.stock <= 0) {
            throw new Error('Book is out of stock');
        }

        const loanData = {
            ...req.body,
            user: req.user._id
        };
        const loan = await createLoanService(loanData);
        await Book.findOneAndUpdate({ bookId: bookId }, { $inc: { stock: -1 } });
        return res.status(201).json({ success: true, loan });
    } catch (error) {

        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const loanExist = await Loan.findById(id);
        if (!loanExist) {
            return res.status(404).json({ success: false, message: "Loan Doesn't Exist" });
        }

        // If loan is being returned
        if (req.body.status === 'returned' && loanExist.status !== 'returned') {
            req.body.returnDate = new Date();
            // Update book stock
            await Book.findByIdAndUpdate(loanExist.book, { $inc: { stock: 1 } });
        }

        const updatedLoan = await Loan.findByIdAndUpdate(
            id,
            { $set: { ...req.body, updatedAt: Date.now() } },
            { new: true }
        ).populate('user', 'fullName email')
        .populate('book', 'title author');

        return res.status(200).json({ success: true, loan: updatedLoan });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const loanExist = await Loan.findById(id);
        if (!loanExist) {
            return res.status(404).json({ success: false, message: "Loan Doesn't exist" });
        }

        // If loan is not returned, update book stock
        if (loanExist.status !== 'returned') {
            await Book.findByIdAndUpdate(loanExist.book, {
                $inc: { stock: 1 }
            });
        }

        await Loan.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: 'Loan deleted' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};