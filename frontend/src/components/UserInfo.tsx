import React, { useEffect, useState } from "react";
import { Avatar, Text } from "@nextui-org/react";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import { Tag } from "@/types/tag";
import SinglePagePDF from "./SinglePagePDF";

const user1: User = {
  username: "take2",
  email: "",
};
const tag1: Tag = {
  id: "1",
  name: "stri",
  color: "red",
};

const tag2: Tag = {
  id: "2",
  name: "LKSJfdksal",
  color: "blue",
};

const note: Note = {
  id: "1",
  title: "title",
  url: "https://opennote-bucket.s3.us-west-2.amazonaws.com/e8efd39b-9c8a-4ee7-81d5-290a7761bad3.pdf",
  description: "hello",
  user: user1,
  createdAt: "string",
  updatedAt: "",
  public: true,
  tags: [tag1, tag2],
  comments: [],
  numDownload: 5,
  likes: [],
};

const UserInfo = ({ user }: { user: User | undefined }) => {
  const [userNotes, setUserNotes] = useState<Note[]>([]);
  useEffect(() => {
    fetchNotes();
  }, [user]);

  const fetchNotes = () => {
    return;
  };
  if (user == null) return <div>not found</div>;

  return (
    <div>
      {/* Username and Pic */}
      <div className="flex justify-center mt-20 items-center">
        <Avatar
          bordered
          css={{ size: "$30" }}
          className="mx-4"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4mt9OP-78V6r8z1c0ohe_dtyh2OQNNVDI2f2BSd7npw&s"
        />
        <Text className="mx-4" css={{ fontSize: "60px" }}>
          {user.username}
        </Text>
      </div>
      {/* Info */}
      <div className="w-1/2 mx-auto mt-8">
        <Text className="text-left" size="$3xl">
          Info
        </Text>
        <Text size="$lg" className="mx-4">
          lkfjsalfdjasl fdjsalfjdslakj fksjalfndakj rejwl ajfdlk fjsalkn lkefjal
        </Text>
      </div>
      <div className="mx-4 flex justify-around">
        <SinglePagePDF note={note} />
        <SinglePagePDF note={note} />
        <SinglePagePDF note={note} />
      </div>
    </div>
  );
};

export default UserInfo;
