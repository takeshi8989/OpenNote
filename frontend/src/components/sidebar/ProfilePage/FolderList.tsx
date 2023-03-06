import React from "react";
import { Text, Card } from "@nextui-org/react";
import { Folder } from "@/types/folder";
import Link from "next/link";

const FolderList = ({ folders }: { folders: Folder[] }) => {
  return (
    <div className="w-full mx-auto mt-8 mb-10">
      {folders.map((folder) => (
        <div key={folder.id} className="my-3 mx-6">
          <Link href={`/folder/${folder.id}`}>
            <Card isPressable isHoverable variant="bordered">
              <Card.Body className="py-3">
                <Text className="text-center" size="$lg">
                  {folder.title}
                </Text>
              </Card.Body>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FolderList;
