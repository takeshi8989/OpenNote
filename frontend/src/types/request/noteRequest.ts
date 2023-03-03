import { Tag } from "../tag";

export interface NewNoteRequest {
  username: string;
  title: string;
  url: string;
  tags: Tag[];
  folderIds: string[];
  description: string;
  isPublic: boolean;
}
