import {
  HidePassSvg,
  ShowPassSvg,
} from "@/components/svg-container/SvgContainer";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { CgSpinnerTwo } from "react-icons/cg";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // css:
  const inputClass =
    "rounded-lg border-[0.5px]  shadow-[0px_0px_4px_0px_rgba(0,9,54,0.06)] focus:outline-none px-3 lg:px-5 py-2 lg:py-3";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data) {
      console.log(data);
      if (data?.confirm_new_password == data?.new_password) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          reset();
          toast.success("Login successful!");
          navigate("/auth/login");
        }, 1500);
      } else {
        toast.error("Passwords do not match");
      }
    }
  };

  return (
    <section>
      {/* top section */}
      <div>
        {/* title */}
        <h4 className="text-black font-merriweather text-center text-2xl md:text-3xl lg:text-4xl tracking-[-0.36px] leading-[83.146px]">
          Create new password
        </h4>
        <p className="text-center lg:mt-6 tracking-[-0.36px] leading-[28px] max-w-[466px] mx-auto text-textColor">
          Please enter and confirm your new password. You will need to login
          after you reset.
        </p>
      </div>

      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:mt-8 mt-5 lg:space-y-6 space-y-3"
      >
        {/*new password */}
        <div>
          <div className="flex flex-col gap-1">
            <div className="w-full flex justify-between">
              <label
                htmlFor="new_password"
                className="text-black leading-[175%] tracking-[-0.064px]"
              >
                New password
              </label>
              {errors.new_password && (
                <span className="text-red-500">Required</span>
              )}
            </div>
            <div
              className={`w-full ${inputClass} relative ${errors.new_password ? "border-red-500" : "border-[#9D9D9D]"
                }`}
            >
              <input
                {...register("new_password", { required: true })}
                placeholder="Enter your new password"
                className="focus:outline-none w-full"
                type={!showPassword ? "password" : "text"}
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <ShowPassSvg /> : <HidePassSvg />}
              </div>
            </div>
          </div>
          <p className="pt-2 text-sm text-textColor">
            Password must have 8 char, a number and a special char
          </p>
        </div>

        {/* confirm new password */}
        <div className="flex flex-col gap-1">
          <div className="w-full flex justify-between">
            <label
              htmlFor="confirm_new_password"
              className="text-black leading-[175%] tracking-[-0.064px]"
            >
              Confirm new password
            </label>
            {errors.confirm_new_password && (
              <span className="text-red-500">Required</span>
            )}
          </div>
          <div
            className={`w-full ${inputClass} relative ${errors.confirm_new_password
              ? "border-red-500"
              : "border-[#9D9D9D]"
              }`}
          >
            <input
              {...register("confirm_new_password", { required: true })}
              placeholder="Enter your new password"
              className="focus:outline-none w-full"
              type={!showConfirmPassword ? "password" : "text"}
            />
            <div
              onClick={() => setConfirmShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showConfirmPassword ? <ShowPassSvg /> : <HidePassSvg />}
            </div>
          </div>
        </div>

        {/* submit button */}
        <div className="w-full pt-2">
          <button
            disabled={loading}
            type="submit"
            className={`leading-[160%] font-semibold text-white tracking-[-0.096px] border-primary w-full border bg-primary rounded-full text-center py-3 hover:bg-transparent hover:text-primary  transition-all duration-300 h-[50px] flex items-center justify-center
                  ${loading ? "cursor-not-allowed" : "cursor-pointer"}
                  `}
          >
            <span>
              {loading ? (
                <CgSpinnerTwo className="animate-spin size-6" />
              ) : (
                "Reset password"
              )}
            </span>
          </button>
        </div>
      </form>

      {/* toggle link */}
      <div className="sm:mt-12 mt-3 text-center">
        <Link
          to="/auth/login"
          className="font-semibold leading-[38.375px] text-[#333] pl-1 underline hover:no-underline transition-all duration-300"
        >
          Back to login
        </Link>
      </div>
    </section>
  );
};

export default ResetPassword;
