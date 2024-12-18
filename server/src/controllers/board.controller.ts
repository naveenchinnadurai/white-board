import db from "../db";
import { Request, Response } from "express";
import { boards, users } from "../db/schema";
import { eq } from "drizzle-orm";
import { comparePassword, hashPassword } from "../lib/utils";

export const createBoard = async (req: Request, res: Response) => {
  const { createdBy, name, password } = req.body;

  console.log({ createdBy, name, password });

  const existingBoard = await db.select().from(boards).where(eq(boards.name, name)).limit(1);

  if (existingBoard && existingBoard.length > 0) {
    return res.status(403).json({ error: "Board Name Already taken! try another" });
  }

  const hashedPassword = await hashPassword(password);

  try {
    const [createdBoard] = await db
      .insert(boards)
      .values({
        name,
        createdBy,
        password: hashedPassword,
      })
      .returning();

    const [user] = await db.select().from(users).where(eq(users.id, createdBy));

    const updatedBoards = user.boards ? [...user.boards, createdBoard.id] : [createdBoard.id];

    await db
      .update(users)
      .set({
        boards: updatedBoards,
      })
      .where(eq(users.id, createdBy));

    const { password, ...board } = createdBoard;

    return res.status(200).json({ status: true, board });
  } catch (error) {
    res.status(500).json({ error: "Error in creating board" });
  }
};

export const joinBoard = async (req: Request, res: Response) => {
  const { boardName, userId, password } = req.body;

  if (userId === "") {
    return res.status(400).json({ error: "User Id required" })
  }

  const existingBoard = await db.select().from(boards).where(eq(boards.name, boardName)).limit(1);

  if (existingBoard.length <= 0) {
    return res.status(404).json({ error: "Board not found!" });
  }

  if (existingBoard[0].createdBy == userId) {
    return res.status(405).json({ error: "Your a host, not a participants" });
  }

  const verify = await comparePassword(password, existingBoard[0].password);

  if (!verify) {
    return res.status(403).json({ error: "Incorrect Password" });
  }

  try {
    const currParticipants: string[] = existingBoard[0].currentParticipants || [];
    currParticipants.push(userId);
    const updateParticipants: string[] = [...currParticipants];
    console.log(updateParticipants)

    const [board] = await db
      .update(boards)
      .set({
        currentParticipants: updateParticipants
      })
      .where(eq(boards.id, existingBoard[0].id))
      .returning();

    return res.status(200).json({ status: true, board });
  } catch (error) {
    res.status(500).json({ error: "Error in joining board" });
  }
};

export const getBoard = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [userBoards] = await db.select().from(boards).where(eq(boards.id, id));

    console.log(userBoards);
    const { password, ...board } = userBoards;

    return res.status(201).json({ isSuccess: true, board });
  } catch (error) {
    res.status(500).json({ message: "Error in fetching board", error });
  }
};

export async function leaveBoard(req: Request, res: Response) {
  const { userId, boardId } = req.body;

  console.log({ userId, boardId });

  try {
    const board = await db
      .select()
      .from(boards)
      .where(eq(boards.id, boardId))
      .limit(1);

    console.log(board);

    if (board.length <= 0) {
      return res.status(404).json({ error: "Board Not Found!!" })
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (user.length <= 0) {
      return res.status(404).json({ error: "User Not Found!!" })
    }

    console.log(board[0].currentParticipants);
    const updatedParticipants = board[0].currentParticipants?.filter(
      (participant) => participant !== userId
    );

    console.log(updatedParticipants);

    await db
      .update(boards)
      .set({
        currentParticipants: updatedParticipants,
      })
      .where(eq(boards.id, boardId));

    res.status(201).json({ isSuccess: true })
  } catch (error) {
    res.status(500).json({ error: "Error in leaving board" });
  }
}
