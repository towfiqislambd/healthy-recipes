"use client";
import {
  BackArrowSvg,
  PauseButtonSvg,
  PlayButtonSvg,
} from "@/Components/Svg/SvgContainer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useRef, useState } from "react";
import { getRecipeDetails, getShareRecipe } from "@/Hooks/api/cms_api";
import Container from "@/Components/Common/Container";
import RecipeReview from "@/Components/PageComponents/mainPages/recipeDetailsComponents/RecipeReview";
import ShareYourMeal from "@/Components/PageComponents/mainPages/homePageComponents/ShareYourMeal";
import ShareRecipeSocialMedia from "@/Components/PageComponents/mainPages/recipeDetailsComponents/ShareRecipeSocialMedia";

interface Props {
  params: Promise<{ id: number }>;
}

const page = ({ params }: Props) => {
  const [fullLocation, setFullLocation] = useState<string>("");

  // Hooks
  const router = useRouter();
  const { id } = use(params);

  // States
  const videoRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Query
  const { data: shareRecipe, isLoading: shareRecipeLoading } = getShareRecipe();
  const { data: recipeData, isLoading: recipeDataLoading } =
    getRecipeDetails(id);

  // Play Func
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.setAttribute("loop", "true");
      videoRef.current.setAttribute("muted", "true");
      videoRef.current.setAttribute("autoplay", "true");
    }
    setIsPlaying(true);
  };

  // Pause Func
  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("loop");
      videoRef.current.removeAttribute("muted");
      videoRef.current.removeAttribute("autoplay");
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullLocation(`${window.location.origin}/recipe-details/${id}`);
    }
  }, [id]);

  return (
    <>
      <div className="bg-[#B7E4C7] pt-5 lg:pt-10 3xl:pt-16 pb-40 ">
        <Container>
          <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
            {/* Back button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[#373E85] group cursor-pointer"
            >
              <span className="group-hover:-translate-x-1 duration-300 transition-all">
                <BackArrowSvg />
              </span>
              <span>Back</span>
            </button>

            {/* Recipe Name */}
            <h3 className="mx-auto mt-2 max-w-[490px] text-center text-[#2D6A4F] text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl font-bold font-merriweather leading-[130%]">
              {recipeData?.data?.recipe_name}
            </h3>
          </div>
        </Container>
      </div>

      {/* Recipe Image */}
      <Container>
        <div className="w-full overflow-hidden -mt-[130px] lg:-mt-32 xl:-mt-28 xl:mb-10 2xl:mb-20">
          <figure className="h-[220px] sm:h-[250px] lg:h-[320px] xl:h-[400px] 2xl:h-[520px] rounded-2xl lg:px-3 xl:px-5 2xl:px-10 3xl:px-0 relative">
            <Image
              className="w-full h-full object-cover rounded-2xl"
              src={`${process.env.NEXT_PUBLIC_SITE_URL}/${recipeData?.data?.recipe_image}`}
              fill
              alt="banner-image"
            />
          </figure>
        </div>
      </Container>

      <div className="pb-8 xl:pb-10 2xl:pb-20">
        <Container>
          <div className="flex flex-col xl:flex-row w-full gap-5 lg:gap-8 xl:gap-10 3xl:gap-24 lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
            {/* Left */}
            <div className="w-full xl:w-[500px] 3xl:mt-5 bg-white rounded-lg h-full p-5">
              {/* Ingredients */}
              <div>
                <h5 className="text-black text-lg sm:text-xl 2xl:text-2xl font-bold 2xl:leading-[130%] font-merriweather">
                  Ingredients:
                </h5>

                <div className="mt-4 lg:mt-5 2xl:mt-8 space-y-3 2xl:space-y-5">
                  {recipeData?.data?.ingredients.map((item: any) => (
                    <li
                      key={item?.id}
                      className="text-textColor leading-[130%]"
                      dangerouslySetInnerHTML={{
                        __html: item?.ingredient_name,
                      }}
                    ></li>
                  ))}
                </div>
              </div>

              <div className="mt-5 sm:mt-8 2xl:mt-10 space-y-2 text-[15px] sm:text-base sm:space-y-3 2xl:space-y-4">
                <div className="w-full flex items-center justify-between">
                  <p className="text-textColor">Serving number</p>
                  <p className="text-black font-medium">
                    {recipeData?.data?.serving_number}
                  </p>
                </div>

                <div className="w-full flex items-center justify-between">
                  <p className="text-textColor">Preparation time</p>
                  <p className="text-black font-medium">
                    {recipeData?.data?.preparation_time}
                  </p>
                </div>

                <div className="w-full flex items-center justify-between">
                  <p className="text-textColor">Cooking time</p>
                  <p className="text-black font-medium">
                    {recipeData?.data?.cooking_time}
                  </p>
                </div>
              </div>

              {/* Nutrition */}
              <div className="pt-5 sm:pt-7 lg:pt-8">
                <h5 className="text-black text-lg sm:text-xl 2xl:text-2xl font-bold 2xl:leading-[130%] font-merriweather">
                  Nutrition:
                </h5>

                <div
                  className="mt-3 2xl:mt-8 space-y-3 2xl:space-y-5 text-textColor leading-7 2xl:leading-10"
                  dangerouslySetInnerHTML={{
                    __html:
                      recipeData?.data?.nutritions ||
                      recipeData?.data?.nutrition_info,
                  }}
                />
              </div>

              {/* Tags */}
              <div className="pt-5 sm:pt-8">
                <h5 className="text-black text-lg sm:text-xl 2xl:text-2xl font-bold leading-[130%] font-merriweather">
                  Tags:
                </h5>

                <div className="mt-5 2xl:mt-8 flex items-center flex-wrap gap-3">
                  {recipeData?.data?.tag_names
                    ? recipeData?.data?.tag_names?.map((item: any) => (
                        <div
                          key={item?.id}
                          className="bg-[#EFEFEF] px-2 py-1 rounded-sm w-fit text-textColor"
                        >
                          {item?.tag_name}
                        </div>
                      ))
                    : recipeData?.data?.tags?.map((item: any) => (
                        <div
                          key={item.id}
                          className="bg-[#EFEFEF] px-2 py-1 rounded-sm w-fit text-textColor"
                        >
                          {item?.tag_name}
                        </div>
                      ))}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="grow h-full sm:min-h-[50vh]">
              <div>
                {/* Recipe Video */}
                {recipeData?.data?.recipe_video && (
                  <div className="w-full 2xl:h-[480px] h-[250px] md:h-[300px] relative group">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover rounded-2xl"
                      src={`${process.env.NEXT_PUBLIC_SITE_URL}/${recipeData?.data?.recipe_video}`}
                    ></video>

                    <div
                      onClick={handlePlay}
                      className={`size-16 opacity-0 group-hover:opacity-100 transition-all duration-700 items-center justify-center bg-primary rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                        !isPlaying ? "flex" : "hidden"
                      }`}
                    >
                      <PlayButtonSvg />
                    </div>
                    <div
                      onClick={handlePause}
                      className={`size-16 opacity-0 group-hover:opacity-100 transition-all duration-700  items-center justify-center bg-primary rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer   ${
                        isPlaying ? "flex" : "hidden"
                      } `}
                    >
                      <PauseButtonSvg />
                    </div>
                  </div>
                )}

                {/* Instructions */}
                <div className="pt-5">
                  <h5 className="text-black text-xl 2xl:text-2xl font-bold leading-[130%] font-merriweather">
                    Instructions:
                  </h5>

                  <div className="mt-4 2xl:mt-6 space-y-3 2xl:space-y-5">
                    {recipeData?.data?.instructions?.map(
                      (item: any, idx: number) => (
                        <p
                          key={item?.id}
                          className="text-textColor 2xl:text-lg font-medium"
                        >
                          <span>Step-{idx + 1}: </span> {item?.step}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Share in social media */}
        <ShareRecipeSocialMedia fullLocation={fullLocation} />
      </div>

      <ShareYourMeal data={shareRecipe?.data} />

      <RecipeReview id={id} />
    </>
  );
};

export default page;
