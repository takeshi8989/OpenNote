import React from "react";
import CommentList from "./CommentList";
import { BiCommentDetail } from "react-icons/bi";
import { Button, Text, Input } from "@nextui-org/react";
import { SendButton } from "@/components/sidebar/NotePage/SendButton";
import { SendIcon } from "@/components/sidebar/NotePage/SendIcon";
import { Commnet } from "@/types/comment";
import { Note } from "@/types/note";

const commnets: Commnet[] = [
  {
    id: "1",
    author: { username: "takeshi", email: "take@gmail.com" },
    content: "This note is very helpful! Thank you!",
    date: "2022 Aug 21",
  },
  {
    id: "2",
    author: { username: "user 2", email: "user2@gmail.com" },
    content:
      "I love this note! fdsalkjfldsaj fdkjkdkjfjkd jakfjk djkffdsafdsa fdsafsdfadsa",
    date: "2023 Jan 12",
  },
  {
    id: "11",
    author: { username: "takeshi", email: "take@gmail.com" },
    content: "This note is very helpful! Thank you!",
    date: "2022 Aug 21",
  },
  {
    id: "21",
    author: { username: "user 2", email: "user2@gmail.com" },
    content:
      "I love this note! fdsalkjfldsaj fdkjkdkjfjkd jakfjk djkffdsafdsa fdsafsdfadsa",
    date: "2023 Jan 12",
  },
  {
    id: "12",
    author: { username: "takeshi", email: "take@gmail.com" },
    content: "This note is very helpful! Thank you!",
    date: "2022 Aug 21",
  },
  {
    id: "22",
    author: { username: "user 2", email: "user2@gmail.com" },
    content:
      "I love this note! fdsalkjfldsaj fdkjkdkjfjkd jakfjk djkffdsafdsa fdsafsdfadsa",
    date: "2023 Jan 12",
  },
  {
    id: "13",
    author: { username: "takeshi", email: "take@gmail.com" },
    content: "This note is very helpful! Thank you!",
    date: "2022 Aug 21",
  },
  {
    id: "23",
    author: { username: "user 2", email: "user2@gmail.com" },
    content:
      "I love this note! fdsalkjfldsaj fdkjkdkjfjkd jakfjk djkffdsafdsa fdsafsdfadsa",
    date: "2023 Jan 12",
  },
];

const BUCKET_OBJECT_URL: string = process.env.BUCKET_OBJECT_URL as string;
const API_URL: string = process.env.API_URL as string;
const Sidebar = ({ note }: { note: Note | null }): JSX.Element => {
  if (note === null) return <div></div>;

  const downloadNote = () => {
    const fileKey = note.url.substring(BUCKET_OBJECT_URL.length);
    window.open(`${API_URL}/files/download/${fileKey}/${note.title}`);
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
          contentRight={
            <SendButton className="mr-2">
              <SendIcon />
            </SendButton>
          }
        />
      </div>
      <CommentList comments={commnets} />
    </div>
  );
};

export default Sidebar;
