import { User } from "../types/user";

interface Props {
  getUserByUsername: (username: string) => Promise<User | null>;
}

const url: string = process.env.API_URL as string;
export const useUser = (): Props => {
  const getUserByUsername = async (username: string): Promise<User | null> => {
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
