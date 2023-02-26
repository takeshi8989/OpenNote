import React from "react";
import { Badge } from "@nextui-org/react";
import { Tag } from "@/types/tag";

const CustomTag = ({ tag }: { tag: Tag }) => {
  return (
    <Badge size="lg" css={{ backgroundColor: tag.color }} className="mx-1">
      {tag.name}
    </Badge>
  );
};

export default CustomTag;
