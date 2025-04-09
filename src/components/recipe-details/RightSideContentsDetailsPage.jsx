import { useRef, useState } from "react";
import {
  PauseButtonSvg,
  PlayButtonSvg,
} from "@/components/svg-container/SvgContainer";
import { Link } from "react-router-dom";

const RightSideContentsDetailsPage = ({ video }) => {
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
    <div className="h-full min-h-[50vh]">
      {/* edit button */}
      <div className="xl:w-full w-[400px] flex items-center md:justify-end">
        <Link to='/dashboard/edit-recipes'>
          <button className="bg-primary font-medium text-white rounded-lg inline-flex items-center justify-center lg:px-8 px-4 lg:py-3 py-2 border border-primary hover:bg-transparent duration-300 transition-all group hover:text-primary">
            Edit Recipe
          </button>
        </Link>
      </div>

      {/* Details */}
      <div className="mt-20">
        {/* video */}
        <div className="xl:w-full lg:h-[480px] h-[300px] relative group">
          <video
            ref={videoRef}
            className="xl:w-full w-full xl:h-full h-[300px] object-cover rounded-2xl"
            src={video}
          ></video>

          {/* buttons */}

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
          <h5 className="text-black text-2xl font-bold leading-[130%] font-merriweather">
            Instructions:
          </h5>

          {/* steps */}
          <div className="lg:mt-8 mt-4 space-y-6">
            <p className="text-textColor text-xl font-medium leading-[150%]">
              Step 1.
              <span className="text-base">
                Blend banana, eggs, oats, and baking powder in a blender until
                smooth, about 45 seconds. Mix egg white part , cinnamon powder
                and salt with this mixture.
              </span>
            </p>
            <p className="text-textColor text-xl font-medium leading-[150%]">
              Step 2.
              <span className="text-base">
                Spray a griddle or skillet with cooking spray and heat over
                medium-high heat.
              </span>
            </p>
            <p className="text-textColor text-xl font-medium leading-[150%]">
              Step 3.
              <span className="text-base">
                Drop batter by large spoonfuls onto the griddle and cook until
                bubbles form and the edges are dry, 3 to 4 minutes. Flip and
                cook until browned on the other side, 2 to 3 minutes. Repeat as
                necessary.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideContentsDetailsPage;
