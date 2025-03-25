const Loan = require("../models/loan.model");
const { createLoanService } = require("../services/loan.services");
const Book = require("../models/book.model");

exports.getLoans = async (req, res) => {
    try {
        let page = (req.query.page > 0) ? req.query.page : 1 || 1;
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
            .populate('user', 'name email')
            .populate('book', 'title author')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, loans, totalLoans });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getLoanById = async (req, res) => {
    try {
        const { id } = req.params;
        const loan = await Loan.findById(id)
            .populate('user', 'name email')
            .populate('book', 'title author');

        if (!loan) {
            return res.status(404).json({ success: false, message: "Loan not found" });
        }
        res.status(200).json({ success: true, loan });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createLoan = async (req, res) => {
    try {
        const loanData = {
            ...req.body,
            user: req.user._id // Get user ID from auth middleware
        };
        const loan = await createLoanService(loanData);
        res.status(201).json({ success: true, loan });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
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
            await Book.findByIdAndUpdate(loanExist.book, {
                $inc: { stock: 1 }
            });
        }

        const updatedLoan = await Loan.findByIdAndUpdate(
            id,
            { $set: { ...req.body, updatedAt: Date.now() } },
            { new: true }
        ).populate('user', 'name email')
            .populate('book', 'title author');

        res.status(200).json({ success: true, loan: updatedLoan });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
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

        // await Loan.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: 'Loan deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}; 