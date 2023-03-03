import { Note } from "./note";

export interface Folder {
  id: string;
  title: string;
  notes: Note[];
  createdAt: string;
  updatedAt: string;
}
