"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CgSpinnerTwo } from "react-icons/cg";
import { useRegister } from "@/Hooks/api/auth_api";
import { HidePassSvg, ShowPassSvg } from "@/Components/Svg/SvgContainer";

type formData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const Register = () => {
  // Mutation
  const { mutateAsync: registerMutation, isPending } = useRegister();

  // States
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);

  // Hook Form
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<formData>();

  // Form Data
  const onSubmit = async (data: formData) => {
    await registerMutation(data);
    reset();
  };

  return (
    <>
      {/* Title */}
      <h4 className="text-primary-black text-center font-merriweather text-2xl md:text-3xl lg:text-4xl tracking-[-0.36px] leading-[83.146px]">
        New account
      </h4>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:mt-8 space-y-4 lg:space-y-6"
      >
        {/* Full Name */}
        <div className="flex flex-col gap-1">
          <div className="w-full flex justify-between">
            <label htmlFor="name" className="auth_label">
              Full Name
            </label>
            {errors?.name?.message && (
              <span className="text-red-500 text-sm">
                {errors?.name?.message}
              </span>
            )}
          </div>
          <input
            id="name"
            type="text"
            {...register("name", {
              required: "Name is required",
            })}
            placeholder="Enter your Full Name"
            className={`auth_input ${
              errors.name ? "border-red-500" : "border-[#9D9D9D]"
            }`}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <div className="w-full flex justify-between">
            <label htmlFor="email" className="auth_label">
              Email
            </label>
            {errors?.email?.message && (
              <span className="text-red-500 text-sm">
                {errors?.email?.message}
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
            {errors?.password?.message && (
              <span className="text-red-500 text-sm">
                {errors?.password?.message}
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
              placeholder="Enter password"
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
            <label htmlFor="password_confirmation" className="auth_label">
              Confirm Password
            </label>
            {errors.password_confirmation?.message && (
              <span className="text-red-500 text-sm">
                {errors.password_confirmation?.message}
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
              id="confirmPassword"
              type={!confirmPassword ? "password" : "text"}
              {...register("password_confirmation", {
                required: "Confirm Pass is required",
                validate: value =>
                  value === getValues("password") || "Passwords do not match",
              })}
              placeholder="Enter password again"
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

        {/* Submit Btn */}
        <div className="w-full pt-2">
          <button
            type="submit"
            disabled={isPending}
            className={`leading-[160%] font-semibold text-white tracking-[-0.096px] border-primary-orange w-full border bg-primary-orange rounded-full text-center py-3 hover:bg-transparent hover:text-primary-orange transition-all duration-300 h-[50px] flex items-center justify-center
                 ${isPending ? "cursor-not-allowed" : "cursor-pointer"}
               `}
          >
            {isPending ? (
              <CgSpinnerTwo className="animate-spin size-6" />
            ) : (
              "Create account"
            )}
          </button>
        </div>
      </form>

      {/* Already have account */}
      <div className="lg:mt-10 mt-5 text-center">
        <h6 className="leading-[38.375px] text-[#333]">
          Already have an account?
          <Link
            href={"/auth/login"}
            className="font-semibold pl-1 underline hover:no-underline transition-all duration-300"
          >
            Log in
          </Link>
        </h6>
      </div>

      {/* Back to home */}
      <div className="lg:pt-10 pt-3 text-center">
        <Link href="/" className="text-primary-orange underline">
          Go to home
        </Link>
      </div>
    </>
  );
};

export default Register;
