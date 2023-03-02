import { Note } from "@/types/note";
import React, { useState } from "react";
import { Link, Loading } from "@nextui-org/react";
import { Document, Page, pdfjs } from "react-pdf";
import { AiOutlineLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { GrDownload } from "react-icons/gr";
import { TbClick } from "react-icons/tb";
import CustomTag from "./tag/CustomTag";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const SinglePagePDF = ({ note }: { note: Note }): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const removeLoading = () => {
    setIsLoading(false);
  };

  return (
    <div className="mb-14 mt-14" style={{ width: 300 }}>
      <p className="text-center mb-0 pb-0 text-2xl">{note.title}</p>
      <p className="text-center mt-0">{note.user?.username}</p>
      <Link href={`note/${note.id}`}>
        {/* The first Page of PDF file */}

        <div className="relative">
          {isLoading && (
            <div
              className="flex justify-center items-center"
              style={{ width: "300px", height: "300px" }}
            >
              <Loading size="lg" />;
            </div>
          )}
          <Document
            file={note.url}
            onLoadSuccess={removeLoading}
            loading=""
            error="Failed to Load PDF File."
          >
            <Page
              className="w-full"
              pageNumber={1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={300}
            />
          </Document>
          {/* 2 Tags */}
          {!isLoading && (
            <div className="flex absolute bottom-3 right-1">
              {note.tags.length > 0 && <CustomTag tag={note.tags[0]} />}
              {note.tags.length > 1 && <CustomTag tag={note.tags[1]} />}
            </div>
          )}
        </div>
      </Link>
      {/* View, Like, Download, Commnet */}
      {!isLoading && (
        <div className="flex items-center justify-end mt-1">
          <TbClick size={20} />
          <p className="mr-2">123</p>
          <AiOutlineLike size={24} />
          <p className="mr-2">{note.likes.length}</p>
          <GrDownload size={20} />
          <p className="mr-2">{note.numDownload}</p>
          <BiCommentDetail size={24} />
          <p className="mr-2">{note.comments.length}</p>
        </div>
      )}
    </div>
  );
};

export default SinglePagePDF;
