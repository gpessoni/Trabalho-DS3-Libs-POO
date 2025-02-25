import fs from 'fs';
import path from 'path';
import { Loan } from '../models/Loan';

export class LoanRepository {
    private loanPath: string;

    constructor() {
        this.loanPath = path.join(__dirname, '../data/loans.json');
    }

    private readLoanData(): Loan[] {
        try {
            const data = fs.readFileSync(this.loanPath, 'utf8');
            return JSON.parse(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(`Error reading loan data: ${err.message}`);
            } else {
                console.error('An unknown error occurred.');
            }
            return [];
        }
    }

    private saveLoanData(loans: Loan[]): void {
        try {
            fs.writeFileSync(this.loanPath, JSON.stringify(loans, null, 2), 'utf8');
            console.log('Loan data saved successfully.');
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(`Error saving loan data: ${err.message}`);
            } else {
                console.error('An unknown error occurred.');
            }
        }
    }

    public createLoan(bookId: number, userId: number): void {
        const loans = this.readLoanData();
        const newLoan = new Loan(
            loans.length > 0 ? Math.max(...loans.map(loan => loan.id)) + 1 : 1,
            bookId,
            userId,
            new Date().toISOString(),
            null // A devolução será null inicialmente
        );
        loans.push(newLoan);
        this.saveLoanData(loans);
    }

    public returnBook(loanId: number): void {
        const loans = this.readLoanData();
        const loan = loans.find((loan) => loan.id === loanId);
        if (loan) {
            loan.returnDate = new Date().toISOString();
            this.saveLoanData(loans);
        } else {
            console.error('Loan not found');
        }
    }

    public getAvailableBooks(allBooks: any[], loans: Loan[]): any[] {
        const borrowedBookIds = loans.filter(loan => loan.returnDate === null).map(loan => loan.bookId);
        return allBooks.filter(book => !borrowedBookIds.includes(book.id));
    }

    public getBorrowedBooks(loans: Loan[]): Loan[] {
        return loans.filter(loan => loan.returnDate === null);
    }

    public getAllLoans(): Loan[] {
        return this.readLoanData();
    }
}
