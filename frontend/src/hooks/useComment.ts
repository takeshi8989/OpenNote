import { usernameAtom } from "@/jotai/authAtom";
import { Comment } from "@/types/comment";
import { useAtomValue } from "jotai";

const url: string = process.env.API_URL as string;

interface Props {
  createNewComment: (
    content: string,
    noteId: string
  ) => Promise<Comment | null>;
}

export const useComment = (): Props => {
  const username = useAtomValue(usernameAtom);

  const createNewComment = async (
    content: string,
    noteId: string
  ): Promise<Comment | null> => {
    const newRequest = { content, username, noteId };
    const token: string = localStorage.getItem("token") as string;
    try {
      const res = await fetch(`${url}/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRequest),
      });

      const data: Comment = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return { createNewComment };
};
