import express from 'express';
import bookRoutes from './routes/bookRoutes';
import userRoutes from './routes/userRoutes';
import authorRoutes from './routes/authorRoutes';
import loanRoutes from './routes/loanRoutes';

const app = express();

app.use(express.json());
app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/authors', authorRoutes);
app.use('/loans', loanRoutes);

export default app;