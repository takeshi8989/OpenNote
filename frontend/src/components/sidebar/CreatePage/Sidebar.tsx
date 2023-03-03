import React, { useState, useEffect } from "react";
import { Text, Checkbox } from "@nextui-org/react";
import { Folder } from "../../../types/folder";
import { useFolder } from "@/hooks/useFolder";

interface Props {
  selectedFolderIds: string[];
  setSelectedFolderIds: React.Dispatch<React.SetStateAction<string[]>>;
}
const Sidebar = ({ selectedFolderIds, setSelectedFolderIds }: Props) => {
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

  const checkSelectedFolders = (e: boolean, id: string) => {
    if (e == true) {
      setSelectedFolderIds([...selectedFolderIds, id]);
    } else {
      setSelectedFolderIds(
        selectedFolderIds.filter((selectedId) => selectedId != id)
      );
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
              onChange={(e) => checkSelectedFolders(e, folder.id)}
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
