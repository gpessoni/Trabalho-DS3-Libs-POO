// models/Book.ts
export class Book {
    constructor(
        public id: number,
        public title: string,
        public authorId: number, 
        public publicationYear: number,
        public genre: string
    ) {}

    static validate(book: Omit<Book, 'id'>): boolean {
        return Boolean(book.title && book.authorId && book.publicationYear && book.genre);
    }
}
