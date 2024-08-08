import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import authRouter from './routes/auth.route';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config;

app.use(express.json());

app.use('/api/v1/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
