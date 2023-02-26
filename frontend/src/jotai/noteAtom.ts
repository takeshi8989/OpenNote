import { Note } from "@/types/note";
import { atom } from "jotai";

export const searchQueryAtom = atom<string>("");
export const noteListAtom = atom<Note[]>([]);
