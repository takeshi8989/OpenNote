import { User } from "../types/user";

interface Props {
  getUserByUsername: () => Promise<User | null>;
}

const url: string = process.env.API_URL as string;
export const useUser = (): Props => {
  const getUserByUsername = async (): Promise<User | null> => {
    const username: string = localStorage.getItem("username") as string;
    try {
      const res = await fetch(`${url}/users/${username}`);
      const data: User = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  return { getUserByUsername };
};
