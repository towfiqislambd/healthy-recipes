"use client";
import { HidePassSvg, ShowPassSvg } from "@/Components/Svg/SvgContainer";
import { useLogin } from "@/Hooks/api/auth_api";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CgSpinnerTwo } from "react-icons/cg";

const page = () => {
  // State:
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // CSS:
  const inputClass =
    "rounded-lg border-[0.5px] bg-transparent shadow-[0px_0px_4px_0px_rgba(0,9,54,0.06)] focus:outline-none px-3 lg:px-5 py-2 lg:py-3";

  // Mutation:
  const { mutateAsync: loginMutation, isPending } = useLogin();

  // Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // All Form Data
  const onSubmit = async (data: any) => {
    await loginMutation(data);
    reset();
  };

  return (
    <section>
      {/* title */}
      <h4 className="text-black font-merriweather text-center text-2xl md:text-3xl lg:text-4xl tracking-[-0.36px] leading-[83.146px]">
        Login
      </h4>

      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:mt-8 space-y-4 lg:space-y-6"
      >
        {/* email */}
        <div className="flex flex-col gap-1">
          <div className="w-full flex justify-between">
            <label
              htmlFor="email"
              className="text-black leading-[175%] tracking-[-0.064px]"
            >
              Email
            </label>
            {errors.email && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>
          <input
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className={`${inputClass} ${
              errors.email ? "border-red-500" : "border-[#9D9D9D]"
            }`}
            type="email"
            name="email"
            id="email"
          />
        </div>

        {/* password */}
        <div className="flex flex-col gap-1">
          <div className="w-full flex justify-between">
            <label
              htmlFor="password"
              className="text-black leading-[175%] tracking-[-0.064px]"
            >
              Password
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
              name="password"
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

        {/* forgot password */}
        <div className="w-full flex items-center justify-end">
          <Link
            href="/auth/verify-email"
            className="text-textColor underline font-semibold text-sm lg:text-base hover:no-underline transition-all duration-300"
          >
            Forgot password?
          </Link>
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
                "Login"
              )}
            </span>
          </button>
        </div>
      </form>

      {/* toggle link */}
      <div className="lg:mt-12 mt-5 text-center text-sm lg:text-base">
        <h6 className="leading-[38.375px]  text-[#333]">
          Don’t have an account?
          <Link
            href="/auth/register"
            className="font-semibold pl-1 underline hover:no-underline transition-all duration-300"
          >
            Create an account
          </Link>
        </h6>
      </div>

      {/* Go to home button */}
      <div className="pt-2 lg:pt-12 text-center">
        <Link href="/" className="text-primary underline">
          Go to home
        </Link>
      </div>
    </section>
  );
};

export default page;
