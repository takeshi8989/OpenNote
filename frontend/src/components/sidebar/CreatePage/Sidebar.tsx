import React, { useState, useEffect } from "react";
import { Text, Checkbox } from "@nextui-org/react";
import { Folder } from "../../../types/folder";
import { useFolder } from "@/hooks/useFolder";

const Sidebar = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const { getFoldersByUsername } = useFolder();
  useEffect(() => {
    fetchUserFolders();
  }, []);

  const fetchUserFolders = async (): Promise<void> => {
    const username: string = localStorage.getItem("username") as string;
    const data: Folder[] | null = await getFoldersByUsername(username).then(
      (res) => res
    );
    if (data) {
      setFolders(data);
    }
  };
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
