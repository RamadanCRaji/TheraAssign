"use client";

import { useState } from "react";

//components from shacdcn
import { Progress } from "@/app/components/ui/progress";
import { Button } from "@/app/components/ui/button";

import { ScrollArea, ScrollBar } from "@/app/components/ui/scroll-area";

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
    tab_title: "BR",
  },
  {
    type: TILTING,
    tab_title: "TS",
  },
];

//when i pass props into chairLayou
export function ChairLayout(props) {
  const { chairData } = props;

  const [currentChairType, setCurrentChairType] = useState(STANDARD);
  return (
    <section className="flex h-full w-full flex-col xl:border-r">
      <div className="mb-3 text-center">
        <h3 className="inline-block w-[80%] rounded-lg border border-gray-400 bg-[#b8dbd9]  py-2 font-bold">
          Available Chairs In Hospital
        </h3>
      </div>
      <div className="mb-2 flex w-full justify-around ">
        <div className="flex  grow justify-between 2xl:max-w-[600px]">
          {/** A single Map from chair-type => chairs */}
          {CHAIR_TYPES.map((e) => {
            return (
              <Button
                size="lg"
                variant="secondary"
                className="bg-[#8d9ab1]"
                onClick={() => setCurrentChairType(e.type)}
                key={e.type}
              >
                {e.tab_title}
              </Button>
            );
          })}
        </div>
      </div>
      <div className=" flex h-full  grow justify-evenly border border-gray-500 ">
        <ScrollArea className="h-full grow  2xl:max-w-[600px] ">
          <div className="flex grow flex-wrap content-start items-start whitespace-nowrap  py-5 text-center">
            {/** 
                A single Map from chair data using the current state of charchair-type => chairs to give me all chairs in that category
             */}
            {chairData[currentChairType]?.map((e) => {
              return (
                <div className="w-1/2  px-3 py-2 font-semibold" key={e["_id"]}>
                  <h1 className="border border-gray-400 py-[20px]">
                    {e["tagId"]}
                  </h1>
                </div>
              );
            }) || <Progress value={85} />}
          </div>
          <ScrollBar orientation="vertical" className="bg-[#bac6db]" />
        </ScrollArea>
      </div>
    </section>
  );
}
