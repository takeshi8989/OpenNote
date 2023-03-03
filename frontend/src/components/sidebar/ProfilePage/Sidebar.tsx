import { Text } from "@nextui-org/react";
import React from "react";
import FolderList from "./FolderList";
import NewFolderModal from "./NewFolderModal";

const folders: string[] = ["folder1", "folder2", "folder3"];

const Sidebar = () => {
  return (
    <div className=" mx-10 ">
      <Text size="$3xl" className="text-center mt-10">
        Your Folders
      </Text>
      {/* Folder Modal Button */}
      <NewFolderModal />
      <FolderList folders={folders} />
    </div>
  );
};

export default Sidebar;
