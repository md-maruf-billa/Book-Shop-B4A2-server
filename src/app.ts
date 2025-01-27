import express, { Request, Response } from 'express';
import cors from 'cors';
import bookRouter from './app/Modules/books/book.route';
import orderRouter from './app/Modules/orders/order.route';
import authRouter from './app/Modules/auth/auth.route';
import globalErrorHandler from './app/Errors/globalErrorHandler';
import cookieParser from 'cookie-parser';
const app = express();

// Middleware
app.use(express.json());
app.use(express.raw());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);
app.use(cookieParser());
// use express router
app.use('/api/products', bookRouter);
app.use('/api/orders', orderRouter);
app.use('/api/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: true,
        message: 'Server is successfully running 🏃‍➡️🏃‍➡️🏃‍➡️'
    });
});


app.use(globalErrorHandler);
// export app for server.ts page can easily access
export default app;
