export class Loan {
    id: number;
    bookId: number;
    userId: number;
    loanDate: string;
    returnDate: string | null;

    constructor(id: number, bookId: number, userId: number, loanDate: string, returnDate: string | null) {
        this.id = id;
        this.bookId = bookId;
        this.userId = userId;
        this.loanDate = loanDate;
        this.returnDate = returnDate;
    }
}
