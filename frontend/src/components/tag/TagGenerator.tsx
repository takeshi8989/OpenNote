import React, { useState } from "react";
import { Text, Badge, Input, Grid } from "@nextui-org/react";
import CustomTag from "./CustomTag";
import ColorChangeButton from "../button/ColorChangeButton";
import { Tag } from "@/types/tag";

const tags: Tag[] = [
  { name: "Langara", color: "pink" },
  { name: "CPSC", color: "blue" },
  { name: "1181", color: "green" },
];
const TagGenerator = () => {
  const [currentInput, setCurrentInput] = useState<string>("");

  const submitNewTag = (e: any): void => {
    if (e.key === "Enter") {
      console.log(currentInput);
    }
  };

  return (
    <div className="w-1/2 mx-auto mt-10 mb-20">
      <Text size={"$2xl"} className="text-left ml-4">
        Tags
      </Text>
      {currentInput.length > 0 && (
        <Badge size={"lg"} color={"secondary"} className="mt-4 ml-4">
          {currentInput}
        </Badge>
      )}
      <div className="mt-2 flex">
        <Input
          clearable
          underlined
          placeholder="Tag"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={submitNewTag}
        />
        <ColorChangeButton />
      </div>
      <div className="w-full flex flex-wrap">
        {tags.map((tag) => (
          <Grid key={tag.name} className="mt-4 ml-4">
            <Badge color={"default"} content={"x"} shape="rectangle" size="lg">
              <CustomTag tag={tag} />
            </Badge>
          </Grid>
        ))}
      </div>
    </div>
  );
};

export default TagGenerator;
