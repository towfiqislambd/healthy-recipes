"use client";
import Link from "next/link";
import OTPInput from "react-otp-input";
import { BiLoaderCircle } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useResendOTP, useVerifyOTP } from "@/Hooks/api/auth_api";

type formData = {
  otp: string;
};

const page = ({ params }: any) => {
  // Hook
  const { email } = params;

  // States
  const [timer, setTimer] = useState<number>(60);
  const [isReset, setIsReset] = useState<boolean>(false);
  const [activeResendButton, setActiveResendButton] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Mutations
  const { mutateAsync: verifyOtpMutation, isPending } = useVerifyOTP();
  const { mutateAsync: resendOtpMutation, isPending: isReSending } =
    useResendOTP();

  // Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();

  // Form Data
  const onSubmit = async (data: formData) => {
    const payload = { email: decodeURIComponent(email), ...data };
    await verifyOtpMutation(payload, {
      onError: (err: any) => {
        setErrorMessage(err?.response?.data?.message);
      },
    });
  };

  // Func for resend otp
  const handleResendCode = (e: any) => {
    e.preventDefault();
    if (email) {
      resendOtpMutation({ email: decodeURIComponent(email) });
    }
    setActiveResendButton(false);
    setTimer(60);
    setIsReset(false);
  };

  useEffect(() => {
    let interval: any;

    if (timer > 0 && !isReset) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0) {
      setActiveResendButton(true);
    }
    return () => clearInterval(interval);
  }, [isReset, timer]);

  return (
    <>
      {/* Title */}
      <h4 className="auth_heading">Verify account</h4>

      {/* Description */}
      <p className="-mt-2 text-center tracking-[-0.36px] leading-[28px] max-w-[466px] mx-auto">
        Enter 4 digit code
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:mt-5 space-y-4 lg:space-y-5.5"
      >
        {/* Dynamic Error Message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
            {errorMessage}
          </div>
        )}

        {/* OTP */}
        <div id="otp_container" className="sm:mt-10 mt-6 mb-7">
          <Controller
            name="otp"
            control={control}
            rules={{
              required: "OTP is required",
              minLength: { value: 4, message: "OTP must be 4 digits" },
            }}
            render={({ field }) => (
              <OTPInput
                {...field}
                value={field.value || ""}
                onChange={field.onChange}
                numInputs={4}
                renderInput={props => <input {...props} />}
                containerStyle={
                  "flex items-center justify-center sm:gap-5 gap-2"
                }
                inputStyle={`!h-12 !w-14 md:!h-20 md:!w-22 bg-gray-200 border border-gray-200 rounded-lg md:rounded-2xl focus:outline-2 outline-primary-orange`}
              />
            )}
          />
          {errors.otp && (
            <p className="text-red-500 text-center text-sm mt-3">
              {errors.otp.message}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center text-accent-gray gap-3">
          <p>Didn’t Receive Code?</p>

          <p>
            <button
              type="button"
              onClick={handleResendCode}
              className={`font-semibold cursor-pointer ${
                activeResendButton
                  ? "text-secondary-blue cursor-pointer"
                  : "text-accent-gray"
              }`}
            >
              {isReSending ? (
                <span className="flex gap-1.5 items-center">
                  <BiLoaderCircle className="animate-spin text-lg" />
                  Resending
                </span>
              ) : (
                "Resend"
              )}
            </button>

            <span className="pl-2">
              code in <span>00:{timer < 10 ? `0${timer}` : timer}</span>
            </span>
          </p>
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
              "Verify"
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
