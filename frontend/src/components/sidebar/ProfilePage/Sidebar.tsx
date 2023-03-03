import { Folder } from "@/types/folder";
import { User } from "@/types/user";
import { Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import FolderList from "./FolderList";
import NewFolderModal from "../../modal/NewFolderModal";
import { useFolder } from "@/hooks/useFolder";

const Sidebar = ({ user }: { user: User | undefined }) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const { getFoldersByUsername } = useFolder();
  useEffect(() => {
    if (user) fetchUserFolders(user?.username);
  }, [user]);

  const fetchUserFolders = async (username: string): Promise<void> => {
    const data: Folder[] | null = await getFoldersByUsername(username).then(
      (res) => res
    );
    if (data) {
      setFolders(data);
    }
  };
  return (
    <div className=" mx-10 ">
      <Text size="$3xl" className="text-center mt-10">
        Folders
      </Text>
      {/* Folder Modal Button */}
      <NewFolderModal />
      <FolderList folders={folders} />
    </div>
  );
};

export default Sidebar;
