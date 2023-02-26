import { noteListAtom, searchQueryAtom } from "@/jotai/noteAtom";
import { Note } from "@/types/note";
import { NewNoteRequest } from "@/types/request/note";
import { useAtomValue, useSetAtom } from "jotai";

interface Props {
  createNewNote: (request: NewNoteRequest) => Promise<boolean>;
  setNoteListBySearch: () => Promise<void>;
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
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return { createNewNote, setNoteListBySearch };
};
