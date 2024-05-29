/**
 *
 * this page is about admitting patients into the hospital
 * while physicians and therpist are admiting patient,they will be able to see the chairs that are also availble for a patient
 *
 * Area of improvement
 *  -find a clearner way to manage my states here
 */

"use client";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { fetchAvailableChairs } from "@/src/services/FetchHospitalChairs";

const STANDARD = "STANDARD";
const BARIATRIC = "BARIATRIC";
const TILTING = "TILTING";

const CHAIR_TYPES = [
  {
    type: STANDARD,
    tab_title: "SD",
  },
  {
    type: BARIATRIC,
    tab_title: "BD",
  },
  {
    type: TILTING,
    tab_title: "TS",
  },
];

function Admit() {
  /**
   idealy wht i want is
   const room =useShowRoomOfInterst
   */
  //States for different types of chairs
  // TODO: have a single Map from chair-type => chairs
  //   const [standardChairs, setStandardChairs] = useState([]);
  //   const [bariatricChairs, setBariatricChairs] = useState([]);
  //   const [tiltInSpaceChairs, setTiltInSpaceChairs] = useState([]);

  const [chairData, setChairData] = useState({});

  //showing chairs of interest
  const [currentChairType, setCurrentChairType] = useState(STANDARD);

  // to display data, no if statements needed, just do:
  //    chairData[currentChairType]

  // Fetch and set chair states from the backend
  const getChairs = async () => {
    try {
      // Call the utility function to fetch available chairs from the backend
      const availableChairs = await fetchAvailableChairs();

      // Destructure the available chairs into specific types
      const [standard, bariatric, tiltInSpace] = availableChairs;

      setChairData((prev) => ({
        [STANDARD]: standard,
        [BARIATRIC]: bariatric,
        [TILTING]: tiltInSpace,
      }));
    } catch (error) {
      console.error("Failed to fetch chairs:", error);
      // Handle error (e.g., set error state, show notification, etc.)
    }
  };

  useEffect(() => {
    getChairs();
  }, []);

  return (
    <section className="h-full grow bg-[#eeebeb]">
      <main className="h-full w-full grow  text-black">
        <div className="grid h-full w-full max-w-[2080px] grid-cols-6 p-1">
          <section className="col-span-4 border-4 p-2">
            <h1>left panel </h1>
          </section>
          <aside className="col-span-2 flex h-full flex-col  overflow-hidden px-2 pb-3 pt-2">
            <div className="mb-3 text-center">
              <h3 className="inline-block rounded-lg border border-gray-400 bg-[#b8dbd9] px-7 py-2 font-bold">
                Available Chairs In Hospital
              </h3>
            </div>
            <div className="mb-2 flex w-full justify-around ">
              <div className="flex  grow justify-between 2xl:max-w-[600px]">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-[#f0e860]"
                  onClick={() => setCurrentChairType(STANDARD)}
                >
                  SD
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-[#b4c5e4]"
                  onClick={() => setCurrentChairType(BARIATRIC)}
                >
                  BR
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-[#b4c5e4]"
                  onClick={() => setCurrentChairType(TILTING)}
                >
                  TS
                </Button>
              </div>
            </div>
            <div className="border-3  flex h-full  grow justify-evenly  border border-gray-500">
              <div
                className="  h-full grow overflow-y-auto 2xl:max-w-[600px]"
                style={{ scrollbarGutter: "stable" }}
              >
                {showStandardChairs && (
                  <div className="flex grow flex-wrap  content-start items-start whitespace-nowrap pt-5 text-center">
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                  </div>
                )}
                {showBaritricChairs && (
                  <h1 className="bg-red-600">Bariatric Chairs</h1>
                )}
                {showTiltinSpaceChairs && (
                  <h1 className="bg-red-600">These are the tilt in spaces </h1>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </section>
  );
}

// export default Admit;

/**
 * To populate chair data in a 2-column grid with unlimited rows and overflow handling:
 * - Use a parent container div to hold the grid.
 * - Map through an array of chair objects and create a div for each chair with a solid border to simulate a data table.
 * - Use either CSS grid or flexbox with wrap to create a 2-column layout.
 * - Each chair should have a unique ID, preferably from a MongoDB database for consistency.
 */

/**
 * i can use a reducer but it stil makes the hook present in the same file as component and i do not want that
    i can also create a custom hook that takes in the name of items we are inrested in and then it returns something of interest aka
      i pass in the word showTiltinSpace then the custome hook will have a switch statement into it that returns (false, false, true)
 main function that affects things
   const showChairTypesOfInterest = (
    showStandardChairs,
    showBaritricChairs,
    showTiltinSpaceChairs,
  ) => {
    setShowStandardChairs(showStandardChairs);
    setShowBariatricChairs(showBaritricChairs);
    setShowTiltInSpaceChairs(showTiltinSpaceChairs);
  }
states that i am managing
  //showing chairs of interest
  const [showStandardChairs, setShowStandardChairs] = useState(true);
  const [showBaritricChairs, setShowBariatricChairs] = useState(false);
  const [showTiltinSpaceChairs, setShowTiltInSpaceChairs] = useState(false);
 
    i will like remove those states and just trigger one of eacth state and change the rest
 */

/**
 *
 * this page is about admitting patients into the hospital
 * while physicians and therpist are admiting patient,they will be able to see the chairs that are also availble for a patient
 *
 * Area of improvement
 *  -find a clearner way to manage my states here
 */

("use client");
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { fetchAvailableChairs } from "@/src/services/FetchHospitalChairs";

function Admit() {
  /**
   idealy wht i want is 
   const room =useShowRoomOfInterst
   */
  //States for different types of chairs
  const [standardChairs, setStandardChairs] = useState([]);
  const [bariatricChairs, setBariatricChairs] = useState([]);
  const [tiltInSpaceChairs, setTiltInSpaceChairs] = useState([]);

  //showing chairs of interest
  const [showStandardChairs, setShowStandardChairs] = useState(true);
  const [showBaritricChairs, setShowBariatricChairs] = useState(false);
  const [showTiltinSpaceChairs, setShowTiltInSpaceChairs] = useState(false);

  // Fetch and set chair states from the backend
  const getChairs = async () => {
    try {
      // Call the utility function to fetch available chairs from the backend
      const availableChairs = await fetchAvailableChairs();

      // Destructure the available chairs into specific types
      const [standard, bariatric, tiltInSpace] = availableChairs;
      setStandardChairs((prev) => [...standard]);
      setBariatricChairs((prev) => [...bariatric]);
      setTiltInSpaceChairs((prev) => [...tiltInSpace]);
    } catch (error) {
      console.error("Failed to fetch chairs:", error);
      // Handle error (e.g., set error state, show notification, etc.)
    }
  };

  useEffect(() => {
    getChairs();
  }, []);

  // Function to toggle visibility of chair types
  const showChairTypesOfInterest = (
    showStandardChairs,
    showBaritricChairs,
    showTiltinSpaceChairs,
  ) => {
    setShowStandardChairs(showStandardChairs);
    setShowBariatricChairs(showBaritricChairs);
    setShowTiltInSpaceChairs(showTiltinSpaceChairs);
  };
  /**
   const showStandardChairs = () => {
    if (!standardChairs) {
      setStandardChairs(true); // turn on SD
      setBariatricChairs(false); // turn off Bariatric chairs
      setTiltInSpaceChairs(false); // turn off tilt in space
    }
  };

  const showBaritricChairs = () => {
    if (!bariatricChairs) {
      setBariatricChairs(true);
      setStandardChairs(false); // turn off SD
      setTiltInSpaceChairs(false); // turn off tilt in space
    }
  };
  const showTiltinSpaceChairs = () => {
    if (!tiltInSpaceChairs) {
      setTiltInSpaceChairs(true); // turn on tilt in space
      setBariatricChairs(false); // turn off bariatric chairs
      setStandardChairs(false); // turn off SD
    }
  };
   */

  return (
    <section className="h-full grow bg-[#eeebeb]">
      <main className="h-full w-full grow  text-black">
        <div className="grid h-full w-full max-w-[2080px] grid-cols-6 p-1">
          <section className="col-span-4 border-4 p-2">
            <h1>left panel </h1>
          </section>
          <aside className="col-span-2 flex h-full flex-col  overflow-hidden px-2 pb-3 pt-2">
            <div className="mb-3 text-center">
              <h3 className="inline-block rounded-lg border border-gray-400 bg-[#b8dbd9] px-7 py-2 font-bold">
                Available Chairs In Hospital
              </h3>
            </div>
            <div className="mb-2 flex w-full justify-around ">
              <div className="flex  grow justify-between 2xl:max-w-[600px]">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-[#f0e860]"
                  onClick={() => showChairTypesOfInterest(true, false, false)}
                >
                  SD
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-[#b4c5e4]"
                  onClick={() => showChairTypesOfInterest(false, true, false)}
                >
                  BR
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-[#b4c5e4]"
                  onClick={() => showChairTypesOfInterest(false, false, true)}
                >
                  TS
                </Button>
              </div>
            </div>
            <div className="border-3  flex h-full  grow justify-evenly  border border-gray-500">
              <div
                className="  h-full grow overflow-y-auto 2xl:max-w-[600px]"
                style={{ scrollbarGutter: "stable" }}
              >
                {showStandardChairs && (
                  <div className="flex grow flex-wrap  content-start items-start whitespace-nowrap pt-5 text-center">
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                    <div className="w-1/2 px-3 py-2 font-semibold">
                      <h1 className="border border-gray-400 py-[20px]">
                        SD 20x18x01
                      </h1>
                    </div>
                  </div>
                )}
                {showBaritricChairs && (
                  <h1 className="bg-red-600">Bariatric Chairs</h1>
                )}
                {showTiltinSpaceChairs && (
                  <h1 className="bg-red-600">These are the tilt in spaces </h1>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </section>
  );
}

// export default Admit;

/**
 * To populate chair data in a 2-column grid with unlimited rows and overflow handling:
 * - Use a parent container div to hold the grid.
 * - Map through an array of chair objects and create a div for each chair with a solid border to simulate a data table.
 * - Use either CSS grid or flexbox with wrap to create a 2-column layout.
 * - Each chair should have a unique ID, preferably from a MongoDB database for consistency.
 */

/**
 * i can use a reducer but it stil makes the hook present in the same file as component and i do not want that
    i can also create a custom hook that takes in the name of items we are inrested in and then it returns something of interest aka
      i pass in the word showTiltinSpace then the custome hook will have a switch statement into it that returns (false, false, true) 
 main function that affects things
   const showChairTypesOfInterest = (
    showStandardChairs,
    showBaritricChairs,
    showTiltinSpaceChairs,
  ) => {
    setShowStandardChairs(showStandardChairs);
    setShowBariatricChairs(showBaritricChairs);
    setShowTiltInSpaceChairs(showTiltinSpaceChairs);
  }
states that i am managing 
  //showing chairs of interest
  const [showStandardChairs, setShowStandardChairs] = useState(true);
  const [showBaritricChairs, setShowBariatricChairs] = useState(false);
  const [showTiltinSpaceChairs, setShowTiltInSpaceChairs] = useState(false);
  
    i will like remove those states and just trigger one of eacth state and change the rest
 */

const [standard, bariatric, tiltInSpace] = availableChairs;
setChairData((prev) => ({
  [STANDARD]: standard,
  [BARIATRIC]: bariatric,
  [TILTING]: tilting,
}));

const newData = {};
newData[STANDARD] = availableChairs[0];
newData[BARIATRIC] = availableChairs[1];
newData[TILTING] = availableChairs[2];
setChairData(newData);
