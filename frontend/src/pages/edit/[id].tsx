import React, { useEffect, useState } from "react";
import { useNote } from "../../hooks/useNote";
import { useRouter } from "next/router";
import EditNoteBody from "../../components/EditNoteBody";
import { Note } from "../../types/note";

const EditNotePage = () => {
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
    <div className="w-full flex justify-center overflow-hidden">
      <EditNoteBody note={note} />
    </div>
  );
};

export default EditNotePage;
