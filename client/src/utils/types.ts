import { AlertColor } from "@mui/material";

export interface User {
  isLoggedIn: boolean;
  id: string;
  name: string;
  email: string;
  mobileNumber?: string;
}

export interface BoardInfo {
  createdBy: string
  currentParticipants: string[]
  id:string
  name:string

}
export interface AlertType {
  state: boolean;
  content: string;
  type: AlertColor | undefined
}

export interface BoardType {
  board: {
      id: string;
      createdBy: string;
      currentParticipants: string[]
      name: string
  };
  status:boolean,
  message?:string,
  error?:string
}