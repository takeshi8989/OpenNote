import Sidebar from "../../components/sidebar/ProfilePage/Sidebar";
import UserInfo from "../../components/UserInfo";
import { User } from "../../types/user";
import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { useRouter } from "next/router";
import { useAtomValue } from "jotai";
import { isLoggedInAtom, usernameAtom } from "@/jotai/authAtom";

const ProfilePage = () => {
  const router = useRouter();
  const { username } = router.query;
  const globalUsername = useAtomValue(usernameAtom);
  const [currentUser, setCurrentUser] = useState<User>();
  const { getUserByUsername } = useUser();
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [windowSize, setWindowSize] = useState<number>();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    setUser();
  }, [username]);

  const setUser = async (): Promise<void> => {
    if (username != null && typeof username === "string") {
      const user: User | null = await getUserByUsername(username);
      if (user) setCurrentUser(user);
      setIsLoading(false);
    }
  };

  if (isLoading) return <div></div>;
  if (!currentUser) return <div>NOT FOUND</div>;

  return (
    <div className="h-screen w-full flex justify-center overflow-hidden">
      <div className="w-0 lg:w-1/4 lg:h-full overflow-y-scroll">
        <Sidebar
          user={currentUser}
          isAuthorized={isLoggedIn && username == globalUsername}
        />
      </div>
      <div className="w-full lg:w-3/4 h-full overflow-y-scroll">
        <UserInfo
          user={currentUser}
          setUser={setCurrentUser}
          isAuthorized={isLoggedIn && username == globalUsername}
        />
        {windowSize && windowSize < 1024 && (
          <div className="w-full">
            <Sidebar
              user={currentUser}
              isAuthorized={isLoggedIn && username == globalUsername}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
