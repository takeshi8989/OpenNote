import React, { useEffect } from "react";
import Sidebar from "@/components/sidebar/CreatePage/Sidebar";
import CreateNoteBody from "@/components/CreateNoteBody";
import { useAtomValue, useSetAtom } from "jotai";
import { isLoggedInAtom, openLoginModalAtom } from "@/jotai/authAtom";

const CreateNotePage = () => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const setOpenLoginModal = useSetAtom(openLoginModalAtom);
  useEffect(() => {
    if (!isLoggedIn) {
      setOpenLoginModal(true);
      return;
    }
  }, []);
  return (
    <div className="h-screen w-full flex justify-center overflow-hidden">
      <div className="w-1/4 h-full overflow-y-scroll">
        <Sidebar />
      </div>
      <div className="w-3/4 h-full overflow-y-scroll">
        <CreateNoteBody />
      </div>
    </div>
  );
};

export default CreateNotePage;
