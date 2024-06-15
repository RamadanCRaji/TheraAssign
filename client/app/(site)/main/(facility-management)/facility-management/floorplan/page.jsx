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
import {
  fetchFirstFloorData,
  fetchSecondFloorData,
} from "@/src/services/GetData/FetchRoomServices";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

function OverallFloorPlan(props) {
  const { layoutPlan } = props;
  const [show2ndFloorPlan, setshow2ndFloorPlan] = useState(false);
  const [show1stFloorPlan, setshow1stFloorPlan] = useState(true);

  const [firstFloorRooms, setFirstFloorRooms] = useState([westSide, eastSide]);
  const [secondFloorRooms, setSecondFloorRooms] = useState([
    eastSide2,
    westSide2,
  ]);
  // Form setup
  const formOne = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: FormDefaultValues,
  });
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

  const patientInfo = (roomNumber, pwc, fullName, chair) => (
    <div className="grid gap-4 rounded-lg bg-white p-4 shadow-md">
      <div className="flex items-center justify-start gap-x-4 text-lg">
        <span className="font-bold text-gray-700"> Patient Name:</span>
        <span className="text-gray-600">{fullName}</span>
      </div>
      <div className="flex items-center justify-start gap-x-4 text-lg">
        <span className="font-bold text-gray-700">Room:</span>
        <span className="text-gray-600">{roomNumber}</span>
      </div>
      <div className="flex items-center justify-start gap-x-4 text-lg">
        <span className="font-bold text-gray-700">Chair:</span>
        <span className="text-gray-600">{chair}</span>
      </div>
      <div className="flex items-center justify-start gap-x-4 text-lg">
        <span className="font-bold text-gray-700">Personal W.C:</span>
        <span className="text-gray-600">{pwc ? "Yes" : "No"}</span>
      </div>
    </div>
  );

  // Helper function to determine room color based on occupancy
  const roomColor = (occupied) => (occupied ? "bg-blue-200" : "bg-yellow-400 ");

  // Helper function to render individual rooms
  const renderRoom = (room) => {
    let roomClasses =
      "rounded-xl flex items-center justify-center p-2 text-black hover:cursor-pointer hover:scale-110 lg:hover:scale-105 duration-300 ease-in hover:font-bold ";
    let specialRoomClasses = "col-start-2 col-end-4 grid grid-cols-4 ";

    if (room.id === "113" || room.id === "126") {
      return (
        <div className={`${specialRoomClasses}`} key={room.id}>
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
    <section className="h-full grow bg-[#eeebeb]">
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
                  {/* Section for finding which patient to swap */}
                  <section className="flex w-full grow flex-col items-center pb-3 ">
                    <div className=" text-center">
                      <h3 className="inline-block whitespace-nowrap rounded-lg border border-gray-400 bg-[#b8dbd9] px-10 py-1 text-center font-bold">
                        floor 1
                      </h3>
                    </div>
                    <div className="flex grow flex-col self-stretch  ">
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
                              {firstFloorRooms[0].map((room) =>
                                renderRoom(room),
                              )}
                            </div>
                          </section>
                          <section
                            className={`flex flex-col items-center space-y-2 text-black ${layoutPlan === "vertical" ? "h-1/2" : "w-1/2"}`}
                          >
                            <Button className="whitespace-nowrap rounded-md bg-[#2f4550] px-10 text-lg">
                              east
                            </Button>
                            <div className=" grid w-full grow grid-cols-4 grid-rows-4 gap-2 text-black ">
                              {firstFloorRooms[1].map((room) =>
                                renderRoom(room),
                              )}
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
                    <div className="flex grow flex-col self-stretch border">
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
                              {secondFloorRooms[0].map((room) =>
                                renderRoom(room),
                              )}
                            </div>
                          </section>
                          <section
                            className={`flex flex-col items-center space-y-2 text-black ${layoutPlan === "vertical" ? "h-1/2" : "w-1/2"}`}
                          >
                            <Button className="whitespace-nowrap rounded-md bg-[#2f4550] px-10 text-lg">
                              east
                            </Button>
                            <div className=" grid w-full grow grid-cols-4 grid-rows-4 gap-2 text-black ">
                              {secondFloorRooms[1].map((room) =>
                                renderRoom(room),
                              )}
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
          <aside className="col-span-2 h-full overflow-hidden">
            <section className="h-full w-full  ">
              <section className="flex h-full w-full flex-col items-center justify-around border border-black">
                <Form {...formOne}>
                  <form action="" className="w-[95%] ">
                    <Card className="mx-auto flex h-[550px] w-full flex-col justify-around rounded-[60px]  bg-[#2E5266] text-white 2xl:h-[600px] 2xl:w-3/5">
                      <CardContent className="flex grow flex-col justify-around ">
                        <Avatar className="h-20 w-20 border border-white">
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            size={50}
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="grid items-center gap-y-11 self-stretch ">
                          <FormField
                            name="name"
                            render={({ field }) => (
                              <FormItem className="flex h-12 items-center justify-between ">
                                <FormLabel
                                  htmlFor="name"
                                  className=" flex h-full items-center rounded-lg bg-white px-7 text-center text-lg font-semibold text-black"
                                >
                                  Name
                                </FormLabel>
                                <Input
                                  id="name"
                                  {...field}
                                  className=" h-full text-black"
                                  placeholder="Patient Name"
                                  disabled
                                />
                              </FormItem>
                            )}
                          />
                          <FormField
                            name="room"
                            render={({ field }) => (
                              <FormItem className="flex h-12 items-center justify-between ">
                                <FormLabel
                                  htmlFor="name"
                                  className=" flex h-full items-center rounded-lg bg-white px-7 text-center text-lg font-semibold text-black"
                                >
                                  Room
                                </FormLabel>
                                <Input
                                  id="room"
                                  {...field}
                                  className=" h-full text-black"
                                  placeholder="Patient Name"
                                  disabled
                                />
                              </FormItem>
                            )}
                          />
                          <FormField
                            name="currentChair"
                            render={({ field }) => (
                              <FormItem className="flex h-12 items-center justify-between ">
                                <FormLabel
                                  htmlFor="name"
                                  className=" flex h-full items-center rounded-lg bg-white px-7 text-center text-lg font-semibold text-black"
                                >
                                  Chair
                                </FormLabel>
                                <Input
                                  id="currentChair"
                                  {...field}
                                  className=" h-full text-black"
                                  placeholder="Patient Name"
                                  disabled
                                />
                              </FormItem>
                            )}
                          />
                          <FormField
                            name="P.W.C"
                            render={({ field }) => (
                              <FormItem className="flex h-12 items-center justify-between ">
                                <FormLabel
                                  htmlFor="P.W.C"
                                  className=" flex h-full items-center rounded-lg bg-white px-7 text-center text-lg font-semibold text-black"
                                >
                                  P.W.C
                                </FormLabel>
                                <Input
                                  id="P.W.C"
                                  {...field}
                                  className=" h-full text-black"
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
