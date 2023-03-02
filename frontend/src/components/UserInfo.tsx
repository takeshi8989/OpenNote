import React, { useEffect, useState } from "react";
import { Avatar, Text } from "@nextui-org/react";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import SinglePagePDF from "./SinglePagePDF";
import { useNote } from "@/hooks/useNote";

const UserInfo = ({ user }: { user: User | undefined }) => {
  const [userNotes, setUserNotes] = useState<Note[]>([]);
  const { getNotesByUsername } = useNote();
  useEffect(() => {
    fetchNotes();
  }, [user]);

  const fetchNotes = async (): Promise<void> => {
    if (user == null) return;
    const data: Note[] = await getNotesByUsername(user.username);
    setUserNotes(data);
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
        {userNotes.length > 0 && <SinglePagePDF note={userNotes[0]} />}
        {userNotes.length > 1 && <SinglePagePDF note={userNotes[1]} />}
        {userNotes.length > 2 && <SinglePagePDF note={userNotes[2]} />}
      </div>
    </div>
  );
};

export default UserInfo;
