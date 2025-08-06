"use client";
import React from "react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { FcGoogle } from "react-icons/fc";
import { LiaEye, LiaEyeSlashSolid } from "react-icons/lia";

import z from "zod";
import { IconBrandGithub } from "@tabler/icons-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginInSchema } from "../../../../schema/login";
import { AuroraText } from "@/components/ui/aurora-text";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { login } from "@/app/api/action/auth/login";
import { useRouter } from "next/navigation";

export default function LoginPage() {
const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginInSchema>>({
    resolver: zodResolver(loginInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (values: z.infer<typeof loginInSchema>) => {
    setError("");
    setSuccess("");
    console.log(values);
    startTransition(async () => {
      const data = await login(values); // should be API call here to handle login like fitch("/api/auth/login" ...
      if (data?.error) {
        form.reset();
        setError(data.error);
        return;
      }
      if (data?.success) {
        router.push(data.redirectUrl);
      }
    });
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-[#0e0e0e] text-white">
      <div className=" -translate-y-16 flex flex-col items-center text-green-500 transition-all duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-22 h-22"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
          />
        </svg>
        <AuroraText className="font-bold text-5xl">grad</AuroraText>
      </div>
      <Card
        className="p-0 max-w-sm w-full shadow-none border border-[#1d1d1d] bg-transparent rounded-xl -translate-y-10 "
        dir="ltr"
      >
        <MagicCard gradientColor="rgba(0,0,0,0.95)" className="p-0 ">
          <CardHeader className="border-b border-white/20 p-4">
            <CardTitle className="text-white text-center mt-4">Login</CardTitle>
            <CardDescription className="text-white/50 text-center mt-1">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="p-4">
                {error && (
                  <p className="text-red-500 text-center font-bold">{error}</p>
                )}
                {success && (
                  <p className="text-green-500 text-center font-bold">
                    {success}
                  </p>
                )}
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="identifier"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <LabelInputContainer>
                              <Label htmlFor="email" className="text-white">
                                Username or Email
                              </Label>
                              <Input
                                disabled={isPending}
                                {...field}
                                id="email"
                                placeholder="example@ex.com || username"
                                type="text"
                                className="bg-[#1d1d1d] text-white"
                              />
                            </LabelInputContainer>
                          </FormControl>
                          <FormMessage className="text-[#e57373]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <LabelInputContainer className="relative">
                              <Label htmlFor="password" className="text-white">
                                password
                              </Label>
                              <Input
                                disabled={isPending}
                                {...field}
                                id="password"
                                placeholder="••••••••"
                                type={showPassword ? "text" : "password"}
                                className="bg-[#1d1d1d] text-white"
                              />
                              <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-6 text-xs text-white/80 hover:text-white transition"
                              >
                                {showPassword ? (
                                  <LiaEye className="h-5 w-5 hover:cursor-pointer" />
                                ) : (
                                  <LiaEyeSlashSolid className="h-5 w-5 hover:cursor-pointer" />
                                )}
                              </button>
                            </LabelInputContainer>
                          </FormControl>
                          <FormMessage className="text-[#e57373]" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col p-4  border-white/20 space-y-4">
                <Button
                  className="relative active:scale-[0.98] z-10 w-full rounded-full bg-gradient-to-br from-[#1B3A34] to-[#4caf50] p-[2px] shadow-xl hover:scale-[1.02] transition-transform duration-300 ease-out"
                  type="submit"
                  disabled={isPending}
                >
                  <span className="relative inline-flex w-full items-center justify-center rounded-full bg-[#0e0e0e]/90 px-6 py-2 text-sm font-semibold text-white backdrop-blur-md hover:shadow-[0_0_14px_#4caf50aa] transition-all duration-300">
                    Login
                    <span className="absolute inset-0 z-[-1] rounded-full opacity-40 blur-lg bg-[conic-gradient(at_top_left,_#4caf50_0%,_#1B3A34_100%)] animate-spin-slow" />
                  </span>
                </Button>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent my-4" />
                <SocialButton
                  icon={<FcGoogle className="h-4 w-4" />}
                  text="Continue with Google"
                />
                <SocialButton
                  icon={<IconBrandGithub className="h-4 w-4" />}
                  text="Continue with GitHub"
                />
              </CardFooter>
            </form>
          </Form>
          <div className="mt-4 mb-6 text-center text-sm text-white/70">
            do not have account?{" "}
            <a
              href="/auth/register"
              className="font-semibold text-green-400 hover:underline transition-all duration-200"
            >
              create account
            </a>
          </div>
        </MagicCard>
      </Card>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

const SocialButton = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <button
      type="button"
      className="group/btn relative flex active:scale-[0.98] h-10 w-full items-center justify-center space-x-2 rounded-md bg-zinc-800 text-white shadow-[0px_0px_1px_1px_#262626] transition-colors hover:bg-zinc-700"
    >
      {icon}
      <span className="text-sm">{text}</span>
      <BottomGradient />
    </button>
  );
};
const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
