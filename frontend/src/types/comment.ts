import { User } from "./user";

export interface Commnet {
  id: string;
  author: User;
  content: string;
  date: string;
}
