import { User } from "./user";

export interface Note {
  id: string;
  title: string;
  url: string;
  description: string;
  // author
  user: User;
  createdAt: string;
  updatedAt: string;
  public: boolean;
  // tags
  // likes
  // comments
  // views
  // downloads
}
