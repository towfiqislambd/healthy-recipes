import { Link } from "react-router-dom";
import {
  CopyLinkSvg,
  FacebookShareSvg,
  InstagramShareSvg,
  PinterestShareSvg,
  TwitterShareSvg,
} from "../svg-container/SvgContainer";

const ShareRecipeSection = () => {
  return (
    <section className="w-full container flex items-center lg:justify-center mt-8">
      <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
        {/* title */}
        <h5 className="font-merriweather text-2xl text-black font-bold">
          Share
        </h5>

        {/* social Links */}
        <div className="flex items-center gap-4 mt-4">
          <Link>
            <FacebookShareSvg />
          </Link>
          <Link>
            <InstagramShareSvg />
          </Link>
          <Link>
            <PinterestShareSvg />
          </Link>
          <Link>
            <TwitterShareSvg />
          </Link>
        </div>

        {/* share input */}
        <div className="mt-8 rounded-sm bg-white shadow-[0px_0px_4px_0px_rgba(2,0,57,0.08)] md:p-4 py-4 px-2 w-full flex items-center md:min-w-[440px] md:gap-9 gap-2">
          <p className="text-textColor text-sm md:text-base">
            Want to share a link instead?
          </p>
          <p className="flex items-center md:gap-2 gap-1 md:px-4 cursor-pointer">
            <CopyLinkSvg />
            <span className="text-[#0065FF] text-sm md:text-base">
              Copy link
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShareRecipeSection;
