import SinglePagePDF from "./SinglePagePDF";
import { Note } from "@/types/note";
import { Pagination, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";

const PER_PAGE: number = 8;
const NoteList = ({ notes }: { notes: Note[] }): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageNotes, setPageNotes] = useState<Note[]>(notes.slice(0, PER_PAGE));

  useEffect(() => {
    const start = (currentPage - 1) * PER_PAGE;
    const notesOnPage = notes.slice(start, start + PER_PAGE);
    setPageNotes(notesOnPage);
  }, [currentPage, notes]);

  if (!notes || notes.length == 0)
    return (
      <div className="flex justify-center">
        <Text size="$xl" className="mt-20">
          Result Not Found
        </Text>
      </div>
    );
  return (
    <div className="flex flex-col mx-20">
      <div className="flex justify-around flex-wrap mx-auto w-full">
        {pageNotes.map((note) => (
          <div key={note.id} className="lg:w-1/3 xl:w-1/4 2xl:w-1/5 mx-2">
            <SinglePagePDF note={note} />
          </div>
        ))}
      </div>
      <div className="mb-20 text-center">
        <Pagination
          total={Math.ceil(notes.length / PER_PAGE)}
          initialPage={1}
          onChange={(e) => setCurrentPage(e.valueOf())}
        />
      </div>
    </div>
  );
};

export default NoteList;
