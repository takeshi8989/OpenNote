import React, { useState } from "react";
import { Text, Badge, Input, Grid, Button } from "@nextui-org/react";
import CustomTag from "./CustomTag";
import ColorChangeButton from "../button/ColorChangeButton";
import { Tag } from "../../types/tag";

const TagGenerator = ({
  tags,
  setTags,
}: {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}) => {
  const [currentColor, setCurrentColor] = useState<string>("#CCCCCC");
  const [currentInput, setCurrentInput] = useState<string>("");

  const addTag = (): void => {
    if (currentInput.length <= 10 && currentInput.length > 0) {
      if (tags.filter((tag) => tag.name === currentInput).length > 0) return;
      const newTag: Tag = { name: currentInput, color: currentColor };
      setTags([...tags, newTag]);
      setCurrentInput("");
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") addTag();
  };

  const handleChange = (e: any): void => {
    setCurrentInput(e.target.value);
  };

  const deleteTag = (tag: Tag): void => {
    setTags(tags.filter((obj) => obj.name !== tag.name));
  };

  return (
    <div className="w-1/2 mx-auto mt-10 mb-20">
      <Text size="$2xl" className="text-left ml-4">
        Tags
      </Text>
      {currentInput.length > 0 && (
        <CustomTag tag={{ name: currentInput, color: currentColor }} />
      )}
      <div className="mt-2 flex">
        <Input
          clearable
          underlined
          placeholder="Tag"
          value={currentInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <ColorChangeButton
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
        />
        <Input
          placeholder="#4A8B3C"
          value={currentColor}
          width="150px"
          onChange={(e) => {
            setCurrentColor(e.target.value);
          }}
        />
        <Button auto bordered flat onClick={addTag} className="mx-2">
          Add
        </Button>
      </div>
      <div className="w-full flex flex-wrap">
        {tags.map((tag) => (
          <Grid key={tag.name} className="mt-4 ml-4">
            <Badge
              color={"default"}
              content={"x"}
              shape="rectangle"
              size="lg"
              onClick={() => deleteTag(tag)}
              style={{ cursor: "pointer" }}
            >
              <CustomTag tag={tag} />
            </Badge>
          </Grid>
        ))}
      </div>
    </div>
  );
};

export default TagGenerator;
