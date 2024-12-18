import express from 'express';
import { createBoard, getBoard, joinBoard, leaveBoard } from '../controllers/board.controller';

const router = express.Router();

router.get('/:id', getBoard)
router.post('/', createBoard)
router.put('/', joinBoard)
router.put('/leave/', leaveBoard)

export default router