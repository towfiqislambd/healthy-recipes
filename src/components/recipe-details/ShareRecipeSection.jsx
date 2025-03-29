import { Link } from "react-router-dom";
import { CopyLinkSvg, FacebookShareSvg, InstagramShareSvg, PinterestShareSvg, TwitterShareSvg } from "../svg-container/SvgContainer";


const ShareRecipeSection = () => {
  return (
    <section className="w-full container flex items-center justify-center mt-8">
      <div>
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
        <div className="mt-8 rounded-sm bg-white shadow-[0px_0px_4px_0px_rgba(2,0,57,0.08)] p-4 w-full flex items-center min-w-[440px] gap-9">
          <p className="text-textColor">Want to share a link instead?</p>
          <p className="flex items-center gap-2 px-4 cursor-pointer">
            <CopyLinkSvg />
            <span className="text-[#0065FF]">Copy link</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShareRecipeSection;
