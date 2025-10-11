"use client";
const AnyRating: any = Rating;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Rating from "react-rating";
import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";
import { BiLoaderCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Container from "@/Components/Common/Container";
import ReviewCard from "@/Components/Cards/ReviewCard";
import { getRecipeReview, useAddReview } from "@/Hooks/api/cms_api";
import { EmptyStarSvg, FullStarSvg } from "@/Components/Svg/SvgContainer";
import { ReviewCardSkeleton } from "@/Components/Loader/Loader";

type ReviewItem = {
  id: number;
  user: {
    avatar: string;
    name: string;
  };
  rating: number;
  comment: string;
  created_date: string;
};

type Props = {
  id: number;
};

const RecipeReview = ({ id }: Props) => {
  // Hooks
  const router = useRouter();
  const { user } = useAuth();

  // States
  const [rating, setRating] = useState<number>(0);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<number>(1);

  // Query & Mutation
  const { data: allReviews, isLoading } = getRecipeReview(id, activePage);
  const { mutateAsync: reviewMutation, isPending } = useAddReview(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    if (user) {
      if (rating === 0) {
        return setFormSubmitted(true);
      }

      const formData = { ...data, rating };
      await reviewMutation(formData);
      reset();
      setRating(0);
      setFormSubmitted(false);
    } else {
      toast.error("Please login first");
      router.push("/auth/login");
    }
  };

  return (
    <Container>
      <section className="py-8 xl:py-10 2xl:py-16 3xl:py-24">
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0 flex flex-col xl:flex-row items-center gap-5 xl:gap-10 3xl:gap-12">
          {/* Left - Form */}
          <div className="w-full xl:flex-1">
            {/* Title */}
            <h5 className="text-xl lg:text-2xl font-semibold text-primary-black">
              Submit your review
            </h5>

            {/* Form */}
            <div className="py-2 lg:py-4 xl:py-8 w-full">
              {/* Ratings */}
              <div className="w-full">
                <p className="text-accent-gray text-sm font-medium">
                  Add your rating <span className="text-[#FF5630]">*</span>
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <AnyRating
                    initialRating={rating}
                    onChange={(rate: any) => setRating(rate)}
                    emptySymbol={<EmptyStarSvg />}
                    fullSymbol={<FullStarSvg />}
                    fractions={1}
                  />
                </div>

                {formSubmitted && rating === 0 && (
                  <p className="text-sm text-red-500 mt-2">
                    Please add a rating before submitting your review.
                  </p>
                )}

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-5 space-y-5 w-full"
                >
                  {/* Email */}
                  <div className="flex flex-col gap-2 w-full">
                    <label className="font-medium text-sm text-accent-gray">
                      Email <span className="text-[#FF5630]">*</span>
                    </label>
                    <input
                      className={`px-3 xl:px-4 py-2 xl:py-4 border rounded-lg w-full focus:outline-none ${
                        user && "cursor-not-allowed"
                      }`}
                      type="email"
                      placeholder={user ? "" : "Join@gmail.com"}
                      defaultValue={user?.email}
                      readOnly={user}
                      disabled={user}
                    />
                  </div>

                  {/* Name */}
                  <div className="flex flex-col gap-2 w-full">
                    <label className="font-medium text-sm text-accent-gray">
                      Name <span className="text-[#FF5630]">*</span>
                    </label>
                    <input
                      className={`px-3 xl:px-4 py-2 xl:py-4 border rounded-lg w-full focus:outline-none ${
                        user && "cursor-not-allowed"
                      }`}
                      type="text"
                      placeholder="Jon Doe"
                      defaultValue={user?.name}
                      readOnly={user}
                      disabled={user}
                    />
                  </div>

                  {/* Review */}
                  <div className="flex flex-col gap-2 w-full">
                    <label
                      htmlFor="comment"
                      className="font-medium text-sm text-accent-gray"
                    >
                      Write your review
                      <span className="text-[#FF5630]">*</span>
                    </label>
                    <textarea
                      rows={5}
                      className={`px-3 xl:px-4 py-2 xl:py-4 resize-none border rounded-lg w-full focus:outline-none ${
                        errors.comment ? "border-red-500" : "border-gray-300"
                      } `}
                      placeholder="Share your thoughts here..."
                      id="comment"
                      {...register("comment", {
                        required: "Review is required",
                      })}
                    ></textarea>
                    {errors.comment && (
                      <span className="text-sm text-red-500">
                        {errors.comment.message as string}
                      </span>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isPending}
                    className={`px-3 xl:px-8 py-2 xl:py-3 text-white font-medium bg-primary-orange hover:bg-transparent transition-all duration-300 rounded-full hover:text-primary-orange border border-primary-orange ${
                      isPending
                        ? "cursor-not-allowed hover:!bg-primary-orange hover:!text-white opacity-90"
                        : "cursor-pointer"
                    }`}
                  >
                    {isPending ? (
                      <span className="flex gap-2 items-center">
                        <BiLoaderCircle className="animate-spin text-xl" />
                        Please wait....
                      </span>
                    ) : (
                      "Submit Review"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right - Contents */}
          <div className="space-y-5 xl:flex-1 w-full">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <ReviewCardSkeleton key={index} />
              ))
            ) : allReviews?.data?.data?.length > 0 ? (
              allReviews?.data?.data?.map((item: ReviewItem, idx: number) => (
                <ReviewCard key={idx} item={item} />
              ))
            ) : (
              <p className="text-primary-orange font-merriweather text-center text-lg lg:text-xl">
                No reviews found yet
              </p>
            )}

            {/* Pagination */}
            <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
              {allReviews?.data?.links.map((item: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() =>
                    item.url && setActivePage(item.url.split("=")[1])
                  }
                  className={`px-3 py-1 rounded border transition-all duration-150 
            ${
              item.active
                ? "bg-primary-orange text-white"
                : "bg-white text-gray-700"
            } 
            ${!item.url ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  disabled={!item.url}
                  dangerouslySetInnerHTML={{ __html: item.label }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default RecipeReview;
