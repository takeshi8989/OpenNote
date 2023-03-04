import Sidebar from "../../components/sidebar/ProfilePage/Sidebar";
import UserInfo from "../../components/UserInfo";
import { User } from "../../types/user";
import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { useRouter } from "next/router";

const ProfilePage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>();
  const { getUserByUsername } = useUser();
  useEffect(() => {
    setUser();
    if (typeof localStorage.getItem("username") === "string") {
      const name = localStorage.getItem("username") as string;
      setIsAuthorized(name === username);
    }
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
        <Sidebar user={currentUser} isAuthorized={isAuthorized} />
      </div>
      <div className="w-3/4 h-full overflow-y-scroll">
        <UserInfo
          user={currentUser}
          setUser={setCurrentUser}
          isAuthorized={isAuthorized}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
