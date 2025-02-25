// routes/bookRoutes.ts
import express, { Request, Response } from 'express';
import { BookRepository } from '../repositories/bookRepository';
import { AuthorRepository } from '../repositories/authorRepository';
import { Book } from '../models/Book';

const router = express.Router();
const bookRepository = new BookRepository();

router.get('/', (req, res): any => {
    const books = bookRepository.getAllBooks();
    res.status(200).json(books);
});

router.get('/:id', (req, res): any => {
    const id = parseInt(req.params.id);
    const book = bookRepository.getBookById(id);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
});

router.post('/', (req, res): any => {
    const bookData = req.body as Omit<Book, 'id'>;

    if (!Book.validate(bookData)) {
        return res.status(400).json({ error: 'Invalid book data' });
    }

    bookRepository.createBook(bookData);
    res.status(201).json({ message: 'Book created successfully' });
});

router.put('/:id', (req, res): any => {
    const id = parseInt(req.params.id);
    const bookData = req.body as Omit<Book, 'id'>;

    if (!Book.validate(bookData)) {
        return res.status(400).json({ error: 'Invalid book data' });
    }

    const existingBook = bookRepository.getBookById(id);
    if (!existingBook) {
        return res.status(404).json({ error: 'Book not found' });
    }

    bookRepository.updateBook(id, bookData);
    res.status(200).json({ message: 'Book updated successfully' });
});

router.delete('/:id', (req, res): any => {
    const id = parseInt(req.params.id);
    const existingBook = bookRepository.getBookById(id);

    if (!existingBook) {
        return res.status(404).json({ error: 'Book not found' });
    }

    bookRepository.deleteBook(id);
    res.status(204).send();
});

export default router;
