import { Text, Switch, Textarea, Button } from "@nextui-org/react";
import React from "react";
import FileSelectButton from "./button/FileSelectButton";
import TagGenerator from "./tag/TagGenerator";

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
      <TagGenerator />
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
