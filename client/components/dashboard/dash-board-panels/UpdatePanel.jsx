import React from "react";
import Link from "next/link";
function UpdatePanel() {
  const top_panel_section = [
    {
      key: "Swap Patients-3",
      action: "Swap Patients",
      href: `/main/patient-management/swapPatients`,
    },
    {
      key: "Assign P.W.C-2",
      action: "Assign P.W.C",
      href: `/main/patient-management/personalWheelChair`,
    },
  ];

  const bottom_update_section = [
    {
      key: "Room Switch-4",
      action: "Room Switch",
      href: `/main/patient-management/room-change`,
    },
    {
      key: "Return W.C-5",
      action: "Return W.C",
      href: `/main/patient-management/return`,
    },
  ];

  const renderPanel = (array) => {
    return array.map((e) => (
      <div
        key={e.key}
        className=" max-w-[250px] grow rounded-lg border bg-slate-500 px-2 py-4 text-center transition duration-300 ease-in hover:scale-105 hover:bg-[#3a515c] hover:font-bold hover:text-[#c3cbd2] hover:shadow-lg"
      >
        <Link href={e.href}>
          <button className="h-full w-full whitespace-nowrap text-white">
            {e.action}
          </button>
        </Link>
      </div>
    ));
  };

  //can i do something where i render a panel and it produves what i want
  return (
    <section className="flex flex-col rounded-md border border-[#2f45506a] bg-[#ffffff] pt-2 text-black">
      <div className="   mb flex items-center justify-center font-semibold ">
        <h2 className="text-2xl ">Update</h2>
      </div>
      <div className=" flex h-full">
        <div className="flex grow flex-col">
          <div className=" flex h-1/2 items-center justify-around gap-5 px-10 ">
            {renderPanel(top_panel_section)}
          </div>
          <div className=" flex h-1/2 items-center justify-around gap-5 px-10 ">
            {renderPanel(bottom_update_section)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpdatePanel;

//12:52
