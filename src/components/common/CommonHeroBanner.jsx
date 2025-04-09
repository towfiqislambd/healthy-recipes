import { useNavigate } from "react-router-dom";
import { BackArrowSvg } from "../svg-container/SvgContainer";

const CommonHeroBanner = ({ image, title }) => {
  const navigate = useNavigate();

  // handle back button click event
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <section>
      <div className="bg-[#B7E4C7] pt-10 3xl:pt-16 pb-40 ">
        {/* contents */}
        <div className="container">
          <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
            {/* back button */}
            <div>
              <div
                onClick={handleBackClick}
                className="flex items-center gap-2 text-[#373E85] group cursor-pointer"
              >
                <div className="group-hover:-translate-x-1 duration-300 transition-all">
                  <BackArrowSvg />
                </div>
                <span> Back</span>
              </div>
            </div>

            {/* title */}
            <div>
              <h3 className="mx-auto max-w-[490px] text-center text-[#2D6A4F] text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl font-bold font-merriweather leading-[130%]">
                {title}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* image */}
      <div className="container w-full h-[300px] lg:h-[320px] xl:h-[400px] 2xl:h-[520px] rounded-2xl overflow-hidden -mt-32 xl:-mt-28 mb-10 2xl:mb-20">
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          <img
            className="w-full h-full object-cover rounded-2xl"
            src={image}
            alt="banner-image"
          />
        </div>
      </div>
    </section>
  );
};

export default CommonHeroBanner;
