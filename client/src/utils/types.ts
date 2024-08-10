export interface User {
    isLoggedIn:boolean;
    id: string;
    name: string;
    email: string;
    mobileNumber?: string;
    boards:string[];
  }