const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.middleware');
const {
    createLoan,
    getLoans,
    updateLoan,
    deleteLoan
} = require('../controllers/loan.controllers');

// Get all loans with pagination and filters
router.get('/', authMiddleware, getLoans);

// Create a new loan
router.post('/', authMiddleware, createLoan);

// Update loan details
router.put('/:id', authMiddleware, updateLoan);

// Delete loan (mark as returned)
router.delete('/:id', authMiddleware, deleteLoan);

module.exports = router; 