import { useForm } from "react-hook-form";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { ImSpinner9 } from "react-icons/im";
import { useUserPasswordUpdate } from "@/hooks/auth.hook.";

const UpdatePasswordModal = ({ setOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mutation:
  const { mutateAsync: userPasswordUpdateMutation, isPending } =
    useUserPasswordUpdate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  // Handlers:
  const onSubmit = async data => {
    try {
      await userPasswordUpdateMutation(data);
      setOpen(false);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-2xl text-headingTextColor font-semibold">
          Change Password
        </DialogTitle>
      </DialogHeader>

      <DialogDescription>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Current Password */}
          <div>
            <label
              htmlFor="current_password"
              className="font-medium block w-full mb-[6px] text-black"
            >
              Current Password
            </label>
            <div className="relative border border-gray-800 rounded-md">
              <input
                id="current_password"
                type={showPassword ? "text" : "password"}
                {...register("current_password", {
                  required: "Current Password is required",
                })}
                placeholder="Password"
                className="bg-transparent outline-none text-black rounded-md pr-9 py-3 pl-4 block w-full"
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
                {errors.current_password.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="password"
              className="font-medium block w-full mb-[6px] text-black"
            >
              New Password
            </label>
            <div className="relative border border-gray-800 rounded-md">
              <input
                id="password"
                type={showNewPassword ? "text" : "password"}
                {...register("password", {
                  required: "New Password is required",
                })}
                placeholder="Password"
                className="bg-transparent outline-none text-black rounded-md pr-9 py-3 pl-4 block w-full"
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
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="pb-2">
            <label
              htmlFor="password_confirmation"
              className="font-medium block w-full mb-[6px] text-black"
            >
              Confirm New Password
            </label>
            <div className="relative border border-gray-800 rounded-md">
              <input
                id="password_confirmation"
                type={showConfirmPassword ? "text" : "password"}
                {...register("password_confirmation", {
                  required: "Confirm Password is required",
                  validate: value =>
                    value === password || "Passwords do not match",
                })}
                placeholder="Password"
                className="bg-transparent text-black outline-none rounded-md pr-9 py-3 pl-4 block w-full"
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
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className={`flex justify-center w-full group duration-300 mx-auto transition-all hover:text-primary font-medium py-3 rounded-lg bg-primary border text-center border-primary text-white border-primaryBgColor ${
              isPending ? "cursor-not-allowed" : "hover:bg-transparent"
            }`}
          >
            {isPending ? (
              <ImSpinner9 className="animate-spin text-white text-xl text-center" />
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </DialogDescription>
    </DialogContent>
  );
};

export default UpdatePasswordModal;
