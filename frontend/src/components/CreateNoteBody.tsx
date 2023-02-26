import { Text, Switch, Textarea, Button } from "@nextui-org/react";
import { useDropzone } from "react-dropzone";
import React, { useCallback, useState } from "react";
import TagGenerator from "./tag/TagGenerator";
import { useFile } from "@/hooks/useFile";
import { Note } from "@/types/note";
import MultiPagePDF from "./MultiPagePDF";

const CreateNoteBody = () => {
  const { uploadFile } = useFile();
  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file: File = acceptedFiles[0];
    const fileUrl: string = await uploadFile(file).then((url) => {
      return url;
    });

    showNote(fileUrl);
  }, []);

  const showNote = (url: string): void => {
    if (url === "") return;
    const note: Note = {
      id: "new",
      title: "title",
      url,
      author: null,
    };
    setCurrentNote(note);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

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
      {currentNote === null && (
        <div
          {...getRootProps({
            className:
              "w-1/2 mx-auto border border-3 border-dashed border-cyan-700	 h-80 rounded-md mt-10 flex flex-col items-center justify-center bg-gray-100",
          })}
        >
          <input {...getInputProps()} />
          <p>Drag and drop a file here, or click to select file</p>
        </div>
      )}
      {currentNote !== null && (
        <div className="hover:bg-gray-100">
          <button>CLick</button>
          <MultiPagePDF note={currentNote} />
        </div>
      )}
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
