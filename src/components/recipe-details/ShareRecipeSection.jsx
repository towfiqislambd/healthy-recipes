import { Link } from "react-router-dom";
import {
  CopyLinkSvg,
  FacebookShareSvg,
  InstagramShareSvg,
  PinterestShareSvg,
  TwitterShareSvg,
} from "../svg-container/SvgContainer";

const ShareRecipeSection = ({ fullLocation }) => {
  const handleTwitterRedirect = () => {
    const url = fullLocation; // Replace with your actual URL
    const text = "Follow me on Gift a coffee!"; // Replace with your custom message
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(text)}`;

    window.open(twitterShareUrl, "_blank");
  };

  const handleFacebookRedirect = () => {
    const url = fullLocation; // Replace with your actual URL
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;

    window.open(facebookShareUrl, "_blank");
  };


  return (
    <section className="w-full container flex items-center lg:justify-center mt-8">
      <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
        {/* title */}
        <h5 className="font-merriweather text-xl lg:text-2xl text-black font-bold">
          Share
        </h5>

        {/* social Links */}
        <div className="flex items-center gap-4 mt-3 xl:mt-4">
          <button onClick={handleFacebookRedirect}>
            <FacebookShareSvg />
          </button>
          <Link>
            <InstagramShareSvg />
          </Link>
          <Link>
            <PinterestShareSvg />
          </Link>
          <button onClick={handleTwitterRedirect}>
            <TwitterShareSvg />
          </button>
        </div>

        {/* share input */}
        <div className="mt-5 xl:mt-8 rounded-sm bg-white shadow-[0px_0px_4px_0px_rgba(2,0,57,0.08)] py-3 xl:py-4 px-3 w-full flex items-center md:min-w-[440px] md:gap-9 gap-2">
          <p className="text-textColor text-sm md:text-base">
            Want to share a link instead?
          </p>
          <p className="flex items-center md:gap-2 gap-1 flex-shrink-0  cursor-pointer">
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
