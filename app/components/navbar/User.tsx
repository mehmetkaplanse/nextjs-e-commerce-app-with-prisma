"use client";

import type { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa6";

interface UserProps {
  currentUser: User | null | undefined;
}

const User: React.FC<UserProps> = ({ currentUser }) => {
  const router = useRouter()
  const [openMenu, setOpenMenu] = useState(false);
  const menuItemStyle = "text-slate-600 border-b rounded-md hover:bg-slate-200 px-2"
  const menuCardStyle = "absolute w-[200px] top-8 right-0 p-2 bg-white shadow-xl rounded-lg border text-black"

  const menuFunc = (url:any) => {
    if(url === "logout") {
      signOut();
      currentUser = null
      router.push('/login'); 
      setOpenMenu(false);
    } else {
      router.push(`/${url}`);
      setOpenMenu(false);
    }
  }
  

  return (
    <div className="hidden md:flex relative">
      <div
        onClick={() => setOpenMenu(!openMenu)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <FaRegUser />
        <div className="select-none">{currentUser ? currentUser?.name : "User"}</div>
      </div>
      {openMenu && (
        <div className={menuCardStyle}>
          {currentUser ? (
            <div className="cursor-pointer space-y-1">
              <div onClick={() => menuFunc('admin')} className={menuItemStyle}>Admin</div>
              <div onClick={() => menuFunc('logout')} className={menuItemStyle}>Logout</div>
            </div>
          ) : (
            <div className="cursor-pointer space-y-1">
              <div onClick={() => menuFunc('login')} className={menuItemStyle}>Login</div>
              <div onClick={() => menuFunc('register')} className={menuItemStyle}>Register</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default User;
