import express from 'express';
import { createBoard, getBoardsByUser, joinBoard } from '../controllers/board.controller';

const router = express.Router();

router.get('/:id', getBoardsByUser)
router.post('/', createBoard)
router.put('/', joinBoard)

export default router