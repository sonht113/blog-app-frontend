"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";

import Link from "next/link";

import ErrorField from "@components/error-field";
import LabelField from "@components/label-field";
import Button from "@components/ui/button-custom";
import { FlipWords } from "@components/ui/flipwords";
import { Input } from "@components/ui/input";
import StrongPasswordInput from "@components/ui/strongPassword";
import { ROUTE } from "@constants/route";
import { loginSchema } from "@lib/validations/auth/login";

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log("🚀 ~ onSubmit ~ res:", res);
  };

  return (
    <div className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Welcome{" "}
            <FlipWords
              words={["My Blog", "Your Idea"]}
              duration={3000}
              className="text-primary"
            />
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            Sign in to continue to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <div>
                <LabelField label="Email" isRequired />
                <Input
                  {...field}
                  errorField={!!errors.email}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <ErrorField message={errors.email.message ?? ""} />
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <div>
                <LabelField label="Password" isRequired />
                <StrongPasswordInput
                  {...field}
                  errorField={!!errors.password}
                  placeholder="Enter password"
                />
                {errors.password && (
                  <ErrorField message={errors.password.message ?? ""} />
                )}
              </div>
            )}
          />
          <div>
            <Button
              variant="outline"
              type="submit"
              colorScheme="primary"
              className="w-full font-medium"
            >
              Login
            </Button>
          </div>
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link href={ROUTE.SIGN_UP} className="text-primary">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
