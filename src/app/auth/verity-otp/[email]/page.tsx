"use client";
import { useResendOTP, useVerifyOTP } from "@/Hooks/api/auth_api";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CgSpinnerTwo } from "react-icons/cg";
import OTPInput from "react-otp-input";

const page = ({ params }: any) => {
  const { email } = params;
  const [activeResendButton, setActiveResendButton] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isReset, setIsReset] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // mutation:
  const { mutateAsync: verifyOtpMutation, isPending } = useVerifyOTP();
  const { mutateAsync: resendOtpMutation, isPending: isSending } =
    useResendOTP();

  const onSubmit = async (data: any) => {
    const payload = { email: decodeURIComponent(email), ...data };
    await verifyOtpMutation(payload);
  };

  //   handle resend:
  const handleResendCode = (e: any) => {
    e.preventDefault();
    if (email) {
      resendOtpMutation({ email: email });
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
    <section>
      {/* top section */}
      <div>
        {/* title */}
        <h4 className="text-black font-merriweather text-center text-2xl md:text-3xl lg:text-4xl tracking-[-0.36px] leading-[83.146px]">
          Verify account
        </h4>
        <p className="text-center lg:mt-6 tracking-[-0.36px] leading-[28px] max-w-[466px] mx-auto">
          Enter 4 digit code
        </p>
      </div>

      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)} className="lg:mt-8 space-y-6">
        {/* Otp */}
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
                renderSeparator={false}
                renderInput={props => <input {...props} />}
              />
            )}
          />
          {errors.otp && (
            <p className="text-red-500 text-center text-sm mt-3">
              {errors.otp.message as string}
            </p>
          )}
        </div>

        {/* resend otp */}
        <div className="flex flex-col items-center text-textColor gap-3">
          <p>Didn’t Receive Code?</p>

          {/* counter */}
          <div>
            <p>
              <button
                onClick={handleResendCode}
                // disabled={!activeResendButton}
                type="button"
                className={`font-semibold ${
                  activeResendButton
                    ? "text-secondary cursor-pointer"
                    : "text-textColor"
                  // cursor-not-allowed
                }`}
              >
                Resend
              </button>
              <span className="pl-2">
                code in <span>00:{timer < 10 ? `0${timer}` : timer}</span>
              </span>
            </p>
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
                "Verify"
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
