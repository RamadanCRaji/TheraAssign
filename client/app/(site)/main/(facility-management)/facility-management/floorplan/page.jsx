"use client";

// React and Next.js imports
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Data imports (self-built modules)
import { westSide, eastSide } from "@/data/roomData/firstFloor";
import { eastSide2, westSide2 } from "@/data/roomData/secondFloor";

// Service imports (self-built modules)
import { fetchAllRoomData } from "@/src/services/apiService";
// Component imports (self-built modules)
import { Button } from "@/components/ui/button";
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

const FormSchema = z.object({
  name: z.string(),
  room: z.string(),
  currentChair: z.string(),
  "P.W.C": z.string(),
});
const FormDefaultValues = z.object({
  name: "",
  room: "",
  currentChair: "",
  "P.W.C": "",
});

function OverallFloorPlan({ layoutPlan }) {
  // Form setup
  const formOne = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: FormDefaultValues,
  });

  const [floorData, setFloorData] = useState([]);

  const fetchAndUpdateRoomInfo = async () => {
    try {
      const data = await fetchAllRoomData();
      setFloorData((prev) => [...data]);
    } catch (error) {
      console.error("Error fetching room data:", error.message);
    }
  };

  useEffect(() => {
    fetchAndUpdateRoomInfo();
  }, []);

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
          <div
            className={`${roomLayoutClass}`}
            key={room._id}
            onClick={() => {
              const { PatientId } = room || {};
              const { firstName, lastName, personal_Wheel_chair, chairId } =
                PatientId || {};
              // Assign values with fallbacks

              const patientName = PatientId
                ? `${firstName || "n/a"} ${lastName || "n/a"}`
                : "n/a";
              const roomNumber = room?.["Room Number"] || "n/a";
              const currentChair = chairId?.TagId || "n/a";
              const personalWheelChair = personal_Wheel_chair ? "Yes" : "No";

              formOne.setValue("name", patientName);
              formOne.setValue("room", roomNumber);
              formOne.setValue("currentChair", currentChair);
              formOne.setValue("P.W.C", personalWheelChair);
            }}
          >
            <div
              className={`${roomClasses} ${roomColor(
                room?.PatientId,
              )} col-span-2 col-start-2`}
            >
              <span className="">{room["Room Number"]}</span>
            </div>
          </div>
        );
      } else {
        return (
          <div
            key={room._id}
            className={`${roomLayoutClass} ${roomColor(room?.PatientId)}`}
            onClick={() => {
              const { PatientId } = room || {};
              const { firstName, lastName, personal_Wheel_chair, chairId } =
                PatientId || {};
              const patientName = PatientId
                ? `${firstName || "n/a"} ${lastName || "n/a"}`
                : "n/a";
              const roomNumber = room["Room Number"] || "n/a";
              const currentChair = chairId?.TagId || "n/a";
              const personalWheelChair = personal_Wheel_chair ? "Yes" : "No";

              formOne.setValue("name", patientName);
              formOne.setValue("room", roomNumber);
              formOne.setValue("currentChair", currentChair);
              formOne.setValue("P.W.C", personalWheelChair);
            }}
          >
            <span>{room["Room Number"]}</span>
          </div>
        );
      }
    });
  };

  return (
    <section className="h-full grow bg-[#fafafa]">
      <main className="h-full w-full grow px-2 py-2 text-black">
        <div className="grid h-full w-full max-w-[2080px] grid-cols-6">
          <section className="col-span-4 mr-1 flex h-full flex-col items-stretch space-y-8 border-black pt-2 lg:border ">
            <div className="mb-3 text-center">
              <h3 className="inline-block w-[20%] whitespace-nowrap rounded-lg border border-gray-400 bg-[#b8dbd9] py-2 text-center font-bold">
                Room Layout
              </h3>
            </div>
            <div className="flex grow">
              <section className="  h-full w-full border-black   2xl:pb-1">
                <section className="flex h-full w-full flex-col justify-around px-2">
                  <section className="flex w-full grow flex-col items-center pb-3 ">
                    <div className=" text-center">
                      <h3 className="inline-block whitespace-nowrap rounded-lg border border-gray-400 bg-[#b8dbd9] px-10 py-1 text-center font-bold">
                        floor 1
                      </h3>
                    </div>
                    <div className="flex grow flex-col self-stretch">
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
                    </div>
                  </section>
                  <section className="flex w-full grow flex-col items-center  pt-5">
                    <div className=" text-center">
                      <h3 className="inline-block whitespace-nowrap rounded-lg border border-gray-400 bg-[#b8dbd9] px-10 py-1 text-center font-bold">
                        floor 2
                      </h3>
                    </div>
                    <div className="flex grow flex-col self-stretch ">
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
                    </div>
                  </section>
                </section>
              </section>
            </div>
          </section>
          <aside className="col-span-2 h-full ">
            <section className="  flex h-full w-full flex-col items-center justify-evenly border border-black">
              <Form {...formOne}>
                <form className="flex max-h-[600px] w-3/5 grow  justify-around ">
                  <Card className=" grid h-full w-full rounded-[40px] bg-[#6A9DAE]  text-white">
                    <CardContent className="grid  pt-2">
                      <Avatar className="h-20 w-20 border border-white">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          size={50}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="grid w-full items-center gap-11">
                        <FormField
                          name="name"
                          render={({ field }) => (
                            <FormItem className="flex flex-col  space-y-1.5 ">
                              <FormLabel
                                htmlFor="name"
                                className="self-start text-lg font-semibold text-[#FFFFFF]"
                              >
                                Name
                              </FormLabel>
                              <Input
                                id="name"
                                {...field}
                                className=" h-full py-4 text-black"
                                placeholder="Patient Name"
                                disabled
                              />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name="room"
                          render={({ field }) => (
                            <FormItem className="flex flex-col  space-y-1.5 ">
                              <FormLabel
                                htmlFor="name"
                                className=" self-start text-lg font-semibold text-[#FFFFFF]"
                              >
                                Room
                              </FormLabel>
                              <Input
                                id="room"
                                {...field}
                                className=" h-full py-4 text-black"
                                placeholder="Assigned Room"
                                disabled
                              />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name="currentChair"
                          render={({ field }) => (
                            <FormItem className="flex flex-col  space-y-1.5 ">
                              <FormLabel
                                htmlFor="name"
                                className="self-start text-lg font-semibold text-[#FFFFFF]"
                              >
                                Chair
                              </FormLabel>
                              <Input
                                id="currentChair"
                                {...field}
                                className=" h-full py-4 text-black"
                                placeholder="Assigned chair"
                                disabled
                              />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name="P.W.C"
                          render={({ field }) => (
                            <FormItem className="flex flex-col space-y-1.5  ">
                              <FormLabel
                                htmlFor="P.W.C"
                                className=" self-start text-lg font-semibold text-[#FFFFFF]"
                              >
                                P.W.C
                              </FormLabel>
                              <Input
                                id="P.W.C"
                                {...field}
                                className="h-full py-4 text-black"
                                placeholder="Patient Name"
                                disabled
                              />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </form>
              </Form>
            </section>
          </aside>
        </div>
      </main>
    </section>
  );
}

export default OverallFloorPlan;

/**
Issues to address
  - i need to make the side profile more responsive to changes 
       

*/

// with or if the left side if the true what does it return, if it f
