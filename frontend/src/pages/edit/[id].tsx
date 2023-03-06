import React, { useEffect, useState } from "react";
import { useNote } from "../../hooks/useNote";
import { useRouter } from "next/router";
import EditNoteBody from "../../components/EditNoteBody";
import { Note } from "../../types/note";
import { useAtomValue } from "jotai";
import { isLoggedInAtom } from "@/jotai/authAtom";

const EditNotePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [note, setNote] = useState<Note | null>(null);
  const [username, setUsername] = useState<string>("");
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const { getNoteById } = useNote();

  useEffect(() => {
    if (id != null && typeof id === "string") {
      getNoteById(id).then((data) => {
        if (data != null) {
          setNote(data);
        }
      });
    }
    if (isLoggedIn && typeof localStorage.getItem("username") === "string") {
      const name = localStorage.getItem("username") as string;
      setUsername(name);
    }
  }, [id]);

  return (
    <div className="w-full flex justify-center overflow-hidden">
      {note && username === note.user.username && <EditNoteBody note={note} />}
    </div>
  );
};

export default EditNotePage;
