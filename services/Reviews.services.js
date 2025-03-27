const Review = require('../models/Review.model');

exports.createReviewService = async (reviewData) => {
    try {
        const review = new Review(reviewData);
        await review.save();
        return review;
    } catch (error) {
        throw error;
    }
}; 