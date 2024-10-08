"use client";
import { useState, useEffect } from "react";
import UpdatePanel from "@/components/dashboard/dash-board-panels/UpdatePanel";
import AdminTaskPanel from "@/components/dashboard/dash-board-panels/AdminTaskPanel";
import RoomChartComponent from "@/components/dashboard/dash-board-panels/RoomChart";
import WheelChairChartComponent from "@/components/dashboard/dash-board-panels/WheelChairChart";
import FloorPanelCopy from "@/components/dashboard/dash-board-panels/FloorPanelCopy";

import { fetchAllHospitalDetails } from "@/src/services/apiService";

function Overview() {
  const [info, setInfo] = useState(null);

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
              <span className="inline-blocdk text-black">
                {id === "RoomChart"
                  ? info?.rooms.filter((room) => room["PatientId"]).length
                  : info?.chairs.filter((chair) => !chair?.Status?.Available)
                      .length}
              </span>
            </div>
            <div className="flex  text-[grey]">
              <input type="radio" id="free" className="mr-1" />
              <label htmlFor="free" className="mr-auto inline-block">
                {id === "RoomChart" ? "Free Rooms" : "Free W.C"}
              </label>
              <span className="inline-block text-black">
                {id === "RoomChart"
                  ? info?.rooms.filter((room) => !room["PatientId"]).length
                  : info?.chairs.filter((chair) => chair?.Status?.Available)
                      .length}
              </span>
            </div>
          </section>
        </div>
      </div>
    );
  };

  useEffect(() => {
    try {
      const getAllHospitalDetails = async () => {
        const data = await fetchAllHospitalDetails();

        setInfo({ ...data });
        // setLoading(false);
      };
      getAllHospitalDetails();
    } catch (error) {
      console.error(error.message());
    }
  }, []);

  // if (loading) {
  //   return <div>Loading</div>;
  // }
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
