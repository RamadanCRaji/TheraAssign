"use client";
import React from "react";


function login() {
   return (
      <section className="h-screen">
         <main className="bg-[#2f4550]  w-full h-full flex  justify-center items-center px-10 font-semibold ">
            {/* medium to large screens */}
            <section className=" hidden sm:block w-[500px] lg:h-[750px]">
               <div className="border rounded-lg bg-[#eeebeb] shadow-[black] shadow-lg border-[black] flex flex-col justify-evenly items-center pt-10 pb-20 px-2 h-full w-full ">
                  <div className="w-full grid grid-cols-3 grid-rows-2 gap-3 px-1 ">
                     <div className="col-span-3 text-center mb-2 p-4 ">
                        <span className="text-[black] text-2xl mr-3">
                           Welcome to
                        </span>
                        <span className="text-[#078864] italic font-semibold text-3xl">
                           Thera.Assign
                        </span>
                     </div>
                     <div className="col-span-3 flex justify-center items-start gap-3">
                        <span className="text-[black] incline-block">
                           Sign in to your
                        </span>
                        <span className="text-[#078864] italic underline">
                           Thera.Assign
                        </span>
                        <span className="text-[black]"> Account </span>
                     </div>
                  </div>
                  <div className="w-full self-center">
                     <div className="text-[black]  w-full h-full grid grid-cols-1">
                        <form
                           action=""
                           className="grid grid-cols-3 grid-rows-3 w-full gap-3 px-2"
                        >
                           <div className="col-span-3 mb-4 row-span-1 flex flex-col items-start justify-evenly">
                              <label
                                 htmlFor="email"
                                 className="inline-block text-md font-normal"
                              >
                                 Email
                              </label>
                              <input
                                 type="text"
                                 name="email"
                                 placeholder=" enter your email"
                                 id="email"
                                 className="self-stretch inline-block border border-[#928d8d] py-2 text-md font-normal"
                              />
                           </div>
                           <div className="col-span-3 mb-8 row-span-1 flex flex-col items-start justify-evenly">
                              <label
                                 htmlFor="password"
                                 className="inline-block mb-2 text-md font-normal"
                              >
                                 Password
                              </label>
                              <input
                                 type="password"
                                 name="password"
                                 placeholder=" enter your password"
                                 id="password"
                                 className="self-stretch inline-block border border-[#928d8d] py-2 text-md font-normal"
                              />
                           </div>
                           <div className="col-span-3 flex items-center row-span-1">
                              <button
                                 type="submit"
                                 className="bg-[#07886f] rounded-md grow text-[white] py-2 hover:bg-[#09a084]"
                              >
                                 Sign in
                              </button>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </section>
            {/* 2xs to xs screens */}
            <section className="sm:hidden w-[420px] h-3/4 max-h-[650px]">
               <div className="border rounded-lg bg-[#eeebeb] shadow-[black] shadow-lg border-[black] flex flex-col justify-evenly items-center pb-5 pt-6 px-2 h-full w-full ">
                  <div
                     className="w-full grid grid-cols-3  gap-1 px-1  "
                     style={{ gridTemplateRows: "auto 40px" }}
                  >
                     <div className="col-span-3 text-center mb-2 p-4 ">
                        <h6 className=" inline-block text-[black] text-xl mr-3">
                           Welcome to
                        </h6>
                        <span className="text-[#078864] italic font-semibold text-2xl">
                           Thera.Assign
                        </span>
                     </div>
                     <div className="col-span-3 flex 2xs:text-center justify-center items-start xs:whitespace-nowrap text-sm">
                        <span className="text-black inline-block">
                           Sign in to your
                           <span className="text-[#078864] mx-1 inline-block italic underline">
                              Thera.Assign
                           </span>
                           Account
                        </span>
                     </div>
                  </div>
                  <div className="w-full ">
                     <div className="text-[black]  w-full h-full grid grid-cols-1">
                        <form
                           action=""
                           className="grid grid-cols-3 grid-rows-3 w-full gap-2 px-2"
                        >
                           <div className="col-span-3 mb-4 row-span-1 flex flex-col items-start justify-evenly">
                              <label
                                 htmlFor="email"
                                 className="inline-block text-md font-normal"
                              >
                                 Email
                              </label>
                              <input
                                 type="text"
                                 name="email"
                                 placeholder=" enter your email"
                                 id="email"
                                 className="self-stretch inline-block border border-[#928d8d] py-2 text-md font-normal"
                              />
                           </div>
                           <div className="col-span-3 mb-8 row-span-1 flex flex-col items-start justify-evenly">
                              <label
                                 htmlFor="password"
                                 className="inline-block mb-2 text-md font-normal"
                              >
                                 Password
                              </label>
                              <input
                                 type="password"
                                 name="password"
                                 placeholder=" enter your password"
                                 id="password"
                                 className="self-stretch inline-block border border-[#928d8d] py-2 text-md font-normal"
                              />
                           </div>
                           <div className="col-span-3 flex items-start row-span-1">
                              <button
                                 type="submit"
                                 className="bg-[#07886f] rounded-md grow text-[white] py-2 hover:bg-[#09a084]"
                              >
                                 Sign in
                              </button>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </section>
         </main>
      </section>
   );
}

export default login;

{
   /* <div className="border border-[blue] basis-2">
<div className="border border-[red]"> hello</div>
<div className="border border-[black]">
   <form action="">sfvsfgsfgsdgsgdfs</form>
</div>
</div> */
}
