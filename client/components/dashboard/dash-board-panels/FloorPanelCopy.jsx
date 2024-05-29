// React and Next.js imports
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Data imports (self-built modules)
import { westSide, eastSide } from "@/data/roomData/firstFloor";
import { eastSide2, westSide2 } from "@/data/roomData/secondFloor";

// Service imports (self-built modules)
import {
  fetchFirstFloorData,
  fetchSecondFloorData,
} from "@/src/services/GetData/FetchRoomServices";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Style definitions
const horizontalLayout = `flex gap-10 justify-center`;
const verticalLayout = `flex gap-10 justify-around flex-col`;

// Main component definition
function FloorPanel(props) {
  const { layoutPlan } = props;
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

  // Helper function to determine room color based on occupancy
  const roomColor = (occupied) => (occupied ? "bg-blue-200" : "bg-yellow-400 ");

  // Helper function to render individual rooms
  const renderRoom = (room) => {
    let roomClasses =
      " rounded-xl flex items-center justify-center p-2 text-black hover:cursor-pointer ";
    let specialRoomClasses = "col-start-2 col-end-4 grid grid-cols-4 ";
    if (room.id === "113" || room.id === "126") {
      return (
        <Dialog key={room.id}>
          <div className={`${specialRoomClasses}`}>
            <DialogTrigger asChild>
              <div
                className={`${roomClasses} ${roomColor(
                  room.occupied,
                )} col-span-2 col-start-2`}
              >
                <span className="">{room["Room Number"]}</span>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </div>
        </Dialog>
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
                  {firstFloorRooms[0].map((room) => renderRoom(room))}
                </div>
              </section>
              <section
                className={`flex flex-col items-center space-y-2 text-black ${layoutPlan === "vertical" ? "h-1/2" : "w-1/2"}`}
              >
                <Button className="whitespace-nowrap rounded-md bg-[#2f4550] px-10 text-lg">
                  east
                </Button>
                <div className=" grid w-full grow grid-cols-4 grid-rows-4 gap-2 text-black ">
                  {firstFloorRooms[1].map((room) => renderRoom(room))}
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
                  {secondFloorRooms[0].map((room) => renderRoom(room))}
                </div>
              </section>
              <section
                className={`flex flex-col items-center space-y-2 text-black ${layoutPlan === "vertical" ? "h-1/2" : "w-1/2"}`}
              >
                <Button className="whitespace-nowrap rounded-md bg-[#2f4550] px-10 text-lg">
                  east
                </Button>
                <div className=" grid w-full grow grid-cols-4 grid-rows-4 gap-2 text-black ">
                  {secondFloorRooms[1].map((room) => renderRoom(room))}
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
