"use client";

import React from "react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { FcGoogle } from "react-icons/fc";
import { LiaEye, LiaEyeSlashSolid } from "react-icons/lia";

import z from "zod";
import { IconBrandGithub } from "@tabler/icons-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewUser } from "../../../../schema/register";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ShineBorder } from "@/components/ui/shine-border";
import { AuroraText } from "@/components/ui/aurora-text";
import { register } from "@/app/api/action/auth/register";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const form = useForm<z.infer<typeof NewUser>>({
    resolver: zodResolver(NewUser),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof NewUser>) => {
    setError("");
    setSuccess("");
    console.log(values);
    startTransition(async () => {
      const data = await register(values); // should be API call here to handle registration like fitch("/api/auth/register" ...

      if (data?.error) {
        form.reset();
        setError(data.error);
        return;
      }

      if (data?.success) {
        setSuccess(success);
        router.push(data.redirectUrl);
      }
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#0e0e0e] p-8">
      <Card
        className="relative w-full max-w-md rounded-2xl bg-[#1d1d1d] shadow-input border-none"
        dir="ltr"
      >
        <ShineBorder shineColor={["#ffffff", "#38b000", "#ffffff"]} />

        <CardHeader>
          <CardTitle className="text-white text-xl text-center">
            welcome in{" "}
            <AuroraText className="font-bold text-4xl">grad</AuroraText>
          </CardTitle>
          <CardDescription className="text-neutral-300 mt-2 text-center">
            create your account
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {error && (
                <p className="text-red-500 text-center font-bold">{error}</p>
              )}

              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <LabelInputContainer>
                          <Label
                            htmlFor="name"
                            className="text-white ml-2 font-bold"
                          >
                            name
                          </Label>
                          <Input
                            {...field}
                            disabled={isPending}
                            id="name"
                            placeholder="Ali"
                            type="text"
                            className="bg-black/80 text-white"
                          />
                        </LabelInputContainer>
                      </FormControl>
                      <FormMessage className="text-[#e57373]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <LabelInputContainer>
                          <Label
                            htmlFor="username"
                            className="text-white ml-2 font-bold"
                          >
                            username
                          </Label>
                          <Input
                            disabled={isPending}
                            {...field}
                            id="username"
                            placeholder="Alshehri"
                            type="text"
                            className="bg-black/80 text-white"
                          />
                        </LabelInputContainer>
                      </FormControl>
                      <FormMessage className="text-[#e57373]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <LabelInputContainer>
                          <Label
                            htmlFor="email"
                            className="text-white ml-2 font-bold"
                          >
                            email
                          </Label>
                          <Input
                            disabled={isPending}
                            {...field}
                            id="email"
                            placeholder="Example@ex.com"
                            type="email"
                            className="bg-black/80 text-white"
                          />
                        </LabelInputContainer>
                      </FormControl>
                      <FormMessage className="text-[#e57373]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <LabelInputContainer className="relative">
                          <Label
                            htmlFor="password"
                            className="text-white ml-2 font-bold"
                          >
                            password
                          </Label>
                          <Input
                            disabled={isPending}
                            {...field}
                            id="password"
                            placeholder="••••••••"
                            type={showPassword ? "text" : "password"}
                            className="bg-black/80 text-white"
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-7 text-xs text-white/80 hover:text-white transition"
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
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <button
                type="submit"
                disabled={isPending}
                className="group/btn relative active:scale-[0.98] block h-10 w-full rounded-md bg-gradient-to-br from-green-700 to-green-500 font-medium text-white shadow-[0px_1px_0px_0px_#4caf5040_inset,0px_-1px_0px_0px_#4caf5040_inset] transition-all hover:brightness-110 mt-7 cursor-pointer"
              >
                Create Account
                <BottomGradient />
              </button>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent my-4" />

              <SocialButton
                icon={<IconBrandGithub className="h-4 w-4" />}
                text=" continue with Github"
              />
              <SocialButton
                icon={<FcGoogle className="h-4 w-4" />}
                text=" continue with Google"
              />
            </CardFooter>
          </form>
        </Form>
        <div className=" mb-6 text-center text-sm text-white/70">
          you have account?{" "}
          <a
            href="/auth/login"
            className="font-semibold text-green-400 hover:underline transition-all duration-200"
          >
            login
          </a>
        </div>
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
