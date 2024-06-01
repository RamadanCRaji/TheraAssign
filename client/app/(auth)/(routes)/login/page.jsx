"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/user-auth-fom-login";

export default function AuthenticationPage() {
  return (
    <main className="grid h-screen w-screen ">
      <div className="container relative flex h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 ">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "" }),
            "absolute right-4 top-4 md:right-8 md:top-8",
          )}
        >
          Sign Up
        </Link>
        {/* left panel */}
        <div className="relative hidden h-full flex-col  bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-[#0a2463]" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            TheraAssign
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo; Managing therapy equipment with PRECISION &rdquo;
              </p>
            </blockquote>
          </div>
        </div>

        {/* second panel */}
        <div className="lg:p-8 ">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6  sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome Back
              </h1>
              <p className="text-sm text-muted-foreground">
                Please Login to your existing account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground underline underline-offset-4 hover:text-primary">
              Don't have an account?
              <Link
                href="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign Up
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
