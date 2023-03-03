import React, { useEffect, useState } from "react";
import { Modal, Button, Text, Checkbox } from "@nextui-org/react";
import { useFolder } from "@/hooks/useFolder";
import { useAtomValue, useSetAtom } from "jotai";
import { isLoggedInAtom, openLoginModalAtom } from "@/jotai/authAtom";
import { Folder } from "@/types/folder";

const UserFolderModal = () => {
  const [visible, setVisible] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([]);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const setOpenLoginModal = useSetAtom(openLoginModalAtom);
  const { getFoldersByUsername } = useFolder();

  useEffect(() => {
    fetchUserFolders();
  }, []);

  const fetchUserFolders = async (): Promise<void> => {
    const username: string = localStorage.getItem("username") as string;
    const data: Folder[] | null = await getFoldersByUsername(username).then(
      (res) => res
    );
    if (data) {
      setFolders(data);
    }
  };

  const handler = () => {
    if (!isLoggedIn) {
      setOpenLoginModal(true);
      return;
    }
    setVisible(true);
  };

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <div className="mx-auto mt-10">
      <Button
        flat
        auto
        bordered
        size="lg"
        color="secondary"
        className="mx-auto mt-5"
        onPress={handler}
      >
        Add to My Folder
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Create New Folder
          </Text>
        </Modal.Header>
        <Modal.Body className="px-10">
          <div className="w-full mx-auto mt-6">
            {folders.map((folder) => (
              <div key={folder.id} className="w-full flex justify-start my-2">
                <Checkbox value={folder.id}>{folder.title}</Checkbox>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Apply
          </Button>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserFolderModal;
