import React, { useEffect, useState } from "react";
import { Avatar, Text, Textarea } from "@nextui-org/react";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import SinglePagePDF from "./SinglePagePDF";
import { useNote } from "@/hooks/useNote";
import { useUser } from "@/hooks/useUser";
import { BsPen } from "react-icons/bs";

interface Props {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isAuthorized: boolean;
}

const UserInfo = ({ user, setUser, isAuthorized }: Props) => {
  const [userNotes, setUserNotes] = useState<Note[]>([]);
  const [isInfoEditing, setIsInfoEditing] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<string>("");
  const { getNotesByUsername } = useNote();
  const { updateUser } = useUser();

  useEffect(() => {
    fetchNotes();
    if (user) setUserInfo(user.info);
  }, [user]);

  const handleInfoKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) updateUserInfo();
  };

  const updateUserInfo = async () => {
    if (!user) return;
    user.info = userInfo;
    const data: User | null = await updateUser(user).then((res) => res);
    if (data) {
      setUser(data);
      setIsInfoEditing(false);
    }
  };

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
        <div className="flex items-center">
          <Text className="text-left mx-4 " size="$3xl">
            Info
          </Text>
          {isAuthorized && (
            <BsPen size={20} onClick={() => setIsInfoEditing(true)} />
          )}
        </div>
        {isInfoEditing ? (
          <Textarea
            underlined
            color="primary"
            size="xl"
            rows={4}
            width="100%"
            value={userInfo}
            onChange={(e) => setUserInfo(e.target.value)}
            onKeyDown={handleInfoKeyDown}
          />
        ) : (
          <Text size="$lg" className="mx-4">
            {userInfo}
          </Text>
        )}
      </div>
      <div className="mx-4 flex justify-around flex-wrap">
        {userNotes.length > 0 && <SinglePagePDF note={userNotes[0]} />}
        {userNotes.length > 1 && <SinglePagePDF note={userNotes[1]} />}
        {userNotes.length > 2 && <SinglePagePDF note={userNotes[2]} />}
      </div>
    </div>
  );
};

export default UserInfo;
