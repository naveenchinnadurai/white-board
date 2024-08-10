import db from "../db";
import { Request, Response } from "express"
import { boards } from "../db/schema";


export const createBoard = async (req: Request, res: Response) => {
    const { id, createdBy, name, password } = req.body;
    try {
        const [board] = await db
            .insert(boards)
            .values({
                id,
                name,
                createdBy,
                password
            })
            .returning()
        return res.json({ isSuccess: true, board })
    } catch (error) {
        res.json({ isSuccess: false, message: "Error In creating board",error })
    }
}