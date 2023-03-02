import Sidebar from "@/components/sidebar/ProfilePage/Sidebar";
import UserInfo from "@/components/UserInfo";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="h-screen w-full flex justify-center overflow-hidden">
      <div className="w-1/4 h-full overflow-y-scroll">
        <Sidebar />
      </div>
      <div className="w-3/4 h-full overflow-y-scroll">
        <UserInfo />
      </div>
    </div>
  );
};

export default ProfilePage;
