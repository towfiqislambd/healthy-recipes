import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { CgSpinnerTwo } from 'react-icons/cg';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // css:
  const inputClass =
    'rounded-lg border-[0.5px]  shadow-[0px_0px_4px_0px_rgba(0,9,54,0.06)] focus:outline-none px-3 lg:px-5 py-2 lg:py-3';

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
        toast.success('Email Verification successful!');
        navigate('/auth/verify-otp');
      }, 1500);
    }
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
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 lg:mt-8 space-y-3 lg:space-y-6">
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
            {...register('email', { required: true })}
            placeholder="Enter your email"
            className={`${inputClass} ${errors.email ? 'border-red-500' : 'border-[#9D9D9D]'
              }`}
            type="email"
            name="email"
            id="email"
          />
        </div>

        {/* submit button */}
        <div className="w-full pt-2">
          <button
            disabled={loading}
            type="submit"
            className={`leading-[160%] font-semibold text-white tracking-[-0.096px] border-primary w-full border bg-primary rounded-full text-center py-3 hover:bg-transparent hover:text-primary  transition-all duration-300 h-[50px] flex items-center justify-center
                ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
          >
            <span>
              {loading ? (
                <CgSpinnerTwo className="animate-spin size-6" />
              ) : (
                'Verify'
              )}
            </span>
          </button>
        </div>
      </form>

      {/* toggle link */}
      <div className="lg:mt-10 mt-5 text-center">
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

export default VerifyEmail;
