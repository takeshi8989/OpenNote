import { Note } from "@/types/note";
import React, { useState } from "react";
import { Link, Loading, Text } from "@nextui-org/react";
import { Document, Page, pdfjs } from "react-pdf";
import { AiOutlineLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { GrDownload } from "react-icons/gr";
import { TbClick } from "react-icons/tb";
import CustomTag from "./tag/CustomTag";
import { useRouter } from "next/router";
import { useNote } from "@/hooks/useNote";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const SinglePagePDF = ({ note }: { note: Note }): JSX.Element => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadFailed, setLoadFailed] = useState<boolean>(false);
  const { incrementViewCount } = useNote();

  const removeLoading = () => {
    setIsLoading(false);
  };

  const viewNote = async () => {
    await incrementViewCount(note.id).then((res) => res);
    router.push(`/note/${note.id}`);
  };

  return (
    <div className="mb-14 mt-14" style={{ width: 300 }}>
      <p className="text-center mb-0 pb-0 text-2xl">{note.title}</p>
      <p className="text-center mt-0">{note.user?.username}</p>

      {/* The first Page of PDF file */}

      <div className="relative cursor-pointer" onClick={viewNote}>
        {isLoading && !loadFailed && (
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
          error=""
          onLoadError={() => setLoadFailed(true)}
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

      {/* View, Like, Download, Commnet */}
      {!isLoading && (
        <div className="flex items-center justify-end mt-1">
          <TbClick size={20} />
          <p className="mr-2">{note.numViews}</p>
          <AiOutlineLike size={24} />
          <p className="mr-2">{note.likes.length}</p>
          <GrDownload size={20} />
          <p className="mr-2">{note.numDownload}</p>
          <BiCommentDetail size={24} />
          <p className="mr-2">{note.comments.length}</p>
        </div>
      )}
      {loadFailed && (
        <div className="mt-20 mx-auto">
          <Text className="text-center">Failed to load PDF file.</Text>
        </div>
      )}
    </div>
  );
};

export default SinglePagePDF;
