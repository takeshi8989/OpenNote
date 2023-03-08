import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/CreatePage/Sidebar";
import CreateNoteBody from "@/components/CreateNoteBody";
import { useAtomValue, useSetAtom } from "jotai";
import { isLoggedInAtom, openLoginModalAtom } from "@/jotai/authAtom";

const CreateNotePage = () => {
  const [selectedFolderIds, setSelectedFolderIds] = useState<string[]>([]);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const setOpenLoginModal = useSetAtom(openLoginModalAtom);
  const [windowSize, setWindowSize] = useState<number>();
  useEffect(() => {
    if (!isLoggedIn) {
      setOpenLoginModal(true);
      return;
    }
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  }, []);
  return (
    <div className="h-screen w-full flex justify-center overflow-hidden">
      <div className="w-0 lg:w-1/4 lg:h-full overflow-y-scroll">
        <Sidebar
          selectedFolderIds={selectedFolderIds}
          setSelectedFolderIds={setSelectedFolderIds}
        />
      </div>
      <div className="w-full lg:w-3/4 h-full overflow-y-scroll">
        <CreateNoteBody selectedFolderIds={selectedFolderIds} />
        {windowSize && windowSize < 1024 && (
          <div className="w-full mb-32">
            <Sidebar
              selectedFolderIds={selectedFolderIds}
              setSelectedFolderIds={setSelectedFolderIds}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNotePage;
