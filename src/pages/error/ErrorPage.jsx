import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen text-center max-h-screen text-white flex items-center justify-center bg-[#FBB049]">
      {/* contents */}
      <div>
        <h4 className="text-5xl lg:text-6xl xl:text-8xl font-bold font-merriweather xl:leading-[83.146px] tracking-[-0.96px]">
          404
        </h4>
        <div className="my-7 xl:my-10">
          <p className="text-[22px] md:text-3xl xl:text-4xl font-medium tracking-[-.32px] mb-3  md:mb-5 xl:mb-0 xl:leading-[83.146px]">
            Oops, this page is not found
          </p>
          <p className="text-xl md:text-2xl xl:text-3xl mb-3  md:mb-5 xl:mb-0 xl:leading-[83.146px] tracking-[-.32px] font-medium">
            The link might be corrupted
          </p>
          <p className="md:text-lg xl:text-xl tracking-[-0.2px] font-medium">
            or the page may have been removed
          </p>
        </div>

        {/* back to home button */}
        <Link
          to="/"
          className="px-3 md:px-6 rounded-full py-2 md:py-3 text-primary font-medium bg-white hover:bg-transparent hover:text-white border border-white transition-all duration-300"
        >
          Go back to home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
