import { Note } from "@/types/note";
import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MultiPagePDF = ({ note }: { note: Note }) => {
  const [numPages, setNumPages] = useState<number>(0);
  useEffect(() => {
    const url: string = note.url;
    pdfjs.getDocument(url).promise.then((doc) => setNumPages(doc.numPages));
  }, [note]);
  return (
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
  );
};

export default MultiPagePDF;
