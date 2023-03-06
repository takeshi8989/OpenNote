import { Folder } from "@/types/folder";

interface Props {
  getFolderById: (id: string) => Promise<Folder | null>;
  createNewFolder: (title: string) => Promise<boolean>;
  getFoldersByUsername: (username: string) => Promise<Folder[] | null>;
}

const url: string = process.env.API_URL as string;
export const useFolder = (): Props => {
  const getFolderById = async (id: string): Promise<Folder | null> => {
    try {
      const res = await fetch(`${url}/folders/${id}`);
      const data: Folder = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const createNewFolder = async (title: string): Promise<boolean> => {
    const username: string = localStorage.getItem("username") as string;
    const token: string = localStorage.getItem("token") as string;

    const request = {
      username,
      title,
    };

    try {
      const res = await fetch(`${url}/folders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      if (res.ok) return true;
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getFoldersByUsername = async (
    username: string
  ): Promise<Folder[] | null> => {
    try {
      const res = await fetch(`${url}/folders/user/${username}`);
      const data: Folder[] = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return { getFolderById, createNewFolder, getFoldersByUsername };
};
