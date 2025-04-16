import {
  HidePassSvg,
  ShowPassSvg,
} from "@/components/svg-container/SvgContainer";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { CgSpinnerTwo } from "react-icons/cg";
import { useRegister } from "@/hooks/auth.hook.";

const Register = () => {
  // State:
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // CSS:
  const inputClass =
    "rounded-lg border-[0.5px] bg-none shadow-[0px_0px_4px_0px_rgba(0,9,54,0.06)] focus:outline-none px-3 lg:px-5 py-2 lg:py-3";

  // Hook Form 
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  // Mutation
  const { mutateAsync: registerMutation } = useRegister();

  // All Form Data
  const onSubmit = async (data) => {
    setLoading(true); // ✅ Set loading to true before API call
    try {
      await registerMutation(data);
      reset();
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false); // ✅ Always reset loading after the attempt
    }
  };

  return (
    <section>
      <h4 className="text-black text-center font-merriweather text-2xl md:text-3xl lg:text-4xl tracking-[-0.36px] leading-[83.146px]">
        New account
      </h4>

      <form onSubmit={handleSubmit(onSubmit)} className="lg:mt-8 space-y-4 lg:space-y-6">
        {/* Name */}
        <div className="flex flex-col gap-1">
          <div className="w-full flex justify-between">
            <label htmlFor="name" className="text-black leading-[175%] tracking-[-0.064px]">
              Full Name
            </label>
            {errors.name && <span className="text-red-500">Name is required</span>}
          </div>
          <input
            {...register("name", { required: true })}
            placeholder="Enter your Full Name"
            className={`${inputClass} ${errors.name ? "border-red-500" : "border-[#9D9D9D]"}`}
            type="text"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <div className="w-full flex justify-between">
            <label htmlFor="email" className="text-black leading-[175%] tracking-[-0.064px]">
              Email
            </label>
            {errors.email && <span className="text-red-500">Email is required</span>}
          </div>
          <input
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className={`${inputClass} ${errors.email ? "border-red-500" : "border-[#9D9D9D]"}`}
            type="email"
            id="email"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <div className="w-full flex justify-between">
            <label htmlFor="password" className="text-black leading-[175%] tracking-[-0.064px]">
              Password
            </label>
            {errors.password && <span className="text-red-500">Password is required</span>}
          </div>
          <div
            className={`w-full ${inputClass} relative ${errors.password ? "border-red-500" : "border-[#9D9D9D]"
              }`}
          >
            <input
              {...register("password", { required: true })}
              placeholder="Enter password"
              className="focus:outline-none w-full bg-transparent"
              type={!showPassword ? "password" : "text"}
              id="password"
            />
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <ShowPassSvg /> : <HidePassSvg />}
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1">
          <div className="w-full flex justify-between">
            <label htmlFor="password_confirmation" className="text-black leading-[175%] tracking-[-0.064px]">
              Confirm Password
            </label>
            {errors.password_confirmation && (
              <span className="text-red-500">{errors.password_confirmation.message}</span>
            )}
          </div>
          <div className={`w-full ${inputClass} relative ${errors.password_confirmation ? "border-red-500" : "border-[#9D9D9D]"}`}>
            <input
              {...register("password_confirmation", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              placeholder="Enter password again"
              className="focus:outline-none w-full bg-transparent"
              type={!confirmPassword ? "password" : "text"}
              id="confirmPassword"
            />
            <div
              onClick={() => setConfirmPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {confirmPassword ? <ShowPassSvg /> : <HidePassSvg />}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="w-full pt-2">
          <button
            disabled={loading}
            type="submit"
            className={`leading-[160%] font-semibold text-white tracking-[-0.096px] border-primary w-full border bg-primary rounded-full text-center py-3 hover:bg-transparent hover:text-primary transition-all duration-300 h-[50px] flex items-center justify-center
              ${loading ? "cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            <span>
              {loading ? (
                <CgSpinnerTwo className="animate-spin size-6" />
              ) : (
                "Create account"
              )}
            </span>
          </button>
        </div>
      </form>

      {/* Toggle link */}
      <div className="lg:mt-10 mt-5 text-center">
        <h6 className="leading-[38.375px] text-[#333]">
          Already have an account?
          <Link
            to={"/auth/login"}
            className="font-semibold pl-1 underline hover:no-underline transition-all duration-300"
          >
            Log in
          </Link>
        </h6>
      </div>

      {/* Home link */}
      <div className="lg:pt-10 pt-3 text-center">
        <Link to="/" className="text-primary underline">
          Go to home
        </Link>
      </div>
    </section>
  );
};

export default Register;
