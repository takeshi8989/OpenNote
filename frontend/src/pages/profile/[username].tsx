import Sidebar from "../../components/sidebar/ProfilePage/Sidebar";
import UserInfo from "../../components/UserInfo";
import { User } from "../../types/user";
import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { useRouter } from "next/router";

const ProfilePage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [currentUser, setCurrentUser] = useState<User>();
  const { getUserByUsername } = useUser();
  useEffect(() => {
    setUser();
  }, [username]);

  const setUser = async (): Promise<void> => {
    if (username != null && typeof username === "string") {
      const user: User | null = await getUserByUsername(username);
      if (user) setCurrentUser(user);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center overflow-hidden">
      <div className="w-1/4 h-full overflow-y-scroll">
        <Sidebar user={currentUser} />
      </div>
      <div className="w-3/4 h-full overflow-y-scroll">
        <UserInfo user={currentUser} />
      </div>
    </div>
  );
};

export default ProfilePage;
