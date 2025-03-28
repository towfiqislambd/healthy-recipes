import { BackArrowSvg } from '@/components/svg-container/SvgContainer';
import banner from '../../assets/images/jjj.jpg';
import { Link } from 'react-router-dom';

const RecipeDetails = () => {
  return (
    <div className="mt-[104px]">
      {/* banner */}
      <div>
        <div className="bg-[#B7E4C7] pt-20 pb-40">
          {/* contents */}
          <div className="container">
            {/* back button */}
            <div>
              <Link className="flex items-center gap-2 text-[#373E85] group">
                <div className="group-hover:-translate-x-1 duration-300 transition-all">
                  <BackArrowSvg />
                </div>
                <span> Back</span>
              </Link>
            </div>

            {/* title */}
            <div>
              <h3 className="mx-auto max-w-[490px] text-center text-[#2D6A4F] text-4xl font-bold font-merriweather leading-[130%]">
                Banana Oat Pancakes (Dairy-Free)
              </h3>
            </div>
          </div>
        </div>

        {/* image */}
        <div className="container w-full h-[520px] rounded-2xl overflow-hidden -mt-28 mb-20">
          <img className='w-full h-full object-cover rounded-2xl' src={banner} alt="banner-image" />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
