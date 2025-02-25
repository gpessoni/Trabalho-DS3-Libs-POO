import express, { Request, Response } from 'express';
import { UserRepository } from '../repositories/userRepository';
import { User } from '../models/User';

const router = express.Router();
const userRepository = new UserRepository();

router.get('/', (req: Request, res: Response) => {
    const users = userRepository.getAllUsers();
    res.status(200).json(users);
});

router.get('/:id',  (req, res): any => {
    const id = parseInt(req.params.id);
    const user = userRepository.getUserById(id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
});

router.post('/',  (req, res): any => {
    const { name, cpf, address } = req.body;

    if (!name || !cpf || !address) {
        return res.status(400).json({ error: 'Invalid user data' });
    }

    const newUser = { name, cpf, address } as Omit<User, 'id'>;
    userRepository.createUser(newUser);
    res.status(201).json({ message: 'User created successfully', user: newUser });
});

router.put('/:id',  (req, res): any => {
    const id = parseInt(req.params.id);
    const { name, cpf, address } = req.body;

    if (!name || !cpf || !address) {
        return res.status(400).json({ error: 'Invalid user data' });
    }

    const updatedUser = { name, cpf, address } as Omit<User, 'id'>;
    userRepository.updateUser(id, updatedUser);

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
});

router.delete('/:id',  (req, res): any => {
    const id = parseInt(req.params.id);

    if (!userRepository.getUserById(id)) {
        return res.status(404).json({ error: 'User not found' });
    }

    userRepository.deleteUser(id);
    res.status(204).send();
});

export default router;
