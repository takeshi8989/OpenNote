import { Comment } from "@/types/comment";
import React from "react";
import { Avatar, Text } from "@nextui-org/react";

const CommentList = ({ comments }: { comments: Comment[] }): JSX.Element => {
  const sortComments = (): Comment[] => {
    return comments.sort((a: Comment, b: Comment) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };

  return (
    <div className="w-full mx-auto mt-8 mb-10">
      {sortComments().map((comment) => (
        <div key={comment.id}>
          <div className="flex items-center mt-5">
            <Avatar
              as="button"
              size="md"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4mt9OP-78V6r8z1c0ohe_dtyh2OQNNVDI2f2BSd7npw&s"
            />
            <Text className="ml-2" size="md">
              {comment.author.username}
            </Text>
          </div>
          <div className="ml-5 mt-3">
            <Text>{comment.content}</Text>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
