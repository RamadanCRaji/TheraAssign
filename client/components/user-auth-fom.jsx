"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AuthSocialButton from "./AuthSocialButton";
import { signIn } from "next-auth/react";

const formOneRegisterSchema = z.object({
  name: z.string().min(3, "required"),
  email: z.string().email(),
  password: z.string().min(8),
});

const formOneRegisterDefaultValues = {
  name: "",
  email: "",
  password: "",
};
const formTwoLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const formTwoLoginDefaultValue = {
  email: "",
  password: "",
};

export function UserAuthForm({ className, ...props }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [variant, setVariant] = React.useState("LOGIN");

  const formOneRegister = useForm({
    resolver: zodResolver(formOneRegisterSchema),
    defaultValues: formOneRegisterDefaultValues,
  });
  const formTwoLogin = useForm({
    resolver: zodResolver(formTwoLoginSchema),
    defaultValues: formTwoLoginDefaultValue,
  });

  const toggleVariant = React.useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else setVariant("LOGIN");
  }, [variant]);

  async function onSubmit(data) {
    try {
      console.log({ data });
      setIsLoading(true);
      if (variant === "REGISTER") {
        //axios call with register route
        const response = await fetch(`/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data }),
          credentials: "include",
        });
        toast({
          variant: "success",
          title: "Success",
          description: `form submitted successfully`,
        });
        if (!response.ok) {
          throw new Error(`Network response was not ok:${response}`);
        }
      }
      if (variant === "LOGIN") {
        //NextAuth Login
        const login = await signIn("credentials", { ...data, redirect: false });
        console.log({ login });
        // signIn("credentials", { ...data, redirect: false })
        // .then((callback) => {
        //   if (callback?.error) {
        //     toast.error("invalid credentials");
        //   }
        //   if (callback?.ok) {
        //     toast.success("success");
        //   }
        // });
        // const response = await signIn("credentials", {
        //   ...data,
        //   redirect: false,
        // });
      }
      const socialAction = (action) => {};
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error.response}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-4 ", className)} {...props}>
      {variant === "REGISTER" && (
        <Form {...formOneRegister}>
          <form onSubmit={formOneRegister.handleSubmit(onSubmit)}>
            <div className="grid gap-3">
              {variant === "REGISTER" && (
                <>
                  <FormField
                    name="name"
                    control={formOneRegister.control}
                    render={({ field }) => (
                      <FormItem className="grid gap-1">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="name"
                            className="h-full  w-full "
                            placeholder="name"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect="off"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage className="pl-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="email"
                    control={formOneRegister.control}
                    render={({ field }) => (
                      <FormItem className="grid gap-1">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="email"
                            className="h-full  w-full "
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage className="pl-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="password"
                    control={formOneRegister.control}
                    render={({ field }) => (
                      <FormItem className="grid gap-1">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="password"
                            className="h-full  w-full "
                            placeholder="password"
                            type="password"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage className="pl-1" />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Register
              </Button>
            </div>
          </form>
        </Form>
      )}
      {variant === "LOGIN" && (
        <Form {...formTwoLogin}>
          <form onSubmit={formTwoLogin.handleSubmit(onSubmit)}>
            <div className="grid gap-3">
              <>
                <FormField
                  name="email"
                  control={formTwoLogin.control}
                  render={({ field }) => (
                    <FormItem className="grid gap-1">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="email"
                          className="h-full  w-full "
                          placeholder="name@example.com"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage className="pl-1" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={formTwoLogin.control}
                  render={({ field }) => (
                    <FormItem className="grid gap-1">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="password"
                          className="h-full  w-full "
                          placeholder="password"
                          type="password"
                          autoCapitalize="none"
                          autoCorrect="off"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage className="pl-1" />
                    </FormItem>
                  )}
                />
              </>
              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign in
              </Button>
            </div>
          </form>
        </Form>
      )}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className=" flex gap-2">
        <AuthSocialButton
          loading={isLoading}
          icon={Icons.gitHub}
          onClick={() => socialAction("github")}
        />
        <AuthSocialButton
          loading={isLoading}
          icon={Icons.google}
          onClick={() => socialAction("google")}
        />
      </div>
      <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
        <div>
          {variant === "LOGIN"
            ? "New to TheraAssign?"
            : "Already have an account?"}
        </div>
        <div onClick={toggleVariant} className="cursor-pointer underline">
          {variant === "LOGIN" ? "Create an account" : "login"}
        </div>
      </div>
    </div>
  );
}
