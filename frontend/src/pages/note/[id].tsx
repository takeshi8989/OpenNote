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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [windowSize, setWindowSize] = useState<number>();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    if (id != null && typeof id === "string") {
      fetchNote(id);
    }
  }, [id]);

  const fetchNote = async (strId: string) => {
    const data: Note | null = await getNoteById(strId).then((res) => res);
    console.log(data);
    if (data) setNote(data);
    setIsLoading(false);
  };

  if (isLoading) return <div></div>;
  if (!note?.user) return <div>NOT FOUND</div>;

  return (
    <div className="h-screen w-full flex justify-center overflow-hidden">
      <div className="w-0 lg:w-1/4  h-full overflow-y-scroll">
        <Sidebar note={note} />
      </div>
      <div className="w-full lg:w-3/4 h-full overflow-y-scroll">
        <NoteDetail note={note} setNote={setNote} />
        {windowSize && windowSize < 1024 && (
          <div className="w-full">
            <Sidebar note={note} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Note;
