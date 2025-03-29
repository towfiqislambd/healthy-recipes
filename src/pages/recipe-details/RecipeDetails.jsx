import LeftSideContentsDetailsPage from '@/components/recipe-details/LeftSideContentsDetailsPage';
import banner from '../../assets/images/jjj.jpg';
import CommonHeroBanner from '@/components/common/CommonHeroBanner';
import {
  PauseButtonSvg,
  PlayButtonSvg,
} from '@/components/svg-container/SvgContainer';
import { useRef, useState } from 'react';
import recipe from '../../assets/videos/recipe.mp4';

const RecipeDetails = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null); // Create a ref for the video element

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.setAttribute('loop', 'true'); // Set loop attribute
      videoRef.current.setAttribute('muted', 'true'); // Set muted attribute
      videoRef.current.setAttribute('autoplay', 'true'); // Set autoplay attribute
    }
    setIsPlaying(true); // Set the state to 'playing'
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute('loop'); // Remove loop attribute
      videoRef.current.removeAttribute('muted'); // Remove muted attribute
      videoRef.current.removeAttribute('autoplay'); // Remove autoplay attribute
    }
    setIsPlaying(false); // Set the state to 'paused'
  };

  return (
    <div className="mt-[104px]">
      {/* banner */}
      <CommonHeroBanner
        image={banner}
        title="Banana Oat Pancakes (Dairy-Free)"
      />

      {/* Main Container */}
      <section className="container min-h-[50vh] flex w-full gap-24">
        {/* left side contents */}
        <LeftSideContentsDetailsPage />

        {/* right side contents */}
        <div className="h-full min-h-[50vh] w-[70%]">
          {/* edit button */}
          <div className="pt-12 w-full flex items-center justify-end">
            <button className="bg-primary font-medium text-white rounded-lg inline-flex items-center justify-center px-8 py-3 border border-primary hover:bg-transparent duration-300 transition-all group hover:text-primary">
              Edit Recipe
            </button>
          </div>

          {/* Details */}
          <div className="mt-32">
            {/* video */}
            <div className="w-full h-[480px] relative group">
              <video
                ref={videoRef}
                className="w-full h-full object-cover rounded-2xl"
                src={recipe}
              ></video>

              {/* buttons */}

              {/* play button */}
              <div
                onClick={handlePlay}
                className={`size-16 opacity-0 group-hover:opacity-100 transition-all duration-700 items-center justify-center bg-primary rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                  !isPlaying ? 'flex' : 'hidden'
                }`}
              >
                <PlayButtonSvg />
              </div>

              {/* pause button */}
              <div
                onClick={handlePause}
                className={`size-16 opacity-0 group-hover:opacity-100 transition-all duration-700  items-center justify-center bg-primary rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer   ${
                  isPlaying ? 'flex' : 'hidden'
                } `}
              >
                <PauseButtonSvg />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipeDetails;
