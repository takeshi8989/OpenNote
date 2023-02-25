import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { GrCycle } from "react-icons/gr";

const hexRange: string = "0123456789ABCDEF";
const ColorChangeButton = ({
  currentColor,
  setCurrentColor,
}: {
  currentColor: string;
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const setRandomColor = (): void => {
    let color: string = "#";
    for (let i = 0; i < 6; i++) {
      const index: number = Math.floor(Math.random() * hexRange.length);
      color += hexRange.charAt(index);
    }
    setCurrentColor(color);
  };
  return (
    <Button
      auto
      className="mx-2"
      style={{ backgroundColor: currentColor }}
      onClick={setRandomColor}
    >
      <GrCycle size={24} />
    </Button>
  );
};

export default ColorChangeButton;
