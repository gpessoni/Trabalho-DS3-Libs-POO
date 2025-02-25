// routes/loanRoutes.ts
import express, { Request, Response } from 'express';
import { LoanRepository } from '../repositories/loanRepository';
import { BookRepository } from '../repositories/bookRepository';
import { UserRepository } from '../repositories/userRepository';

const router = express.Router();

const loanRepository = new LoanRepository();
const bookRepository = new BookRepository();
const userRepository = new UserRepository();

router.post('/', (req, res): any => {
    const { bookId, userId } = req.body;
    const allBooks = bookRepository.getAllBooks();
    const user = userRepository.getUserById(userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const book = allBooks.find((book) => book.id === bookId);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    loanRepository.createLoan(bookId, userId);
    res.status(201).json({ message: 'Loan successfully created' });
});

router.post('/return/:loanId', (req, res): any => {
    const loanId = parseInt(req.params.loanId);
    loanRepository.returnBook(loanId);
    res.status(200).json({ message: 'Book successfully returned' });
});

router.get('/available-books', (req, res): any => {
    const allBooks = bookRepository.getAllBooks();
    const loans = loanRepository.getAllLoans();
    const availableBooks = loanRepository.getAvailableBooks(allBooks, loans);
    res.status(200).json(availableBooks);
});

router.get('/borrowed-books', (req, res): any => {
    const loans = loanRepository.getAllLoans();
    const borrowedBooks = loanRepository.getBorrowedBooks(loans);
    res.status(200).json(borrowedBooks);
});

router.get('/', (req, res): any => {
    const loans = loanRepository.getAllLoans();
    res.status(200).json(loans);
});

export default router;
