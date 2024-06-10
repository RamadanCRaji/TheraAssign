import React from "react";
function AdminTaskPanel() {
  return (
    <section className="text-black">
      <div className="bg-red flex h-full w-full flex-col">
        <div className=" flex h-1/2 w-full items-center justify-around gap-5 px-10">
          {[
            { title: "Admissions", action: "Admit New patient" },
            { title: "Discharges", action: "Discharge Patient" },
          ].map((e) => (
            <div className=" max-w-[250px] grow text-center" key={e.title}>
              <h4 className="font-bold">{e.title}</h4>
              <div className="border border-[#2f45506a] bg-[#ffffff] lg:p-3 2xl:p-5">
                <button className="grow whitespace-nowrap rounded-md bg-slate-500 text-white transition duration-300 ease-in hover:scale-105 hover:bg-[#3a515c] hover:font-bold hover:text-[#c3cbd2] hover:shadow-lg lg:px-2 lg:py-2 2xl:px-2 2xl:py-3 ">
                  {e.action}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className=" flex h-1/2 w-full items-center justify-around gap-5 px-10">
          {[{ title: "Hospital Layout", action: "View Floor Plan" }].map(
            (e) => (
              <div className="  max-w-[250px] grow text-center " key={e.title}>
                <h4 className="font-bold">{e.title}</h4>
                <div className="border border-[#2f45506a] bg-[#ffffff] lg:p-3 2xl:p-5">
                  <button className="grow whitespace-nowrap rounded-md bg-slate-500 text-white transition duration-300 ease-in hover:scale-105 hover:bg-[#3a515c] hover:font-bold hover:text-[#c3cbd2] hover:shadow-lg lg:px-2 lg:py-2 2xl:px-2 2xl:py-3 ">
                    {e.action}
                  </button>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export default AdminTaskPanel;
