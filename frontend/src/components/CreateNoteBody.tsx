import { Text, Switch, Textarea, Button, Input } from "@nextui-org/react";
import { useDropzone } from "react-dropzone";
import React, { useCallback, useState } from "react";
import TagGenerator from "./tag/TagGenerator";
import { useFile } from "@/hooks/useFile";
import { useNote } from "@/hooks/useNote";
import MultiPagePDF from "./MultiPagePDF";
import { NewNoteRequest } from "@/types/request/noteRequest";
import { Tag } from "@/types/tag";
import { useAtomValue, useSetAtom } from "jotai";
import { isLoggedInAtom, openLoginModalAtom } from "@/jotai/authAtom";
import { useRouter } from "next/router";

const CreateNoteBody = () => {
  const router = useRouter();
  const { uploadFile, deleteFile } = useFile();
  const { createNewNote } = useNote();
  const [currentFileUrl, setCurrentFileUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("New Note");
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [tags, setTags] = useState<Tag[]>([]);
  const [description, setDescription] = useState<string>("");
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const setOpenLoginModal = useSetAtom(openLoginModalAtom);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!isLoggedIn) {
      setOpenLoginModal(true);
      return;
    }
    const file: File = acceptedFiles[0];
    const fileUrl: string = await uploadFile(file).then((url) => {
      return url;
    });
    // if fileUrl === ""

    showNote(fileUrl);
  }, []);

  const resetNote = async (): Promise<void> => {
    if (currentFileUrl !== "") {
      const deleteSuccess: boolean = await deleteFile(currentFileUrl).then(
        (result) => {
          return result;
        }
      );
      if (deleteSuccess) setCurrentFileUrl("");
    }
  };

  const showNote = (url: string): void => {
    if (url === "") return;
    setCurrentFileUrl(url);
  };

  const createNote = async (): Promise<void> => {
    if (!isLoggedIn) {
      setOpenLoginModal(true);
      return;
    }
    const username: string = localStorage.getItem("username") as string;
    const request: NewNoteRequest = {
      username,
      title,
      url: currentFileUrl,
      tags,
      description,
      isPublic,
    };
    const noteId: string = await createNewNote(request).then((id) => id);
    if (noteId != "") {
      setTitle("");
      setCurrentFileUrl("");
      setIsPublic(true);
      router.push(`/note/${noteId}`);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div className="w-full mb-20 mt-20">
      <div className="w-1/2 flex flex-col items-center mx-auto mt-10">
        <Input
          clearable
          underlined
          value={title}
          size="xl"
          className="w-full mx-auto text-2xl"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="w-full flex justify-end items-center">
          <Text size="$xl" className="mx-3">
            Public
          </Text>
          <Switch
            checked={true}
            size="lg"
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </div>
      </div>
      {/* Drop File */}
      {currentFileUrl === "" && (
        <div
          {...getRootProps({
            className:
              "w-1/2 mx-auto border border-3 border-dashed border-cyan-700	 h-80 rounded-md mt-10 flex flex-col items-center justify-center bg-gray-100",
          })}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag and drop a file here, or click to select file</p>
          )}
        </div>
      )}
      {currentFileUrl !== "" && (
        <>
          <Button
            color={"error"}
            bordered
            auto
            className="mx-auto mb-2 mt-6"
            onClick={resetNote}
          >
            Delete File
          </Button>
          <div className="hover:bg-gray-200">
            <MultiPagePDF url={currentFileUrl} />
          </div>
        </>
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {/* Tag */}
      <TagGenerator tags={tags} setTags={setTags} />
      {/* Submit */}
      <div className="w-full flex justify-center">
        <Button
          bordered
          color="secondary"
          size="xl"
          auto
          className="text-xl"
          onClick={createNote}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CreateNoteBody;
