import Link from "next/link";
import React from "react";
import { ArrowTopRightSvg } from "@/Components/Svg/SvgContainer";

type blogItem = {
  slug: string;
  title: string;
  author_name: string;
  author_image: string;
  description: string;
  image: string;
  created_date: string;
  category: { category_name: string };
  time_ago: string;
};

type blogProps = {
  item: blogItem;
};

const BlogCard = ({ item }: blogProps) => {
  return (
    <Link
      href={`/blog-details/${item?.slug}`}
      className="bg-white block rounded-lg shadow-[0px_0px_8px_0px_rgba(0,0,0,0.06)] px-3 pt-3 pb-8 group"
    >
      {/* image */}
      <div>
        <div className="w-full h-[230px] md:h-[300px] lg:h-[250px] overflow-hidden rounded-lg">
          <img
            className="w-full h-full object-cover rounded-sm group-hover:scale-110 transition-all duration-300"
            src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item?.image}`}
            alt=""
          />
        </div>
      </div>
      {/* contents */}
      <div className="mt-6">
        <div className="w-full flex items-center justify-between">
          <h5 className="sm:leading-[20px] font-medium text-sm text-primary">
            {item?.category?.category_name} | {item?.time_ago}.
          </h5>
          <p className="leading-[20px] font-medium text-sm text-primary">
            {item?.created_date}
          </p>
        </div>
        {/* title */}
        <div className="space-y-2 mt-1">
          <h4 className="text-lg 2xl:text-xl font-bold sm:leading-[160%] font-merriweather text-black sm:truncate">
            {item?.title}
          </h4>
          <div
            dangerouslySetInnerHTML={{
              __html: item?.description?.slice(0, 80),
            }}
            className="text-textColor 2xl:leading-[150%] "
          />
        </div>

        {/* user info */}
        <div className="mt-3 w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-10">
              <img
                className="h-full w-full object-cover rounded-full"
                src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item?.author_image}`}
                alt="author"
              />
            </div>
            <div>
              <h5 className="text-black font-medium leading-[140%] text-sm">
                {item?.author_name}
              </h5>
              <p className="text-textColor text-sm leading-[140%]">
                {item?.created_date}
              </p>
            </div>
          </div>

          <div className="hover:scale-110 transition-all duration-300 block">
            <ArrowTopRightSvg />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
