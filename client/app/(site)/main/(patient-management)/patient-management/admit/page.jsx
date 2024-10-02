"use client";

// React and form handling
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// UI components from shacdcn
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Self-built modules
import { ChairLayout } from "@/components/ChairLayout";
import {
  fetchAllChairData,
  admitPatient,
  fetchAvailableRooms,
} from "@/src/services/apiService";

// Constants
const STANDARD = "STANDARD";
const BARIATRIC = "BARIATRIC";
const TILTING = "TILTING";

// Chair types used as a source
const CHAIR_TYPES = [
  {
    type: STANDARD,
    tab_title: "SD",
  },
  {
    type: BARIATRIC,
    tab_title: "BR",
  },
  {
    type: TILTING,
    tab_title: "TS",
  },
];

// Form schema for validation
const FormSchema = z.object({
  tagId: z.string().min(3, "Select chair"),
  firstName: z.string().min(3, "First name needed"),
  lastName: z.string().min(3, "Last name needed"),
  roomNumber: z.string().min(3, "Assign room"),
});

function Admit() {
  // Form setup
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tagId: "",
      firstName: "",
      lastName: "",
      roomNumber: "",
    },
  });

  // State for chair types and selected chair properties
  const [chairData, setChairData] = useState({});
  const [availablerooms, setAvailablerooms] = useState([]);
  const [selectedChairType, setSelectedChairType] = useState("");
  const [selectedDimension, setSelectedDimension] = useState("");

  const getChairs = async () => {
    try {
      const [ALLCHAIRS, AVAILABLEROOMS] = await Promise.all([
        fetchAllChairData(),
        fetchAvailableRooms(),
      ]);

      const {
        standard: standardChairs,
        bariatric: bariatricChairs,
        tiltInSpace: tiltInSpaceChairs,
      } = ALLCHAIRS;
      setChairData((prev) => ({
        ...prev,
        [STANDARD]: standardChairs,
        [BARIATRIC]: bariatricChairs,
        [TILTING]: tiltInSpaceChairs,
      }));
      setAvailablerooms((prev) => {
        return [...AVAILABLEROOMS];
      });
      // setLoading(false);
    } catch (error) {
      console.error("Failed to fetch chairs:", error.message);
    }
  };

  const filterAvailableDimensions = (chairData) => {
    if (!chairData?.filter((e) => e["Status"]["Available"])) return [];
    const uniqueDimensions = new Set();
    chairData.forEach((chair) => {
      uniqueDimensions.add(chair.Dimension);
    });
    return Array.from(uniqueDimensions);
  };

  useEffect(() => {
    getChairs();
  }, []);

  const onSubmit = async (data) => {
    // event.preventDefault();
    try {
      const response = await admitPatient(data);
      toast({
        title: "Admit Patient",
        description: `Your request to submit patient has been submitted`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `There was a problem with admiting  patient:${error.message}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };
  // if (loading) return <div>loading</div>;
  return (
    <section className="h-full grow bg-[#eeebeb]">
      <main className="h-full w-full grow  px-2 py-2 text-black">
        <div className="grid h-full w-full max-w-[2080px] grid-cols-6  ">
          <section className="col-span-4 mr-1 flex h-full flex-col items-stretch border-r border-black">
            <div className="mb-3  text-center">
              <h3 className="inline-block w-[30%] whitespace-nowrap rounded-lg border border-gray-400 bg-[#b8dbd9] py-2 text-center font-bold">
                Admissions
              </h3>
            </div>
            <div className="flex  grow">
              <section className=" h-full w-[80%]  border-black ">
                <section className="flex h-3/5 w-full flex-col ">
                  {/* chosing styles */}
                  <div className="flex h-1/2 w-full flex-col justify-evenly ">
                    <div className=" flex items-center justify-start">
                      <h3 className=" border-b-2 border-[#8588a7] pb-1 text-xl font-semibold text-[#414BB2]">
                        Chose Chair Style
                      </h3>
                    </div>
                    <div className=" flex w-[55%] items-center justify-between self-start">
                      {CHAIR_TYPES?.map((e) => {
                        return (
                          <div className="" key={e["type"]}>
                            <button
                              className="h-9 w-full rounded-md border-2 border-black bg-[#b4c5e4] px-10 transition duration-300 ease-in hover:scale-105 hover:bg-[#3a515c] hover:font-bold hover:text-[#c3cbd2] hover:shadow-lg"
                              onClick={() => {
                                setSelectedDimension("");
                                form.setValue("tagId", "");
                                setSelectedChairType(e["type"]);
                              }}
                            >
                              {e.tab_title}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* now i need to give you the dimensions of the chair you selected*/}
                  <div className="flex h-1/2 w-full flex-col justify-evenly  p-2">
                    <div className=" flex items-center justify-start">
                      <h3 className=" border-b-2 border-[#8588a7] pb-1 text-xl font-semibold text-[#414BB2]">
                        Chose Dimensions
                      </h3>
                    </div>
                    {/* this will be my scroll area becuase i will have an overflow here */}
                    <ScrollArea className="w-full whitespace-nowrap">
                      <div className=" flex w-full items-center justify-start  gap-x-2 py-4">
                        {filterAvailableDimensions(
                          chairData[selectedChairType],
                        ).map((e, index) => {
                          return (
                            <div className="" key={index}>
                              <button
                                className="h-9 w-full rounded-md border-2 border-black bg-[#b4c5e4] px-10 transition duration-300 ease-in hover:scale-105 hover:bg-[#3a515c] hover:font-bold hover:text-[#c3cbd2] hover:shadow-lg"
                                onClick={() => {
                                  setSelectedDimension(e);
                                  form.setValue("tagId", "");
                                }}
                              >
                                {e}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      <ScrollBar
                        orientation="horizontal"
                        className="bg-[#bac6db]"
                      />
                    </ScrollArea>
                  </div>
                  {/* versions based on selected Dimensions*/}
                  <div className="flex h-1/2 w-full flex-col justify-evenly  p-2 ">
                    <div className=" flex items-center justify-start">
                      <h3 className=" border-b-2 border-[#8588a7] pb-1 text-xl font-semibold text-[#414BB2]">
                        Available Chairs
                      </h3>
                    </div>
                    {/* this will be my scroll area becuase i will have an overflow here */}
                    <ScrollArea className="w-full whitespace-nowrap">
                      <div className=" flex w-full items-center justify-start  gap-x-2 py-4">
                        {chairData[selectedChairType]
                          ?.filter((e) => e["Dimension"] === selectedDimension)
                          .map((e) => {
                            return (
                              <div key={e._id}>
                                <button
                                  className="h-9 w-full rounded-md border-2 border-black bg-[#b4c5e4] px-10 transition duration-300 ease-in hover:scale-105 hover:bg-[#3a515c] hover:font-bold hover:text-[#c3cbd2] hover:shadow-lg"
                                  onClick={() => {
                                    form.setValue("tagId", e.TagId);
                                  }}
                                >
                                  {e.Version}
                                </button>
                              </div>
                            );
                          })}
                      </div>
                      <ScrollBar
                        orientation="horizontal"
                        className="bg-[#bac6db]"
                      />
                    </ScrollArea>
                  </div>
                </section>
                <section className=" flex h-2/5 w-full flex-col justify-evenly pb-1 pr-2 ">
                  <div className="mb-2 flex w-full items-center justify-start">
                    <h3 className=" border-b-2 border-[#8588a7] pb-1 text-xl font-semibold text-[#414BB2]">
                      Finalize Admisson
                    </h3>
                  </div>
                  <Form {...form} className="pt-0">
                    <form
                      className="flex h-full w-full max-w-2xl flex-col  items-stretch justify-around  rounded-md  pr-1 pt-0 xl:max-w-2xl"
                      onSubmit={form.handleSubmit(onSubmit)}
                    >
                      <FormField
                        control={form.control}
                        name="tagId"
                        render={({ field }) => (
                          <FormItem className="flex w-full items-center justify-between ">
                            <FormLabel className=" pr-2 text-center text-lg font-bold">
                              Tag ID
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id="tagId"
                                className="max-w-[75%] grow border-2 border-gray-500 "
                                placeholder="Patient's assinged chair"
                                disabled={true}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="flex w-full items-center justify-between ">
                            <FormLabel className=" pr-2 text-center text-lg font-bold">
                              FirstName
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id="firstName"
                                className="max-w-[75%] grow border-2 border-gray-500"
                                placeholder="Patient's first name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem className="flex w-full items-center justify-between ">
                            <FormLabel className=" shrink-1 pr-2 text-center text-lg font-bold">
                              lastName
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id="lastName"
                                className="max-w-[75%] grow border-2 border-gray-500"
                                placeholder="Patient's last name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="roomNumber"
                        render={({ field }) => (
                          <FormItem className="flex w-full items-center justify-between ">
                            <FormLabel className=" whitespace-nowrap pr-2 text-center text-lg font-bold">
                              Room
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="max-w-[75%] grow border-2 border-gray-500 text-start">
                                  <SelectValue placeholder="Select Room" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Available Rooms</SelectLabel>
                                  {availablerooms?.map((room) => {
                                    return (
                                      <SelectItem
                                        value={String(room._id)}
                                        key={room._id}
                                      >
                                        {room["Room Number"]}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex w-full ">
                        <Button className="ml-auto" type="submit">
                          Submit
                        </Button>
                      </div>
                    </form>
                  </Form>
                </section>
              </section>
            </div>
          </section>
          <aside className="col-span-2 h-full overflow-hidden ">
            <ChairLayout chairData={chairData} />
          </aside>
        </div>
      </main>
    </section>
  );
}
export default Admit;
