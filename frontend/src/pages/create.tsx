import React from "react";
import Sidebar from "@/components/sidebar/CreatePage/Sidebar";

const CreateNote = () => {
  return (
    <div className="h-screen w-full flex justify-center overflow-hidden">
      <div className="w-1/4 h-full overflow-y-scroll">
        <Sidebar />
      </div>
      <div className="w-3/4 h-full overflow-y-scroll"></div>
    </div>
  );
};

export default CreateNote;
