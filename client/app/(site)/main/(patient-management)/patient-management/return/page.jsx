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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Self-built modules
import { fetchPatientInfo } from "@/src/services/GetData/FetchPatientsInfo";
import { ChairLayout } from "@/components/ChairLayout";
import { fetchAllChairs } from "@/src/services/GetData/FetchHospitalChairs";
import { chairs } from "@/data/chairData/ChairInventory";
import { DummyDataPatientInfo } from "@/data/patientData/PatientInfo";

// Patient Search  schema for validation
const FormOneSchema = z.object({
  firstName: z.string().min(3, "required"),
  lastName: z.string().min(3, "required"),
});

//final submission schema
const FormTwoSchema = z.object({
  chairId: z.string().min(3, { message: "Select chair" }),
  firstName: z.string().min(3, { message: "First name needed" }),
  roomId: z.number().min(3, { message: "Assign room" }),
  returnedChair: z.string().min(11, { message: "Assign room" }),
  lastName: z.string().min(3, { message: "Last name needed" }),
});
const formOneDefaultValues = {
  firstName: "",
  lastName: "",
};
const formTwoDefaultValues = {
  chairId: "",
  firstName: "",
  lastName: "",
  roomId: "",
  returnedChair: "",
};

// Constants
const STANDARD = "STANDARD";
const BARIATRIC = "BARIATRIC";
const TILTING = "TILTING";

// Chair types used as a source
// const CHAIR_TYPES = [
//   {
//     type: STANDARD,
//     tab_title: "SD",
//   },
//   {
//     type: BARIATRIC,
//     tab_title: "BR",
//   },
//   {
//     type: TILTING,
//     tab_title: "TS",
//   },
// ];

function RoomChange() {
  // Form setup
  const formOne = useForm({
    resolver: zodResolver(FormOneSchema),
    defaultValues: formOneDefaultValues,
  });
  const formTwo = useForm({
    resolver: zodResolver(FormTwoSchema),
    defaultValues: formTwoDefaultValues,
  });

  //State to store all patient information that was retrieved from the backend
  const [all_patients_info, set_all_patients_info] = useState([]);

  // saving response from the backend regarding if personalChair was given or not
  const [backendResponse, setBackendResponse] = useState(undefined);

  // State for chair types and selected chair properties
  const [chairData, setChairData] = useState({});

  // Function to fetch and set all patient info data from the backend
  const getPatientInfo = async () => {
    try {
      const ALLPATIENTSINFO = await fetchPatientInfo("all");
      set_all_patients_info((prev) => ALLPATIENTSINFO);
    } catch (error) {
      console.error("Failed to patient info:", error);
    }
  };

  // Function to fetch and set chair data from the backend
  const getChairs = async () => {
    try {
      const ALLCHAIRS = await fetchAllChairs();
      const { standardChairs, bariatricChairs, tiltInSpaceChairs } = ALLCHAIRS;

      setChairData({
        [STANDARD]: standardChairs,
        [BARIATRIC]: bariatricChairs,
        [TILTING]: tiltInSpaceChairs,
      });
    } catch (error) {
      console.error("Failed to fetch chairs:", error);
    }
  };

  // useEffect for demo purpose-- open to show
  useEffect(() => {
    set_all_patients_info((prev) => [...DummyDataPatientInfo]);
  }, [DummyDataPatientInfo]);

  const processPatientSearch = (data) => {
    // Reset formTwo to its default values before processing new data
    formTwo.reset(formTwoDefaultValues);

    const { firstName, lastName } = data;
    console.log({ data });

    // Create a lower case full name after trimming spaces
    const fullName = `${firstName.trim()} ${lastName.trim()}`.toLowerCase();

    // Filter patient information based on full name
    const filteredPatients = DummyDataPatientInfo.filter(
      (e) => e.fullName.toLowerCase() === fullName,
    );

    // Check the results and update patient info accordingly
    const patientOfInterest =
      filteredPatients.length > 0 ? filteredPatients : [{}];

    // Update the state with the found patients or the fallback value
    set_all_patients_info(() => patientOfInterest);

    console.log(patientOfInterest);
  };
  // Temporary fix for setting chair data
  const { standardChairs, bariatricChairs, tiltInSpaceChairs } = chairs;
  useEffect(() => {
    setChairData({
      [STANDARD]: standardChairs,
      [BARIATRIC]: bariatricChairs,
      [TILTING]: tiltInSpaceChairs,
    });
  }, []);

  // Uncomment to fetch chairs from the backend
  // useEffect(() => {
  //   getChairs();
  // }, []);
  const onSubmit = async (formData) => {
    const patientInfo = DummyDataPatientInfo.find(
      (entry) => formData.chairId === entry.currentChair,
    );
    const updatedData = {
      ...formData,
      chairId: patientInfo.ChairId,
    };
    console.log({ updatedData });
    try {
      // Simulated API call
      const prom = new Promise((resolve) => {
        setTimeout(() => resolve("Chair has been returned"), 1000);
      });
      const update = await prom;

      // Updating UI with the response
      console.log(update);
      setBackendResponse((prev) => [update]);
      /*
    const update =await assignPersonalChair(updatedData)
    setBackendResponse(prev=>[...update]):
    
    */
      //for now we will use data as an but know that you will need to change the argument to 'update'
      if (formData) {
        toast({
          title: "You submitted the following values:",
          description: `${Object.values(updatedData)}`,
        });
      }
    } catch (error) {
      // setBackendResponse((prev) => [
      //   `"Error assigning chair:", ${error.message}`,
      // ]);
      console.error(error);
    }
  };
  return (
    <section className="h-full grow bg-[#eeebeb]">
      <main className="h-full w-full grow  px-2 py-2 text-black">
        <div className="grid h-full w-full max-w-[2080px] grid-cols-6  ">
          <section className="col-span-4 mr-1 flex h-full flex-col items-stretch border-r border-black">
            <div className="mb-3  text-center">
              <h3 className="inline-block w-[40%] whitespace-nowrap rounded-lg border border-gray-400 bg-[#b8dbd9] py-2 text-center font-bold">
                Return Hostpial WheelChair
              </h3>
            </div>
            <div className="flex grow">
              <section className=" flex h-full w-[80%] flex-col justify-evenly border border-black ">
                <section className="flex h-[85%] w-full flex-col justify-around  px-2">
                  {/* searching patients name*/}
                  <section className="w-full grow">
                    <Form {...formOne} className=" h-full w-full ">
                      <form
                        className="flex h-full w-full flex-col justify-evenly  pt-0"
                        onSubmit={formOne.handleSubmit(processPatientSearch)}
                      >
                        <div className="flex items-center justify-start">
                          <h3 className="border-b-2 border-[#6f79e7] pb-1 text-xl font-semibold text-[#6f79e7]">
                            Find Patient
                          </h3>
                        </div>
                        <div className=" flex h-12  max-w-full items-center justify-evenly gap-x-5  ">
                          {/* we need to add some inputs and to do that we need to add use formField */}
                          <FormField
                            name="firstName"
                            control={formOne.control}
                            render={({ field }) => (
                              // formItem is using react context under the hood, anytime error message comes up the FormMessage component will display it under the hood
                              <FormItem className="s flex h-full max-w-[50%] grow items-center  rounded-lg  ">
                                <FormControl>
                                  <Input
                                    {...field}
                                    id="firstName"
                                    className="h-full  w-full text-center "
                                    placeholder="first Name"
                                  />
                                </FormControl>
                                <FormMessage className="pl-1" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            name="lastName"
                            control={formOne.control}
                            render={({ field }) => (
                              // formItem is using react context under the hood, anytime error message comes up the FormMessage component will display it under the hood
                              <FormItem className="flex h-full max-w-[50%] grow  items-center rounded-lg">
                                <FormControl>
                                  <Input
                                    {...field}
                                    id="lastName"
                                    className="h-full  w-full text-center "
                                    placeholder="last Name"
                                  />
                                </FormControl>
                                <FormMessage className="pl-1" />
                              </FormItem>
                            )}
                          />
                          <div className=" flex h-full max-w-md grow justify-around rounded-lg border-2 border-black bg-green-600">
                            <Button className="h-full w-full " type="submit">
                              Search
                            </Button>
                          </div>
                        </div>
                      </form>
                    </Form>
                  </section>
                  <section className="flex h-4/5 w-4/5 flex-col ">
                    <section className="w-full grow">
                      <section className="flex h-full w-full flex-col justify-evenly">
                        <div className=" flex items-center justify-start">
                          <h3 className=" border-b-2 border-[#6f79e7] pb-1 text-xl font-semibold  text-[#6f79e7]">
                            Patients Found
                          </h3>
                        </div>
                        <ScrollArea className="h-12 w-full whitespace-nowrap">
                          {/* pre-cursor to selecting final patients */}
                          <div className=" flex w-full items-center justify-start  gap-x-2 ">
                            {all_patients_info.map((e, i) => {
                              //utilizing optional chaining instead of nullish coalescing operator
                              return e?.fullName ? (
                                <div className="h-full" key={e["ChairId"]}>
                                  <button
                                    className="h-9 w-full rounded-md border-2 border-black bg-[#b4c5e4] px-10 transition duration-300 ease-in hover:scale-105 hover:bg-[#3a515c] hover:font-bold hover:text-[#c3cbd2] hover:shadow-lg"
                                    onClick={() => {
                                      // Destructure fullName into firstName and lastName
                                      const [firstName, lastName] =
                                        e.fullName.split(" ");

                                      // Create a map of field names to values
                                      const fieldMap = {
                                        firstName: firstName,
                                        lastName: lastName,
                                        roomId: e.roomId,
                                        chairId: e.currentChair,
                                        returnedChair: e.currentChair,
                                      };

                                      // Set each value in formTwo based on the fieldMap
                                      Object.entries(fieldMap).forEach(
                                        ([key, value]) => {
                                          formTwo.setValue(key, value);
                                        },
                                      );
                                    }}
                                  >
                                    {e?.fullName}
                                  </button>
                                </div>
                              ) : (
                                <span key={1}> no patient was found</span>
                              );
                            })}
                          </div>
                          <ScrollBar
                            orientation="horizontal"
                            className="bg-[#bac6db]"
                          />
                        </ScrollArea>
                      </section>
                    </section>
                    <section className=" h-3/4">
                      <Form {...formTwo} className="h-full w-full">
                        <AlertDialog>
                          <form
                            className="flex h-full w-full flex-col space-y-1"
                            onSubmit={formTwo.handleSubmit(onSubmit)}
                            id="test"
                          >
                            <div className="flex h-[55%] w-full flex-col justify-evenly">
                              <FormField
                                name="chairId"
                                control={formTwo.control}
                                render={({ field }) => (
                                  // formItem is using react context under the hood, anytime error message comes up the FormMessage component will display it under the hood
                                  <FormItem className="s flex w-full items-center justify-between rounded-lg ">
                                    <FormLabel className=" flex text-center text-lg font-bold">
                                      Tag ID
                                    </FormLabel>
                                    <FormControl className="">
                                      <Input
                                        {...field}
                                        id="chairId"
                                        className="  max-w-[75%] grow border-2  border-gray-500"
                                        placeholder="Patient's assinged chair"
                                        disabled={true}
                                      />
                                    </FormControl>
                                    <FormMessage className="pl-1" />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                name="firstName"
                                control={formTwo.control}
                                render={({ field }) => (
                                  // formItem is using react context under the hood, anytime error message comes up the FormMessage component will display it under the hood
                                  <FormItem className="s flex w-full items-center justify-between rounded-lg ">
                                    <FormLabel className=" flex text-center text-lg font-bold">
                                      FirstName
                                    </FormLabel>
                                    <FormControl className="">
                                      <Input
                                        {...field}
                                        id="chairId"
                                        className="  max-w-[75%] grow border-2  border-gray-500"
                                        placeholder="Patient's  first Name"
                                        disabled={true}
                                      />
                                    </FormControl>
                                    <FormMessage className="pl-1" />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                name="lastName"
                                control={formTwo.control}
                                render={({ field }) => (
                                  // formItem is using react context under the hood, anytime error message comes up the FormMessage component will display it under the hood
                                  <FormItem className="s flex w-full items-center justify-between rounded-lg ">
                                    <FormLabel className=" flex text-center text-lg font-bold">
                                      LastName
                                    </FormLabel>
                                    <FormControl className="">
                                      <Input
                                        {...field}
                                        id="lastName"
                                        className="  max-w-[75%] grow border-2  border-gray-500"
                                        placeholder="Patient's last Name"
                                        disabled={true}
                                      />
                                    </FormControl>
                                    <FormMessage className="pl-1" />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                name="roomId"
                                control={formTwo.control}
                                render={({ field }) => (
                                  // formItem is using react context under the hood, anytime error message comes up the FormMessage component will display it under the hood
                                  <FormItem className="s flex w-full items-center justify-between rounded-lg ">
                                    <FormLabel className=" flex text-center text-lg font-bold">
                                      Room
                                    </FormLabel>
                                    <FormControl className="">
                                      <Input
                                        {...field}
                                        id="roomId"
                                        className="  max-w-[75%] grow border-2  border-gray-500"
                                        placeholder="Current Room"
                                        disabled={true}
                                      />
                                    </FormControl>
                                    <FormMessage className="pl-1" />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <section className=" flex w-full grow items-center space-x-2 ">
                              <div className=" flex items-center justify-start  border-black">
                                <h5 className=" border-b-2 border-[#6f79e7] pb-1 text-lg font-semibold  text-[#6f79e7]">
                                  Confirm Chair Return
                                </h5>
                              </div>
                              <div className=" grow ">
                                <FormField
                                  name="returnedChair"
                                  id="returnedChair"
                                  control={formTwo.control}
                                  render={({ field }) => (
                                    // formItem is using react context under the hood, anytime error message comes up the FormMessage component will display it under the hood
                                    <FormItem className="s flex w-full items-center justify-between rounded-lg border border-black ">
                                      <FormControl>
                                        <Input
                                          {...field}
                                          id="firstName"
                                          className="h-full  w-full text-center "
                                          placeholder="Current Chair"
                                          disabled={true}
                                        />
                                      </FormControl>
                                      <FormMessage className="pl-1" />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="ml-auto  ">
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button>Submit</Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you absolutely sure?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action assign the patient a
                                        personal chair once you submit.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction asChild>
                                        <Button type="submit" form="test">
                                          Submit
                                        </Button>
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </section>
                          </form>
                        </AlertDialog>
                      </Form>
                    </section>
                  </section>
                </section>
                <section className="  flex w-full flex-col items-stretch gap-y-1 px-2 2xl:grow 2xl:gap-y-5">
                  <div>
                    <h5 className="inline-block border-b-2 border-[#6f79e7] text-xl font-semibold text-[#6f79e7]">
                      Feedback
                    </h5>
                  </div>
                  <div className=" max-w-lg border border-blue-400 px-10 py-3 2xl:py-10 ">
                    {backendResponse?.map((e, i) => (
                      <span className="text-lg font-bold italic" key={i}>
                        {e}
                      </span>
                    )) ?? <span>nothing to display</span>}
                  </div>
                </section>
              </section>
            </div>
          </section>
          <aside className="col-span-2 h-full overflow-hidden ">
            <section className="  h-full w-full  ">
              <ChairLayout chairData={chairData} />
            </section>
          </aside>
        </div>
      </main>
    </section>
  );
}

export default RoomChange;
/**
 * i need to update somethinh
    this will be  post reques
      what an i updating
      Patient schema? or chairCollection 
        Front end tells me 
          chaidID
          Room Number
          Patient Name
        Backend stroage
            patient collection 
              chairID
              RoomID
            chairCollecion
              status{
                available:
                roomID:null ||ObjectId('roomID')
              }
      The only potential link is the objectID for the patient
              when returned
                update the status in the patient collection to null and update the chairData to null
                query database find me chair collecion with this ObjectID and patientID then go from there
                
 */
