const fs = require('fs');
const moment = require('moment');
const loans = JSON.parse(fs.readFileSync('./data/loans.json'));

exports.getAllLoans = (req, res) => {
    const { role } = req.user;
    const filteredLoans = loans.map(loan => {
        if (role === 'admin' || role === 'superAdmin') return loan;
        const { totalLoan, ...applicantWithoutTotalLoan } = loan.applicant;
        return { ...loan, applicant: applicantWithoutTotalLoan };
    });
    res.json(filteredLoans);
};

exports.getLoansByStatus = (req, res) => {
    const { status } = req.query;
    const filteredLoans = loans.filter(loan => loan.status === status);
    res.json(filteredLoans);
};

exports.getLoansByUserEmail = (req, res) => {
    const { userEmail } = req.params;
    const userLoans = loans.filter(loan => loan.applicant.email === userEmail);
    res.json({ loans: userLoans });
};

exports.getExpiredLoans = (req, res) => {
    const expiredLoans = loans.filter(loan => moment(loan.maturityDate).isBefore(moment()));
    res.json(expiredLoans);
};

exports.deleteLoan = (req, res) => {
    const { loanId } = req.params;
    const index = loans.findIndex(loan => loan.id === loanId);
    if (index === -1) return res.status(404).json({ message: 'Loan not found' });
    
    loans.splice(index, 1);
    res.json({ message: 'Loan deleted successfully' });
};