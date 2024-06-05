"use client";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useState } from "react";
import IconSidebar from "@/app/components/menu/IconSidebar";
import ExpandableMenu from "@/app/components/menu/ExpandableMenu";
import { Homemade_Apple } from "next/font/google";

function SideMenu() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [open, setOpen] = useState(false);
  const changeOPen = () => {
    setOpen((prev) => !open);
  };
  const toggleSideMenu = () => setOpen((prev) => !open);
  return (
    <section className="flex h-full justify-start border text-[black] ">
      <div className=" flex h-full items-stretch justify-start ">
        <IconSidebar
          onIconClick={changeOPen}
          updateSelectedIcon={setSelectedIcon}
          isOpen={open}
        />
        <ExpandableMenu
          currentIcon={selectedIcon}
          isOpen={open}
          handleMenuToggle={toggleSideMenu}
        />
      </div>
    </section>
  );
}

export default SideMenu;

{
  /* <main className="flex-grow h-full bg-[#d7d4d4]">
   <h1>mainsdgsdfd</h1>
   <h1>mainsdgsdfd</h1>
</main> */
}
