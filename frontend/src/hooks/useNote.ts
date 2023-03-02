import { noteListAtom, searchQueryAtom } from "@/jotai/noteAtom";
import { Note } from "@/types/note";
import { NewNoteRequest } from "@/types/request/noteRequest";
import { useAtomValue, useSetAtom } from "jotai";

interface Props {
  createNewNote: (request: NewNoteRequest) => Promise<boolean>;
  setNoteListBySearch: () => Promise<void>;
  getNoteById: (id: string) => Promise<Note | null>;
  getNotesByUsername: (username: string) => Promise<Note[] | []>;
  toggleLike: (note: Note) => Promise<Note | null>;
}

const url: string = process.env.API_URL as string;
export const useNote = (): Props => {
  const searchQuery = useAtomValue(searchQueryAtom);
  const setNoteList = useSetAtom(noteListAtom);

  const createNewNote = async (request: NewNoteRequest): Promise<boolean> => {
    const token: string = localStorage.getItem("token") as string;
    try {
      const res = await fetch(`${url}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      });
      if (res.ok) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const setNoteListBySearch = async () => {
    let notes: Note[] = await getNotes().then((data) => data);
    setNoteList(notes);
  };

  const getNotes = async (): Promise<Note[]> => {
    let requestEndpoint = `${url}/notes`;
    if (searchQuery !== "") requestEndpoint += `/search/${searchQuery}`;
    try {
      const res = await fetch(requestEndpoint);
      const data: Note[] = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getNoteById = async (id: string): Promise<Note | null> => {
    try {
      const res = await fetch(`${url}/notes/${id}`);
      const data: Note = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const toggleLike = async (note: Note): Promise<Note | null> => {
    const username: string = localStorage.getItem("username") as string;
    const token: string = localStorage.getItem("token") as string;
    try {
      const res = await fetch(`${url}/notes/like/${note.id}/${username}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: Note = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getNotesByUsername = async (username: string): Promise<Note[] | []> => {
    const local = "http://localhost:8080/api/v1";
    try {
      const res = await fetch(`${local}/notes/user/${username}`);
      const data: Note[] = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return {
    createNewNote,
    setNoteListBySearch,
    getNoteById,
    getNotesByUsername,
    toggleLike,
  };
};
