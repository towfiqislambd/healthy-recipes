"use client";
import Container from "@/Components/Common/Container";
import {
  CopyLinkSvg,
  FacebookShareSvg,
  InstagramShareSvg,
  TwitterShareSvg,
} from "@/Components/Svg/SvgContainer";
import React from "react";
import toast from "react-hot-toast";

const ShareRecipeSocialMedia = ({ fullLocation }: any) => {
  // For Twitter
  const handleTwitterRedirect = () => {
    const text = "Follow me on Gift a coffee!";
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      fullLocation
    )}&text=${encodeURIComponent(text)}`;
    window.open(twitterShareUrl, "_blank");
  };

  // For Facebook
  const handleFacebookRedirect = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      fullLocation
    )}`;
    window.open(facebookShareUrl, "_blank");
  };

  // For Instagram
  const handleInstagramRedirect = () => {
    window.open("https://www.instagram.com/", "_blank");
  };

  // Copy Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullLocation).then(() => {
      toast.success("Link copied to clipboard!");
    });
  };

  return (
    <Container>
      <section className="w-full flex items-center lg:justify-center mt-5 sm:mt-8">
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
            <button onClick={handleInstagramRedirect}>
              <InstagramShareSvg />
            </button>
            <button onClick={handleTwitterRedirect}>
              <TwitterShareSvg />
            </button>
          </div>

          {/* share input */}
          <div className="mt-5 xl:mt-8 rounded-sm bg-white shadow-[0px_0px_4px_0px_rgba(2,0,57,0.08)] py-3 xl:py-4 px-3 w-full flex items-center md:min-w-[440px] md:gap-9 gap-2">
            <p className="text-textColor text-sm md:text-base">
              Want to share a link instead?
            </p>
            <p
              className="flex items-center md:gap-2 gap-1 flex-shrink-0 cursor-pointer"
              onClick={handleCopyLink}
            >
              <CopyLinkSvg />
              <span className="text-[#0065FF] text-sm md:text-base">
                Copy link
              </span>
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default ShareRecipeSocialMedia;
