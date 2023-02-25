import { Tag } from "@/types/tag";
import {
  Text,
  Switch,
  Badge,
  Input,
  Textarea,
  Grid,
  Button,
} from "@nextui-org/react";
import React, { useState } from "react";
import ColorChangeButton from "./button/ColorChangeButton";
import FileSelectButton from "./button/FileSelectButton";

const tags: Tag[] = [
  { name: "Langara", color: "pink" },
  { name: "CPSC", color: "blue" },
  { name: "1181", color: "green" },
];
const CreateNoteBody = () => {
  return (
    <div className="w-full mb-20">
      <div className="w-1/2 mx-auto">
        <Text size={"$5xl"} className="text-center">
          New note
        </Text>
        <div className="flex justify-end items-center">
          <Text size={"$xl"} className="mx-3">
            Public
          </Text>
          <Switch checked={true} size="lg" />
        </div>
      </div>
      {/* Drop File */}
      <div className="w-1/2 mx-auto border border-3 border-dashed border-cyan-700	 h-80 rounded-md mt-10 flex flex-col items-center justify-center bg-gray-100">
        <Text size={"$4xl"}>Drop File</Text>
        <FileSelectButton />
      </div>
      {/* Description */}
      <div className="w-full flex justify-center mt-20">
        <Textarea
          underlined
          color="primary"
          labelPlaceholder="Description"
          size="xl"
          rows={4}
          width="50%"
        />
      </div>
      {/* Tag */}
      <div className="w-1/2 mx-auto mt-10 mb-20">
        <Text size={"$2xl"} className="text-left ml-4">
          Tags
        </Text>
        <Badge size={"lg"} color={"secondary"} className="mt-4 ml-4">
          Preview
        </Badge>
        <div className="mt-2 flex">
          <Input clearable underlined placeholder="Tag" />
          <ColorChangeButton />
        </div>
        <div className="w-full flex flex-wrap">
          {tags.map((tag) => (
            <Grid key={tag.name} className="mt-4 ml-4 mx-2">
              <Badge
                color={"default"}
                content={"x"}
                shape="rectangle"
                size="lg"
              >
                <Badge color={"primary"} size={"lg"}>
                  {tag.name}
                </Badge>
              </Badge>
            </Grid>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="w-full flex justify-center">
        <Button bordered color="secondary" size={"xl"} auto className="text-xl">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CreateNoteBody;
