import parse from "html-react-parser";
import { Link } from "react-router-dom";
import banner from "@/assets/images/share-recipe-bg.png";
import { AddSvgLight } from "@/components/svg-container/SvgContainer";

const ShareYourRecipeSection = ({ data }) => {
  return (
    <section
      className="py-10 lg:py-20"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
      }}
    >
      {data?.map((item, idx) => (
        <div key={idx} className="container w-full">
          <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-5 justify-between lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
            <div className="flex gap-5">
              <div className="flex-shrink-0">
                <img
                  src={`${import.meta.env.VITE_SITE_URL}/${item?.image}`}
                  alt=""
                />
              </div>
              <div className="max-w-[700px] font-inter lg:text-lg xl:text-xl 2xl:text-2xl font-medium leading-[150%] text-white">
                {typeof item?.description === "string"
                  ? parse(item?.description)
                  : item?.description}
              </div>
            </div>

            {/* share recipe button */}
            <Link
              to="/dashboard/dashboard-share-recipes"
              className="px-6 py-3 rounded-full text-white border border-white relative mt-5 flex-shrink-0"
            >
              {item?.btn_text}
              <div className="absolute -top-2.5 left-[6px]">
                <AddSvgLight />
              </div>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ShareYourRecipeSection;
