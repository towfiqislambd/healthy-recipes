"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import { useVerifyEmail } from "@/Hooks/api/auth_api";

type formData = {
  email: string;
};

const page = () => {
  // State
  const [errorMessage, setErrorMessage] = useState<string>("");

  //   Mutation:
  const { mutateAsync: verifyEmailMutation, isPending } = useVerifyEmail();

  // Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();

  // Form Data
  const onSubmit = async (data: formData) => {
    await verifyEmailMutation(data, {
      onError: (err: any) => {
        setErrorMessage(err?.response?.data?.message);
      },
    });
  };

  return (
    <>
      {/* Title */}
      <h4 className="auth_heading">Verify account</h4>

      {/* Description */}
      <p className="text-center tracking-[-0.36px] leading-[28px] max-w-[466px] mx-auto">
        Lost your password? Please enter your email address. You will receive
        mail with link to set new password.
      </p>

      {/* From */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 lg:mt-7 space-y-4 lg:space-y-5.5"
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
            <label
              htmlFor="email"
              className="text-primary-black leading-[175%] tracking-[-0.064px]"
            >
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
                Verifying....
              </span>
            ) : (
              "Verity"
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
