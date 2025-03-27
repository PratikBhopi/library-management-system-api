const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.middlewares');
const loanController=require('../controllers/loan.controllers')

// Get all loans with pagination and filters
router.get('/', authMiddleware, loanController.getLoans);

// Create a new loan
router.post('/', authMiddleware, loanController.createLoan);

// Update loan details
router.put('/:id', authMiddleware, loanController.updateLoan);

// Delete loan (mark as returned)
router.delete('/:id', authMiddleware, loanController.deleteLoan);

module.exports = router; 