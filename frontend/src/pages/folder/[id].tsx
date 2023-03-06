import { useFolder } from "@/hooks/useFolder";
import { Folder } from "@/types/folder";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Text } from "@nextui-org/react";
import NoteList from "@/components/NoteList";

const FolderPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [folder, setFolder] = useState<Folder | null>(null);
  const { getFolderById } = useFolder();
  useEffect(() => {
    if (id != null && typeof id === "string") {
      getFolderById(id).then((data) => {
        if (data != null) {
          setFolder(data);
        }
      });
    }
  }, [id]);
  if (!folder) return <div>NOt found</div>;
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
