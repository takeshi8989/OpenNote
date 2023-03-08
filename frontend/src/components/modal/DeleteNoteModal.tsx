import React from "react";
import { Modal, Button, Text } from "@nextui-org/react";
import { useNote } from "@/hooks/useNote";
import { useAtomValue, useSetAtom } from "jotai";
import { isLoggedInAtom, openLoginModalAtom } from "@/jotai/authAtom";
import { Note } from "@/types/note";

const DeleteNoteModal = ({ note }: { note: Note }) => {
  const [visible, setVisible] = React.useState(false);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const setOpenLoginModal = useSetAtom(openLoginModalAtom);
  const { deleteNote } = useNote();

  const handler = () => {
    if (!isLoggedIn) {
      setOpenLoginModal(true);
      return;
    }
    setVisible(true);
  };

  const onDelete = async () => {
    const res: boolean = await deleteNote(note.id).then((res) => res);
    if (res) closeHandler();
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
        size="md"
        color="secondary"
        className="mx-3"
        onPress={handler}
      >
        Delete
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Are you sure?
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-title" size={18}>
            Delete
            <Text b size={18} className="ml-2">
              {note.title}
            </Text>
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="error"
            onPress={() => {
              onDelete();
            }}
          >
            Delete
          </Button>
          <Button auto flat color="primary" onPress={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteNoteModal;
