import { useNavigate } from 'react-router-dom';
import { BackArrowSvg } from '../svg-container/SvgContainer';

const CommonHeroBanner = ({ image, title }) => {
  const navigate = useNavigate();

  // handle back button click event
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <section>
      <div className="bg-[#B7E4C7] pt-20 pb-40">
        {/* contents */}
        <div className="container">
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
            <h3 className="mx-auto max-w-[490px] text-center text-[#2D6A4F] text-4xl font-bold font-merriweather leading-[130%]">
              {title}
            </h3>
          </div>
        </div>
      </div>

      {/* image */}
      <div className="container w-full h-[520px] rounded-2xl overflow-hidden -mt-28 mb-20">
        <img
          className="w-full h-full object-cover rounded-2xl"
          src={image}
          alt="banner-image"
        />
      </div>
    </section>
  );
};

export default CommonHeroBanner;
