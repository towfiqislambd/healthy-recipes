"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "@/Hooks/api/auth_api";
import { BiLoaderCircle } from "react-icons/bi";
import { HidePassSvg, ShowPassSvg } from "@/Components/Svg/SvgContainer";

type formData = {
  email: string;
  password: string;
};

const page = () => {
  // State:
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Mutation:
  const { mutateAsync: loginMutation, isPending } = useLogin();

  // Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();

  // Form Data
  const onSubmit = async (data: formData) => {
    await loginMutation(data, {
      onError: (err: any) => {
        setErrorMessage(err?.response?.data?.message);
      },
    });
  };

  return (
    <>
      {/* Title */}
      <h4 className="auth_heading">Log In</h4>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 lg:space-y-5.5"
      >
        {/* Dynamic Error Message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Email */}
        <div className="flex flex-col gap-1">
          <div className="w-full flex justify-between">
            <label htmlFor="email" className="auth_label">
              Email
            </label>
            {errors.email?.message && (
              <span className="text-red-500 text-sm">
                {errors.email?.message}
              </span>
            )}
          </div>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            className={`auth_input ${
              errors.email ? "border-red-500" : "border-[#9D9D9D]"
            }`}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <div className="w-full flex justify-between">
            <label htmlFor="password" className="auth_label">
              Password
            </label>
            {errors.password?.message && (
              <span className="text-red-500 text-sm">
                {errors.password?.message}
              </span>
            )}
          </div>
          <div
            className={`w-full auth_input relative ${
              errors.password ? "border-red-500" : "border-[#9D9D9D]"
            }`}
          >
            <input
              id="password"
              type={!showPassword ? "password" : "text"}
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
              className="focus:outline-none w-full bg-transparent"
            />
            <div
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <ShowPassSvg /> : <HidePassSvg />}
            </div>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="w-full flex items-center justify-end">
          <Link
            href="/auth/verify-email"
            className="text-accent-gray underline font-semibold text-sm lg:text-base hover:no-underline transition-all duration-300"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit button */}
        <div className="w-full pt-2">
          <button
            type="submit"
            disabled={isPending}
            className={`auth_btn ${
              isPending
                ? "cursor-not-allowed hover:!bg-primary-orange hover:!text-white opacity-90"
                : "cursor-pointer"
            }`}
          >
            {isPending ? (
              <span className="flex gap-2 items-center">
                <BiLoaderCircle className="animate-spin text-xl" />
                Logging In....
              </span>
            ) : (
              "Log In"
            )}
          </button>
        </div>

        {/* Don’t have an account */}
        <div className="text-center text-sm lg:text-base leading-[38.375px]  text-[#333]">
          Don’t have an account?
          <Link
            href="/auth/register"
            className="font-semibold pl-1 underline hover:no-underline transition-all duration-300"
          >
            Create an account
          </Link>
        </div>

        {/* Back to home */}
        <div className="text-center">
          <Link href="/" className="text-primary-orange underline">
            Go to home
          </Link>
        </div>
      </form>
    </>
  );
};

export default page;
