import Sidebar from "@/components/sidebar/NotePage/Sidebar";
import React from "react";
import NoteDetail from "@/components/NoteDetail";
import { Note } from "@/types/note";

const note: Note = {
  id: "1",
  title: "My PHYS Assignment",
  url: "https://opennote-bucket.s3.us-west-2.amazonaws.com/Chap4%2C+5.pdf",
  user: { username: "takeshi", email: "take@gmail.com" },
  createdAt: "",
  updatedAt: "",
  public: true,
};
const Note = () => {
  return (
    <div className="h-screen w-full flex justify-center overflow-hidden">
      <div className="w-1/4 h-full overflow-y-scroll">
        <Sidebar />
      </div>
      <div className="w-3/4 h-full overflow-y-scroll">
        <NoteDetail note={note} />
      </div>
    </div>
  );
};

export default Note;
