const Review = require("../models/Review.model");
const { createReviewService } = require("../services/Reviews.services");
const Book = require("../models/Books.model");

exports.getReviews = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findOne({ bookId: bookId });
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        let page = (req.query.page > 0) ? req.query.page : 1;
        let limit = req.query.limit || 10;
        let skip = (page - 1) * limit;
        let query = { book: book._id };  // Using book's MongoDB ObjectId

        // Build filters
        if (req.query.ratings) {
            query.ratings = req.query.ratings;
        }

        const totalReviews = await Review.countDocuments(query);
        if (totalReviews < skip) {
            throw new Error("No reviews found");
        }

        const reviews = await Review.find(query)
            .populate('user', 'fullName email')
            .populate('book', 'title author')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, reviews, totalReviews });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const { id, reviewId } = req.params;
        const review = await Review.findOne({ 
            _id: reviewId,
            book: id 
        })
        .populate('user', 'fullName email')
        .populate('book', 'title author');

        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }
        return res.status(200).json({ success: true, review });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.createReview = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findOne({ bookId: id });  
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        // Check if user has already reviewed this book
        const existingReview = await Review.findOne({
            user: req.user._id,
            book: book._id  
        });

        if (existingReview) {
            return res.status(400).json({ 
                success: false, 
                message: "You have already reviewed this book" 
            });
        }

        const reviewData = {
            ...req.body,
            user: req.user._id,
            book: book._id  
        };

        const review = await createReviewService(reviewData);
        return res.status(201).json({ success: true, review });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const { id, reviewId } = req.params;
        const book = await Book.findOne({ bookId: id });
        
        const review = await Review.findOne({
            _id: reviewId,
            book: book._id,
            user: req.user._id  
        });

        if (!review) {
            return res.status(404).json({ 
                success: false, 
                message: "Review not found or unauthorized" 
            });
        }

        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { $set: { ...req.body, updatedAt: Date.now() } },
            { new: true }
        )
        .populate('user', 'name email')
        .populate('book', 'title author');

        return res.status(200).json({ success: true, review: updatedReview });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const { id, reviewId } = req.params;
        const book = await Book.findOne({ bookId: id });
        const review = await Review.findOne({
            _id: reviewId,
            book: book._id,
            user: req.user._id
        });

        if (!review) {
            return res.status(404).json({ 
                success: false, 
                message: "Review not found or unauthorized" 
            });
        }

        await Review.findByIdAndDelete(reviewId);
        return res.status(200).json({ success: true, message: 'Review deleted successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}; 