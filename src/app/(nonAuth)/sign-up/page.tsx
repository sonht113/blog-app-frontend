"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import Link from "next/link";

import ErrorField from "@/components/error-field";
import LabelField from "@/components/label-field";
import Button from "@/components/ui/button-custom";
import { FlipWords } from "@/components/ui/flipwords";
import { Input } from "@/components/ui/input";
import StrongPasswordInput from "@/components/ui/strongPassword";
import { ROUTE } from "@/constants/route";
import { signUpSchema } from "@/lib/validations/auth/sign-up";

type SignUpFormData = {
  email: string;
  fullname: string;
  password: string;
};

export default function SignUpPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData)=> {
    console.log("🚀 ~ onSubmit ~ data:", data);
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
            Create an account to get started
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="fullname"
            render={({ field }) => (
              <div>
                <LabelField label="Full Name" isRequired />
                <Input
                  {...field}
                  errorField={!!errors.fullname}
                  placeholder="Enter fullname"
                />
                {errors.fullname && (
                  <ErrorField message={errors.fullname.message ?? ""} />
                )}
              </div>
            )}
          />

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
              Sign Up
            </Button>
          </div>
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link href={ROUTE.LOGIN} className="text-primary">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
