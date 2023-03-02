import Sidebar from "@/components/sidebar/ProfilePage/Sidebar";
import UserInfo from "@/components/UserInfo";
import { User } from "@/types/user";
import React, { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const { getUserByUsername } = useUser();
  useEffect(() => {
    setUser();
  }, []);

  const setUser = async (): Promise<void> => {
    const user: User | null = await getUserByUsername();
    if (user) setCurrentUser(user);
  };

  return (
    <div className="h-screen w-full flex justify-center overflow-hidden">
      <div className="w-1/4 h-full overflow-y-scroll">
        <Sidebar />
      </div>
      <div className="w-3/4 h-full overflow-y-scroll">
        <UserInfo user={currentUser} />
      </div>
    </div>
  );
};

export default ProfilePage;
