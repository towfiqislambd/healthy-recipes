import { EmptyStarSvg } from "../svg-container/SvgContainer";

const ReviewLeftSection = () => {
  return (
    <div className="w-full">
      {/* title */}
      <h5 className="text-xl lg:text-2xl font-semibold text-black">Submit your review</h5>

      {/* form */}
      <div className="py-2 lg:py-4 xl:py-8 w-full">
        {/* rating */}
        <div className="w-full">
          <p className="text-textColor text-sm font-medium">
            Add your rating <span className="text-[#FF5630]">*</span>
          </p>

          {/* stars */}
          <div className="mt-2 flex items-center gap-2">
            <EmptyStarSvg />
            <EmptyStarSvg />
            <EmptyStarSvg />
            <EmptyStarSvg />
            <EmptyStarSvg />
          </div>

          {/* form inputs */}
          <form className="mt-5 space-y-5 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="email"
                className="font-medium text-sm text-textColor"
              >
                Email <span className="text-[#FF5630]">*</span>
              </label>

              <input
                className="px-3 lg:px-4 py-2 lg:py-4 border border-[#8993A4] focus:outline-none rounded-lg w-full"
                placeholder="johndoe456@gmail.com"
                type="email"
                name="email"
                id=""
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="name"
                className="font-medium text-sm text-textColor"
              >
                Name <span className="text-[#FF5630]">*</span>
              </label>

              <input
                className="px-3 lg:px-4 py-2 lg:py-4 border border-[#8993A4] focus:outline-none rounded-lg w-full"
                placeholder="John Doe"
                type="text"
                name="name"
                id=""
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="review"
                className="font-medium text-sm text-textColor"
              >
                Write your review <span className="text-[#FF5630]">*</span>
              </label>

              <textarea
                rows={5}
                className="px-3 lg:px-4 py-2 lg:py-4 resize-none border border-[#8993A4] focus:outline-none rounded-lg w-full"
                placeholder="John Doe"
                type="text"
                name="review"
                id=""
              ></textarea>
            </div>

            {/* submit button */}
            <div>
              <button
                className="px-5 lg:px-8 py-2 lg:py-3 text-white font-medium bg-primary hover:bg-transparent transition-all duration-300 rounded-full hover:text-primary border border-primary"
                type="submit"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewLeftSection;
