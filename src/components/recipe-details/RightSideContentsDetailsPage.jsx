import { useRef, useState } from "react";
import {
  PauseButtonSvg,
  PlayButtonSvg,
} from "@/components/svg-container/SvgContainer";

const RightSideContentsDetailsPage = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null); // Create a ref for the video element

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.setAttribute("loop", "true"); // Set loop attribute
      videoRef.current.setAttribute("muted", "true"); // Set muted attribute
      videoRef.current.setAttribute("autoplay", "true"); // Set autoplay attribute
    }
    setIsPlaying(true); // Set the state to 'playing'
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("loop"); // Remove loop attribute
      videoRef.current.removeAttribute("muted"); // Remove muted attribute
      videoRef.current.removeAttribute("autoplay"); // Remove autoplay attribute
    }
    setIsPlaying(false); // Set the state to 'paused'
  };
  return (
    <div className="h-full sm:min-h-[50vh]">
      {/* Details */}
      <div className="">
        {/* video */}
        <div className="w-full 2xl:h-[480px] h-[250px] md:h-[300px] relative group">
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-2xl"
            src={`${import.meta.env.VITE_SITE_URL}/${data?.recipe_video}`}
          ></video>

          {/* play button */}
          <div
            onClick={handlePlay}
            className={`size-16 opacity-0 group-hover:opacity-100 transition-all duration-700 items-center justify-center bg-primary rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer ${!isPlaying ? "flex" : "hidden"
              }`}
          >
            <PlayButtonSvg />
          </div>

          {/* pause button */}
          <div
            onClick={handlePause}
            className={`size-16 opacity-0 group-hover:opacity-100 transition-all duration-700  items-center justify-center bg-primary rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer   ${isPlaying ? "flex" : "hidden"
              } `}
          >
            <PauseButtonSvg />
          </div>
        </div>

        {/* instructions */}
        <div className="pt-5">
          {/* title */}
          <h5 className="text-black text-xl 2xl:text-2xl font-bold leading-[130%] font-merriweather">
            Instructions:
          </h5>

          {/* steps */}
          <div className="mt-4 2xl:mt-6 space-y-3 2xl:space-y-5">
            {
              data?.instructions?.map((item, idx) => <p key={item.id} className="text-textColor 2xl:text-lg font-medium">
                <span>Step-{idx + 1}: </span> {item?.step}
              </p>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideContentsDetailsPage;
