import React, { useEffect, useState, useRef } from "react";
import { useNote } from "../../hooks/useNote";
import { useRouter } from "next/router";
import EditNoteBody from "../../components/EditNoteBody";
import { Note } from "../../types/note";
import { useAtom, useAtomValue } from "jotai";
import { isLoggedInAtom, usernameAtom } from "@/jotai/authAtom";
import { scrollBottomAtom } from "@/jotai/noteAtom";
import NotFoundPage from "../404";

const EditNotePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [note, setNote] = useState<Note | null>(null);
  const username = useAtomValue(usernameAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const { getNoteById } = useNote();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const noteBodyRef = useRef<HTMLDivElement>(null);
  const [scrollBottom, setScrollBottom] = useAtom(scrollBottomAtom);

  useEffect(() => {
    if (id != null && typeof id === "string") {
      fetchNote(id);
    }
  }, [id]);

  const handleBodyScroll = () => {
    if (noteBodyRef && noteBodyRef.current) {
      const bottom: number = noteBodyRef.current.scrollTop + window.innerHeight;
      setScrollBottom(bottom);
    }
  };

  const fetchNote = async (strId: string) => {
    const data: Note | null = await getNoteById(strId).then((data) => data);
    if (data) setNote(data);
    setIsLoading(false);
  };

  if (isLoading) return <div></div>;
  if (!note?.user) return <NotFoundPage />;

  return (
    <div
      className="w-full h-screen flex justify-center overflow-y-scroll"
      ref={noteBodyRef}
      onScroll={handleBodyScroll}
    >
      {isLoggedIn && note && username === note.user.username && (
        <EditNoteBody note={note} />
      )}
    </div>
  );
};

export default EditNotePage;
