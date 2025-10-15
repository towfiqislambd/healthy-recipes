"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import { useChangePassword } from "@/Hooks/api/auth_api";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

type formData = {
  password: string;
  current_password: string;
  password_confirmation: string;
};

type UpdatePasswordModalProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdatePasswordModal: React.FC<UpdatePasswordModalProps> = ({
  setOpen,
}) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // Mutation:
  const { mutateAsync: userPasswordUpdateMutation, isPending } =
    useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<formData>();

  const password = watch("password");

  // Handlers:
  const onSubmit = async (data: formData) => {
    setErrorMessage("");
    await userPasswordUpdateMutation(data, {
      onSuccess: (data: any) => {
        if (data?.success) {
          setOpen(false);
          reset();
        }
      },
      onError: (err: any) => {
        setErrorMessage(err?.response?.data?.message);
      },
    });
  };

  return (
    <>
      <h3 className="text-xl lg:text-2xl text-accent-gray font-semibold mb-3">
        Change Password
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Dynamic Error Message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Current Password */}
        <div>
          <label
            htmlFor="current_password"
            className="font-medium block w-full mb-[6px] text-primary-black"
          >
            Current Password
          </label>
          <div className="relative border border-gray-300 rounded-md">
            <input
              id="current_password"
              type={showPassword ? "text" : "password"}
              {...register("current_password", {
                required: "Current Password is required",
              })}
              placeholder="Password"
              className="bg-transparent outline-none text-primary-black rounded-md pr-9 py-3 pl-4 block w-full"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <IoEyeOutline className="text-xl" />
              ) : (
                <IoEyeOffOutline className="text-xl" />
              )}
            </span>
          </div>
          {errors.current_password && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.current_password.message as string}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor="password"
            className="font-medium block w-full mb-[6px] text-primary-black"
          >
            New Password
          </label>
          <div className="relative border border-gray-300 rounded-md">
            <input
              id="password"
              type={showNewPassword ? "text" : "password"}
              {...register("password", {
                required: "New Password is required",
              })}
              placeholder="Password"
              className="bg-transparent outline-none text-primary-black rounded-md pr-9 py-3 pl-4 block w-full"
            />
            <span
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2"
            >
              {showNewPassword ? (
                <IoEyeOutline className="text-xl" />
              ) : (
                <IoEyeOffOutline className="text-xl" />
              )}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.password.message as string}
            </p>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="pb-2">
          <label
            htmlFor="password_confirmation"
            className="font-medium block w-full mb-[6px] text-primary-black"
          >
            Confirm New Password
          </label>
          <div className="relative border border-gray-300 rounded-md">
            <input
              id="password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              {...register("password_confirmation", {
                required: "Confirm Password is required",
                validate: value =>
                  value === password || "Passwords do not match",
              })}
              placeholder="Password"
              className="bg-transparent text-primary-black outline-none rounded-md pr-9 py-3 pl-4 block w-full"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <IoEyeOutline className="text-xl" />
              ) : (
                <IoEyeOffOutline className="text-xl" />
              )}
            </span>
          </div>
          {errors.password_confirmation && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.password_confirmation.message as string}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className={`flex justify-center w-full group duration-300 mx-auto transition-all hover:text-primary-orange font-medium py-3 rounded-lg bg-primary-orange border text-center border-primary-orange text-white ${
            isPending
              ? "cursor-not-allowed hover:!bg-primary-orange hover:!text-white opacity-90"
              : "hover:bg-transparent cursor-pointer"
          }`}
        >
          {isPending ? (
            <span className="flex gap-2 items-center">
              <BiLoaderCircle className="animate-spin text-xl" />
              Changing....
            </span>
          ) : (
            "Change Password"
          )}
        </button>
      </form>
    </>
  );
};

export default UpdatePasswordModal;
