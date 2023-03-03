interface Props {
  createNewFolder: (title: string) => Promise<boolean>;
}

const url: string = process.env.API_URL as string;
export const useFolder = (): Props => {
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

  return { createNewFolder };
};
