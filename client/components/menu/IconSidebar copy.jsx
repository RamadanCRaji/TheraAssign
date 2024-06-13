"use client";
import { AiFillHome } from "react-icons/ai";
import { FaHospitalUser } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { FaBullseye } from "react-icons/fa6";
import { useState } from "react";
import { ChevronFirst, MoreVertical } from "lucide-react";
import SideBarItem from "./SideBarItem";

const menuItems = [
  {
    icon: BiSolidDashboard,
    content: [
      {
        name: "Admit",
        action: "Admit",
        href: `/main/patient-management/admit`,
      },
      {
        name: "Swap Patients",
        action: "Swap Patients",
        href: `/main/patient-management/swapPatients`,
      },
      {
        name: "Room Switch",
        action: "Room Switch",
        href: `/main/patient-management/swapRooms`,
      },
      {
        name: "Return W.C",
        action: "Return W.C",
        href: `/main/patient-management/return`,
      },
      {
        name: "Floor Plan",
        action: "Floor Plan",
        href: `/main/facility-management/floorplan`,
      },
    ],
  },
  {
    icon: BiLogOut,
    content: [
      {
        name: "Logout",
        action: "Floor Plan",
        href: `/main/facility-management/floorplan`,
      },
    ],
  },
  {
    icon: FaHospitalUser,
    content: [
      {
        name: "Discharge",
        action: "Discharge",
        href: `/main/patient-management/discharge`,
      },
    ],
  },
  {
    icon: AiFillHome,
    content: [
      {
        name: "Overview",
        action: "Overview",
        href: `/main/dashboard/overview`,
      },
    ],
  },
];
export function IconSidebar(props) {
  // const { onIconClick, updateSelectedIcon, isOpen } = props;
  const { children } = props;
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

  return (
    <aside className="h-full">
      <nav className="flex h-full flex-col border-r bg-white shadow-sm">
        <div className="flex items-center justify-between p-4 pb-2">
          <img
            src="https://img.logoipsum.com/243.svg"
            alt=""
            className="w-32"
          />
          <button className="rounded bg-gray-50 p-1.5 hover:bg-gray-100">
            <ChevronFirst />
          </button>
        </div>
        <ul className="flex-1 bg-red-200">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <SideBarItem
                icon={<Icon />}
                text={item.content.map((c) => c.name).join(", ")}
              />
            );
          })}
        </ul>
        <div className="flex border-t p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="h-10 w-10 rounded-lg"
          />
          <div className={`ml-3 flex w-52 items-center justify-between`}>
            <div className="leading-4">
              <h4 className="font-semibold">Ramadan Raji</h4>
              <span className="text-xs text-gray-600">
                someth8ing@gmail.com
              </span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
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
