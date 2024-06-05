"use client";

// React and form handling
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// UI components from shacdcn
import { toast } from "@/app/components/ui/use-toast";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { ScrollArea, ScrollBar } from "@/app/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectValue,
  SelectLabel,
} from "@/app/components/ui/select";
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
} from "@/app/components/ui/alert-dialog";

// Self-built modules
import { fetchPatientInfo } from "@/src/services/GetData/FetchPatientsInfo";
import { DummyDataPatientInfo } from "@/data/patientData/PatientInfo";
import { boolean } from "zod";
import FloorPanel from "@/app/components/dashboard/dash-board-panels/FloorPanelCopy";
import { eastSide } from "@/data/roomData/firstFloor";
import { swapPatientData } from "@/lib/utils/patientUtils.js";

// Patient Search schema for validation
const FormOneSchema = z.object({
  patient1: z.string().min(3, "required"),
  patient2: z.string().min(3, "required"),
});

// Final submission schema
const FormTwoSchema = z.object({
  patient1_currentChair: z.string().min(3, { message: "Select chair" }),
  patient1_firstName: z.string().min(3, { message: "First name needed" }),
  patient1_roomId: z.number().min(1, { message: "Assign room" }),
  patient1_lastName: z.string().min(3, { message: "Last name needed" }),

  patient2_currentChair: z.string().min(3, { message: "Select chair" }),
  patient2_firstName: z.string().min(3, { message: "First name needed" }),
  patient2_roomId: z.number().min(1, { message: "Assign room" }),
  patient2_lastName: z.string().min(3, { message: "Last name needed" }),
});

const formOneDefaultValues = {
  patient1: "",
  patient2: "",
};

const formTwoDefaultValues = {
  patient1_currentChair: "",
  patient1_firstName: "",
  patient1_lastName: "",
  patient1_roomId: "",

  patient2_currentChair: "",
  patient2_firstName: "",
  patient2_lastName: "",
  patient2_roomId: "undefined",
};

function SwapPatientRooms() {
  // Form setup
  const formOne = useForm({
    resolver: zodResolver(FormOneSchema),
    defaultValues: formOneDefaultValues,
  });
  const formTwo = useForm({
    resolver: zodResolver(FormTwoSchema),
    defaultValues: formTwoDefaultValues,
  });

  // State to store all patient information that was retrieved from the backend
  const [allPatientsInfo, setAllPatientsInfo] = useState([]);

  // Saving response from the backend regarding if personalChair was given or not
  const [backendResponse, setBackendResponse] = useState(undefined);

  // Function to fetch and set all patient info data from the backend
  const getPatientInfo = async () => {
    try {
      const ALLPATIENTSINFO = await fetchPatientInfo("all");
      setAllPatientsInfo(ALLPATIENTSINFO);
    } catch (error) {
      console.error("Failed to fetch patient info:", error);
    }
  };

  // useEffect for demo purpose-- open to show
  useEffect(() => {
    setAllPatientsInfo([...DummyDataPatientInfo]);
  }, []);

  const processPatientSwap = (data) => {
    const { patient1, patient2 } = data;

    // Handling the case where the same patient is selected
    if (patient1 === patient2) return;

    // Swapped patientData
    const swappedData = swapPatientData(data, DummyDataPatientInfo);

    // Set the values in the form
    Object.entries(swappedData).forEach(([key, value]) => {
      formTwo.setValue(key, value);
    });
  };

  const onSubmit = async (formdata) => {
    console.log({ formdata });
    try {
      const prom = new Promise((resolve) => {
        setTimeout(() => {
          resolve("patient room has been updated");
        }, 1000);
      });
      const update = await prom;
      console.log(update);
      setBackendResponse([`${update}`]);
      /*
      const update = await assignPersonalChair(data)
      setBackendResponse([...update]);
      */
      if (formdata) {
        toast({
          title: "You submitted the following values:",
          description: `${Object.values(formdata)}`,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="h-full grow bg-[#eeebeb]">
      <main className="h-full w-full grow px-2 py-2 text-black">
        <div className="grid h-full w-full max-w-[2080px] grid-cols-6">
          <section className="col-span-4 mr-1 flex h-full flex-col items-stretch border-black pt-2 lg:border 2xl:border-0 2xl:border-r">
            <div className="mb-3 text-center">
              <h3 className="inline-block w-[20%] whitespace-nowrap rounded-lg border border-gray-400 bg-[#b8dbd9] py-2 text-center font-bold">
                Swap Patient Rooms
              </h3>
            </div>
            <div className="flex grow">
              <section className="flex h-full w-full flex-col justify-evenly border-black 2xl:w-[80%] 2xl:border 2xl:pb-1">
                <section className="flex h-[85%] w-full flex-col justify-around px-2 2xl:h-4/5">
                  {/* Section for finding which patient to swap */}
                  <section className="w-full grow">
                    <Form {...formOne} className="h-full w-full">
                      <form
                        className="flex h-full w-full flex-col justify-evenly pt-0"
                        onSubmit={formOne.handleSubmit(processPatientSwap)}
                      >
                        <div className="flex items-center justify-start">
                          <h3 className="border-b-2 border-[#6f79e7] pb-1 text-xl font-semibold text-[#6f79e7]">
                            Find Patient
                          </h3>
                        </div>
                        <div className="flex max-h-12 max-w-full grow items-center justify-evenly gap-x-5">
                          {/* Selecting patients to swap */}
                          <FormField
                            name="patient1"
                            control={formOne.control}
                            render={({ field }) => (
                              <FormItem className="flex h-full max-w-[50%] grow rounded-lg">
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-full grow border-2 border-gray-500 text-start">
                                      <SelectValue placeholder="Select Patient 1" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="w-full">
                                    <SelectGroup>
                                      <SelectLabel>Patients</SelectLabel>
                                      {DummyDataPatientInfo.map((e, i) => (
                                        <SelectItem
                                          value={e.fullName}
                                          key={i}
                                          className="w-full"
                                        >
                                          {e.fullName}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                <FormMessage className="pl-1" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            name="patient2"
                            control={formOne.control}
                            render={({ field }) => (
                              <FormItem className="flex h-full max-w-[50%] grow rounded-lg">
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-full grow border-2 border-gray-500">
                                      <SelectValue placeholder="Select Patient 2" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="w-full">
                                    <SelectGroup>
                                      <SelectLabel>Patients</SelectLabel>
                                      {DummyDataPatientInfo.map((e, i) => (
                                        <SelectItem
                                          value={e.fullName}
                                          key={i}
                                          className="w-full"
                                        >
                                          {e.fullName}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                <FormMessage className="pl-1" />
                              </FormItem>
                            )}
                          />
                          <div className="flex h-full max-w-48 grow justify-around rounded-lg border-2 border-black">
                            <Button className="h-full w-full" type="submit">
                              Swap
                            </Button>
                          </div>
                        </div>
                      </form>
                    </Form>
                  </section>
                  <section className="flex w-full grow flex-col 2xl:h-4/5">
                    {/* Card comparison section */}
                    <section className="h-full w-full 2xl:h-4/5">
                      <section className="flex h-full w-full flex-col justify-evenly">
                        <Form {...formTwo}>
                          <AlertDialog>
                            <form
                              className="flex h-full w-full flex-col justify-between"
                              onSubmit={formTwo.handleSubmit(onSubmit)}
                              id="test"
                            >
                              <div className="flex w-full grow items-stretch ">
                                {/* Left side card */}
                                <div className="flex w-1/2 grow flex-col justify-center space-y-2">
                                  <div className="text-center">
                                    <h3 className="inline-block whitespace-nowrap rounded-lg border border-gray-400 bg-[#b8dbd9] px-3 py-2 text-center font-bold">
                                      Patient 1
                                    </h3>
                                  </div>
                                  <section className="flex w-full items-start justify-center">
                                    <div className="flex w-5/6 flex-col rounded-xl border-2 border-gray-500 p-2">
                                      <FormField
                                        name="patient1_currentChair"
                                        control={formTwo.control}
                                        render={({ field }) => (
                                          <FormItem className="w-full rounded-lg text-center">
                                            <FormLabel className="text-center text-lg font-bold">
                                              Tag ID
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                {...field}
                                                id="patient1_currentChair"
                                                className="w-full grow border-2 border-gray-500 bg-transparent"
                                                placeholder="Patient's assigned chair"
                                                disabled
                                              />
                                            </FormControl>
                                            <FormMessage className="pl-1" />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        name="patient1_firstName"
                                        control={formTwo.control}
                                        render={({ field }) => (
                                          <FormItem className="w-full rounded-lg text-center">
                                            <FormLabel className="text-lg font-bold">
                                              First Name
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                {...field}
                                                id="patient1_firstName"
                                                className="w-full grow border-2 border-gray-500"
                                                placeholder="Patient's first name"
                                                disabled
                                              />
                                            </FormControl>
                                            <FormMessage className="pl-1" />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        name="patient1_lastName"
                                        control={formTwo.control}
                                        render={({ field }) => (
                                          <FormItem className="w-full rounded-lg text-center">
                                            <FormLabel className="text-lg font-bold">
                                              Last Name
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                {...field}
                                                id="patient1_lastName"
                                                className="w-full grow border-2 border-gray-500"
                                                placeholder="Patient's last name"
                                                disabled
                                              />
                                            </FormControl>
                                            <FormMessage className="pl-1" />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        name="patient1_roomId"
                                        control={formTwo.control}
                                        render={({ field }) => (
                                          <FormItem className="w-full rounded-lg text-center">
                                            <FormLabel className="text-lg font-bold">
                                              Room
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                {...field}
                                                id="patient1_roomId"
                                                className="w-full grow border-2 border-gray-500"
                                                placeholder="Current room"
                                                disabled
                                              />
                                            </FormControl>
                                            <FormMessage className="pl-1" />
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                  </section>
                                </div>
                                {/* Right side card */}
                                <div className="flex w-1/2 grow flex-col justify-center space-y-2 ">
                                  <div className="text-center">
                                    <h3 className="inline-block whitespace-nowrap rounded-lg border border-gray-400 bg-[#b8dbd9] px-3 py-2 text-center font-bold">
                                      Patient 2
                                    </h3>
                                  </div>
                                  <section className="flex w-full items-start justify-center">
                                    <div className="flex w-5/6 flex-col rounded-xl border-2 border-gray-500 p-2  ">
                                      <FormField
                                        name="patient2_currentChair"
                                        control={formTwo.control}
                                        render={({ field }) => (
                                          <FormItem className="w-full rounded-lg text-center">
                                            <FormLabel className="text-center text-lg font-bold">
                                              Tag ID
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                {...field}
                                                id="patient2_currentChair"
                                                className="w-full grow border-2 border-gray-500"
                                                placeholder="Patient's assigned chair"
                                                disabled
                                              />
                                            </FormControl>
                                            <FormMessage className="pl-1" />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        name="patient2_firstName"
                                        control={formTwo.control}
                                        render={({ field }) => (
                                          <FormItem className="w-full rounded-lg text-center">
                                            <FormLabel className="text-lg font-bold">
                                              First Name
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                {...field}
                                                id="patient2_firstName"
                                                className="w-full grow border-2 border-gray-500"
                                                placeholder="Patient's first name"
                                                disabled
                                              />
                                            </FormControl>
                                            <FormMessage className="pl-1" />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        name="patient2_lastName"
                                        control={formTwo.control}
                                        render={({ field }) => (
                                          <FormItem className="w-full rounded-lg text-center">
                                            <FormLabel className="text-lg font-bold">
                                              Last Name
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                {...field}
                                                id="patient2_lastName"
                                                className="w-full grow border-2 border-gray-500"
                                                placeholder="Patient's last name"
                                                disabled
                                              />
                                            </FormControl>
                                            <FormMessage className="pl-1" />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        name="patient2_roomId"
                                        control={formTwo.control}
                                        render={({ field }) => (
                                          <FormItem className="w-full rounded-lg text-center">
                                            <FormLabel className="text-lg font-bold">
                                              Room
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                {...field}
                                                id="patient2_roomId"
                                                className="w-full grow border-2 border-gray-500"
                                                placeholder="Current room"
                                                disabled
                                              />
                                            </FormControl>
                                            <FormMessage className="pl-1" />
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                  </section>
                                </div>
                              </div>
                              <section className="flex w-full flex-col justify-evenly 2xl:pb-5">
                                <div className="flex w-full justify-center">
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button className="px-20 py-5">
                                        Submit
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          Are you absolutely sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This action will assign the patient a
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
                </section>
                {/* FEEDBACK SECTION */}
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
          <aside className="col-span-2 h-full overflow-hidden">
            <section className="h-full w-full flex-col border border-black">
              <section className="h-full w-full">
                <FloorPanel layoutPlan="vertical" />
              </section>
            </section>
          </aside>
        </div>
      </main>
    </section>
  );
}

export default SwapPatientRooms;

/**
 some glaring issues that i picked that needs to be addressed in the future
  - There needs to be a way to ensure that there is no two patients of the same that show up when we use arra.filter to find patient 1 or patient 2
  - Also there inconsistences in the way i am using chairId, sometimes i use chairId in placed of the actual chair names and instread of the current chairNames.
    - so i need to ensure to change this to currentChair so that i can send the data to the backend as chairId
    - it is either i do that or i just create another category called id and this category will be  of object.Id from mongoDB and will serve as unique identifier to all patients and chairs
  - not the best formart for creating the width line 371 patient2 card
 */

/*
  i need to create a utility function 

  fucntion 2 --- swapping function
    Return: patienteData swapped 
    Parameters --> formData and AllpatientsData
    Action 1
      destructre patent1 and patient 2 from formData
    Action 2
      invoke function to find patientData of interste
        parameters ---> patient2 || patien2
        return ---> an array of object
      creates variables called updatedPatient1Data and upDatedPatient2Data
      function 1 -- get updated  patient Data 
    Action 2 
      invoke a function that perfoms the responsiblity of creating a fieldmap object for the new patien that was created 
        parameters ---> updatedPatient1Data and prefixname
        Actions ---> descturcure fullName,roomId and currentChair, firtName and lastName from fullName
        returns an object with the new fieldmap objects
          Actions ---> perfoms a search with on whole patientObject to create an updated patientData
          Returns ---> 
      parameters----> updatedPatient1Data and updatedPatient2Data
      Actions ---> destructure parameters from updatedPatient1Data and updatedPatient2Data, renames them and creates tow new objects
      returns: objects called field_map_for_new_patient1 and field_map_for_new_patient2
  base data
    object commonalities
      '${patentitOfInterest}':firstName, 
       

*/
