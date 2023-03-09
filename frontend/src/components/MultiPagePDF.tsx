import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Loading, Text } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { scrollBottomAtom } from "@/jotai/noteAtom";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MultiPagePDF = ({ url }: { url: string }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPages, setCurrentPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadFailed, setLoadFailed] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<number>();
  const multiPdfRef = useRef<HTMLDivElement>(null);
  const scrollBottom = useAtomValue(scrollBottomAtom);

  useEffect(() => {
    if (url)
      pdfjs.getDocument(url).promise.then((doc) => setNumPages(doc.numPages));
  }, [url]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    compareScrollHeight();
  }, [scrollBottom]);

  const compareScrollHeight = () => {
    if (currentPages === 0) {
      loadNextPage();
    } else if (multiPdfRef && multiPdfRef.current) {
      const currentHeight: number = multiPdfRef.current.scrollHeight;
      if (currentHeight < scrollBottom && !isLoading) loadNextPage();
    }
  };

  const loadNextPage = () => {
    if (currentPages + 1 > numPages && currentPages !== 0) return;

    setCurrentPages(currentPages + 1);
    setIsLoading(true);
  };

  const removeLoading = () => {
    setIsLoading(false);
  };

  const displayLoadError = () => {
    setLoadFailed(true);
  };

  return (
    <div className="w-full flex flex-col items-center" ref={multiPdfRef}>
      {Array.from(Array(currentPages), (e, i) => (
        <Document
          file={url}
          key={i}
          className="my-5"
          onLoadSuccess={removeLoading}
          loading=""
          error=""
          onLoadError={displayLoadError}
        >
          <Page
            width={!windowSize || windowSize > 800 ? 600 : 400}
            pageNumber={i + 1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      ))}
      {isLoading && !loadFailed && (
        <div
          className="flex justify-center items-center"
          style={{ width: "300px", height: "300px" }}
        >
          <Loading size="lg" />;
        </div>
      )}
      {loadFailed && (
        <div className="mt-20">
          <Text className="text-center">Failed to load PDF file.</Text>
        </div>
      )}
    </div>
  );
};

export default MultiPagePDF;
