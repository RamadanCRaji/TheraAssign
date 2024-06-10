"use client";
import { useState, useEffect } from "react";
import UpdatePanel from "@/components/dashboard/dash-board-panels/UpdatePanel";
import AdminTaskPanel from "@/components/dashboard/dash-board-panels/AdminTaskPanel";
import RoomChartComponent from "@/components/dashboard/dash-board-panels/RoomChart";
import WheelChairChartComponent from "@/components/dashboard/dash-board-panels/WheelChairChart";
import FloorPanelCopy from "@/components/dashboard/dash-board-panels/FloorPanelCopy";

import {
  fetchAvailableWheelChairs,
  fetchUnAvailableWheelChairs,
  fetchAllChairs,
} from "@/src/services/GetData/FetchWheelchairServices";

function Overview() {
  const [availableChairs, setAvailableChairs] = useState([]);
  const [UnavailableChairs, setUnAvailableChairs] = useState([]);

  const getWheelChairInfo = async () => {
    try {
      // because the function they invoke is async we need to place an await here
      const FREECHAIRS = await fetchAvailableWheelChairs("available");
      const OCCUPIEDCHAIRS = await fetchUnAvailableWheelChairs("unavailable");
      const ALLCHAIRS = await fetchAllChairs("all"); //the backend can send an object constaining props of 'available' or 'unavailable'

      if (!response.ok) {
        throw new Error("Error fetching wheelchair info:", error);
      }

      setUnAvailableChairs((prevData) => OCCUPIEDCHAIRS);
      setAvailableChairs((prevData) => FREECHAIRS);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [FloorPanelCopyComponent, setFloorPanelCopyComponent] = useState([
    {
      id: "Roomchart",
      roomChart: RoomChartComponent,
      occupancyComparison: ["Occupied Room", "Available Room"],
      occupancyDescription: "Occupied Room : Available Room",
      status: {
        "Occupied Rooms": 60,
        "Free Rooms": 60,
      },
    },
    {
      id: "wheelChairPanel",
      wheelChairChart: WheelChairChartComponent,
      occupancyDescription: ["Occupied WheelChair : Available WheelChair "],
      occupancyComparison: "Occupied W.C : Free W.C",
      status: {
        "Occupied Rooms": 60,
        "Free Rooms": 60,
      },
    },
  ]);
  ``;

  const renderChart = (id) => {
    let chartClasses = [
      " cols-span-1 flex h-full flex-col border bg-white  p-2.5",
      "col-start-3 row-span-2 row-start-4 flex flex-col justify-evenly  lg:text-base 2xl:text-2xl",
    ];

    return (
      <div className={`${chartClasses[0]}`}>
        <div className={`mb-0.5 flex`}>
          <h1 className="rounded-md border  bg-[#ffffff] p-1 font-bold text-black">
            {id === "RoomChart"
              ? "Occupied Room : Available Room"
              : "Occupied WheelChair : Available WheelChair"}
          </h1>
        </div>
        <div className="grid h-full grid-cols-3 grid-rows-5 ">
          <section className="col-span-2 row-span-5 flex h-full justify-center ">
            <div className="relative h-full w-full">
              {id === "RoomChart" ? (
                <RoomChartComponent />
              ) : (
                <WheelChairChartComponent />
              )}
            </div>
          </section>
          <section className={`${chartClasses[1]}`}>
            <div className="flex  text-[grey] ">
              <input type="radio" id="occupied" className="mr-1 rounded-full" />
              <label htmlFor="occupied" className=" mr-auto inline-block">
                {id === "RoomChart" ? "Occupied Rooms" : "Occupied W.C"}
              </label>
              <span className="inline-block text-black">60</span>
            </div>
            <div className="flex  text-[grey]">
              <input type="radio" id="occupied" className="mr-1" />
              <label htmlFor="occupied" className="mr-auto inline-block">
                {id === "RoomChart" ? "Free Rooms" : "Free W.C"}
              </label>
              <span className="inline-block text-black">60</span>
            </div>
          </section>
        </div>
      </div>
    );
  };

  useEffect(() => {
    // getWheelChairInfo();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <section className="h-full grow bg-[#f4f6fc] ">
      <main className="h-full w-full grow  p-2 ">
        <div className={`flex h-full w-full flex-col gap-2.5 `}>
          {/* top section */}
          <section className=" mb-2 grid h-1/2 grid-cols-12  gap-2.5">
            {/* left top panel */}
            <section className="col-span-5 grid grid-cols-1 grid-rows-2 xl:gap-2 2xl:gap-0">
              <UpdatePanel />
              <AdminTaskPanel />
            </section>
            {/* right top panel */}
            <div className=" col-span-7  bg-[#ffffff]">
              <section className="row-span full col-span-full h-full  w-full">
                <FloorPanelCopy layoutPlan={`horizontal`} />
              </section>
            </div>
          </section>
          <section className=" border-red grid h-1/2 grid-cols-2 gap-2.5 border text-white">
            {renderChart("RoomChart")}
            {renderChart("wheelChairPanel")}
          </section>
        </div>
      </main>
    </section>
  );
}

export default Overview;
// export default Homepage;

// import React from "react";
// import UpdatePanel from "@/components/dashboard/dash-board-panels/UpdatePanel";
// import AdminTaskPanel from "@/components/dashboard/dash-board-panels/AdminTaskPanel";
// import DashboardActionButton from "@/components/dashboard/dashboard-buttons/DashboardActionButton";
// import FloorPanelCopy from "@/components/dashboard/dash-board-panels/FloorPanelCopy";
// function Homepage() {
//    return (
//       <section className="flex-grow bg-[#f4f6fc] flex ">
//          <main className="w-full grow max-w-[1830px] p-2.5">
//             <div
//                className={`h-full w-full flex grid grid-cols-1 grid-rows-2 gap-y-2.5`}
//             >
//                {/* top section */}
//                <section className=" grid grid-cols-12 gap-x-2.5">
//                   <section className="col-span-5 grid grid-cols-1 grid-rows-2 border border-red-600">
//                      <UpdatePanel />
//                      <AdminTaskPanel />
//                   </section>
//                   <div className=" col-span-7 py-2 px-5 bg-[#ffffff]">
//                      <FloorPanelCopy />
//                   </div>
//                </section>
//                {/* bottom section */}
//                <section className=" text-white grid grid-cols-2 gap-x-2.5 ">
//                   <div className=" bg-gray-800 cols-span-1">bottom child 1</div>
//                   <div className=" bg-gray-700 col-span-1"> bottom child 2</div>
//                </section>
//             </div>
//          </main>
//       </section>
//    );
// }

// export default Homepage;
