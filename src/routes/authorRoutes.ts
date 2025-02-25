import express, { Request, Response } from 'express';
import { AuthorRepository } from '../repositories/authorRepository';
import { Author } from '../models/Author';

const router = express.Router();
const authorRepository = new AuthorRepository();

router.get('/', (req: Request, res: Response) => {
    const authors = authorRepository.getAllAuthors();
    res.status(200).json(authors);
});

router.get('/:id', (req, res): any => {
    const id = parseInt(req.params.id);
    const author = authorRepository.getAuthorById(id);
    if (!author) {
        return res.status(404).json({ error: 'Author not found' });
    }

    res.status(200).json(author);
});

router.post('/', (req, res): any => {
    const { name, bio, nationality, birthDate } = req.body;

    if (!name || !bio || !nationality || !birthDate) {
        return res.status(400).json({ error: 'Invalid author data' });
    }

    const author = { name, bio, nationality, birthDate } as Omit<Author, 'id'>;
    authorRepository.createAuthor(author);

    res.status(201).json({ message: 'Author created successfully', author });
});

router.put('/:id', (req, res): any => {
    const id = parseInt(req.params.id);
    const { name, bio, nationality, birthDate } = req.body;

    if (!name || !bio || !nationality || !birthDate) {
        return res.status(400).json({ error: 'Invalid author data' });
    }

    const updatedAuthor = { name, bio, nationality, birthDate } as Omit<Author, 'id'>;
    const existingAuthor = authorRepository.getAuthorById(id);

    if (!existingAuthor) {
        return res.status(404).json({ error: 'Author not found' });
    }

    authorRepository.updateAuthor(id, updatedAuthor);
    res.status(200).json({ message: 'Author updated successfully', updatedAuthor });
});

router.delete('/:id', (req, res): any => {
    const id = parseInt(req.params.id);
    const existingAuthor = authorRepository.getAuthorById(id);

    if (!existingAuthor) {
        return res.status(404).json({ error: 'Author not found' });
    }

    authorRepository.deleteAuthor(id);
    res.status(204).send();
});

export default router;
