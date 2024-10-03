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
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  const { data: session, status } = useSession({
    redirect: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [variant, setVariant] = React.useState("LOGIN");

  const formOneRegister = useForm({
    resolver: zodResolver(formOneRegisterSchema), // uses the schema to validate entries before onsubmit is called
    defaultValues: formOneRegisterDefaultValues,
  });
  const formTwoLogin = useForm({
    resolver: zodResolver(formTwoLoginSchema),
    defaultValues: formTwoLoginDefaultValue,
  });
  React.useEffect(() => {
    if (status === "authenticated") {
      router.push("/main/dashboard/overview");
      console.log(`signed in as ${Object.keys(session.user)}`);
    }
  }, [status]);
  const toggleVariant = React.useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else setVariant("LOGIN");
  }, [variant]);
  const getSocialAuthToken = async () => {
    try {
      const response = await fetch("/api/protected/socialAuthToken/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`something went wrong ${error.message}`);
    }
  };
  async function onSubmit(data) {
    try {
      setIsLoading(true);

      if (variant === "REGISTER") {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", //representation headers
          },
          body: JSON.stringify({ ...data }),
          credentials: "include",
        });

        console.log("Fetch response received");

        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`,
          );
        }
        const responseObject = await response.json();
        console.log("this is the response object", { responseObject });
        const { access_token: encrypted_accessToken } = responseObject;

        toast({
          variant: "success",
          title: "Success",
          description: "Form submitted successfully",
        });
        await signIn("credentials", data);
      }
      if (variant === "LOGIN") {
        //NextAuth Login
        // sign in will only return the status of the login process and not the full user data
        //
        let login = await signIn("credentials", {
          ...data,
          redirect: false,
        });
        console.log("Login result:", login);
        if (login?.ok && !login?.error) {
          toast({
            variant: "success",
            title: "Success",
            description: `login successfull`,
          });
          router.push("/main/dashboard/overview");
        }
        if (login?.error) {
          throw new Error(login.error);
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error.message}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  }
  const socialAction = async (action) => {
    try {
      setIsLoading(true);
      const login = await signIn(action, { redirect: false });
      // Log the entire login response for debugging
      const socialToken = await getSocialAuthToken();
      console.log("Full social token:", socialToken);

      if (login?.ok && !login?.error) {
        toast({
          variant: "success",
          title: "Success",
          description: `login successfull`,
        });
      }
      if (login?.error) {
        throw new Error(login.error);
      }
    } catch (error) {
      console.error(`this is the erro we got ${{ error }}`);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error.message}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
