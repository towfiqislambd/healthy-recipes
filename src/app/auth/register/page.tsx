"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
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
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Hook Form
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<formData>();

  // Form Data
  const onSubmit = async (data: formData) => {
    await registerMutation(data, {
      onError: (err: any) => {
        setErrorMessage(err?.response?.data?.message);
      },
    });
  };

  return (
    <>
      {/* Title */}
      <h4 className="auth_heading">New Account</h4>

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
              errors.name ? "!border-red-500" : "border-[#9D9D9D]"
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
              errors.email ? "!border-red-500" : "border-[#9D9D9D]"
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
              errors.password ? "!border-red-500" : "!border-[#9D9D9D]"
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
                ? "!border-red-500"
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
              "Create Account"
            )}
          </button>
        </div>

        {/* Already have account */}
        <div className="text-center leading-[38.375px] text-[#333]">
          Already have an account?
          <Link
            href="/auth/login"
            className="font-medium pl-1 underline hover:no-underline transition-all duration-300"
          >
            Log in
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

export default Register;
