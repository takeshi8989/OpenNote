import { useFolder } from "../../hooks/useFolder";
import { Folder } from "../../types/folder";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Text } from "@nextui-org/react";
import NoteList from "../../components/NoteList";
import NotFoundPage from "../404";

const FolderPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [folder, setFolder] = useState<Folder | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getFolderById } = useFolder();
  useEffect(() => {
    if (id != null && typeof id === "string") {
      fetchFolder(id);
    }
  }, [id]);

  const fetchFolder = async (strId: string) => {
    const data: Folder | null = await getFolderById(strId).then((data) => data);
    if (data) setFolder(data);
    setIsLoading(false);
    console.log(data);
  };

  if (isLoading) return <div></div>;
  if (!folder) return <NotFoundPage />;

  return (
    <div>
      <Text className="text-center mt-10" size="$2xl">
        {folder.title}
      </Text>
      <NoteList notes={folder.notes} />
    </div>
  );
};

export default FolderPage;
