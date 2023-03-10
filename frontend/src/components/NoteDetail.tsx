import { Note } from "@/types/note";
import { Button, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiFillLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { GrDownload } from "react-icons/gr";
import { TbClick } from "react-icons/tb";
import MultiPagePDF from "./MultiPagePDF";
import CustomTag from "./tag/CustomTag";
import { useNote } from "@/hooks/useNote";
import { useAtomValue, useSetAtom } from "jotai";
import {
  isLoggedInAtom,
  openLoginModalAtom,
  usernameAtom,
} from "@/jotai/authAtom";
import DeleteNoteModal from "./modal/DeleteNoteModal";
import Link from "next/link";

interface Props {
  note: Note | null;
  setNote: React.Dispatch<React.SetStateAction<Note | null>>;
}

const NoteDetail = ({ note, setNote }: Props): JSX.Element => {
  const router = useRouter();
  const [likeNote, setLikeNote] = useState<boolean>(false);
  const username = useAtomValue(usernameAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const setOpenLoginModal = useSetAtom(openLoginModalAtom);
  const { toggleLike } = useNote();

  useEffect(() => {
    if (!note) return;
    const hasUserLike: boolean =
      note.likes?.filter((like) => like.user.username === username).length > 0;
    setLikeNote(hasUserLike);
  }, [note]);

  if (!note) return <div>Not Found</div>;

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
      <Link href={`/profile/${note.user?.username}`}>
        <Text className="text-center" size="$md">
          {note.user?.username}
        </Text>
      </Link>

      {/* View, Like, Download, Comment */}
      <div className="flex items-center justify-center mt-1">
        <TbClick size={30} />
        <Text className="mr-4" size="$xl">
          {note.numViews}
        </Text>
        <AiFillLike
          color={likeNote ? "#000000" : "#EEEEEE"}
          size={30}
          onClick={handleLike}
        />
        <Text className="mr-4" size="$xl">
          {note.likes?.length}
        </Text>
        <GrDownload size={30} />
        <Text className="mr-4" size="$xl">
          {note.numDownload}
        </Text>

        <BiCommentDetail size={30} className="mt-1" />
        <Text className="mr-4" size="$xl">
          {note.comments?.length}
        </Text>
      </div>
      {isLoggedIn && note.user?.username === username && (
        <div className="flex items-center justify-center mt-5">
          <DeleteNoteModal note={note} />
          <Button
            flat
            auto
            bordered
            className="mx-3"
            onClick={() => router.push(`/edit/${note.id}`)}
          >
            Edit
          </Button>
        </div>
      )}

      {/* Note Pages from PDF File */}
      <MultiPagePDF url={note.url} />
      {/* Tags */}
      <div className="flex flex-wrap justify-center mx-auto w-1/3 mt-2 mb-5">
        {note.tags?.map((tag) => (
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
