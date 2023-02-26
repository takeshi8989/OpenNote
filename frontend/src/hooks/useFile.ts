import { v4 as uuidv4 } from "uuid";

const url: string = process.env.API_URL as string;
export const useFile = (): { uploadFile: (file: File) => Promise<string> } => {
  const uploadFile = async (file: File): Promise<string> => {
    if (file.type !== "application/pdf") return "";
    const newFileName: string = uuidv4() + ".pdf";
    const blob = file.slice(0, file.size);
    const newFile = new File([blob], newFileName, { type: "application/pdf" });
    const token: string = localStorage.getItem("token") as string;
    const formData = new FormData();
    formData.append("file", newFile);
    try {
      const res = await fetch(`${url}/files/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.text();
      const fileURI: string = process.env.BUCKET_OBJECT_URL + data;
      return fileURI;
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  return { uploadFile };
};
