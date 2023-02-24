import { Note } from "@/types/note";
import { Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const NoteDetail = ({ note }: { note: Note }) => {
  const [numPages, setNumPages] = useState<number>(0);
  useEffect(() => {
    const url = note.url;
    pdfjs.getDocument(url).promise.then((doc) => setNumPages(doc.numPages));
  });
  return (
    <div>
      <Text className="text-center mt-4" size={"$3xl"}>
        {note.title}
      </Text>
      <Text className="text-center" size={"$md"}>
        {note.author.username}
      </Text>
      <div className="w-full flex flex-col items-center ">
        {Array.from(Array(numPages), (e, i) => (
          <Document file={note.url} key={i} className="my-5">
            <Page
              className={"w-full"}
              pageNumber={i + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        ))}
      </div>
    </div>
  );
};

export default NoteDetail;
