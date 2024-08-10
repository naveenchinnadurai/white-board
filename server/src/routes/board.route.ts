import express from 'express';
import { createBoard } from '../controllers/board.controller';

const router = express.Router();

router.post('/', createBoard)

export default router