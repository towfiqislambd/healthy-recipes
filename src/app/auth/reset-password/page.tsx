"use client";
import { HidePassSvg, ShowPassSvg } from "@/Components/Svg/SvgContainer";
import { useResetPassword } from "@/Hooks/api/auth_api";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CgSpinnerTwo } from "react-icons/cg";

const page = ({ params }: any) => {
  const { email } = params;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);

  //mutation:
  const { mutateAsync: resetPasswordMutation, isPending } = useResetPassword();

  // css:
  const inputClass =
    "rounded-lg border-[0.5px]  shadow-[0px_0px_4px_0px_rgba(0,9,54,0.06)] focus:outline-none px-3 lg:px-5 py-2 lg:py-3";

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  // Form Data
  const onSubmit = async (data: any) => {
    const updatedData = {
      email: decodeURIComponent(email),
      key: null,
      password: data.password,
      password_confirmation: data.password_confirmation,
    };
    await resetPasswordMutation(updatedData);
  };

  return (
    <section>
      {/* top section */}
      <div>
        {/* title */}
        <h4 className="text-black font-merriweather text-center text-2xl md:text-3xl lg:text-4xl tracking-[-0.36px] leading-[83.146px]">
          Create new password
        </h4>
        <p className="text-center lg:mt-6 tracking-[-0.36px] leading-[28px] max-w-[466px] mx-auto text-textColor">
          Please enter and confirm your new password. You will need to login
          after you reset.
        </p>
      </div>

      {/* form */}
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
            {errors.password && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
          </div>
          <div
            className={`w-full ${inputClass} relative ${
              errors.password ? "border-red-500" : "border-[#9D9D9D]"
            }`}
          >
            <input
              {...register("password", { required: true })}
              placeholder="Enter password"
              className="focus:outline-none w-full bg-transparent"
              type={!showPassword ? "password" : "text"}
              id="password"
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
            className={`w-full ${inputClass} relative ${
              errors.password_confirmation
                ? "border-red-500"
                : "border-[#9D9D9D]"
            }`}
          >
            <input
              {...register("password_confirmation", {
                required: "Confirm Pass is required",
                validate: value =>
                  value === getValues("password") || "Passwords do not match",
              })}
              placeholder="Enter password again"
              className="focus:outline-none w-full bg-transparent"
              type={!confirmPassword ? "password" : "text"}
              id="confirmPassword"
            />
            <div
              onClick={() => setConfirmPassword(prev => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {confirmPassword ? <ShowPassSvg /> : <HidePassSvg />}
            </div>
          </div>
        </div>

        {/* submit button */}
        <div className="w-full pt-2">
          <button
            disabled={isPending}
            type="submit"
            className={`leading-[160%] font-semibold text-white tracking-[-0.096px] border-primary w-full border bg-primary rounded-full text-center py-3 hover:bg-transparent hover:text-primary  transition-all duration-300 h-[50px] flex items-center justify-center
                      ${isPending ? "cursor-not-allowed" : "cursor-pointer"}
                      `}
          >
            <span>
              {isPending ? (
                <CgSpinnerTwo className="animate-spin size-6" />
              ) : (
                "Reset password"
              )}
            </span>
          </button>
        </div>
      </form>

      {/* toggle link */}
      <div className="sm:mt-12 mt-3 text-center">
        <Link
          href="/auth/login"
          className="font-semibold leading-[38.375px] text-[#333] pl-1 underline hover:no-underline transition-all duration-300"
        >
          Back to login
        </Link>
      </div>
    </section>
  );
};

export default page;
