import { Note } from "@/types/note";
import React from "react";
import { Badge } from "@nextui-org/react";
import { Document, Page, pdfjs } from "react-pdf";
import { TbHandClick } from "react-icons/tb";
import { AiOutlineLike, AiOutlineDownload } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { GrDownload } from "react-icons/gr";
import { TbClick } from "react-icons/tb";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const SinglePagePDF = ({
  className,
  note,
}: {
  className: string;
  note: Note;
}) => {
  return (
    <div className="mb-14 mt-14" style={{ width: 300 }}>
      <p className="text-center mb-0 pb-0 text-2xl">{note.title}</p>
      <p className="text-center mt-0">{note.author.username}</p>
      <div className="relative">
        <Document file={note.url}>
          <Page
            className={"w-full"}
            pageNumber={1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            width={300}
          />
        </Document>
        <div className="flex absolute bottom-3 right-1">
          <Badge className="mx-auto" size="lg">
            AAAAAAAA
          </Badge>
          <Badge className="mx-auto" size="lg" color={"primary"}>
            ABCDEFGH
          </Badge>
        </div>
      </div>
      <div className="flex items-center justify-end mt-1">
        <TbClick size={20} />
        <p className="mr-2">123</p>
        <AiOutlineLike size={24} />
        <p className="mr-2">31</p>
        <GrDownload size={20} />
        <p className="mr-2">12</p>
        <BiCommentDetail size={24} />
        <p className="mr-2">3</p>
      </div>
    </div>
  );
};

export default SinglePagePDF;