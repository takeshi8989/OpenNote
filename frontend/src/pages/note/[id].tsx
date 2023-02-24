import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

const Note = () => {
  return (
    <div className="h-screen w-full flex justify-center">
      <div className="w-1/4 h-full overflow-y-scroll">
        <Sidebar />
      </div>
      <div className="w-3/4"></div>
    </div>
  );
};

export default Note;
