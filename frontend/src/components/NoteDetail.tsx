import { Note } from "@/types/note";
import { Tag } from "@/types/tag";
import { Text, Badge } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { GrDownload } from "react-icons/gr";
import { TbClick } from "react-icons/tb";
import { Document, Page, pdfjs } from "react-pdf";
import CustomTag from "./tag/CustomTag";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const tags: Tag[] = [
  { name: "Physics", color: "blue" },
  { name: "Assignment", color: "green" },
  { name: "Langara", color: "red" },
  { name: "Chapter 4,5", color: "pink" },

  { name: "Difficult", color: "gray" },
  { name: "Test 2", color: "yellow" },
  { name: "PHYS 1181", color: "blue" },
];

const NoteDetail = ({ note }: { note: Note }): JSX.Element => {
  const [numPages, setNumPages] = useState<number>(0);
  useEffect(() => {
    const url: string = note.url;
    pdfjs.getDocument(url).promise.then((doc) => setNumPages(doc.numPages));
  }, [note]);
  return (
    <div>
      <Text className="text-center mt-4" size={"$3xl"}>
        {note.title}
      </Text>
      <Text className="text-center" size={"$md"}>
        {note.author.username}
      </Text>

      {/* View, Like, Download, Comment */}
      <div className="flex items-center justify-center mt-1">
        <TbClick size={30} />
        <Text className="mr-4" size={"$xl"}>
          123
        </Text>
        <AiOutlineLike size={30} />
        <Text className="mr-4" size={"$xl"}>
          31
        </Text>
        <GrDownload size={30} />
        <Text className="mr-4" size={"$xl"}>
          11
        </Text>

        <BiCommentDetail size={30} className="mt-1" />
        <Text className="mr-4" size={"$xl"}>
          3
        </Text>
      </div>
      {/* Note Pages from PDF File */}
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
      {/* Tags */}
      <div className="flex flex-wrap justify-center mx-auto w-1/3 mt-2 mb-5">
        {tags.map((tag) => (
          <CustomTag tag={tag} />
        ))}
      </div>
      {/* Description */}
      <div className="w-1/2 text-center mx-auto mb-20">
        <Text>
          This note is an assignment for PHYS 1181. I had to study hard because
          there were an exam called TEST 2 but it is actually a midterm. I had
          other exams in the week, so I was pretty busy in this week...
        </Text>
      </div>
    </div>
  );
};

export default NoteDetail;
