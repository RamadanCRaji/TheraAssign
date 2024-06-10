"use client";
import { westSide, eastSide } from "@/data/roomData/firstFloor";
import { eastSide2, westSide2 } from "@/data/roomData/secondFloor";
import { useState, useEffect } from "react";
import {
  fetchFirstFloorData,
  fetchSecondFloorData,
} from "@/src/services/GetData/FetchRoomServices";
import { clearPreviewData } from "next/dist/server/api-utils";
function FloorPanel() {
  const [show2ndFloorPlan, setshow2ndFloorPlan] = useState(false);
  const [show1stFloorPlan, setshow1stFloorPlan] = useState(true);

  const [firstFloorRooms, setFirstFloorRooms] = useState([westSide, eastSide]);
  const [secondFloorRooms, setSecondFloorRooms] = useState([
    eastSide2,
    westSide2,
  ]);
  // const fetchAndUpdateRoomInfo = async () => {
  //   try {
  //     // Fetch data for first and second floors.
  //     const firstFloorResponse = await fetchFirstFloorData();
  //     const secondFloorResponse = await fetchSecondFloorData();

  //     // Convert the responses to JSON.
  //     const firstFloorRooms = await firstFloorResponse.json();
  //     const secondFloorRooms = await secondFloorResponse.json();

  //     // Updated states with the relevant data from the responses.
  //     setFirstFloorRooms([firstFloorRooms[0], firstFloorRooms[1]]);
  //     setSecondFloorRooms([secondFloorRooms[0], secondFloorRooms[1]]);
  //   } catch (error) {
  //     console.log("Error fetching room data:", error.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchAndUpdateRoomInfo();
  // }, []);

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
  const roomColor = (occupied) => (occupied ? "bg-blue-200" : "bg-yellow-400 ");
  const renderRoom = (room) => {
    let roomClasses = "rounded flex items-center justify-center p-2 text-black";
    let specialRoomClasses = "col-start-2 col-end-4 grid grid-cols-4 ";
    if (room.id === "113" || room.id === "126") {
      return (
        <div key={room.id} className={`${specialRoomClasses}`}>
          <div
            className={`${roomClasses} ${roomColor(
              room.occupied,
            )} col-span-2 col-start-2`}
          >
            <span className="">{room["Room Number"]}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={room.id}
          className={`${roomClasses} ${roomColor(room.occupied)}`}
        >
          <span>{room["Room Number"]}</span>
        </div>
      );
    }
  };
  return (
    <section className=" grid h-full grid-cols-9 grid-rows-6 rounded-md px-2 pt-2 ">
      {/* created 6 rows and */}
      <section className=" col-start-1 col-end-10 grid grid-cols-9 grid-rows-2">
        <div
          className=" col-span-1 col-start-4  flex  items-center justify-center rounded-md bg-[#b8dbd9] font-bold text-black transition duration-300 ease-in hover:scale-105 hover:bg-[#3a515c] hover:font-bold hover:text-[#c3cbd2] hover:shadow-lg"
          onClick={floorPlanSwitch1}
        >
          <button>Floor 1</button>
        </div>
        <div
          className=" col-span-1 col-start-6 flex items-center justify-center rounded-md bg-[#b8dbd9] font-bold text-black transition duration-300 ease-in hover:scale-105 hover:bg-[#3a515c] hover:font-bold hover:text-[#c3cbd2] hover:shadow-lg"
          onClick={floorPlanSwitch2}
        >
          <button>Floor 2</button>
        </div>
      </section>
      {show1stFloorPlan && (
        <section className="col-start-1 col-end-10 row-start-2 row-end-7 grid h-full grid-cols-9 gap-y-2 [grid-template-rows:40.2px_repeat(5,1fr)] 2xl:gap-y-3">
          <div className="col-span-2 col-start-2 grid grid-cols-4 ">
            <button className="col-span-2 col-start-2 whitespace-nowrap rounded-md bg-[#2f4550]">
              West
            </button>
          </div>
          <div className="col-span-2 col-start-7 grid grid-cols-4">
            <button className=" col-span-2 col-start-2 whitespace-nowrap rounded-md bg-[#2f4550]">
              East
            </button>
          </div>
          {/* container for floor plans for both wings on first floor */}
          <div className="col-span-9 row-span-5 row-start-2 flex  justify-between gap-10  text-black">
            <section className=" col-start-1 grid h-full w-1/2 grid-cols-4 grid-rows-4 gap-2  text-black">
              {firstFloorRooms[0].map((room) => renderRoom(room))}
            </section>
            <section className=" col-span-4 col-start-6 row-span-4 grid w-1/2 grid-cols-4 grid-rows-4 gap-2">
              {firstFloorRooms[1].map((room) => renderRoom(room))}
            </section>
          </div>
        </section>
      )}
      {show2ndFloorPlan && (
        <section className=" 2xl:gap-y-3[grid-template-rows:40.2px_repeat(5,1fr)] col-start-1 col-end-10 row-start-2 row-end-7 grid h-full grid-cols-9 gap-y-2">
          <div className="col-span-2 col-start-2 grid grid-cols-4 ">
            <button className="col-span-2 col-start-2 whitespace-nowrap rounded-md bg-[#2f4550]">
              West
            </button>
          </div>
          <div className="col-span-2 col-start-7 grid grid-cols-4">
            <button className=" col-span-2 col-start-2 whitespace-nowrap rounded-md bg-[#2f4550]">
              East
            </button>
          </div>
          <div className="col-span-9 row-span-5 row-start-2 flex justify-between gap-10 text-black">
            <section className=" col-start-1 grid w-1/2 grid-cols-4 grid-rows-4 gap-2 text-black">
              {secondFloorRooms[0].map((room) => renderRoom(room))}
            </section>
            <section className=" col-start-6 grid w-1/2 grid-cols-4 grid-rows-4 gap-2">
              {secondFloorRooms[1].map((room) => renderRoom(room))}
            </section>
          </div>
        </section>
      )}
    </section>
  );
}
export default FloorPanel;
// old way of the layout wwhen i used grid for the way the rooms should show up
//   return (
//    <section className=" grid h-full grid-cols-9 grid-rows-6 rounded-md px-2 pt-2 ">
//      {/* created 6 rows and */}
//      <section className=" col-start-1 col-end-10 grid grid-cols-9 grid-rows-2">
//        <div
//          className=" col-span-1 col-start-4  flex  items-center justify-center rounded-md bg-[#b8dbd9] font-bold text-black transition duration-300 ease-in hover:scale-105 hover:bg-[#3a515c] hover:font-bold hover:text-[#c3cbd2] hover:shadow-lg"
//          onClick={floorPlanSwitch1}
//        >
//          <button>Floor 1</button>
//        </div>
//        <div
//          className=" col-span-1 col-start-6 flex items-center justify-center rounded-md bg-[#b8dbd9] font-bold text-black transition duration-300 ease-in hover:scale-105 hover:bg-[#3a515c] hover:font-bold hover:text-[#c3cbd2] hover:shadow-lg"
//          onClick={floorPlanSwitch2}
//        >
//          <button>Floor 2</button>
//        </div>
//      </section>
//      {show1stFloorPlan && (
//        <section className="col-start-1 col-end-10 row-start-2 row-end-7 grid h-full grid-cols-9 gap-y-2 [grid-template-rows:40.2px_repeat(5,1fr)] 2xl:gap-y-3">
//          <div className="col-span-2 col-start-2 grid grid-cols-4 ">
//            <button className="col-span-2 col-start-2 whitespace-nowrap rounded-md bg-[#2f4550]">
//              West
//            </button>
//          </div>
//          <div className="col-span-2 col-start-7 grid grid-cols-4">
//            <button className=" col-span-2 col-start-2 whitespace-nowrap rounded-md bg-[#2f4550]">
//              East
//            </button>
//          </div>
//          {/* container for floor plans for both wings on first floor */}
//          <div className="col-span-9 row-span-5 row-start-2 grid grid-cols-9 grid-rows-5 border border-red-600 text-black">
//            <section className=" col-span-4 col-start-1 row-span-4 grid grid-cols-4 grid-rows-4 gap-2 border text-black">
//              {westSide.map((room) => renderRoom(room))}
//            </section>
//            <section className=" col-span-4 col-start-6 row-span-4 grid grid-cols-4 grid-rows-4 gap-2">
//              {eastSide.map((room) => renderRoom(room))}
//            </section>
//          </div>
//        </section>
//      )}
//      {show2ndFloorPlan && (
//        <section className=" 2xl:gap-y-3[grid-template-rows:40.2px_repeat(5,1fr)] col-start-1 col-end-10 row-start-2 row-end-7 grid h-full grid-cols-9 gap-y-2">
//          <div className="col-span-2 col-start-2 grid grid-cols-4 ">
//            <button className="col-span-2 col-start-2 whitespace-nowrap rounded-md bg-[#2f4550]">
//              West
//            </button>
//          </div>
//          <div className="col-span-2 col-start-7 grid grid-cols-4">
//            <button className=" col-span-2 col-start-2 whitespace-nowrap rounded-md bg-[#2f4550]">
//              East
//            </button>
//          </div>
//          <div className="col-span-9 row-span-5 row-start-2 grid grid-cols-9 grid-rows-5 text-black">
//            <section className=" col-span-4 col-start-1 row-span-4 grid grid-cols-4 grid-rows-4 gap-2 text-black">
//              {westSide2.map((room) => renderRoom(room))}
//            </section>
//            <section className=" col-span-4 col-start-6 row-span-4 grid grid-cols-4 grid-rows-4 gap-2">
//              {eastSide2.map((room) => renderRoom(room))}
//            </section>
//          </div>
//        </section>
//      )}
//    </section>
//  );

// new way using flex for the room layout alongside grid

/**
 * things i will need to send to the front end when they request information
 * color changes based on
 * room is occupied- light blue
 * room is empty- yellow
 * each room is an object that contains
 * client name
 * toom number
 * chair
 * P.W.C
 * the toom is occupoied if ther is a client name to it
 */
/**
 * what i want to happen
 *   when page loads the floor plan 1 shoudl be the first one showing
 * when i click floor 1 is clicked the floor plan should change
 * change floor 2 to false so it disappears if it is already true
 * if i click floor 1 again while it is true then nothing should happen
 * when i click floor 2 then floor plan should change
 * floor 2 changes to true and floor on changes to false (so it does not show)
 * if i click on floor 2 again and it is true then nothing happens
 *  if i click floor two whiel it
 *
 * problem #2
 * seond floor is one less room than 1st floor which mean the layout needs to be a 3x3
 */
