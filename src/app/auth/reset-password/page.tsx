"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CgSpinnerTwo } from "react-icons/cg";
import { useResetPassword } from "@/Hooks/api/auth_api";
import { HidePassSvg, ShowPassSvg } from "@/Components/Svg/SvgContainer";

type formData = {
  password: string;
  password_confirmation: string;
};

const page = ({ params }: any) => {
  const { email } = params;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);

  //mutation
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
      email: decodeURIComponent(email),
      key: null,
      password: data.password,
      password_confirmation: data.password_confirmation,
    };
    await resetPasswordMutation(updatedData);
  };

  return (
    <>
      <div>
        {/* Title */}
        <h4 className="text-black font-merriweather text-center text-2xl md:text-3xl lg:text-4xl tracking-[-0.36px] leading-[83.146px]">
          Create new password
        </h4>

        {/* Description */}
        <p className="text-center lg:mt-6 tracking-[-0.36px] leading-[28px] max-w-[466px] mx-auto text-textColor">
          Please enter and confirm your new password. You will need to login
          after you reset.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:mt-8 mt-5 lg:space-y-6 space-y-3"
      >
        {/* Password */}
        <div className="flex flex-col gap-1">
          <div className="w-full flex justify-between">
            <label
              htmlFor="password"
              className="text-black leading-[175%] tracking-[-0.064px]"
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
              errors.password ? "border-red-500" : "border-[#9D9D9D]"
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
              className="text-black leading-[175%] tracking-[-0.064px]"
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
                ? "border-red-500"
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
            disabled={isPending}
            type="submit"
            className={`leading-[160%] font-semibold text-white tracking-[-0.096px] border-primary-orange w-full border bg-primary-orange rounded-full text-center py-3 hover:bg-transparent hover:text-primary-orange  transition-all duration-300 h-[50px] flex items-center justify-center
                      ${isPending ? "cursor-not-allowed" : "cursor-pointer"}
                      `}
          >
            {isPending ? (
              <CgSpinnerTwo className="animate-spin size-6" />
            ) : (
              "Reset password"
            )}
          </button>
        </div>
      </form>

      {/* Back to login */}
      <div className="sm:mt-12 mt-3 text-center">
        <Link
          href="/auth/login"
          className="font-semibold leading-[38.375px] text-[#333] pl-1 underline hover:no-underline transition-all duration-300"
        >
          Back to login
        </Link>
      </div>
    </>
  );
};

export default page;
