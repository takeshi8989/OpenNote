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
import { v4 as uuidv4 } from "uuid";

interface Props {
  selectedFolderIds: string[];
}

const BUCKET_OBJECT_URL: string = process.env.BUCKET_OBJECT_URL as string;
const CreateNoteBody = ({ selectedFolderIds }: Props) => {
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
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fileUploadMessage, setFileUploadMessage] = useState<string>("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!isLoggedIn) {
      setOpenLoginModal(true);
      return;
    }
    const uuid: string = uuidv4();
    const file: File = acceptedFiles[0];
    const message: string = await uploadFile(file, uuid).then((msg) => msg);
    const objectUrl: string = BUCKET_OBJECT_URL + uuid + ".pdf";
    if (message === "") showNote(objectUrl);
    else setFileUploadMessage(message);
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
    if (currentFileUrl == null || currentFileUrl === "") {
      setErrorMessage("Please upload a file");
      return;
    }
    const username: string = localStorage.getItem("username") as string;
    const request: NewNoteRequest = {
      username,
      title,
      url: currentFileUrl,
      tags,
      folderIds: selectedFolderIds,
      description,
      isPublic,
    };
    const noteId: string = await createNewNote(request).then((id) => id);
    if (noteId != "") {
      setTitle("");
      setCurrentFileUrl("");
      setIsPublic(true);
      setErrorMessage("");
      setFileUploadMessage("");
      router.push(`/note/${noteId}`);
    } else {
      setErrorMessage("Note creation failed, please try again");
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
      <Text size="$xl" className="text-center text-red-400">
        {fileUploadMessage}
      </Text>
      {/* Drop File */}
      {currentFileUrl === "" && (
        <div
          {...getRootProps({
            className:
              "w-3/4 md:w-1/2 mx-auto border border-3 border-dashed border-cyan-700	 h-80 rounded-md mt-10 flex flex-col items-center justify-center bg-gray-100",
          })}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className="text-center">
              <p>Drop the files here ...</p>
              <p>Upload PDF File up to 10MB</p>
            </div>
          ) : (
            <div className="text-center">
              <p>Drag and drop a file here, or click to select file</p>
              <p>Upload PDF File up to 10MB</p>
            </div>
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
      <Text size="$lg" className="text-center text-red-400">
        {errorMessage}
      </Text>
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
