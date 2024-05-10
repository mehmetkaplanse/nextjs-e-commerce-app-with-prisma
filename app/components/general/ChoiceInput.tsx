import React from "react";
import { IconType } from "react-icons";

interface ChoiceInputProps {
  text: string;
  icon: IconType;
  onClick: (value: string) => void;
  selected: boolean;
}

const ChoiceInput: React.FC<ChoiceInputProps> = ({
  text,
  icon: Icon,
  onClick,
  selected,
}) => {
  return (
    <div
      onClick={() => onClick(text)}
      className={`flex items-center justify-center gap-2 h-16 border rounded-md px-4 py-2 cursor-pointer ${selected && 'border-black'}`}
    >
      <Icon />
      <span className="text-slate-700 text-lg">{text}</span>
    </div>
  );
};

export default ChoiceInput;
