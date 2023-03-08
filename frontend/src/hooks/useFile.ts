const url: string = process.env.API_URL as string;
const BUCKET_OBJECT_URL: string = process.env.BUCKET_OBJECT_URL as string;
export const useFile = (): {
  uploadFile: (file: File, uuid: string) => Promise<string>;
  deleteFile: (fileName: string) => Promise<boolean>;
} => {
  const uploadFile = async (file: File, uuid: string): Promise<string> => {
    if (file.type !== "application/pdf") {
      return "Only PDF files allowed.";
    }
    if (file.size >= 10000000) {
      return "file size is too big.";
    }
    const newFileName: string = uuid + ".pdf";
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
      if (res.ok) return "";
      else return "Uploading a file failed.";
    } catch (error) {
      console.log(error);
      return "Uploading a file failed.";
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
