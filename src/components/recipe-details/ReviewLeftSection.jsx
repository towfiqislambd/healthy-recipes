import { useState } from "react";
import { useForm } from "react-hook-form";
import Rating from "react-rating";
import { EmptyStarSvg, FullStarSvg } from "../svg-container/SvgContainer";
import useAuth from "@/hooks/useAuth";
import { useAddReview } from "@/hooks/cms.mutations";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ReviewLeftSection = ({ id, refetch }) => {
  const navigate = useNavigate()
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);  // Track if form is submitted
  const { mutateAsync: reviewMutation } = useAddReview(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (user) {
      if (id) {
        if (rating === 0) {
          setFormSubmitted(true);  // Show rating error if submitted without rating
          return;
        }

        const formData = { ...data, rating };
        await reviewMutation(formData);
        reset();
        refetch();
        setRating(0);
        setFormSubmitted(false);  // Reset the form submission status
      }
    } else {
      toast.error('Please login first')
      navigate('/auth/login')
    }
  };

  return (
    <div className="w-full">
      {/* title */}
      <h5 className="text-xl lg:text-2xl font-semibold text-black">
        Submit your review
      </h5>

      {/* form */}
      <div className="py-2 lg:py-4 xl:py-8 w-full">
        {/* rating */}
        <div className="w-full">
          <p className="text-textColor text-sm font-medium">
            Add your rating <span className="text-[#FF5630]">*</span>
          </p>

          {/* interactive stars */}
          <div className="mt-2 flex items-center gap-2">
            <Rating
              initialRating={rating}
              onChange={(rate) => setRating(rate)}
              emptySymbol={<EmptyStarSvg />}
              fullSymbol={<FullStarSvg />}
              fractions={1}
            />
          </div>

          {/* Show rating validation message after form submission */}
          {formSubmitted && rating === 0 && (
            <p className="text-sm text-red-500 mt-2">
              Please add a rating before submitting your review.
            </p>
          )}

          {/* form inputs */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5 w-full">
            {/* Email */}
            <div className="flex flex-col gap-2 w-full">
              <label className="font-medium text-sm text-textColor">
                Email <span className="text-[#FF5630]">*</span>
              </label>
              <input
                className={`px-3 lg:px-4 py-2 lg:py-4 border rounded-lg w-full focus:outline-none`}
                type="email"
                placeholder={user ? '' : 'Join@gmail.com'}
                defaultValue={user?.email}
                readOnly={user && true}
                disabled={user && true}
              />
            </div>

            {/* Name */}
            <div className="flex flex-col gap-2 w-full">
              <label className="font-medium text-sm text-textColor">
                Name <span className="text-[#FF5630]">*</span>
              </label>
              <input
                className={`px-3 lg:px-4 py-2 lg:py-4 border rounded-lg w-full focus:outline-none}`}
                type="text"
                placeholder={user ? '' : 'Jon Doe'}
                defaultValue={user?.name}
                readOnly={user && true}
                disabled={user && true}
              />
            </div>

            {/* Review */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="comment" className="font-medium text-sm text-textColor">
                Write your review <span className="text-[#FF5630]">*</span>
              </label>
              <textarea
                rows={5}
                className={`px-3 lg:px-4 py-2 lg:py-4 resize-none border rounded-lg w-full focus:outline-none ${errors.comment ? "border-red-500" : "border-[#8993A4]"} `}
                placeholder="Share your thoughts here..."
                id="comment"
                {...register("comment", { required: "Review is required" })}
              ></textarea>
              {errors.comment && (
                <span className="text-sm text-red-500">{errors.comment.message}</span>
              )}
            </div>

            {/* Submit button */}
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
