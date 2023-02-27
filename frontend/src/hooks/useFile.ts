import { v4 as uuidv4 } from "uuid";

const url: string = process.env.API_URL as string;
const BUCKET_OBJECT_URL: string = process.env.BUCKET_OBJECT_URL as string;
export const useFile = (): {
  uploadFile: (file: File) => Promise<string>;
  deleteFile: (fileName: string) => Promise<boolean>;
} => {
  const uploadFile = async (file: File): Promise<string> => {
    if (file.type !== "application/pdf") {
      console.log("file type is not PDF");
    }
    if (file.size > 1000000) {
      console.log("file is too big");
      return "";
    }
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
      const fileUrl: string = BUCKET_OBJECT_URL + data;
      return fileUrl;
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  const deleteFile = async (fileUrl: string): Promise<boolean> => {
    const fileName: string = fileUrl.substring(BUCKET_OBJECT_URL.length);
    const token: string = localStorage.getItem("token") as string;
    try {
      const res = await fetch(`${url}/files/${fileName}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return { uploadFile, deleteFile };
};
