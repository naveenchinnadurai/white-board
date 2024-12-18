import axios from "axios";
import { BoardType } from "./types";

const userId = localStorage.getItem("userId");
const accessToken = localStorage.getItem("accessToken");

const apiClient = axios.create({
  baseURL: "http://localhost:7000/api/v1/",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    UserId: userId,
  },
});


export const createBoard = async ({ userId, boardName, password }: { userId: string | undefined; boardName: string; password: string; }): Promise<BoardType> => {
  try {
    const res = await axios.post("http://localhost:7000/api/v1/board", {
      createdBy: userId,
      name: boardName || userId,
      password,
    });
    return res.data;
  } catch (error: any) {
    return error.response.data
  }

};

export const joinBoard = async ({ userId, boardName, password }: { userId: string | undefined, boardName: string, password: string }): Promise<BoardType> => {
  try {
    const res = await axios.put(`http://localhost:7000/api/v1/board/`, {
      boardName,
      userId,
      password,
    });
    return res.data;
  } catch (error: any) {
    return error.response.data
  }
}

export const getBoardInfo = async (id: string): Promise<BoardType> => {
  const res = await axios.get(`http://localhost:7000/api/v1/board/${id}`)
  return res.data;
}

export const leaveBoard = async (boardId: string | undefined, userId: string | undefined) => {
  await axios.put(`http://localhost:7000/api/v1/board/leave/`, {
    userId,
    boardId
  })
  
}

export default apiClient;
