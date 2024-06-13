"use client";
import { AiFillHome } from "react-icons/ai";
import { FaHospitalUser } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { FaBullseye } from "react-icons/fa6";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function IconSidebar(props) {
  const { onIconClick, updateSelectedIcon, isOpen } = props;
  const router = useRouter();
  let [lastClicked, setLastClicked] = useState(null);
  const menuItem = [
    { icon: AiFillHome, id: "home" },
    { icon: BiSolidDashboard, id: "dashboard" },
    { icon: FaHospitalUser, id: "hospitalUser" },
  ];
  const handleIconClick = (iconId, toggleFunction, updateIconFunction) => {
    if (!isOpen) {
      toggleFunction();
      updateIconFunction(iconId);
      setLastClicked(iconId);
    }
    if (isOpen) {
      updateIconFunction(iconId);
      setLastClicked(iconId);
    }
    // if isOPen is true and the the name of the iconId matches the currret id
    if (isOpen && lastClicked === iconId) {
      toggleFunction();
      setLastClicked(null);
    }
  };
  const signOutbutton = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };
  return (
    <aside className=" relative z-10 flex w-16 flex-col justify-between bg-[#2f4550] px-1 py-1 duration-500">
      <div className="mb-20 flex items-center justify-center pr-1">
        <FaBullseye className="h-10 w-10 cursor-pointer rounded p-1 text-4xl text-[#8a949a] hover:bg-[#3a515c] hover:text-[#b0b8bf]" />
      </div>
      <div className="grid h-full grid-cols-1 grid-rows-[80px,80px,80px] gap-12 pt-3">
        {menuItem.map((iconItem, index) => {
          return (
            <div
              key={iconItem.id}
              className=" flex items-center justify-center rounded-md transition duration-300 ease-in hover:scale-105 hover:bg-[#3a515c]"
            >
              <i>
                <iconItem.icon
                  className=" cursor-pointer text-3xl text-[#8a949a] hover:text-[#b0b8bf]"
                  onClick={() => {
                    handleIconClick(
                      iconItem.id,
                      onIconClick,
                      updateSelectedIcon,
                    );
                  }}
                />
              </i>
            </div>
          );
        })}
      </div>
      <div
        className="mt-auto flex items-center justify-center rounded-md hover:bg-[#3a515c]"
        onClick={signOutbutton}
      >
        <BiLogOut className="cursor-pointer p-1 text-center text-5xl font-bold text-[#8a949a] hover:text-[#b0b8bf]" />
      </div>
    </aside>
  );
}
/**
 * two things are happendting here
 * i created an object called menuItem tha holds all the icon names and icon log and i used map to loop through it to create a divs that each contained a one icon each and those on each of those icon i have an onClick event listener that runs. the items passed into it is the iconItem id name.  then it runs it invokes the toggle function which is responsible for make this expandible side bar menu slide in and  out. It also invokes the update selcteted iconfunction to pass change the state of the selected icon from value of non to the name of the icon that was clicked so that way when i can pass that state value into the ExapandableMenu component. This in turn is used to deteminen which menu options are present on the right inside the expandable menu
 *
 */

/**
 * if isOpen is true
 * aside bar is open
 * problems i am having
 * if i click on a different icon then the bar closes ----X
 * i want it if aside bar is open then just change the content inside of it to what the current-----X
 * when i click away it shoud close
 * if i click on the same icon when open===true close expandale menue
 */
