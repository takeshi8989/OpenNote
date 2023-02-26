import NoteList from "@/components/NoteList";
import { Note } from "@/types/note";
import { SignUpRequest } from "@/types/request/user";
import React from "react";

const notes: Note[] = [
  {
    id: "1",
    title: "My PHYS Assignment",
    url: "https://opennote-bucket.s3.us-west-2.amazonaws.com/Chap4%2C+5.pdf",
    author: { username: "takeshi", email: "take@gmail.com" },
  },
  {
    id: "2",
    title: "My note 1",
    url: "https://opennote-bucket.s3.us-west-2.amazonaws.com/multiply_analysis.pdf",
    author: { username: "user1", email: "first@gmail.com" },
  },
  {
    id: "3",
    title: "Empty Note",
    url: "https://opennote-bucket.s3.us-west-2.amazonaws.com/Chap4%2C+5.pdf",
    author: { username: "user2", email: "second@gmail.com" },
  },
  {
    id: "4",
    title: "I hate writing",
    url: "https://opennote-bucket.s3.us-west-2.amazonaws.com/multiply_analysis.pdf",
    author: { username: "takeshi", email: "take@gmail.com" },
  },

  {
    id: "5",
    title: "Calculus 2",
    url: "https://opennote-bucket.s3.us-west-2.amazonaws.com/Chap4%2C+5.pdf",
    author: { username: "takeshi", email: "take@gmail.com" },
  },
  {
    id: "6",
    title: "Derivative of Integral",
    url: "https://opennote-bucket.s3.us-west-2.amazonaws.com/multiply_analysis.pdf",
    author: { username: "user1", email: "first@gmail.com" },
  },
  {
    id: "7",
    title: "My Perfect Note",
    url: "https://opennote-bucket.s3.us-west-2.amazonaws.com/Chap4%2C+5.pdf",
    author: { username: "user2", email: "second@gmail.com" },
  },
  {
    id: "8",
    title: "Note 1",
    url: "https://opennote-bucket.s3.us-west-2.amazonaws.com/multiply_analysis.pdf",
    author: { username: "takeshi", email: "take@gmail.com" },
  },
];

const Home = () => {
  return (
    <div className="h-screen">
      <NoteList notes={notes} />
    </div>
  );
};

export default Home;
