import React from "react";
import { Text, Card } from "@nextui-org/react";

const FolderList = ({ folders }: { folders: string[] }) => {
  return (
    <div className="w-full mx-auto mt-8 mb-10">
      {folders.map((folder) => (
        <div key={folder} className="my-3 mx-6">
          <Card isPressable isHoverable variant="bordered">
            <Card.Body className="py-3">
              <Text className="text-center" size="$lg">
                {folder}
              </Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default FolderList;
