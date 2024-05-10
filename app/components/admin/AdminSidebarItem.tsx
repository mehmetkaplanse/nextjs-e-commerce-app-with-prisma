import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface AdminSidebarItemProps {
  selected?: boolean;
  name: string;
  icon: IconType;
  url: string;
}

const AdminSidebarItem: React.FC<AdminSidebarItemProps> = ({
  selected,
  name,
  icon: Icon,
  url,
}) => {
  return (
    <Link
      className={`flex items-center gap-2 px-4 py-4 mx-2 text-lg rounded-xl text-black border-b ${
        selected ? " font-bold border border-black shadow-lg" : " font-medium"
      }`}
      href={url}
    >
      <Icon size={20} />
      <div>{name}</div>
    </Link>
  );
};

export default AdminSidebarItem;
