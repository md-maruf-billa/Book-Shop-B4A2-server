import express, { Request, Response } from 'express';
import cors from 'cors';
const app = express();

// Middleware
app.use(express.json());
app.use(express.raw());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: true,
        message: 'Server is successfully running 🏃‍➡️🏃‍➡️🏃‍➡️',
    });
});

// export app for server.ts page can easily access
export default app;
