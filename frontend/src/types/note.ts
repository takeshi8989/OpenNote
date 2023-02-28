import { Like } from "./like";
import { Tag } from "./tag";
import { User } from "./user";

export interface Note {
  id: string;
  title: string;
  url: string;
  description: string;
  // this will be author
  user: User;
  createdAt: string;
  updatedAt: string;
  public: boolean;
  tags: Tag[];
  // comments
  // views
  numDownload: number;
  likes: Like[];
}
