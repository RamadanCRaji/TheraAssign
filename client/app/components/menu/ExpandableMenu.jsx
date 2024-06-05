import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

//Menu_content
export default function ExpandableMenu(props) {
  const pathname = usePathname();
  const router = useRouter();

  const { isOpen, currentIcon, handleMenuToggle } = props;
  const menu_contentHome = [
    { action: "Overview", href: `/main/dashboard/overview` },
  ];

  const handleLinkClick = (e, href) => {
    // e.preventDefault(); // Prevent default link behavior
    handleMenuToggle(); // Your existing toggle function

    // if (pathname !== href) {
    //   router.push(href);
    // }
  };
  const menu_contentDashBoard = [
    { action: "Admit", href: `/main/patient-management/admit` },
    {
      action: "Personal W.C",
      href: `/main/patient-management/personalWheelChair`,
    },
    { action: "Swap Patients", href: `/main/patient-management/swapPatients` },
    { action: "Room Switch", href: `/main/patient-management/room-change` },
    { action: "Return W.C", href: `/main/patient-management/return` },
    { action: "Floor Plan", href: `/main/facility-management/floorplan` },
  ];
  const menu_contenthospitalUser = [
    { action: "Discharge", href: `/main/patient-management/discharge` },
  ];

  return (
    <aside
      className={` w-44 px-1 pt-10 text-center transition-all ${
        isOpen ? "#" : "ml-[-11rem] "
      }  bg-[#586f7c] duration-700`}
    >
      <div
        className={` flex h-1/4 flex-col transition-opacity duration-700 ${
          isOpen ? "opacity-1 ease-in" : " opacity-0 ease-out"
        }`}
      >
        {currentIcon === "home" &&
          menu_contentHome.map((item, index) => {
            return (
              <Link
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
              >
                <ul
                  key={index}
                  className=" border-[#e2d4ff]font-semibold transition-border duration-30  cursor-pointer rounded-md border bg-[#f8f1ff] text-[#2a2a2a] hover:border-[#b6a0e6] hover:font-bold"
                >
                  <li>{item.action}</li>
                </ul>
              </Link>
            );
          })}
        {currentIcon === "dashboard" &&
          menu_contentDashBoard.map((item, index) => {
            return (
              <Link
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
              >
                <ul
                  key={index}
                  className={`border-[#e2d4ff]font-semibold transition-border duration-30  mb-8 cursor-pointer rounded-md border bg-[#f8f1ff] text-[#2a2a2a] hover:border-[#b6a0e6] hover:font-bold`}
                >
                  <li>{item.action}</li>
                </ul>
              </Link>
            );
          })}
        {currentIcon === "hospitalUser" &&
          menu_contenthospitalUser.map((item, index) => {
            return (
              <Link
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
              >
                <ul
                  key={index}
                  className=" border-[#e2d4ff]font-semibold transition-border duration-30  mb-8 cursor-pointer rounded-md border bg-[#f8f1ff] text-[#2a2a2a] hover:border-[#b6a0e6] hover:font-bold "
                >
                  <li>{item.action}</li>
                </ul>
              </Link>
            );
          })}
      </div>
    </aside>
  );
}

// i am using router.push becuase it does not cause a page reload everytime and i do not have to make a server request everytime
