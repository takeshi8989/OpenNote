import React, { useState, useEffect } from "react";
import CommentList from "./CommentList";
import { BiCommentDetail } from "react-icons/bi";
import { Button, Text, Input } from "@nextui-org/react";
import { SendButton } from "@/components/sidebar/NotePage/SendButton";
import { SendIcon } from "@/components/sidebar/NotePage/SendIcon";
import { Note } from "@/types/note";
import { useComment } from "@/hooks/useComment";
import { Comment } from "@/types/comment";

const BUCKET_OBJECT_URL: string = process.env.BUCKET_OBJECT_URL as string;
const API_URL: string = process.env.API_URL as string;
const Sidebar = ({ note }: { note: Note | null }): JSX.Element => {
  const [currentComment, setCurrentComment] = useState<string>("");
  const { createNewComment } = useComment();

  if (note === null) return <div></div>;

  const downloadNote = () => {
    const fileKey = note.url.substring(BUCKET_OBJECT_URL.length);
    window.open(`${API_URL}/files/download/${fileKey}/${note.id}`);
  };

  const sendComment = async (): Promise<void> => {
    if (currentComment === "") return;
    const data: Comment | null = await createNewComment(
      currentComment,
      note.id
    ).then((res) => res);
    if (data != null) {
      note.comments.push(data);
      setCurrentComment("");
    }
  };

  return (
    <div className=" mx-10 ">
      <Button
        flat
        auto
        bordered
        size="lg"
        color="primary"
        className="mx-auto mt-10"
        type="submit"
        onClick={downloadNote}
      >
        Download Note
      </Button>
      {/* Folder Modal Button */}
      <Button
        flat
        auto
        bordered
        size="lg"
        color="secondary"
        className="mx-auto mt-10"
      >
        Add to my Folder
      </Button>
      {/* Comments */}
      <div className="flex justify-center items-center w-full my-auto mt-10">
        <BiCommentDetail size={30} className="mt-2 mr-2" />
        <Text size="$2xl">Comments</Text>
      </div>
      <div className="w-full mt-4 flex justify-center">
        <Input
          contentRightStyling={false}
          width="100%"
          placeholder="Type your message..."
          value={currentComment}
          onChange={(e) => setCurrentComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendComment();
          }}
          contentRight={
            <SendButton className="mr-2" onClick={sendComment}>
              <SendIcon />
            </SendButton>
          }
        />
      </div>
      <CommentList comments={note.comments} />
    </div>
  );
};

export default Sidebar;
