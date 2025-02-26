import fs from 'fs';
import path from 'path';
import { Book } from '../models/Book';
import { AuthorRepository } from './authorRepository';

export class BookRepository {
    private bookPath: string;
    private authorRepository: AuthorRepository;

    constructor() {
        this.bookPath = path.join(__dirname, '../data/books.json');
        this.authorRepository = new AuthorRepository();
    }

    private readBookData(): Book[] {
        try {
            const data = fs.readFileSync(this.bookPath, 'utf8');
            return JSON.parse(data).map(
                (book: Omit<Book, 'validate'>) =>
                    new Book(book.id, book.title, book.isbn, book.authorId, book.publicationYear, book.genre)
            );
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(`Error reading book data: ${err.message}`);
            } else {
                console.error('An unknown error occurred.');
            }
            return [];
        }
    }

    private saveBookData(books: Book[]): void {
        try {
            fs.writeFileSync(this.bookPath, JSON.stringify(books, null, 2), 'utf8');
            console.log('Book data saved successfully.');
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(`Error saving book data: ${err.message}`);
            } else {
                console.error('An unknown error occurred.');
            }
        }
    }

    public getAllBooks(): Book[] {
        return this.readBookData();
    }

    public getBookById(id: number): Book | undefined {
        const books = this.readBookData();
        return books.find((book) => book.id === id);
    }

    public createBook(book: Omit<Book, 'id'>): void {
        if (!Book.validate(book)) {
            console.error('Invalid book data');
            return;
        }

        const authorExists = this.authorRepository.getAuthorById(book.authorId);
        if (!authorExists) {
            console.error('Author not found');
            return;
        }

        const books = this.readBookData();
        const maxId = books.reduce((maxId, book) => Math.max(maxId, book.id), 0);
        const newBook = new Book(
            maxId + 1,
            book.title,
            book.isbn,
            book.authorId,
            book.publicationYear,
            book.genre
        );
        books.push(newBook);
        this.saveBookData(books);
    }

    public updateBook(id: number, updatedBook: Omit<Book, 'id'>): void {
        if (!Book.validate(updatedBook)) {
            console.error('Invalid book data');
            return;
        }

        const authorExists = this.authorRepository.getAuthorById(updatedBook.authorId);
        if (!authorExists) {
            console.error('Author not found');
            return;
        }

        const books = this.readBookData();
        const bookIndex = books.findIndex((book) => book.id === id);

        if (bookIndex === -1) {
            console.error('Book not found');
            return;
        }

        books[bookIndex] = new Book(
            id,
            updatedBook.title,
            updatedBook.isbn,
            updatedBook.authorId,
            updatedBook.publicationYear,
            updatedBook.genre
        );

        this.saveBookData(books);
    }

    public deleteBook(id: number): void {
        const books = this.readBookData();
        const updatedBooks = books.filter((book) => book.id !== id);

        if (books.length === updatedBooks.length) {
            console.error('Book not found');
            return;
        }

        this.saveBookData(updatedBooks);
    }
}
