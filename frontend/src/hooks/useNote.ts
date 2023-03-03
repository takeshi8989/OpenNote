import { noteListAtom, searchQueryAtom } from "@/jotai/noteAtom";
import { Note } from "@/types/note";
import { NewNoteRequest } from "@/types/request/noteRequest";
import { useAtomValue, useSetAtom } from "jotai";

interface Props {
  createNewNote: (request: NewNoteRequest) => Promise<string>;
  setNoteListBySearch: () => Promise<void>;
  getNoteById: (id: string) => Promise<Note | null>;
  getNotesByUsername: (username: string) => Promise<Note[] | []>;
  toggleLike: (note: Note) => Promise<Note | null>;
  addNoteToFolders: (noteId: string, folderIds: string[]) => Promise<boolean>;
  incrementViewCount: (noteId: string) => Promise<boolean>;
  deleteNote: (noteId: string) => Promise<boolean>;
}

const url: string = process.env.API_URL as string;
export const useNote = (): Props => {
  const searchQuery = useAtomValue(searchQueryAtom);
  const setNoteList = useSetAtom(noteListAtom);

  const createNewNote = async (request: NewNoteRequest): Promise<string> => {
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
      const data: Note = await res.json();
      return data.id;
    } catch (error) {
      console.log(error);
      // throw error;
      return "";
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
    try {
      const res = await fetch(`${url}/notes/user/${username}`);
      const data: Note[] = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const addNoteToFolders = async (
    noteId: string,
    folderIds: string[]
  ): Promise<boolean> => {
    const token: string = localStorage.getItem("token") as string;
    const request = { folderIds };
    try {
      const res = await fetch(`${url}/notes/folder/${noteId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      if (res.ok) return true;
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const incrementViewCount = async (noteId: string): Promise<boolean> => {
    const token: string = localStorage.getItem("token") as string;
    try {
      const res = await fetch(`${url}/notes/view/${noteId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.ok;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const deleteNote = async (noteId: string) => {
    const token: string = localStorage.getItem("token") as string;
    try {
      const res = await fetch(`${url}/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.ok;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return {
    createNewNote,
    setNoteListBySearch,
    getNoteById,
    getNotesByUsername,
    toggleLike,
    addNoteToFolders,
    incrementViewCount,
    deleteNote,
  };
};
