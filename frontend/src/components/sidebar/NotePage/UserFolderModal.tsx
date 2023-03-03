import React, { useEffect, useState } from "react";
import { Modal, Button, Text, Checkbox } from "@nextui-org/react";
import { useFolder } from "@/hooks/useFolder";
import { useNote } from "@/hooks/useNote";
import { useAtomValue, useSetAtom } from "jotai";
import { isLoggedInAtom, openLoginModalAtom } from "@/jotai/authAtom";
import { Folder } from "@/types/folder";
import { Note } from "@/types/note";

const UserFolderModal = ({ note }: { note: Note | null }) => {
  const [visible, setVisible] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolderIds, setSelectedFolderIds] = useState<string[]>([]);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const setOpenLoginModal = useSetAtom(openLoginModalAtom);
  const { getFoldersByUsername } = useFolder();
  const { addNoteToFolders } = useNote();

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

  const checkSelectedFolders = (e: boolean, id: string) => {
    if (e == true) {
      setSelectedFolderIds([...selectedFolderIds, id]);
    } else {
      setSelectedFolderIds(
        selectedFolderIds.filter((selectedId) => selectedId != id)
      );
    }
  };

  const addToFolders = async () => {
    if (note == null) return;
    const res: boolean = await addNoteToFolders(
      note.id,
      selectedFolderIds
    ).then((res) => res);
    closeHandler();
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
            Add to Folders
          </Text>
        </Modal.Header>
        <Modal.Body className="px-10">
          <div className="w-full mx-auto mt-6">
            {folders.map((folder) => (
              <div key={folder.id} className="w-full flex justify-start my-2">
                <Checkbox
                  value={folder.id}
                  defaultSelected={
                    folder.notes.filter((note) => note.id === note.id).length >
                    0
                  }
                  onChange={(e) => checkSelectedFolders(e, folder.id)}
                >
                  {folder.title}
                </Checkbox>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="primary" onPress={addToFolders}>
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
