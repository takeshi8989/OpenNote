import Sidebar from "@/components/sidebar/NotePage/Sidebar";
import React, { useEffect, useState } from "react";
import NoteDetail from "@/components/NoteDetail";
import { Note } from "@/types/note";
import { useRouter } from "next/router";
import { useNote } from "@/hooks/useNote";

const Note = () => {
  const router = useRouter();
  const { id } = router.query;
  const [note, setNote] = useState<Note | null>(null);
  const { getNoteById } = useNote();
  useEffect(() => {
    if (id != null && typeof id === "string") {
      getNoteById(id).then((data) => {
        if (data != null) {
          setNote(data);
        }
      });
    }
  }, [id]);
  return (
    <div className="h-screen w-full flex justify-center overflow-hidden">
      <div className="w-1/4 h-full overflow-y-scroll">
        <Sidebar note={note} />
      </div>
      <div className="w-3/4 h-full overflow-y-scroll">
        <NoteDetail note={note} setNote={setNote} />
      </div>
    </div>
  );
};

export default Note;
