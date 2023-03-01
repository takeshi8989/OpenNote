import { User } from "./user";

export interface Comment {
  id: string;
  author: User;
  content: string;
  craetedAt: string;
}
