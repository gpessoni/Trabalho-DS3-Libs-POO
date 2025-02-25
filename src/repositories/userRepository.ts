import fs from 'fs';
import path from 'path';

export class User {
    constructor(
        public id: number,
        public name: string,
        public cpf: string,
        public address: string
    ) {}

    static validate(user: Omit<User, 'id'>): boolean {
        return Boolean(user.name && user.cpf && user.address);
    }
}

export class UserRepository {
    private userPath: string;

    constructor() {
        this.userPath = path.join(__dirname, '../data/users.json');
    }

    private readUserData(): User[] {
        try {
            const data = fs.readFileSync(this.userPath, 'utf8');
            return JSON.parse(data).map(
                (user: Omit<User, 'validate'>) => new User(user.id, user.name, user.cpf, user.address)
            );
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(`Error reading user data: ${err.message}`);
            } else {
                console.error('An unknown error occurred.');
            }
            return [];
        }
    }

    private saveUserData(users: User[]): void {
        try {
            fs.writeFileSync(this.userPath, JSON.stringify(users, null, 2), 'utf8');
            console.log('User data saved successfully.');
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(`Error saving user data: ${err.message}`);
            } else {
                console.error('An unknown error occurred.');
            }
        }
    }

    public getAllUsers(): User[] {
        return this.readUserData();
    }

    public getUserById(id: number): User | undefined {
        const users = this.readUserData();
        return users.find((user) => user.id === id);
    }

    public createUser(user: Omit<User, 'id'>): void {
        if (!User.validate(user)) {
            console.error('Invalid user data');
            return;
        }

        const users = this.readUserData();
        const maxId = users.reduce((maxId, user) => Math.max(maxId, user.id), 0);
        const newUser = new User(maxId + 1, user.name, user.cpf, user.address);
        users.push(newUser);
        this.saveUserData(users);
    }

    public updateUser(id: number, updatedUser: Omit<User, 'id'>): void {
        if (!User.validate(updatedUser)) {
            console.error('Invalid user data');
            return;
        }

        const users = this.readUserData();
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            console.error('User not found');
            return;
        }

        users[userIndex] = new User(id, updatedUser.name, updatedUser.cpf, updatedUser.address);
        this.saveUserData(users);
    }

    public deleteUser(id: number): void {
        const users = this.readUserData();
        const updatedUsers = users.filter((user) => user.id !== id);

        if (users.length === updatedUsers.length) {
            console.error('User not found');
            return;
        }

        this.saveUserData(updatedUsers);
    }
}
