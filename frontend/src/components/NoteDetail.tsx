import { Note } from "@/types/note";
import { Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { GrDownload } from "react-icons/gr";
import { TbClick } from "react-icons/tb";
import MultiPagePDF from "./MultiPagePDF";
import CustomTag from "./tag/CustomTag";
import { useNote } from "@/hooks/useNote";
import { useAtomValue, useSetAtom } from "jotai";
import { isLoggedInAtom, openLoginModalAtom } from "@/jotai/authAtom";

interface Props {
  note: Note | null;
  setNote: React.Dispatch<React.SetStateAction<Note | null>>;
}

const NoteDetail = ({ note, setNote }: Props): JSX.Element => {
  const [likeNote, setLikeNote] = useState<boolean>(false);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const setOpenLoginModal = useSetAtom(openLoginModalAtom);
  const { toggleLike } = useNote();

  useEffect(() => {
    if (note === null) return;
    const username: string = localStorage.getItem("username") as string;
    const hasUserLike: boolean =
      note.likes.filter((like) => like.user.username === username).length > 0;
    setLikeNote(hasUserLike);
  }, [note]);

  if (note == null) return <div>Not Found</div>;

  const handleLike = async () => {
    if (!isLoggedIn) {
      setOpenLoginModal(true);
      return;
    }
    const data: Note | null = await toggleLike(note);
    setNote(data);
  };

  return (
    <div>
      <Text className="text-center mt-4" size="$3xl">
        {note.title}
      </Text>
      <Text className="text-center" size="$md">
        {note.user.username}
      </Text>

      {/* View, Like, Download, Comment */}
      <div className="flex items-center justify-center mt-1">
        <TbClick size={30} />
        <Text className="mr-4" size="$xl">
          123
        </Text>
        <AiFillLike
          color={likeNote ? "#000000" : "#EEEEEE"}
          size={30}
          onClick={handleLike}
        />
        <Text className="mr-4" size="$xl">
          {note.likes.length}
        </Text>
        <GrDownload size={30} />
        <Text className="mr-4" size="$xl">
          {note.numDownload}
        </Text>

        <BiCommentDetail size={30} className="mt-1" />
        <Text className="mr-4" size="$xl">
          {note.comments.length}
        </Text>
      </div>
      {/* Note Pages from PDF File */}
      <MultiPagePDF url={note.url} />
      {/* Tags */}
      <div className="flex flex-wrap justify-center mx-auto w-1/3 mt-2 mb-5">
        {note.tags.map((tag) => (
          <CustomTag tag={tag} />
        ))}
      </div>
      {/* Description */}
      <div className="w-1/2 text-center mx-auto mb-20">
        <Text>{note.description}</Text>
      </div>
    </div>
  );
};

export default NoteDetail;
