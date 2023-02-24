import { Note } from "@/types/note";
import SinglePagePDF from "./SinglePagePDF";

const NoteList = ({ notes }: { notes: Note[] }) => {
  return (
    <div className="flex h-full justify-around flex-wrap mx-20">
      {notes.map((note) => (
        <div key={note.id} className="w- xl:w-1/4 2xl:w-1/5 mx-2">
          <SinglePagePDF className={"w-1/4"} note={note} />
        </div>
      ))}
    </div>
  );
};

export default NoteList;
