"use client";
import { useVerifyEmail } from "@/Hooks/api/auth_api";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { CgSpinnerTwo } from "react-icons/cg";

const page = () => {
  //   mutation::
  const { mutateAsync: verifyEmailMutation, isPending } = useVerifyEmail();

  // css:
  const inputClass =
    "rounded-lg border-[0.5px]  shadow-[0px_0px_4px_0px_rgba(0,9,54,0.06)] focus:outline-none px-3 lg:px-5 py-2 lg:py-3";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Form Data
  const onSubmit = async (data: any) => {
    await verifyEmailMutation(data);
    reset();
  };
  return (
    <section>
      {/* top section */}
      <div>
        {/* title */}
        <h4 className="text-black font-merriweather text-center text-2xl md:text-3xl lg:text-4xl tracking-[-0.36px] leading-[83.146px]">
          Verify account
        </h4>
        <p className="text-center lg:mt-6 tracking-[-0.36px] leading-[28px] max-w-[466px] mx-auto">
          Lost your password? Please enter your email address. You will receive
          mail with link to set new password.
        </p>
      </div>

      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 lg:mt-8 space-y-3 lg:space-y-6"
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
              <span className="text-red-500 text-sm">Email is Required</span>
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
                "Verify"
              )}
            </span>
          </button>
        </div>
      </form>

      {/* toggle link */}
      <div className="lg:mt-10 mt-5 text-center">
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
