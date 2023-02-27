import { Tag } from "./tag";
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
  tags: Tag[];
  // likes
  // comments
  // views
  numDownload: number;
}
