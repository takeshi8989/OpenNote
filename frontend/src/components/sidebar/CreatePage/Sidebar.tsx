import React from "react";
import { Text, Checkbox } from "@nextui-org/react";
import { Folder } from "@/types/folder";

const folders: Folder[] = [
  { id: "1", title: "My Notes" },
  { id: "2", title: "Coding Tips" },
  { id: "3", title: "Math Calc 2" },
  {
    id: "4",
    title: "Programming Languages and Tech Stack",
  },
];

const Sidebar = () => {
  return (
    <div className="mx-16">
      <Text size="$2xl" className="text-center mt-10">
        Add to Folders
      </Text>
      <div className="w-full mx-auto mt-6">
        {folders.map((folder) => (
          <div key={folder.id} className="w-full flex justify-start my-2">
            <Checkbox
              defaultSelected={folder.title === "My Notes"}
              isDisabled={folder.title === "My Notes"}
              value={folder.id}
            >
              {folder.title}
            </Checkbox>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
