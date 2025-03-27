import { Link } from 'react-router-dom';
import { TopArrowButtonSvg } from '../svg-container/SvgContainer';
import ButtonPrimary from '../buttons/ButtonPrimary';

const HomepageBanner = () => {
  return (
    <section className="py-[68px] bg-[#F6F5F2]">
      <div className="container flex items-center gap-16">
        {/* left side */}
        <div className="space-y-10">
          {/* Details */}
          <div className="space-y-5">
            <h1 className="max-w-[740px] font-merriweather text-[56px] font-bold leading-[135%] text-black">
              Baby Bites to Golden Delights - Healthy
              <span className="text-primary ml-5">Recipes & Tips</span> for All
              thys
            </h1>
            <p className="text-textColor leading-[150%] max-w-[740px] ">
              Discover delicious, age-appropriate recipes tailored to every
              stage of life. Eat healthier, plan smarter, and enjoy meals that
              fit your lifestyle!
            </p>
          </div>

          {/* button */}
          <ButtonPrimary title="Explore all recipes" svg={true} />
        </div>
      </div>
    </section>
  );
};

export default HomepageBanner;
