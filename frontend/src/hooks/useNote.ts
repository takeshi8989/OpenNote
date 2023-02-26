import { NewNoteRequest } from "@/types/request/note";

const url: string = process.env.API_URL as string;
export const useNote = (): {
  createNewNote: (request: NewNoteRequest) => Promise<boolean>;
} => {
  const createNewNote = async (request: NewNoteRequest): Promise<boolean> => {
    const token: string = localStorage.getItem("token") as string;
    try {
      const res = await fetch(`${url}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      });
      if (res.ok) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return { createNewNote };
};
