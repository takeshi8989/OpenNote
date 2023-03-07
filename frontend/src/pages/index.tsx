import NoteList from "@/components/NoteList";
import { useNote } from "@/hooks/useNote";
import { noteListAtom, searchQueryAtom } from "@/jotai/noteAtom";
import { useAtomValue } from "jotai";
import React, { useEffect } from "react";

const Home = () => {
  const notes = useAtomValue(noteListAtom);
  const searchQuery = useAtomValue(searchQueryAtom);
  const { setNoteListBySearch } = useNote();
  useEffect(() => {
    setNoteListBySearch();
  }, []);

  return (
    <div className="h-screen">
      <NoteList notes={notes} />
    </div>
  );
};

export default Home;
