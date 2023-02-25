import React from "react";
import { Button } from "@nextui-org/react";

const FileSelectButton = () => {
  return (
    <Button
      auto
      bordered
      flat
      size="sm"
      className="mt-1"
      css={{
        borderRadius: "$xs",
        border: "$space$1 solid transparent",
        background: "$gray500",
        color: "$gray900",
        height: "$12",
        boxShadow: "$md",
        "&:hover": {
          background: "$gray500",
          color: "$gray800",
        },
        "&:active": {
          background: "$gray200",
        },
        "&:focus": {
          borderColor: "$gray400",
        },
      }}
    >
      Select File
    </Button>
  );
};

export default FileSelectButton;
