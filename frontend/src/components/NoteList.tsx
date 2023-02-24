import { Note } from "@/types/note";
import React from "react";

const NoteList = ({ notes }: { notes: Note[] }) => {
  return (
    <div className="flex h-full">
      {notes.map((note) => (
        <div key={note.id} className="w-1/2 h-1/2">
          <h1>{note.title}</h1>
          <iframe src={note.url} />
        </div>
      ))}
    </div>
  );
};

export default NoteList;
