import db from "../db";
import { Request, Response } from "express";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { comparePassword, hashPassword } from "../lib/utils";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, mobileNumber } = req.body;

  let existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser && existingUser.length > 0) {
    return res.json({ isSuccess: false, message: "User already Registered as users" })
  }

  const hashedPassword = await hashPassword(password);

  let newUser;
  try {
    [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        mobileNumber,
        password: hashedPassword,
      })
      .returning();
    res.status(200).json({ isSuccess: true, message: "Account Created Successful", users: newUser });
  } catch (error) {
    console.error("Error registering users:", error);
    res.status(500).json({ isSuccess: false, message: "Failed to register users" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let userInfo = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!users || userInfo.length === 0) {
    return res.status(400).json({ error: "users not found" });
  }

  const isPasswordValid = await comparePassword(password, userInfo[0].password);
  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid password" });
  }
  res.status(200).json({ message: "Login Successful", userInfo });
};
