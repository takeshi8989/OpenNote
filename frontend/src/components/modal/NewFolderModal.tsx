import React, { useState } from "react";
import { Modal, Button, Text, Input } from "@nextui-org/react";
import { useFolder } from "@/hooks/useFolder";
import { useAtomValue, useSetAtom } from "jotai";
import { isLoggedInAtom, openLoginModalAtom } from "@/jotai/authAtom";

const NewFolderModal = () => {
  const [visible, setVisible] = React.useState(false);
  const [folderTitle, setFolderTitle] = useState<string>("");
  const { createNewFolder } = useFolder();
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const setOpenLoginModal = useSetAtom(openLoginModalAtom);

  const handler = () => {
    if (!isLoggedIn) {
      setOpenLoginModal(true);
      return;
    }
    setVisible(true);
  };

  const handleCreate = async () => {
    const res: boolean = await createNewFolder(folderTitle).then((res) => res);
    if (res) setFolderTitle("");
  };

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button
        flat
        auto
        bordered
        size="lg"
        color="secondary"
        className="mx-auto mt-5"
        onPress={handler}
      >
        Create new folder
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
        <Modal.Body>
          <Input
            clearable
            underlined
            fullWidth
            color="primary"
            size="lg"
            placeholder="My folder"
            value={folderTitle}
            onChange={(e) => setFolderTitle(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="primary"
            onPress={() => {
              handleCreate();
              closeHandler();
            }}
          >
            Create
          </Button>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewFolderModal;
