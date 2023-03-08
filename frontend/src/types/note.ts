import { Like } from "./like";
import { Tag } from "./tag";
import { User } from "./user";
import { Comment } from "./comment";

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
  comments: Comment[];
  numDownload: number;
  numViews: number;
  likes: Like[];
}
