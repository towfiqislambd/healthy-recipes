"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CgSpinnerTwo } from "react-icons/cg";
import { useLogin } from "@/Hooks/api/auth_api";
import { HidePassSvg, ShowPassSvg } from "@/Components/Svg/SvgContainer";

type formData = {
  email: string;
  password: string;
};

const page = () => {
  // State:
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Mutation:
  const { mutateAsync: loginMutation, isPending } = useLogin();

  // Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formData>();

  // Form Data
  const onSubmit = async (data: formData) => {
    await loginMutation(data);
    reset();
  };

  return (
    <>
      {/* Title */}
      <h4 className="text-black font-merriweather text-center text-2xl md:text-3xl lg:text-4xl tracking-[-0.36px] leading-[83.146px]">
        Login
      </h4>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:mt-8 space-y-4 lg:space-y-6"
      >
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
            className="text-textColor underline font-semibold text-sm lg:text-base hover:no-underline transition-all duration-300"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit button */}
        <div className="w-full pt-2">
          <button
            disabled={isPending}
            type="submit"
            className={`leading-[160%] font-semibold text-white tracking-[-0.096px] border-primary w-full border bg-primary rounded-full text-center py-3 hover:bg-transparent hover:text-primary  transition-all duration-300 h-[50px] flex items-center justify-center
                    ${isPending ? "cursor-not-allowed" : "cursor-pointer"}
                    `}
          >
            {isPending ? (
              <CgSpinnerTwo className="animate-spin size-6" />
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>

      {/* Don’t have an account */}
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

      {/* Back to home */}
      <div className="pt-2 lg:pt-12 text-center">
        <Link href="/" className="text-primary underline">
          Go to home
        </Link>
      </div>
    </>
  );
};

export default page;
