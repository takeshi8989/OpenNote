import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { GrCycle } from "react-icons/gr";

const ColorChangeButton = () => {
  const [currentColor, setCurrentColor] = useState<string>("blue");
  return (
    <Button
      auto
      flat
      ripple={false}
      bordered
      className="mx-2"
      css={{
        borderRadius: "$xs", // radii.xs
        border: "$space$1 solid transparent",
        background: `$${currentColor}800`, // colors.pink800
        color: `$${currentColor}100`,

        boxShadow: "$md", // shadows.md
        "&:hover": {
          background: `$${currentColor}100`,
          color: `$${currentColor}800`,
        },
        "&:active": {
          background: `$${currentColor}200`,
        },
        "&:focus": {
          borderColor: `$${currentColor}400`,
        },
      }}
    >
      <GrCycle size={24} />
    </Button>
  );
};

export default ColorChangeButton;
