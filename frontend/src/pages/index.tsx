import { Header } from "@/components/header/Header";
import NoteList from "@/components/NoteList";
import { Note } from "@/types/note";
import React from "react";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface GetPDFRequest {
  url: string;
  headers: {
    "Access-Control-Allow-Origin": "*";
    // 'Content-Type': 'application/x-www-form-urlencoded',
  };
}

const Home = () => {
  // useEffect(() => {
  //   if (localStorage.getItem("token") === null) {
  //     // navigate login
  //     return;
  //   }
  //   const url: string = process.env.API_URL as string;
  //   fetch(`${url}/users`, {
  //     method: "GET",
  //     headers: new Headers({
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);

  // https://opennote-bucket.s3.us-west-2.amazonaws.com/multiply_analysis.pdf
  const notes: Note[] = [
    {
      id: "1",
      title: "Note1",
      url: "https://www.africau.edu/images/default/sample.pdf",
    },
    {
      id: "2",
      title: "Note2",
      url: "https://opennote-bucket.s3.us-west-2.amazonaws.com/multiply_analysis.pdf",
    },
  ];
  const getPDF = async (): Promise<void> => {
    const url: string =
      "https://opennote-bucket.s3.us-west-2.amazonaws.com/multiply_analysis.pdf";

    const pdf = await pdfjs.getDocument(url).promise.then((doc) => {
      return doc;
    });

    const page = await pdf.getPage(1);
  };

  return (
    <div className="h-screen">
      <Header />
      <button onClick={getPDF}>CLICK</button>
      <NoteList notes={notes} />
    </div>
  );
};

export default Home;
