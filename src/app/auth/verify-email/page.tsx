"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CgSpinnerTwo } from "react-icons/cg";
import { useVerifyEmail } from "@/Hooks/api/auth_api";

type formData = {
  email: string;
};

const page = () => {
  //   mutation::
  const { mutateAsync: verifyEmailMutation, isPending } = useVerifyEmail();

  // Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formData>();

  // Form Data
  const onSubmit = async (data: formData) => {
    await verifyEmailMutation(data);
    reset();
  };

  return (
    <>
      <div>
        {/* Title */}
        <h4 className="text-black font-merriweather text-center text-2xl md:text-3xl lg:text-4xl tracking-[-0.36px] leading-[83.146px]">
          Verify account
        </h4>

        {/* Description */}
        <p className="text-center lg:mt-6 tracking-[-0.36px] leading-[28px] max-w-[466px] mx-auto">
          Lost your password? Please enter your email address. You will receive
          mail with link to set new password.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 lg:mt-8 space-y-3 lg:space-y-6"
      >
        {/* Email */}
        <div className="flex flex-col gap-1">
          <div className="w-full flex justify-between">
            <label
              htmlFor="email"
              className="text-black leading-[175%] tracking-[-0.064px]"
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
            disabled={isPending}
            type="submit"
            className={`leading-[160%] font-semibold text-white tracking-[-0.096px] border-primary w-full border bg-primary rounded-full text-center py-3 hover:bg-transparent hover:text-primary  transition-all duration-300 h-[50px] flex items-center justify-center
                  ${isPending ? "cursor-not-allowed" : "cursor-pointer"}
                  `}
          >
            {isPending ? (
              <CgSpinnerTwo className="animate-spin size-6" />
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </form>

      {/* Back to login */}
      <div className="lg:mt-10 mt-5 text-center">
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
