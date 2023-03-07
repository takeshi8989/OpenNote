import SinglePagePDF from "./SinglePagePDF";
import { Note } from "@/types/note";

const NoteList = ({ notes }: { notes: Note[] }): JSX.Element => {
  if (!notes) return <div>Not Found</div>;
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
