import {
  HidePassSvg,
  ShowPassSvg,
} from "@/components/svg-container/SvgContainer";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { CgSpinnerTwo } from "react-icons/cg";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        reset();
        toast.success("Login successful!");
      }, 1500);
    }
  };

  return (
    <section>
      {/* title */}
      <h4 className="text-black font-merriweather text-center text-2xl md:text-3xl lg:text-4xl tracking-[-0.36px] leading-[83.146px]">
        Login
      </h4>

      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)} className="lg:mt-8 space-y-4 lg:space-y-6">
        {/* email */}
        <div className="flex flex-col gap-1">
          <div className="w-full flex justify-between">
            <label
              htmlFor="email"
              className="text-black leading-[175%] tracking-[-0.064px]"
            >
              Email
            </label>
            {errors.email && <span className="text-red-500">Required</span>}
          </div>
          <input
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className={`${inputClass} ${errors.email ? "border-red-500" : "border-[#9D9D9D]"
              }`}
            type="email"
            name="email"
            id="email"
          />
        </div>

        {/* password */}
        <div className="flex flex-col gap-1">
          <div className="w-full flex justify-between">
            <label
              htmlFor="password"
              className="text-black leading-[175%] tracking-[-0.064px]"
            >
              Password
            </label>
            {errors.password && <span className="text-red-500">Required</span>}
          </div>
          <div
            className={`w-full ${inputClass} relative ${errors.password ? "border-red-500" : "border-[#9D9D9D]"
              }`}
          >
            <input
              {...register("password", { required: true })}
              placeholder="Enter password"
              className="focus:outline-none w-full"
              type={!showPassword ? "password" : "text"}
              name="password"
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

        {/* forgot password */}
        <div className="w-full flex items-center justify-end">
          <Link
            to="/auth/verify-email"
            className="text-textColor underline font-semibold hover:no-underline transition-all duration-300"
          >
            Forgot password?
          </Link>
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
                "Login"
              )}
            </span>
          </button>
        </div>
      </form>

      {/* toggle link */}
      <div className="lg:mt-12 mt-5 text-center text-sm lg:text-base">
        <h6 className="leading-[38.375px]  text-[#333]">
          Don’t have an account?
          <Link
            to="/auth/register"
            className="font-semibold pl-1 underline hover:no-underline transition-all duration-300"
          >
            Create an account
          </Link>
        </h6>
      </div>

      {/* go to home button */}
      <div className="pt-2 lg:pt-12 text-center">
        <Link to="/" className="text-primary underline">
          Go to home
        </Link>
      </div>
    </section>
  );
};

export default Login;
