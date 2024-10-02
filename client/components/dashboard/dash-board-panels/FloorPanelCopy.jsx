// React and Next.js imports
import { useState, useEffect } from "react";

// Data imports (self-built modules)

// Service imports (self-built modules)
import { fetchAllRoomData } from "@/src/services/apiService";

// Component imports (self-built modules)
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Style definitions
const horizontalLayout = `flex gap-10 justify-center`;
const verticalLayout = `flex gap-10 justify-around flex-col`;

// Main component definition
function FloorPanel({ layoutPlan }) {
  const [show2ndFloorPlan, setshow2ndFloorPlan] = useState(false);
  const [show1stFloorPlan, setshow1stFloorPlan] = useState(true);
  const [floorData, setFloorData] = useState([]);

  const fetchAndUpdateRoomInfo = async () => {
    try {
      const data = await fetchAllRoomData();
      setFloorData((prev) => [...data]);
    } catch (error) {
      console.log("Error fetching room data:", error.message);
    }
  };

  useEffect(() => {
    fetchAndUpdateRoomInfo();
  }, []);

  const floorPlanSwitch1 = () => {
    if (show1stFloorPlan) {
      // do not do anything
    } else if (!show1stFloorPlan) {
      setshow1stFloorPlan((prevSate) => !prevSate);
      setshow2ndFloorPlan((prevSate) => !prevSate);
    }
  };

  const floorPlanSwitch2 = () => {
    if (show1stFloorPlan && !show2ndFloorPlan) {
      setshow1stFloorPlan((prevSate) => !prevSate);
      setshow2ndFloorPlan((prevSate) => !prevSate);
    } else if (show2ndFloorPlan) {
      //do nothing this time
    }
  };

  // Helper function to render individual rooms
  const renderRoom = (floor, wing, allRoomData) => {
    let roomClasses =
      "rounded-xl flex items-center justify-center p-2 text-black hover:cursor-pointer hover:scale-110 lg:hover:scale-105 duration-300 ease-in hover:font-bold ";

    let specialRoomClasses = "col-start-2 col-end-4 grid grid-cols-4";

    // Helper function to determine room color based on occupancy
    const roomColor = (occupied) =>
      occupied ? "bg-blue-200" : "bg-yellow-400 ";
    //array of object
    const rooms = allRoomData?.filter((room) => {
      return room?.Location?.floor === floor && room?.Location?.wing === wing;
    });

    // content Dialog purpose is to show the modal for each each room when we click on it
    const contentDialog = (room) => (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Patient Details</DialogTitle>
          <DialogDescription>
            <div className="grid gap-4 rounded-lg bg-white p-4 shadow-md">
              <div className="flex items-center justify-start gap-x-4 text-lg">
                <span className="font-bold text-gray-700"> Patient Name:</span>
                <span className="text-gray-600">
                  {room?.PatientId?.firstName}
                </span>
              </div>
              <div className="flex items-center justify-start gap-x-4 text-lg">
                <span className="font-bold text-gray-700">Room:</span>
                <span className="text-gray-600">{room["Room Number"]}</span>
              </div>
              <div className="flex items-center justify-start gap-x-4 text-lg">
                <span className="font-bold text-gray-700">Chair:</span>
                <span className="text-gray-600">
                  {room?.PatientId?.chairId?.TagId}
                </span>
              </div>
              <div className="flex items-center justify-start gap-x-4 text-lg">
                <span className="font-bold text-gray-700">Personal W.C:</span>
                <span className="text-gray-600">
                  {room?.PatientId?.personal_Wheel_chair ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    );

    // handling cases for special rooms
    //handling cases for the rest of the rooms( which is an arry of an)
    return rooms?.map((room) => {
      const isSpecialRoom =
        room["Room Number"] === 113 || room["Room Number"] === 126;
      const roomLayoutClass = isSpecialRoom ? specialRoomClasses : roomClasses;
      if (isSpecialRoom) {
        return (
          <Dialog key={room._id}>
            <div className={`${roomLayoutClass}`}>
              <DialogTrigger asChild>
                <div
                  className={`${roomClasses} ${roomColor(
                    room?.PatientId,
                  )} col-span-2 col-start-2`}
                >
                  <span className="">{room["Room Number"]}</span>
                </div>
              </DialogTrigger>
              {contentDialog(room)}
            </div>
          </Dialog>
        );
      } else {
        return (
          <Dialog key={room._id}>
            <DialogTrigger asChild>
              <div
                key={room._id}
                className={`${roomLayoutClass} ${roomColor(room?.PatientId)}`}
              >
                <span>{room["Room Number"]}</span>
              </div>
            </DialogTrigger>
            {contentDialog(room)}
          </Dialog>
        );
      }
    });
  };
  return (
    <section className="h-full w-full">
      <section className=" flex h-full w-full flex-col space-y-5 rounded-md  px-2 pt-2">
        {/* created 6 rows and */}
        <section className="flex max-h-20 items-start justify-center space-x-24">
          <Button
            className=" rounded-md bg-[#b8dbd9] text-lg font-bold text-black transition duration-300 ease-in hover:scale-105 hover:bg-[#3a515c] hover:font-bold hover:text-[#c3cbd2]  hover:shadow-lg 2xl:p-8"
            onClick={floorPlanSwitch1}
          >
            floor 1
          </Button>
          <Button
            className="  rounded-md bg-[#b8dbd9] text-lg font-bold text-black transition duration-300 ease-in hover:scale-105 hover:bg-[#3a515c] hover:font-bold hover:text-[#c3cbd2]  hover:shadow-lg 2xl:p-8"
            onClick={floorPlanSwitch2}
          >
            floor 2
          </Button>
        </section>
        {show1stFloorPlan && (
          <section className=" w-full grow pt-3 ">
            {/* container for floor plans for both wings on first floor */}
            <div
              className={`h-full  ${layoutPlan === "vertical" ? verticalLayout : horizontalLayout} text-black`}
            >
              <section
                className={`flex  flex-col items-center space-y-2 text-black ${layoutPlan === "vertical" ? "h-1/2" : "w-1/2"}`}
              >
                <Button className="whitespace-nowrap rounded-md bg-[#2f4550] px-10 text-lg">
                  west
                </Button>
                <div className=" grid w-full grow grid-cols-4 grid-rows-4 gap-2 text-black ">
                  {renderRoom(1, "west", floorData)}
                </div>
              </section>
              <section
                className={`flex flex-col items-center space-y-2 text-black ${layoutPlan === "vertical" ? "h-1/2" : "w-1/2"}`}
              >
                <Button className="whitespace-nowrap rounded-md bg-[#2f4550] px-10 text-lg">
                  east
                </Button>
                <div className=" grid w-full grow grid-cols-4 grid-rows-4 gap-2 text-black ">
                  {renderRoom(1, "east", floorData)}
                </div>
              </section>
            </div>
          </section>
        )}
        {show2ndFloorPlan && (
          <section className=" w-full grow  pt-3 ">
            {/* container for floor plans for both wings on first floor */}
            <div
              className={`h-full  ${layoutPlan === "vertical" ? verticalLayout : horizontalLayout} text-black`}
            >
              <section
                className={`flex  flex-col items-center space-y-2 text-black ${layoutPlan === "vertical" ? "h-1/2" : "w-1/2"}`}
              >
                <Button className="whitespace-nowrap rounded-md bg-[#2f4550] px-10 text-lg">
                  west
                </Button>
                <div className=" grid w-full grow grid-cols-4 grid-rows-4 gap-2 text-black ">
                  {renderRoom(2, "west", floorData)}
                </div>
              </section>
              <section
                className={`flex flex-col items-center space-y-2 text-black ${layoutPlan === "vertical" ? "h-1/2" : "w-1/2"}`}
              >
                <Button className="whitespace-nowrap rounded-md bg-[#2f4550] px-10 text-lg">
                  east
                </Button>
                <div className=" grid w-full grow grid-cols-4 grid-rows-4 gap-2 text-black ">
                  {renderRoom(2, "east", floorData)}
                </div>
              </section>
            </div>
          </section>
        )}
      </section>
    </section>
  );
}
export default FloorPanel;
