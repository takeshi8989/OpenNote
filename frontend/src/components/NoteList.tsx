import { noteListAtom, searchQueryAtom } from "@/jotai/noteAtom";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import SinglePagePDF from "./SinglePagePDF";
import { useNote } from "@/hooks/useNote";
import { Note } from "@/types/note";

const NoteList = ({ notes }: { notes: Note[] }): JSX.Element => {
  return (
    <div className="flex h-full justify-around flex-wrap mx-20">
      {notes.map((note) => (
        <div key={note.id} className="lg:w-1/3 xl:w-1/4 2xl:w-1/5 mx-2">
          <SinglePagePDF note={note} />
        </div>
      ))}
    </div>
  );
};

export default NoteList;
