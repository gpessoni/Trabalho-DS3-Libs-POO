import fs from 'fs';
import path from 'path';

export class Author {
    id: number;
    name: string;
    bio: string;
    nationality: string;
    birthDate: string;

    constructor(id: number, name: string, bio: string, nationality: string, birthDate: string) {
        this.id = id;
        this.name = name;
        this.bio = bio;
        this.nationality = nationality;
        this.birthDate = birthDate;
    }
}

export class AuthorRepository {
    private authorPath: string;

    constructor() {
        this.authorPath = path.join(__dirname, '../data/authors.json');
    }

    private readAuthorData(): Author[] {
        try {
            const data = fs.readFileSync(this.authorPath, 'utf8');
            return JSON.parse(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(`Error reading author data: ${err.message}`);
            } else {
                console.error('An unknown error occurred.');
            }
            return [];
        }
    }

    private saveAuthorData(authors: Author[]): void {
        try {
            fs.writeFileSync(this.authorPath, JSON.stringify(authors, null, 2), 'utf8');
            console.log('Author data saved successfully.');
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(`Error saving author data: ${err.message}`);
            } else {
                console.error('An unknown error occurred.');
            }
        }
    }

    public getAllAuthors(): Author[] {
        return this.readAuthorData();
    }

    public getAuthorById(id: number): Author | undefined {
        const authors = this.readAuthorData();
        return authors.find((author) => author.id === id);
    }

    public createAuthor(author: Omit<Author, 'id'>): void {
        const authors = this.readAuthorData();
        const maxId = authors.reduce((maxId, author) => Math.max(maxId, author.id), 0);
        const newAuthor = new Author(
            maxId + 1,
            author.name,
            author.bio,
            author.nationality,
            author.birthDate
        );
        authors.push(newAuthor);
        this.saveAuthorData(authors);
    }

    public updateAuthor(id: number, updatedAuthor: Omit<Author, 'id'>): void {
        const authors = this.readAuthorData();
        const authorIndex = authors.findIndex((author) => author.id === id);

        if (authorIndex === -1) {
            console.error('Author not found');
            return;
        }

        if (!updatedAuthor.name || !updatedAuthor.bio || !updatedAuthor.nationality || !updatedAuthor.birthDate) {
            console.error('Invalid author data');
            return;
        }

        authors[authorIndex] = new Author(
            id,
            updatedAuthor.name,
            updatedAuthor.bio,
            updatedAuthor.nationality,
            updatedAuthor.birthDate
        );

        this.saveAuthorData(authors);
    }

    public deleteAuthor(id: number): void {
        const authors = this.readAuthorData();
        const updatedAuthors = authors.filter((author) => author.id !== id);

        if (authors.length === updatedAuthors.length) {
            console.error('Author not found');
            return;
        }

        this.saveAuthorData(updatedAuthors);
    }
}
