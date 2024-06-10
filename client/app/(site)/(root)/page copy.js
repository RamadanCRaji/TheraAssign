"use client";
import React from "react";
import Link from "next/link";

function Home() {
  return (
    <main className="h-screen w-screen md:grid lg:min-h-screen">
      {/* screen sizes md,lg,xl */}
      <div className="hidden h-screen w-screen md:grid md:grid-cols-10 lg:min-h-screen lg:grid-cols-10 xl:grid-cols-10">
        <section className=" relative h-full items-center bg-[#0a2463] p-1 text-[rgb(210,146,255)]  md:col-span-5 md:flex md:justify-center lg:col-span-6 xl:col-span-6">
          <h6 className="absolute left-2 top-2 border-y-2 px-2  py-2 text-2xl font-bold md:text-base">
            Thera.Assign ◎
          </h6>
          <div className="  w-full lg:p-3 ">
            <h2 className=" mt-6 font-bold sm:text-3xl md:mb-2 md:text-center md:text-3xl lg:text-center lg:text-2xl  xl:text-5xl ">
              Welcome To Thera.Assign ◎
            </h2>

            <p className="mt-2 font-bold leading-relaxed md:text-center md:text-xl lg:px-6 lg:text-center xl:text-center">
              <span className=" tracking-wider md:text-lg  lg:text-2xl ">
                Managing therapy equipment with
              </span>
              <span className="md ml-2 font-bold italic lg:text-2xl xl:text-3xl">
                PRECISION
              </span>
            </p>
          </div>
        </section>
        <section className="h-full md:col-span-5 lg:col-span-4 xl:col-span-4">
          <section className="h-full bg-[#2f4550] p-2 md:flex md:items-center md:justify-center  ">
            <div className=" h-40 w-full max-w-[612px]  p-2 md:flex md:flex-col md:items-center md:justify-start ">
              <div className="mb-1 ">
                <h2 className="text-4xl font-extrabold text-white md:text-2xl ">
                  Get started
                </h2>
              </div>
              <div className="  my-auto font-bold md:flex md:justify-center  md:self-stretch md:px-0 lg:justify-center lg:self-stretch lg:px-3">
                <Link
                  type="button"
                  href="/login"
                  className="inline-block shrink-0 grow rounded-md border border-[lightblue] bg-[#0a2463] text-center text-base font-medium text-white transition hover:bg-[#427789] hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white md:mr-2 md:px-2 md:py-2 lg:mr-3 lg:px-12 lg:py-3 xl:mr-6 xl:px-16 xl:py-3"
                >
                  Log in
                </Link>
                <Link
                  type="button"
                  href="/signup"
                  className="inline-block shrink-0 grow rounded-md border border-[lightblue] bg-[#0a2463] text-center text-base font-medium text-white transition hover:bg-[#427789] hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white md:px-2 md:py-2 lg:px-12 lg:py-3 xl:px-16 xl:py-3"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </section>
        </section>
      </div>
      {/* smaller screen size, xs sm */}
      <div className=" 2xs:flex 2xs:flex-col 2xs:items-center 2xs:justify-between xs:flex xs:flex-col xs:items-center xs:justify-between relative h-full bg-[#0a2463] p-1 text-[rgb(210,146,255)] sm:flex sm:flex-col sm:items-center sm:justify-between md:hidden">
        <h6 className="2xs:text-sm xs:text-sm absolute left-2 top-2  border-y-2 px-2 py-2 text-2xl font-bold sm:text-sm">
          Thera.Assign ◎
        </h6>
        <div className="xs:justify-center my-auto flex  w-full sm:justify-center ">
          <div className="max-w-[500px] grow px-2 py-1  ">
            <div className=" 2xs:flex  2xs:flex-col 2xs:items-center 2xs:justify-start xs:flex  xs:flex-col xs:items-center xs:justify-start h-40  sm:flex sm:flex-col sm:items-center sm:justify-start  ">
              <div className="2xs:mb-2 xs:mb-2 xs:grow mb-1 w-full text-center sm:grow-0  ">
                <h2 className="2xs:text-2xl xs:text-2xl text-4xl font-extrabold text-[white] md:text-2xl ">
                  Get started
                </h2>
              </div>
              <div className=" 2xs:flex  2xs:w-full 2xs:grow 2xs:flex-col 2xs:justify-around 2xs:gap-y-3 2xs:self-center xs:flex xs:w-full  xs:grow xs:flex-col xs:justify-around xs:gap-y-3 xs:self-center my-auto font-extrabold sm:flex sm:w-full sm:max-w-[500px] sm:grow-0 sm:flex-row sm:justify-around  sm:self-center ">
                <Link
                  type="button"
                  href="/login"
                  className="2xs:flex 2xs:items-center 2xs:justify-center xs:mr-0 xs:flex xs:items-center xs:justify-center xs:px-2 xs:py-2  inline-block  shrink-0 grow rounded-md border border-[lightblue] bg-[#2f4550] text-base text-white transition hover:bg-[#427789] hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white sm:mr-3 sm:px-2 sm:py-3"
                >
                  Log in
                </Link>
                <Link
                  type="button"
                  href="/signup"
                  className="2xs:flex 2xs:items-center 2xs:justify-center xs:flex xs:items-center xs:justify-center xs:px-2 xs:py-2 inline-block shrink-0  grow rounded-md border border-[lightblue] bg-[#2f4550] text-center text-base text-white transition hover:bg-[#427789]  hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white sm:px-2 sm:py-3"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full border text-center">
          <p className="font-bold  leading-relaxed ">
            <span className="  tracking-wider ">
              Managing therapy equipment with
            </span>
            <span className="ml-2 font-bold italic sm:text-base">
              PRECISION
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Home;
