import { User } from "../types/user";

interface Props {
  getUserByUsername: (username: string) => Promise<User | null>;
  updateUser: (user: User) => Promise<User | null>;
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

  const updateUser = async (user: User) => {
    const token: string = localStorage.getItem("token") as string;
    try {
      const res = await fetch(`${url}/users/${user.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data: User = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return { getUserByUsername, updateUser };
};
