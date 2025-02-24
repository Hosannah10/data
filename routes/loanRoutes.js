const express = require('express');
const { getAllLoans, getLoansByStatus, getLoansByUserEmail, getExpiredLoans, deleteLoan } = require('../controllers/loanController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authenticate, getAllLoans);
router.get('/status', authenticate, getLoansByStatus);
router.get('/:userEmail/get', authenticate, getLoansByUserEmail);
router.get('/expired', authenticate, getExpiredLoans);
router.delete('/:loanId/delete', authenticate, authorize(['superAdmin']), deleteLoan);

module.exports = router;