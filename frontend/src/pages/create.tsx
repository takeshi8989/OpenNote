import React, { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/sidebar/CreatePage/Sidebar";
import CreateNoteBody from "@/components/CreateNoteBody";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { isLoggedInAtom, openLoginModalAtom } from "@/jotai/authAtom";
import { scrollBottomAtom } from "@/jotai/noteAtom";

const CreateNotePage = () => {
  const [selectedFolderIds, setSelectedFolderIds] = useState<string[]>([]);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const setOpenLoginModal = useSetAtom(openLoginModalAtom);
  const [windowSize, setWindowSize] = useState<number>();
  const noteBodyRef = useRef<HTMLDivElement>(null);
  const [scrollBottom, setScrollBottom] = useAtom(scrollBottomAtom);

  useEffect(() => {
    if (!isLoggedIn) {
      setOpenLoginModal(true);
      return;
    }
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  }, []);

  const handleBodyScroll = () => {
    if (noteBodyRef && noteBodyRef.current) {
      const bottom: number = noteBodyRef.current.scrollTop + window.innerHeight;
      setScrollBottom(bottom);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center overflow-hidden">
      <div className="w-0 lg:w-1/4 lg:h-full overflow-y-scroll">
        <Sidebar
          selectedFolderIds={selectedFolderIds}
          setSelectedFolderIds={setSelectedFolderIds}
        />
      </div>
      <div
        className="w-full lg:w-3/4 h-full overflow-y-scroll"
        ref={noteBodyRef}
        onScroll={handleBodyScroll}
      >
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
