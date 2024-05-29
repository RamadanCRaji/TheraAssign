/*
Today i struggled with understanding how optional chaining works but along the way about this symbol
i also learned that you cannot use optional chaining when it comes to becuase

*/

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
// Self-built modules
import WheelChairChartComponent from "@/components/dashboard/dash-board-panels/WheelChairChart";
import RoomChartComponent from "@/components/dashboard/dash-board-panels/RoomChart";
import { fetchPatientInfo } from "@/src/services/GetData/FetchPatientsInfo";
import { DummyDataPatientInfo } from "@/data/patientData/PatientInfo";
import { boolean } from "zod";
import { assignPersonalChair } from "@/src/services/PostData/PostPersonalWC";

// Patient Search  schema for validation
const FormOneSchema = z.object({
  firstName: z.string().min(3, "required"),
  lastName: z.string().min(3, "required"),
});

//final submission schema
const FormTwoSchema = z.object({
  chairId: z.string().min(3, { message: "Select chair" }),
  firstName: z.string().min(3, { message: "First name needed" }),
  lastName: z.string().min(3, { message: "Last name needed" }),
  roomId: z.string().min(3, { message: "Assign room" }),
  personalChair: z.boolean().refine((val) => val === true || val === false, {
    message: "You must select a choice",
  }),
});

function personalChairAssignment() {
  // Form setup
  const formOne = useForm({
    resolver: zodResolver(FormOneSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  const formTwo = useForm({
    resolver: zodResolver(FormTwoSchema),
    defaultValues: {
      chairId: "",
      firstName: "",
      lastName: "",
      roomId: "",
      personalChair: undefined,
    },
  });

  //State to store all patient information that was retrieved from the backend
  const [all_patients_info, set_all_patients_info] = useState([]);

  // saving response from the backend regarding if personalChair was given or not
  const [backendResponse, setBackendResponse] = useState(undefined);

  // Function to fetch and set chair data from the backend
  const getPatientInfo = async () => {
    try {
      const ALLPATIENTSINFO = await fetchPatientInfo("all");
      set_all_patients_info((prev) => ALLPATIENTSINFO);

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

  // Uncomment to fetch chairs from the backend
  // useEffect(() => {
  //   alert("i was triggered again");
  // }, []);
  const processPatientSearch = (data) => {
    ["firstName", "lastName", "roomId", "chairId"].forEach((e) =>
      formTwo.resetField(e),
    );
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

  const onSubmit = async (data) => {
    console.log({ data });
    try {
      /*
    const update =await assignPersonalChair(data)
    setBackendResponse(prev=>[...update]):
    
    */
      //for now we will use data as an but know that you will need to change the argument to 'update'
      if (data) {
        toast({
          title: "You submitted the following values:",
          description: `${Object.values(data)}`,
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
              <h3 className="inline-block w-[45%] whitespace-nowrap rounded-lg border border-gray-400 bg-[#b8dbd9] py-2 text-center font-bold">
                Personal WheelChair Assignment
              </h3>
            </div>
            <div className="flex grow">
              <section className=" flex h-full  w-4/5 flex-col justify-evenly border border-black ">
                <section className="flex h-[85%] w-full flex-col justify-around   px-2">
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
                    {/* create buttons using arr.map */}
                    <section className="grow">
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
                                      formTwo.setValue(
                                        "firstName",
                                        e.fullName.split(" ")[0],
                                      );

                                      formTwo.setValue(
                                        "lastName",
                                        e.fullName.split(" ")[1],
                                      );

                                      formTwo.setValue(
                                        "roomId",
                                        String(e.roomId),
                                      );

                                      formTwo.setValue(
                                        "chairId",
                                        e.currentChair,
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
                    <section className=" h-3/4 ">
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
                            <section className=" flex w-full grow flex-col justify-evenly 2xl:pb-5">
                              <div className=" flex items-center justify-start">
                                <h5 className=" border-b-2 border-[#6f79e7] pb-1 text-xl font-semibold  text-[#6f79e7]">
                                  Assign Personal WheelChair
                                </h5>
                              </div>
                              <div className=" mb-1  w-full ">
                                <FormField
                                  name="personalChair"
                                  control={formTwo.control}
                                  render={({ field }) => (
                                    // formItem is using react context under the hood, anytime error message comes up the FormMessage component will display it under the hood
                                    <FormItem className=" flex  h-full w-full items-center justify-between rounded-lg  ">
                                      <FormControl>
                                        <RadioGroup
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                          className="flex h-full w-full flex-col space-y-1 "
                                        >
                                          <FormItem className='className="flex items-center space-x-3 space-y-0'>
                                            <FormControl>
                                              <RadioGroupItem value={true} />
                                            </FormControl>
                                            <FormLabel>
                                              Keep current chair and add a
                                              personal chair
                                            </FormLabel>
                                          </FormItem>
                                          <FormItem className='className="flex items-center space-x-3 space-y-0 '>
                                            <FormControl>
                                              <RadioGroupItem value={false} />
                                            </FormControl>
                                            <FormLabel>
                                              Only keep the personal chair
                                            </FormLabel>
                                          </FormItem>
                                        </RadioGroup>
                                      </FormControl>
                                      <FormMessage className="pl-1" />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="flex w-full ">
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
            <section className="  flex h-full w-full flex-col  border border-black">
              <div className="  shrink-1 flex h-1/2 w-full  flex-col pt-3">
                <div className=" border text-center">
                  <h5 className=" inline-block w-[80%] rounded-lg border bg-slate-500 px-2 py-2 text-white">
                    Occupied Room : Available Room
                  </h5>
                </div>
                <div className=" h-full w-full ">
                  <RoomChartComponent />
                </div>
              </div>
              <div className=" shrink-1 flex h-1/2 w-full flex-col ">
                <div className="  text-center">
                  <h5 className=" inline-block w-[80%] rounded-lg border  bg-slate-500 px-2 py-2 text-white">
                    W.C in Use : Available W.C
                  </h5>
                </div>
                <div className=" h-full w-full ">
                  <WheelChairChartComponent />
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </section>
  );
}

export default personalChairAssignment;

{
  /* 
                  i need to fix the way i fetch data with regard to chair and room
                  ensure there i one fetch request for all 
                  use the on source of data and destructure then assign it to a state variable called stats
                  i need to learn how to destructure objects and arrays
                  note you will need to pass a stats prop into to accurately display data */
}
{
  /*
hit my server only twice when the page loades to get the name of the patients in the hospital 
  - first when the page loads up to fetch all the patients in the hospital 
  - second time is when i finally want to submit the data to the backend 
* onLoad, hit the server to get all the names of patience in the  hospital 
  serching for the patients
    - create two input fields with two controled fields
    create button next to them and onClick we will query our object with names of the two submitted people 
    this will return the values found 
  population the values of the form field
    - when we click on the names, the field values of the field will change with the patients respective data such as Current Chair, Patient Name, Room 

Box 1
  two serch boxes that keep track of the first and last names
  onClick (call an onsubmit) handler that queries the object returned the backend
    - place those searches in a form tag
    - prevent this first form from rerendering the whole page
    - create a schema for validation 
    - create a way of maping through the object returned by the patient and then showing it to box 2
      * create a fetch request to the backend build it in the utils file for fetching data
      * create a state variable to hold such data
      * do an optional chaining on this information first then go from there
Box 2
  this box is in charge of finding patients based on the
 */
}
