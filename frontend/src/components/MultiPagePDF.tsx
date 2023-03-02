import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Loading } from "@nextui-org/react";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MultiPagePDF = ({ url }: { url: string }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadFailed, setLoadFailed] = useState<boolean>(false);

  useEffect(() => {
    pdfjs.getDocument(url).promise.then((doc) => setNumPages(doc.numPages));
  }, [url]);

  const removeLoading = () => {
    setIsLoading(false);
  };

  const displayLoadError = () => {
    setLoadFailed(true);
  };

  return (
    <div className="w-full flex flex-col items-center ">
      {isLoading && !loadFailed && (
        <div
          className="flex justify-center items-center"
          style={{ width: "300px", height: "300px" }}
        >
          <Loading size="lg" />;
        </div>
      )}
      {Array.from(Array(numPages), (e, i) => (
        <Document
          file={"f"}
          key={i}
          className="my-5"
          onLoadSuccess={removeLoading}
          loading=""
          onLoadError={displayLoadError}
        >
          <Page
            className="w-full"
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
