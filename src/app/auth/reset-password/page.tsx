"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import { useResetPassword } from "@/Hooks/api/auth_api";
import { HidePassSvg, ShowPassSvg } from "@/Components/Svg/SvgContainer";
import { useSearchParams } from "next/navigation";

type formData = {
  password: string;
  password_confirmation: string;
};

const page = () => {
  // Hook
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const key = searchParams.get("key");

  // States
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);

  // Mutation
  const { mutateAsync: resetPasswordMutation, isPending } = useResetPassword();

  // Hook Form
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<formData>();

  // Form Data
  const onSubmit = async (data: formData) => {
    const updatedData = {
      email: decodeURIComponent(email as string),
      key: key,
      password: data.password,
      password_confirmation: data.password_confirmation,
    };
    await resetPasswordMutation(updatedData, {
      onError: (err: any) => {
        setErrorMessage(err?.response?.data?.message);
      },
    });
  };

  return (
    <>
      {/* Title */}
      <h4 className="auth_heading">Create new password</h4>

      {/* Description */}
      <p className="text-center tracking-[-0.36px] leading-[28px] max-w-[466px] mx-auto text-accent-gray">
        Please enter and confirm your new password. You will need to login after
        you reset.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:mt-7 mt-5 lg:space-y-5.5 space-y-4"
      >
        {/* Dynamic Error Message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Password */}
        <div className="flex flex-col gap-1">
          <div className="w-full flex justify-between">
            <label
              htmlFor="password"
              className="text-primary-black leading-[175%] tracking-[-0.064px]"
            >
              New Password
            </label>
            {errors.password?.message && (
              <span className="text-red-500 text-sm">
                {errors.password?.message}
              </span>
            )}
          </div>
          <div
            className={`w-full auth_input relative ${
              errors.password ? "!border-red-500" : "border-[#9D9D9D]"
            }`}
          >
            <input
              id="password"
              type={!showPassword ? "password" : "text"}
              placeholder="Enter password"
              {...register("password", { required: "Password is required" })}
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

        {/* Confirm Password */}
        <div className="flex flex-col gap-1">
          <div className="w-full flex justify-between">
            <label
              htmlFor="password_confirmation"
              className="text-primary-black leading-[175%] tracking-[-0.064px]"
            >
              Confirm New Password
            </label>
            {errors.password_confirmation && (
              <span className="text-red-500 text-sm">
                {errors.password_confirmation.message as string}
              </span>
            )}
          </div>
          <div
            className={`w-full auth_input relative ${
              errors.password_confirmation
                ? "!border-red-500"
                : "border-[#9D9D9D]"
            }`}
          >
            <input
              id="password_confirmation"
              type={!confirmPassword ? "password" : "text"}
              placeholder="Enter password again"
              {...register("password_confirmation", {
                required: "Confirm Pass is required",
                validate: value =>
                  value === getValues("password") || "Passwords do not match",
              })}
              className="focus:outline-none w-full bg-transparent"
            />
            <div
              onClick={() => setConfirmPassword(prev => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {confirmPassword ? <ShowPassSvg /> : <HidePassSvg />}
            </div>
          </div>
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
                Please wait....
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </div>

        {/* Back to login */}
        <div className="text-center">
          <Link
            href="/auth/login"
            className="font-semibold leading-[38.375px] text-[#333] pl-1 underline hover:no-underline transition-all duration-300"
          >
            Back to login
          </Link>
        </div>
      </form>
    </>
  );
};

export default page;
