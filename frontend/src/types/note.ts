import { User } from "./user";

export interface Note {
  id: string;
  title: string;
  url: string;
  author: User | null;
  // tags
  // likes
  // comments
  // views
  // downloads
}
