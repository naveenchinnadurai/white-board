import db from "../db";
import { Request, Response } from "express";
import { boards, users } from "../db/schema";
import { eq } from "drizzle-orm";

export const createBoard = async (req: Request, res: Response) => {
    const { id, createdBy, name, password } = req.body;
    try {
        const [board] = await db
            .insert(boards)
            .values({
                id,
                name,
                createdBy,
                password,
            })
            .returning();

        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.id, createdBy));

        const updatedBoards = user.boards ? [...user.boards, id] : [id];

        await db
            .update(users)
            .set({
                boards: updatedBoards,
            })
            .where(eq(users.id, createdBy));

        return res.json({ isSuccess: true, board });
    } catch (error) {
        console.error(error);
        res.status(500).json({ isSuccess: false, message: "Error in creating board", error });
    }
};
