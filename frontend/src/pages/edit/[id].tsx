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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id != null && typeof id === "string") {
      fetchNote(id);
    }
    if (isLoggedIn && typeof localStorage.getItem("username") === "string") {
      const name = localStorage.getItem("username") as string;
      setUsername(name);
    }
  }, [id]);

  const fetchNote = async (strId: string) => {
    const data: Note | null = await getNoteById(strId).then((data) => data);
    if (data) setNote(data);
    setIsLoading(false);
  };

  if (isLoading) return <div></div>;
  if (!note?.user) return <div>NOT FOUND</div>;

  return (
    <div className="w-full flex justify-center overflow-hidden">
      {note && username === note.user.username && <EditNoteBody note={note} />}
    </div>
  );
};

export default EditNotePage;
