import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  small?: boolean;
  outline?: boolean;
  icon?: IconType;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  small,
  outline,
  disabled,
  icon: Icon
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg p-3 ${small ? "w-[250px]" : "w-full"} ${
        outline ? "border text-black" : "bg-black text-white"
      } flex items-center justify-center my-2`}
      disabled={disabled}
    >
      {Icon && <Icon className="mr-2" size={25}/>}
      {text}
    </button>
  );
};

export default Button;
